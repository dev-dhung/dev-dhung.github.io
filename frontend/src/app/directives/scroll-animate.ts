import { Directive, ElementRef, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimate implements OnInit, OnDestroy {
  delay = input(0);

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');

    if (this.delay()) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove('opacity-0', 'translate-y-8');
          element.classList.add('opacity-100', 'translate-y-0');
          this.observer?.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
