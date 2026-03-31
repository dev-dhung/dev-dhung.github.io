import { Component, input, output, signal, inject, computed, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { I18nService } from '../../services/i18n';
import { ImageCarousel } from '../image-carousel/image-carousel';
import { Lightbox } from '../lightbox/lightbox';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-modal',
  imports: [ImageCarousel, Lightbox],
  templateUrl: './project-modal.html',
})
export class ProjectModal {
  readonly projects = input.required<Project[]>();
  readonly categoryTitle = input.required<string>();
  readonly categoryIcon = input('');
  readonly close = output<void>();

  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);

  protected readonly lightboxImages = signal<string[]>([]);
  protected readonly lightboxIndex = signal(0);
  protected readonly showLightbox = signal(false);

  protected readonly overlayBg = computed(() =>
    this.theme.isDark() ? 'bg-dark-bg/98' : 'bg-light-bg/98',
  );
  protected readonly cardStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border',
  );
  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly textColor = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly tagStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card-hover text-dark-text-muted' : 'bg-light-surface text-light-text-muted',
  );
  protected readonly closeBtnStyle = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-card border-dark-border text-dark-text-secondary hover:border-accent hover:text-accent'
      : 'bg-light-card border-light-border text-light-text-secondary hover:border-accent-light hover:text-accent-light',
  );
  protected readonly linkStyle = computed(() =>
    this.theme.isDark() ? 'text-accent hover:text-accent-hover' : 'text-accent-light hover:text-[#9a7209]',
  );

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showLightbox()) {
      this.showLightbox.set(false);
    } else {
      this.close.emit();
    }
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  protected openLightbox(images: string[], index: number): void {
    this.lightboxImages.set(images);
    this.lightboxIndex.set(index);
    this.showLightbox.set(true);
  }

  protected onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
