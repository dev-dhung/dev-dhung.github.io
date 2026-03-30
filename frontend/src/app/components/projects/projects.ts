import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { GithubService } from '../../services/github';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';
import { Project, ProjectCategory } from '../../models/project';

interface PlaceholderCard {
  titleKey: string;
  descKey: string;
  icon: string;
  tags: string[];
  category: ProjectCategory;
}

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ScrollAnimate],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly theme = inject(ThemeService);
  protected readonly github = inject(GithubService);

  private readonly placeholders: PlaceholderCard[] = [
    { titleKey: 'projects.web.title', descKey: 'projects.web.desc', icon: '&#127760;', tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx'], category: 'web' },
    { titleKey: 'projects.mobile.title', descKey: 'projects.mobile.desc', icon: '&#128241;', tags: ['Flutter', 'React Native', 'Ionic'], category: 'mobile' },
    { titleKey: 'projects.games.title', descKey: 'projects.games.desc', icon: '&#128126;', tags: ['Unity', 'C#', 'Game Dev'], category: 'game' },
  ];

  protected readonly visiblePlaceholders = computed(() =>
    this.placeholders.filter((p) => {
      const projects = this.github.projects();
      return !projects.some((proj) => proj.category === p.category);
    }),
  );

  protected readonly realProjects = computed(() => this.github.projects());
  protected readonly loaded = computed(() => this.github.loaded());

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border hover:border-accent' : 'bg-light-card border-light-border hover:border-accent-light',
  );
  protected readonly cardDesc = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly tagStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card-hover text-dark-text-muted' : 'bg-light-surface text-light-text-muted',
  );
  protected readonly linkStyle = computed(() =>
    this.theme.isDark() ? 'text-accent hover:text-accent-hover' : 'text-accent-light hover:text-[#9a7209]',
  );
}
