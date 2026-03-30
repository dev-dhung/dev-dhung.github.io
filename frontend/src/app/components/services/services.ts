import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';

interface ServiceItem {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-services',
  imports: [TranslatePipe, ScrollAnimate],
  templateUrl: './services.html',
})
export class Services {
  protected readonly theme = inject(ThemeService);

  protected readonly services: ServiceItem[] = [
    { icon: '&#9672;', titleKey: 'services.web.title', descKey: 'services.web.desc' },
    { icon: '&#9670;', titleKey: 'services.spa.title', descKey: 'services.spa.desc' },
    { icon: '&#9743;', titleKey: 'services.mobile.title', descKey: 'services.mobile.desc' },
    { icon: '&#8644;', titleKey: 'services.api.title', descKey: 'services.api.desc' },
    { icon: '&#9889;', titleKey: 'services.perf.title', descKey: 'services.perf.desc' },
    { icon: '&#9881;', titleKey: 'services.consult.title', descKey: 'services.consult.desc' },
  ];

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly sectionBg = computed(() => this.theme.isDark() ? 'bg-dark-surface' : 'bg-light-surface');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card border-dark-border hover:border-accent hover:bg-dark-card-hover'
      : 'bg-light-card border-light-border hover:border-accent-light hover:bg-light-card-hover',
  );
  protected readonly cardTitle = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly cardDesc = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
}
