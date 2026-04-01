import { Component, inject, computed, signal } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { GithubService } from '../../services/github';
import { I18nService } from '../../services/i18n';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';
import { ProjectModal } from '../project-modal/project-modal';
import { Project } from '../../models/project';

type GroupKey = 'apps' | 'labs';

interface CategoryCard {
  key: GroupKey;
  titleKey: string;
  descKey: string;
  icon: string;
}

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ScrollAnimate, ProjectModal],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly theme = inject(ThemeService);
  protected readonly github = inject(GithubService);
  protected readonly i18n = inject(I18nService);

  protected readonly activeGroup = signal<GroupKey | null>(null);

  protected readonly categories: CategoryCard[] = [
    { key: 'apps', titleKey: 'projects.apps.title', descKey: 'projects.apps.desc', icon: '&#128187;' },
    { key: 'labs', titleKey: 'projects.labs.title', descKey: 'projects.labs.desc', icon: '&#128126;' },
  ];

  private readonly appProjects = computed(() =>
    this.github.projects().filter((p) => p.category === 'web' || p.category === 'mobile'),
  );

  private readonly labProjects = computed(() =>
    this.github.projects().filter((p) => p.category === 'game'),
  );

  protected readonly activeProjects = computed(() => {
    const group = this.activeGroup();
    if (group === 'apps') return this.appProjects();
    if (group === 'labs') return this.labProjects();
    return [];
  });

  protected readonly activeCategoryData = computed(() =>
    this.categories.find((c) => c.key === this.activeGroup()) ?? null,
  );

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card border-dark-border hover:border-accent hover:bg-dark-card-hover'
      : 'bg-light-card border-light-border hover:border-accent-light hover:bg-light-card-hover',
  );
  protected readonly cardDesc = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');

  protected projectCount(group: GroupKey): number {
    return group === 'apps' ? this.appProjects().length : this.labProjects().length;
  }

  protected hasProjects(group: GroupKey): boolean {
    return this.projectCount(group) > 0;
  }

  protected openCategory(group: GroupKey): void {
    if (this.hasProjects(group)) {
      this.activeGroup.set(group);
    }
  }

  protected closeModal(): void {
    this.activeGroup.set(null);
  }
}
