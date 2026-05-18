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
      role: { es: 'Frontend Developer', en: 'Frontend Developer' },
      company: 'Magnetic',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2025 - Mar. 2026', en: 'Mar 2025 - Mar 2026' },
      highlights: [
        {
          es: 'Ejecuté la migración estratégica de módulos heredados hacia una arquitectura basada en Angular 19, reduciendo la deuda técnica en un 20% y facilitando la escalabilidad del producto.',
          en: 'Executed the strategic migration of legacy modules toward an Angular 19 architecture, reducing technical debt by 20% and improving product scalability.',
        },
        {
          es: 'Optimicé el rendimiento de la plataforma refactorizando flujos de datos complejos con RxJS y Redux, eliminando cuellos de botella en el manejo de estados asíncronos.',
          en: 'Optimized platform performance by refactoring complex data streams with RxJS and Redux, eliminating bottlenecks in asynchronous state management.',
        },
        {
          es: 'Diseñé e integré módulos basados en IA generativa para la automatización de procesos internos, reduciendo el tiempo operativo en tareas administrativas.',
          en: 'Designed and integrated modules based on Generative AI for internal process automation, reducing operational time in administrative tasks.',
        },
        {
          es: 'Desarrollé interfaces de alta fidelidad con Tailwind CSS para asegurar una experiencia de usuario consistente, integrando Posthog para la toma de decisiones basadas en datos.',
          en: 'Developed high-fidelity interfaces using Tailwind CSS to ensure a consistent user experience, integrating Posthog for data-driven decisions.',
        },
      ],
    },
    {
      role: { es: 'Frontend Developer', en: 'Frontend Developer' },
      company: 'Tikket',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2024 - Mar. 2025', en: 'Mar 2024 - Mar 2025' },
      highlights: [
        {
          es: 'Desarrollé y optimicé componentes de interfaz reutilizables con el ecosistema de JavaScript y TypeScript, asegurando la consistencia visual de la plataforma.',
          en: 'Developed and optimized reusable user interface components using the JavaScript and TypeScript ecosystem, ensuring the platform\'s visual consistency.',
        },
        {
          es: 'Colaboré con equipos de diseño y producto para transformar maquetas y requerimientos funcionales en aplicaciones web interactivas de alto rendimiento.',
          en: 'Collaborated with design and product teams to transform wireframes and functional requirements into high-performance interactive web applications.',
        },
        {
          es: 'Implementé buenas prácticas de desarrollo frontend, garantizando la compatibilidad entre navegadores y un diseño responsivo fluido.',
          en: 'Implemented frontend development best practices, guaranteeing cross-browser compatibility and fluid responsive design.',
        },
      ],
    },
    {
      role: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
      company: 'Fibex',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2022 - Mar. 2024', en: 'Mar 2022 - Mar 2024' },
      highlights: [
        {
          es: 'Ejecuté el ciclo de vida completo de la app de streaming para Roku (BrightScript) y Android TV, digitalizando el servicio de TV para miles de suscriptores.',
          en: 'Executed the full development lifecycle of the streaming application for Roku (BrightScript) and Android TV, digitizing TV services for thousands of subscribers.',
        },
        {
          es: 'Diseñé y desplegué aplicaciones móviles multiplataforma con Flutter e Ionic, integrando geolocalización y pasarelas de pago para optimizar la gestión en campo.',
          en: 'Designed and deployed cross-platform mobile applications using Flutter and Ionic, integrating geolocation services and payment gateways to optimize field operations.',
        },
        {
          es: 'Desarrollé y mantuve APIs robustas en Node.js y PHP, asegurando integridad, velocidad y seguridad en la comunicación entre sistemas core e interfaces finales.',
          en: 'Developed and maintained robust APIs in Node.js and PHP, ensuring data integrity, speed, and security in communication between core systems and front-end interfaces.',
        },
      ],
    },
    {
      role: { es: 'Analista de Tecnología', en: 'Technology Analyst' },
      company: 'Banco del Tesoro',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2017 - Mar. 2022', en: 'Mar 2017 - Mar 2022' },
      highlights: [
        {
          es: 'Proporcioné soporte técnico y mantenimiento crítico a los procesos financieros del sistema core bancario mediante AS/400 (RPG), garantizando la integridad de los datos y la continuidad operativa.',
          en: 'Provided technical support and critical maintenance for financial processes within the core banking system using AS/400 (RPG), guaranteeing data integrity and operational continuity.',
        },
        {
          es: 'Supervisé y optimicé los servicios de recaudación y canales de pago electrónico, asegurando niveles óptimos de respuesta en sistemas transaccionales de alta disponibilidad.',
          en: 'Monitored and optimized collection services and electronic payment channels, ensuring optimal response times in high-availability transactional systems.',
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
