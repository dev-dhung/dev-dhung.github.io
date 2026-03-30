import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, catchError, of } from 'rxjs';
import { Project, ProjectCategory } from '../models/project';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const TOPIC_MAP: Record<string, ProjectCategory> = {
  'portfolio-web': 'web',
  'portfolio-mobile': 'mobile',
  'portfolio-game': 'game',
};

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly GITHUB_USER = 'dev-dhung';
  private readonly API_URL = `https://api.github.com/users/${this.GITHUB_USER}/repos`;

  private readonly repos$ = this.http
    .get<GitHubRepo[]>(this.API_URL, {
      params: { sort: 'updated', per_page: '100' },
    })
    .pipe(
      map((repos) => this.mapToProjects(repos)),
      catchError(() => of([] as Project[])),
    );

  private readonly allProjects = toSignal(this.repos$, { initialValue: [] as Project[] });

  readonly loading = signal(true);
  readonly projects = computed(() => {
    const p = this.allProjects();
    if (p.length > 0 || this.allProjects() === this.allProjects()) {
      this.loading.set(false);
    }
    return p;
  });

  readonly webProjects = computed(() => this.projects().filter((p) => p.category === 'web'));
  readonly mobileProjects = computed(() => this.projects().filter((p) => p.category === 'mobile'));
  readonly gameProjects = computed(() => this.projects().filter((p) => p.category === 'game'));
  readonly hasProjects = computed(() => this.projects().length > 0);

  private mapToProjects(repos: GitHubRepo[]): Project[] {
    return repos
      .filter((repo) => !repo.fork && repo.topics.some((t) => t in TOPIC_MAP))
      .map((repo) => ({
        name: this.formatName(repo.name),
        description: repo.description ?? '',
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language ?? '',
        topics: repo.topics.filter((t) => !(t in TOPIC_MAP)),
        category: this.getCategory(repo.topics),
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
      }));
  }

  private getCategory(topics: string[]): ProjectCategory {
    for (const topic of topics) {
      if (topic in TOPIC_MAP) return TOPIC_MAP[topic];
    }
    return 'web';
  }

  private formatName(name: string): string {
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
