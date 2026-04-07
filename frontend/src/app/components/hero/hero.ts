import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from '../../services/i18n';
import { ThemeService } from '../../services/theme';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
})
export class Hero implements OnInit, OnDestroy {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);

  protected readonly displayText = signal('');
  protected readonly showCursor = signal(true);

  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typeTimer?: ReturnType<typeof setTimeout>;
  private cursorTimer?: ReturnType<typeof setInterval>;

  protected readonly phrases = computed<string[]>(() =>
    this.i18n.isEs()
      ? ['Angular & React | Clean Architecture', 'Mobile Dev con Flutter & Ionic', 'Desarrollo impulsado por IA', 'Creando mundos en Unity']
      : ['Angular & React | Clean Architecture', 'Mobile Dev with Flutter & Ionic', 'AI-Driven Development', 'Building worlds in Unity'],
  );

  protected readonly heroBg = computed(() =>
    this.theme.isDark() ? 'bg-gradient-to-br from-dark-bg to-[#2a2520]' : 'bg-gradient-to-br from-light-bg to-light-surface',
  );

  protected readonly codeBlock = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border shadow-lg' : 'bg-light-card border-light-border shadow-md',
  );

  protected readonly codeText = computed(() =>
    this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary',
  );

  protected readonly subtitleColor = computed(() =>
    this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary',
  );

  protected readonly mutedColor = computed(() =>
    this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted',
  );

  protected readonly btnPrimary = computed(() =>
    this.theme.isDark() ? 'bg-accent text-dark-bg hover:bg-accent-hover' : 'bg-accent-light text-white hover:bg-[#9a7209]',
  );

  protected readonly btnOutline = computed(() =>
    this.theme.isDark()
      ? 'border-dark-border text-dark-text-secondary hover:border-accent hover:text-accent'
      : 'border-light-border text-light-text-secondary hover:border-accent-light hover:text-accent-light',
  );

  protected readonly cvUrl = computed(() =>
    this.i18n.isEs() ? 'cv-diego-hung-es.pdf' : 'cv-diego-hung-en.pdf',
  );

  ngOnInit(): void {
    this.typeNext();
    this.cursorTimer = setInterval(() => this.showCursor.update((v) => !v), 530);
  }

  ngOnDestroy(): void {
    clearTimeout(this.typeTimer);
    clearInterval(this.cursorTimer);
  }

  private typeNext(): void {
    const phrase = this.phrases()[this.currentPhraseIndex];
    const speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting) {
      this.displayText.set(phrase.substring(0, ++this.currentCharIndex));
      if (this.currentCharIndex === phrase.length) {
        this.typeTimer = setTimeout(() => { this.isDeleting = true; this.typeNext(); }, 2000);
        return;
      }
    } else {
      this.displayText.set(phrase.substring(0, --this.currentCharIndex));
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases().length;
      }
    }

    this.typeTimer = setTimeout(() => this.typeNext(), speed);
  }
}
