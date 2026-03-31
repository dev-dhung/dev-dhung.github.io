import { Component, input, output, signal, computed, HostListener } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.html',
})
export class Lightbox {
  readonly images = input.required<string[]>();
  readonly startIndex = input(0);
  readonly close = output<void>();

  protected readonly current = signal(0);
  protected readonly total = computed(() => this.images().length);

  ngOnInit(): void {
    this.current.set(this.startIndex());
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.close.emit();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  protected next(): void {
    this.current.update((i) => (i + 1) % this.total());
  }

  protected prev(): void {
    this.current.update((i) => (i - 1 + this.total()) % this.total());
  }

  protected onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.close.emit();
    }
  }
}
