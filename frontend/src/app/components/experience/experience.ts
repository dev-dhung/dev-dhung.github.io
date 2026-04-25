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
      role: { es: 'Frontend Engineer | Angular & AI Implementation', en: 'Frontend Engineer | Angular & AI Implementation' },
      company: 'Magnetic',
      location: { es: 'Remoto', en: 'Remote' },
      period: { es: 'Mar. 2024 - Mar. 2026', en: 'Mar 2024 - Mar 2026' },
      highlights: [
        {
          es: 'Lideré la migración estratégica de módulos legacy hacia Angular 19, reduciendo la deuda técnica en un 20% y facilitando la escalabilidad del producto.',
          en: 'Led the strategic migration of legacy modules to Angular 19, reducing technical debt by 20% and facilitating product scalability.',
        },
        {
          es: 'Optimicé el rendimiento refactorizando flujos de datos complejos con RxJS y Redux, eliminando cuellos de botella en estados asíncronos.',
          en: 'Optimized performance by refactoring complex data flows with RxJS and Redux, eliminating bottlenecks in asynchronous state management.',
        },
        {
          es: 'Arquitecté e integré módulos de IA Generativa, automatizando procesos internos y mejorando la precisión del sistema.',
          en: 'Architected and integrated Generative AI modules, automating internal processes and improving system accuracy.',
        },
        {
          es: 'Desarrollé interfaces de alta fidelidad con Tailwind CSS e integré Posthog para telemetría y decisiones basadas en datos.',
          en: 'Developed high-fidelity interfaces with Tailwind CSS and integrated Posthog for telemetry and data-driven decisions.',
        },
      ],
    },
    {
      role: { es: 'Software Developer (Fullstack & Mobile)', en: 'Software Developer (Fullstack & Mobile)' },
      company: 'Fibex Telecom',
      location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      period: { es: 'Mar. 2022 - Mar. 2024', en: 'Mar 2022 - Mar 2024' },
      highlights: [
        {
          es: 'Lideré el ciclo de vida completo de la app de streaming para Roku (BrightScript) y Android TV, digitalizando el servicio de TV para miles de suscriptores.',
          en: 'Led the complete lifecycle of the streaming app for Roku (BrightScript) and Android TV, digitizing the TV service for thousands of subscribers.',
        },
        {
          es: 'Diseñé y desplegué apps móviles multiplataforma con Flutter e Ionic, integrando geolocalización y pasarelas de pago.',
          en: 'Designed and deployed cross-platform mobile apps using Flutter and Ionic, integrating geolocation and payment gateways.',
        },
        {
          es: 'Desarrollé y mantuve APIs robustas en Node.js y PHP, asegurando la integridad de comunicación entre sistemas core e interfaces de usuario.',
          en: 'Developed and maintained robust APIs in Node.js and PHP, ensuring communication integrity between core systems and user interfaces.',
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
          es: 'Soporte y mantenimiento de procesos financieros críticos mediante AS/400 (RPG), garantizando la integridad de la data y la continuidad operativa.',
          en: 'Support and maintenance of critical financial processes using AS/400 (RPG), ensuring data integrity and operational continuity.',
        },
        {
          es: 'Supervisión de servicios de recaudación y pagos electrónicos de alta disponibilidad, asegurando niveles óptimos de respuesta para miles de clientes.',
          en: 'Monitoring of high-availability electronic collection and payment services, ensuring optimal response levels for thousands of clients.',
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
