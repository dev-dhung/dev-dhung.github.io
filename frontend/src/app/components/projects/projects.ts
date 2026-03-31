import { Component, inject, computed, signal } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { GithubService } from '../../services/github';
import { I18nService } from '../../services/i18n';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';
import { ProjectModal } from '../project-modal/project-modal';
import { Project, ProjectCategory } from '../../models/project';

interface CategoryCard {
  key: ProjectCategory;
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

  protected readonly activeCategory = signal<ProjectCategory | null>(null);

  protected readonly categories: CategoryCard[] = [
    { key: 'web', titleKey: 'projects.web.title', descKey: 'projects.web.desc', icon: '&#127760;' },
    { key: 'mobile', titleKey: 'projects.mobile.title', descKey: 'projects.mobile.desc', icon: '&#128241;' },
    { key: 'game', titleKey: 'projects.games.title', descKey: 'projects.games.desc', icon: '&#128126;' },
  ];

  protected readonly activeProjects = computed(() => {
    const cat = this.activeCategory();
    if (!cat) return [];
    return this.github.projects().filter((p) => p.category === cat);
  });

  protected readonly activeCategoryData = computed(() =>
    this.categories.find((c) => c.key === this.activeCategory()) ?? null,
  );

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card border-dark-border hover:border-accent hover:bg-dark-card-hover'
      : 'bg-light-card border-light-border hover:border-accent-light hover:bg-light-card-hover',
  );
  protected readonly cardDesc = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly tagStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card-hover text-dark-text-muted' : 'bg-light-surface text-light-text-muted',
  );

  protected projectCount(category: ProjectCategory): number {
    return this.github.projects().filter((p) => p.category === category).length;
  }

  protected hasProjects(category: ProjectCategory): boolean {
    return this.projectCount(category) > 0;
  }

  protected openCategory(category: ProjectCategory): void {
    if (this.hasProjects(category)) {
      this.activeCategory.set(category);
    }
  }

  protected closeModal(): void {
    this.activeCategory.set(null);
  }
}
