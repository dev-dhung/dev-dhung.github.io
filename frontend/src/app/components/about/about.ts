import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, ScrollAnimate],
  templateUrl: './about.html',
})
export class About {
  protected readonly theme = inject(ThemeService);
  protected readonly stack = ['Angular', 'React', 'TypeScript', 'RxJS', 'Redux', 'Flutter', 'Ionic'] as const;
  protected readonly paragraphs = ['about.p1', 'about.p2', 'about.p3'] as const;

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly textColor = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border hover:border-accent' : 'bg-light-card border-light-border hover:border-accent-light',
  );
  protected readonly tagStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card-hover text-accent' : 'bg-light-surface text-accent-light',
  );
}
