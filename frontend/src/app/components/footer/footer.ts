import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly theme = inject(ThemeService);
  protected readonly year = new Date().getFullYear();

  protected readonly footerBg = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-surface border-t border-dark-border'
      : 'bg-light-surface border-t border-light-border',
  );
  protected readonly logoColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly linkColor = computed(() =>
    this.theme.isDark() ? 'text-dark-text-secondary hover:text-accent' : 'text-light-text-secondary hover:text-accent-light',
  );
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly dividerColor = computed(() => this.theme.isDark() ? 'border-dark-border' : 'border-light-border');
}
