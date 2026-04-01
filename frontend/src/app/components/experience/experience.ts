import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { I18nService } from '../../services/i18n';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { ScrollAnimate } from '../../directives/scroll-animate';

interface Job {
  role: { es: string; en: string };
  company: string;
  location: { es: string; en: string };
  period: { es: string; en: string };
  highlights: { es: string; en: string }[];
}

@Component({
  selector: 'app-experience',
  imports: [TranslatePipe, ScrollAnimate],
  templateUrl: './experience.html',
})
export class Experience {
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(I18nService);

  protected readonly jobs: Job[] = [
    {
      role: { es: 'Desarrollador Front-end', en: 'Front-end Developer' },
      company: 'Magnetic',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2024 - Abr. 2026', en: 'Mar 2024 - Apr 2026' },
      highlights: [
        {
          es: 'Rediseño y modernización de módulos core bajo arquitectura escalable, facilitando el soporte de múltiples versiones.',
          en: 'Redesigned and modernized core modules under scalable architecture, enabling multi-version support.',
        },
        {
          es: 'Desarrollo de módulos basados en IA Generativa, automatizando tareas críticas y personalizando la experiencia del usuario.',
          en: 'Developed Generative AI-based modules, automating critical tasks and personalizing the user experience.',
        },
        {
          es: 'Refactorización de lógica compleja con RxJS y Redux, optimizando reactividad y eliminando cuellos de botella.',
          en: 'Refactored complex logic with RxJS and Redux, optimizing reactivity and removing bottlenecks.',
        },
      ],
    },
    {
      role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
      company: 'Fibex Telecom',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2022 - Mar. 2024', en: 'Mar 2022 - Mar 2024' },
      highlights: [
        {
          es: 'Desarrollo End-to-End de la app móvil "Fibex Oficina Móvil" con Ionic y Angular, digitalizando procesos para miles de usuarios.',
          en: 'End-to-End development of "Fibex Oficina Móvil" mobile app with Ionic and Angular, digitizing processes for thousands of users.',
        },
        {
          es: 'Diseño y despliegue del sitio web corporativo con estándares modernos de UI/UX, performance y SEO técnico.',
          en: 'Designed and deployed the corporate website with modern UI/UX standards, performance, and technical SEO.',
        },
        {
          es: 'Refactorizaciones estratégicas que mejoraron la mantenibilidad y los tiempos de respuesta del sistema.',
          en: 'Strategic refactoring that improved system maintainability and response times.',
        },
      ],
    },
  ];

  protected readonly titleColor = computed(() => this.theme.isDark() ? 'text-dark-text' : 'text-light-text');
  protected readonly mutedColor = computed(() => this.theme.isDark() ? 'text-dark-text-muted' : 'text-light-text-muted');
  protected readonly textColor = computed(() => this.theme.isDark() ? 'text-dark-text-secondary' : 'text-light-text-secondary');
  protected readonly sectionBg = computed(() => this.theme.isDark() ? 'bg-dark-surface' : 'bg-light-surface');
  protected readonly lineColor = computed(() => this.theme.isDark() ? 'bg-dark-border' : 'bg-light-border');
  protected readonly dotBorder = computed(() => this.theme.isDark() ? 'border-dark-bg' : 'border-light-bg');
  protected readonly cardStyle = computed(() =>
    this.theme.isDark() ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border',
  );

  protected tr(obj: { es: string; en: string }): string {
    return this.i18n.isEs() ? obj.es : obj.en;
  }
}
