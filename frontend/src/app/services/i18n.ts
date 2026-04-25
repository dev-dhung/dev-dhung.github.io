import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly STORAGE_KEY = 'portfolio-lang';
  readonly lang = signal<Lang>(this.getInitialLang());
  readonly isEs = computed(() => this.lang() === 'es');

  private readonly translations: Record<string, Record<Lang, string>> = {
    'nav.about': { es: 'Sobre Mí', en: 'About' },
    'nav.services': { es: 'Servicios', en: 'Services' },
    'nav.projects': { es: 'Proyectos', en: 'Projects' },
    'nav.tech': { es: 'Tecnologías', en: 'Technologies' },
    'nav.experience': { es: 'Experiencia', en: 'Experience' },
    'nav.contact': { es: 'Contacto', en: 'Contact' },

    'hero.greeting': { es: 'Hola, soy', en: "Hi, I'm" },
    'hero.title': {
      es: 'Senior Frontend Engineer | Especialista en Angular & React | AI Implementation',
      en: 'Senior Frontend Engineer | Angular & React Specialist | AI Implementation',
    },
    'hero.cta': { es: 'Contáctame', en: 'Get in Touch' },
    'hero.cv': { es: 'Descargar CV', en: 'Download CV' },

    'about.title': { es: 'Sobre Mí', en: 'About Me' },
    'about.subtitle': { es: 'Un poco de mi camino', en: 'A bit about my journey' },
    'about.p1': {
      es: 'Ingeniero de Sistemas y Desarrollador Frontend con sólida trayectoria en el ecosistema de Angular (12-19) y React. Especializado en la arquitectura de interfaces de alto rendimiento y la gestión de estados complejos mediante RxJS y Redux.',
      en: 'Systems Engineer and Frontend Developer with a solid track record in the Angular (12-19) and React ecosystems. Specialized in high-performance interface architecture and complex state management using RxJS and Redux.',
    },
    'about.p2': {
      es: 'He liderado con éxito la modernización de sistemas core y la digitalización de procesos administrativos, logrando soluciones escalables que impactan a miles de usuarios. Mi enfoque técnico integral combina el desarrollo móvil con Flutter/Ionic, la implementación de servicios en Node.js y la integración de IA Generativa para la optimización de flujos de trabajo.',
      en: 'I have successfully led the modernization of core systems and the digitization of administrative processes, achieving scalable solutions that impact thousands of users. My comprehensive technical approach combines mobile development with Flutter/Ionic, the implementation of services in Node.js, and the integration of Generative AI for workflow optimization.',
    },
    'about.p3': {
      es: 'Me motiva la búsqueda de la excelencia técnica y la creación de productos digitales que aporten valor real a través de un código limpio y eficiente. Fuera del código profesional, canalizo mi creatividad a través de Dhung Labs, mi sello personal para el desarrollo de videojuegos indie.',
      en: 'I am driven by the pursuit of technical excellence and the creation of digital products that deliver real value through clean, efficient code. Outside of professional work, I channel my creativity through Dhung Labs, my personal brand for indie game development.',
    },
    'about.stack': { es: 'Stack Principal', en: 'Core Stack' },

    'services.title': { es: 'Servicios', en: 'Services' },
    'services.subtitle': { es: 'Lo que puedo hacer por ti', en: 'What I can do for you' },
    'services.web.title': { es: 'Desarrollo Web Frontend', en: 'Frontend Web Development' },
    'services.web.desc': {
      es: 'Aplicaciones web modernas y escalables con Angular, RxJS y NgRx. Interfaces rápidas, accesibles y optimizadas.',
      en: 'Modern, scalable web applications with Angular, RxJS, and NgRx. Fast, accessible, and optimized interfaces.',
    },
    'services.spa.title': { es: 'Single Page Applications', en: 'Single Page Applications' },
    'services.spa.desc': {
      es: 'SPAs con navegación fluida, gestión de estado avanzada y experiencia de usuario excepcional.',
      en: 'SPAs with smooth navigation, advanced state management, and exceptional user experience.',
    },
    'services.mobile.title': { es: 'Desarrollo Móvil', en: 'Mobile Development' },
    'services.mobile.desc': {
      es: 'Apps móviles multiplataforma con Flutter e Ionic. Aplicando patrones reactivos para mantener la calidad del entorno web.',
      en: 'Cross-platform mobile apps with Flutter and Ionic. Applying reactive patterns to maintain web environment quality.',
    },
    'services.api.title': { es: 'Integración de APIs', en: 'API Integration' },
    'services.api.desc': {
      es: 'Conexión eficiente con servicios backend, APIs REST y manejo reactivo de datos con RxJS.',
      en: 'Efficient backend service connectivity, REST APIs, and reactive data handling with RxJS.',
    },
    'services.perf.title': { es: 'Optimización de Rendimiento', en: 'Performance Optimization' },
    'services.perf.desc': {
      es: 'Auditorías de rendimiento, lazy loading, estrategias de change detection y mejoras de Core Web Vitals.',
      en: 'Performance audits, lazy loading, change detection strategies, and Core Web Vitals improvements.',
    },
    'services.consult.title': { es: 'Consultoría Técnica', en: 'Technical Consulting' },
    'services.consult.desc': {
      es: 'Asesoramiento en arquitectura de aplicaciones Angular, migración de versiones y mejores prácticas.',
      en: 'Guidance on Angular application architecture, version migration, and best practices.',
    },

    'projects.title': { es: 'Proyectos', en: 'Projects' },
    'projects.subtitle': { es: 'En lo que estoy trabajando y lo que viene', en: "What I'm working on and what's next" },
    'projects.coming': { es: 'Próximamente', en: 'Coming Soon' },
    'projects.apps.title': { es: 'Web & Apps', en: 'Web & Apps' },
    'projects.apps.desc': {
      es: 'Aplicaciones web y móviles con Angular, Ionic y más. Proyectos profesionales y personales.',
      en: 'Web and mobile applications with Angular, Ionic, and more. Professional and personal projects.',
    },
    'projects.labs.title': { es: 'Dhung Labs', en: 'Dhung Labs' },
    'projects.labs.desc': {
      es: 'Construyendo lo que imaginamos. Videojuegos indie desarrollados con Unity bajo mi sello personal.',
      en: 'Building what we imagine. Indie games developed with Unity under my personal brand.',
    },

    'experience.title': { es: 'Experiencia', en: 'Experience' },
    'experience.subtitle': { es: 'Mi trayectoria profesional', en: 'My professional journey' },

    'tech.title': { es: 'Stack Tecnológico', en: 'Tech Stack' },
    'tech.subtitle': { es: 'Herramientas con las que trabajo', en: 'Tools I work with' },
    'tech.frontend': { es: 'Frontend', en: 'Frontend' },
    'tech.mobile': { es: 'Mobile', en: 'Mobile' },
    'tech.backend': { es: 'Backend & IA', en: 'Backend & AI' },
    'tech.databases': { es: 'Bases de Datos', en: 'Databases' },
    'tech.tools': { es: 'Herramientas', en: 'Tools' },
    'tech.learning': { es: 'Explorando', en: 'Exploring' },

    'contact.title': { es: 'Contacto', en: 'Contact' },
    'contact.subtitle': { es: '¿Tienes un proyecto en mente? Hablemos', en: "Have a project in mind? Let's talk" },
    'contact.name': { es: 'Nombre', en: 'Name' },
    'contact.email': { es: 'Correo electrónico', en: 'Email' },
    'contact.message': { es: 'Mensaje', en: 'Message' },
    'contact.send': { es: 'Enviar mensaje', en: 'Send message' },
    'contact.sending': { es: 'Enviando...', en: 'Sending...' },
    'contact.success': { es: '¡Mensaje enviado! Te responderé pronto.', en: "Message sent! I'll get back to you soon." },
    'contact.error': { es: 'Hubo un error. Intenta nuevamente.', en: 'Something went wrong. Please try again.' },
    'contact.name.placeholder': { es: 'Tu nombre', en: 'Your name' },
    'contact.email.placeholder': { es: 'tu@email.com', en: 'you@email.com' },
    'contact.message.placeholder': { es: 'Cuéntame sobre tu proyecto...', en: 'Tell me about your project...' },

    'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  };

  toggle(): void {
    const next: Lang = this.isEs() ? 'en' : 'es';
    this.lang.set(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }

  t(key: string): string {
    return this.translations[key]?.[this.lang()] ?? key;
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Lang | null;
    if (stored) return stored;
    return navigator.language.startsWith('es') ? 'es' : 'en';
  }
}
