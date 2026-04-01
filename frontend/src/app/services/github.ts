import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, catchError, of, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Project, ProjectCategory, PortfolioMeta } from '../models/project';

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
  default_branch: string;
}

const TOPIC_MAP: Record<string, ProjectCategory> = {
  'portfolio-web': 'web',
  'portfolio-mobile': 'mobile',
  'portfolio-game': 'game',
};

const EXTERNAL_PROJECTS: Project[] = [
  {
    name: 'Magnetic Suite',
    description: 'Plataforma SaaS empresarial. Responsable del rediseño de módulos core, integración de IA Generativa y refactorización de arquitectura con RxJS y Redux.',
    url: 'https://magneticsuite.com/',
    homepage: 'https://magneticsuite.com/',
    language: 'Angular',
    topics: ['angular', 'rxjs', 'redux', 'ai', 'saas'],
    category: 'web',
    stars: 0,
    updatedAt: '2026-04-01',
    images: [],
    featured: true,
  },
  {
    name: 'Tikket',
    description: 'Sistema de gestión de tickets y atención al cliente. Contribución en el desarrollo frontend con Angular, optimización de rendimiento y experiencia de usuario.',
    url: 'https://www.tikket.net/es',
    homepage: 'https://www.tikket.net/es',
    language: 'Angular',
    topics: ['angular', 'typescript', 'saas'],
    category: 'web',
    stars: 0,
    updatedAt: '2026-04-01',
    images: [],
    featured: true,
  },
];

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly GITHUB_USER = 'dev-dhung';
  private readonly API_URL = `https://api.github.com/users/${this.GITHUB_USER}/repos`;

  readonly projects = signal<Project[]>([...EXTERNAL_PROJECTS]);
  readonly loaded = signal(false);

  readonly webProjects = computed(() => this.projects().filter((p) => p.category === 'web'));
  readonly mobileProjects = computed(() => this.projects().filter((p) => p.category === 'mobile'));
  readonly gameProjects = computed(() => this.projects().filter((p) => p.category === 'game'));
  readonly hasProjects = computed(() => this.projects().length > 0);

  constructor() {
    this.http
      .get<GitHubRepo[]>(this.API_URL, { params: { sort: 'updated', per_page: '100' } })
      .pipe(
        map((repos) => repos.filter((r) => !r.fork && r.topics.some((t) => t in TOPIC_MAP))),
        switchMap((repos) => this.enrichWithMeta(repos)),
        catchError(() => of([] as Project[])),
        tap(() => this.loaded.set(true)),
        takeUntilDestroyed(),
      )
      .subscribe((githubProjects) => {
        const featured = [...EXTERNAL_PROJECTS, ...githubProjects.filter((p) => p.featured)];
        const rest = githubProjects.filter((p) => !p.featured);
        this.projects.set([...featured, ...rest]);
      });
  }

  private enrichWithMeta(repos: GitHubRepo[]) {
    if (repos.length === 0) return of([] as Project[]);

    const requests = repos.map((repo) => {
      const metaUrl = `https://raw.githubusercontent.com/${this.GITHUB_USER}/${repo.name}/${repo.default_branch}/portfolio.json`;

      return this.http.get<PortfolioMeta>(metaUrl).pipe(
        catchError(() => of({} as PortfolioMeta)),
        map((meta) => this.toProject(repo, meta)),
      );
    });

    return forkJoin(requests);
  }

  private toProject(repo: GitHubRepo, meta: PortfolioMeta): Project {
    return {
      name: this.formatName(repo.name),
      description: repo.description ?? '',
      url: repo.html_url,
      homepage: repo.homepage || null,
      language: repo.language ?? '',
      topics: repo.topics.filter((t) => !(t in TOPIC_MAP)),
      category: this.getCategory(repo.topics),
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      images: meta.images ?? (meta.image ? [meta.image] : []),
      featured: meta.featured ?? false,
    };
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
