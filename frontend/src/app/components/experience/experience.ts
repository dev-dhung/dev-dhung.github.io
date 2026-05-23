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
      role: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
      company: 'Magnetic',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2025 - Mar. 2026', en: 'Mar 2025 - Mar 2026' },
      highlights: [
        {
          es: 'Migré módulos legacy a Angular 19, reduciendo la deuda técnica en un 20% y mejorando la escalabilidad del sistema.',
          en: 'Migrated legacy modules to Angular 19, reducing technical debt by 20% and improving system scalability.',
        },
        {
          es: 'Refactoricé flujos de datos asíncronos con RxJS y Redux, eliminando cuellos de botella en la plataforma.',
          en: 'Refactored asynchronous data flows using RxJS and Redux, eliminating platform bottlenecks.',
        },
        {
          es: 'Diseñé e integré módulos de IA Generativa para automatizar procesos internos, disminuyendo los tiempos operativos administrativos.',
          en: 'Designed and integrated Generative AI modules to automate internal processes, decreasing administrative operational times.',
        },
        {
          es: 'Desarrollé interfaces responsivas con Tailwind CSS e integré Posthog para la toma de decisiones basadas en datos de usuario.',
          en: 'Developed responsive interfaces with Tailwind CSS and integrated Posthog for data-driven user decision-making.',
        },
      ],
    },
    {
      role: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
      company: 'Tikket',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2024 - Mar. 2025', en: 'Mar 2024 - Mar 2025' },
      highlights: [
        {
          es: 'Desarrollé componentes de interfaz reutilizables con TypeScript, optimizando la consistencia y el mantenimiento de la plataforma.',
          en: 'Developed reusable interface components with TypeScript, optimizing platform consistency and maintainability.',
        },
        {
          es: 'Traduje maquetas de diseño y requerimientos funcionales en aplicaciones web interactivas de alto rendimiento.',
          en: 'Translated design mockups and functional requirements into high-performance interactive web applications.',
        },
        {
          es: 'Implementé buenas prácticas de desarrollo frontend, asegurando diseño responsivo fluido y compatibilidad cross-browser.',
          en: 'Implemented frontend development best practices, ensuring seamless responsive design and cross-browser compatibility.',
        },
      ],
    },
    {
      role: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' },
      company: 'Fibex Telecom, C.A',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2022 - Mar. 2024', en: 'Mar 2022 - Mar 2024' },
      highlights: [
        {
          es: 'Colaboré en el ciclo de vida completo de aplicaciones de streaming para Roku (BrightScript) y Android TV, digitalizando el servicio para miles de usuarios.',
          en: 'Developed the full lifecycle of streaming applications for Roku (BrightScript) and Android TV, digitalizing the service for thousands of users.',
        },
        {
          es: 'Diseñé y desplegué aplicaciones móviles multiplataforma con Ionic, integrando geolocalización y pasarelas de pago.',
          en: 'Designed and deployed multiplatform mobile applications using Ionic, integrating geolocation and payment gateways.',
        },
        {
          es: 'Desarrollé y mantuve APIs en Node.js y PHP, asegurando la comunicación eficiente entre sistemas core e interfaces de usuario.',
          en: 'Developed and maintained APIs in Node.js and PHP, ensuring efficient communication between core systems and end-user interfaces.',
        },
      ],
    },
    {
      role: { es: 'Analista de Tecnología', en: 'Technology Analyst' },
      company: 'Banco del Tesoro, C.A',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2017 - Mar. 2022', en: 'Mar 2017 - Mar 2022' },
      highlights: [
        {
          es: 'Di soporte y mantenimiento a procesos financieros críticos en AS/400 (RPG), garantizando la integridad de los datos y la continuidad operativa.',
          en: 'Provided support and maintenance for critical financial processes on AS/400 (RPG), ensuring data integrity and banking operational continuity.',
        },
        {
          es: 'Supervisé y optimicé canales de pago electrónico y servicios de recaudación, asegurando tiempos de respuesta óptimos en sistemas transaccionales.',
          en: 'Supervised and optimized electronic payment channels and collection services, securing optimal response times in high-availability transactional systems.',
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
