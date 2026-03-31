import { Component, input, output, signal, computed, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.html',
})
export class ImageCarousel implements OnInit, OnDestroy {
  readonly images = input.required<string[]>();
  readonly height = input('h-48');
  readonly imageClick = output<number>();

  protected readonly current = signal(0);
  protected readonly total = computed(() => this.images().length);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (this.total() > 1) {
      this.timer = setInterval(() => this.next(), 4000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  protected next(): void {
    this.current.update((i) => (i + 1) % this.total());
  }

  protected prev(): void {
    this.current.update((i) => (i - 1 + this.total()) % this.total());
  }

  protected goTo(index: number): void {
    this.current.set(index);
    this.resetTimer();
  }

  protected onImageClick(): void {
    this.imageClick.emit(this.current());
  }

  private resetTimer(): void {
    clearInterval(this.timer);
    if (this.total() > 1) {
      this.timer = setInterval(() => this.next(), 4000);
    }
  }
}
