import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { I18nService } from '../../services/i18n';
import { TranslatePipe } from '../../pipes/translate-pipe';

interface NavLink {
  href: string;
  key: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);
  protected readonly mobileOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly links: NavLink[] = [
    { href: '#about', key: 'nav.about' },
    { href: '#services', key: 'nav.services' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#tech', key: 'nav.tech' },
    { href: '#contact', key: 'nav.contact' },
  ];

  protected readonly navBg = computed(() => {
    if (!this.scrolled()) return '';
    return this.theme.isDark()
      ? 'bg-dark-bg/95 backdrop-blur-md shadow-[0_1px_0_var(--color-dark-border)]'
      : 'bg-light-bg/95 backdrop-blur-md shadow-[0_1px_0_var(--color-light-border)]';
  });

  protected readonly linkColor = computed(() =>
    this.theme.isDark() ? 'text-dark-text-secondary hover:text-accent' : 'text-light-text-secondary hover:text-accent-light',
  );

  protected readonly btnStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-transparent border-dark-border text-dark-text-secondary hover:border-accent hover:text-accent'
      : 'bg-transparent border-light-border text-light-text-secondary hover:border-accent-light hover:text-accent-light',
  );

  protected readonly logoColor = computed(() =>
    this.theme.isDark() ? 'text-dark-text' : 'text-light-text',
  );

  protected readonly barColor = computed(() =>
    this.theme.isDark() ? 'bg-dark-text' : 'bg-light-text',
  );

  protected readonly mobileBg = computed(() =>
    this.theme.isDark() ? 'bg-dark-surface' : 'bg-light-surface',
  );

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
