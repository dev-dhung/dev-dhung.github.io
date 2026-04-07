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
      period: { es: 'Mar. 2024 - Mar. 2026', en: 'Mar 2024 - Mar 2026' },
      highlights: [
        {
          es: 'Lideré el rediseño y migración de módulos legacy hacia una arquitectura escalable, garantizando compatibilidad entre versiones.',
          en: 'Led the redesign and migration of legacy modules toward a scalable architecture, ensuring cross-version compatibility.',
        },
        {
          es: 'Refactorización integral de lógica asíncrona y flujos de datos complejos con RxJS y Redux, eliminando cuellos de botella.',
          en: 'Comprehensive refactoring of asynchronous logic and complex data flows using RxJS and Redux, eliminating bottlenecks.',
        },
        {
          es: 'Integración de módulos con APIs externas, incluyendo Posthog para rastreo estratégico de eventos y análisis del comportamiento del usuario.',
          en: 'Integrated modules with external APIs, including Posthog for strategic event tracking and user behavior analysis.',
        },
        {
          es: 'Diseño de módulos basados en IA Generativa, automatizando procesos críticos y personalizando la experiencia del usuario.',
          en: 'Designed Generative AI-based modules, automating critical processes and personalizing the user experience.',
        },
      ],
    },
    {
      role: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' },
      company: 'Fibex Telecom',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2022 - Mar. 2024', en: 'Mar 2022 - Mar 2024' },
      highlights: [
        {
          es: 'Lideré el ciclo de vida completo de la app móvil "Fibex Oficina Móvil" con Ionic y Angular, digitalizando servicios para miles de usuarios.',
          en: 'Led the full lifecycle of the "Fibex Oficina Móvil" mobile app using Ionic and Angular, digitalizing services for thousands of users.',
        },
        {
          es: 'Desarrollo de soluciones de streaming para TV Digital: aplicaciones para Roku (BrightScript) y Android TV (Kotlin/Java).',
          en: 'Developed streaming solutions for Digital TV: applications for Roku (BrightScript) and Android TV (Kotlin/Java).',
        },
        {
          es: 'Diseño del sitio web corporativo y mantenimiento de servicios internos con React, PHP y Java.',
          en: 'Designed the corporate website and maintained internal services using React, PHP, and Java.',
        },
      ],
    },
    {
      role: { es: 'Especialista de Procesos Tecnológicos II', en: 'Technology Process Specialist II' },
      company: 'Banco del Tesoro',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2017 - Mar. 2022', en: 'Mar 2017 - Mar 2022' },
      highlights: [
        {
          es: 'Gestión de Core Bancario: ejecución y supervisión de cierres bancarios diarios mediante AS/400 (RPG), garantizando la integridad de la data financiera.',
          en: 'Core Banking Management: executed and supervised daily banking closes using AS/400 (RPG), ensuring financial data integrity.',
        },
        {
          es: 'Monitoreo de alta disponibilidad de servicios críticos de recaudación y pagos (SENIAT, IGTF, Movilnet).',
          en: 'High availability monitoring of critical collection and payment services (SENIAT, IGTF, Movilnet).',
        },
        {
          es: 'Control preventivo de infraestructura crítica en Data Center y soporte a canales electrónicos bancarios.',
          en: 'Preventive control of critical Data Center infrastructure and support for electronic banking channels.',
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
