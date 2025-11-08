import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private obs?: IntersectionObserver;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit(): void {
    this.r.addClass(this.el.nativeElement, 'reveal');
    this.obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.r.addClass(this.el.nativeElement, 'in-view');
          this.obs?.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.15 });
    this.obs.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.obs?.disconnect();
  }
}
