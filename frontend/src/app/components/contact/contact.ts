import { Component, inject, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme';
import { I18nService } from '../../services/i18n';
import { EmailService } from '../../services/email';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TranslatePipe, ScrollAnimate],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly emailService = inject(EmailService);
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);

  protected readonly sending = signal(false);
  protected readonly status = signal<'idle' | 'success' | 'error'>('idle');

  protected readonly contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly labelColor = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly inputStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card border-dark-border text-dark-text placeholder:text-dark-text-muted focus:border-accent'
      : 'bg-light-card border-light-border text-light-text placeholder:text-light-text-muted focus:border-accent-light',
  );
  protected readonly btnStyle = computed(() =>
    this.theme.isDark() ? 'bg-accent text-dark-bg hover:bg-accent-hover' : 'bg-accent-light text-white hover:bg-[#9a7209]',
  );

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.sending.set(true);
    this.status.set('idle');

    this.emailService.send(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.status.set('success');
        this.contactForm.reset();
        this.sending.set(false);
      },
      error: () => {
        this.status.set('error');
        this.sending.set(false);
      },
    });
  }
}
