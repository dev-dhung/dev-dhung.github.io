import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';

interface TechCategory {
  labelKey: string;
  items: string[];
}

@Component({
  selector: 'app-tech-stack',
  imports: [TranslatePipe, ScrollAnimate],
  templateUrl: './tech-stack.html',
})
export class TechStack {
  protected readonly theme = inject(ThemeService);

  protected readonly categories: TechCategory[] = [
    { labelKey: 'tech.frontend', items: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3/SCSS', 'JavaScript'] },
    { labelKey: 'tech.backend', items: ['Node.js', 'Express', 'MongoDB', 'PHP', 'MySQL', 'REST APIs', 'Cloudinary'] },
    { labelKey: 'tech.tools', items: ['Git', 'VS Code', 'Figma', 'Postman', 'Chrome DevTools'] },
    { labelKey: 'tech.learning', items: ['React Native', 'Ionic', 'Flutter', 'NestJS', 'Unity', 'C#'] },
  ];

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly sectionBg = computed(() => this.theme.isDark() ? 'bg-dark-surface' : 'bg-light-surface');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border hover:border-accent' : 'bg-light-card border-light-border hover:border-accent-light',
  );
  protected readonly itemStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card-hover text-dark-text-secondary border-transparent hover:border-accent hover:text-accent'
      : 'bg-light-surface text-light-text-secondary border-transparent hover:border-accent-light hover:text-accent-light',
  );
}
