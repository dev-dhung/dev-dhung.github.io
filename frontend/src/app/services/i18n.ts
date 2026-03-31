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
    'nav.contact': { es: 'Contacto', en: 'Contact' },

    'hero.greeting': { es: 'Hola, soy', en: "Hi, I'm" },
    'hero.title': { es: 'Frontend Developer', en: 'Frontend Developer' },
    'hero.cta': { es: 'Contáctame', en: 'Get in Touch' },
    'hero.cv': { es: 'Ver CV', en: 'View CV' },

    'about.title': { es: 'Sobre Mí', en: 'About Me' },
    'about.subtitle': { es: 'Un poco de mi camino', en: 'A bit about my journey' },
    'about.p1': {
      es: 'Ingeniero Frontend con experiencia transformando requisitos complejos en soluciones robustas y escalables dentro del ecosistema Angular. Mi trayectoria combina una sólida base en tecnologías de servidor (Node, MySQL) con una especialización avanzada en el lado del cliente, lo que me otorga una visión integral del ciclo de vida del software.',
      en: 'Frontend Engineer with experience transforming complex requirements into robust, scalable solutions within the Angular ecosystem. My background combines a solid foundation in server-side technologies (Node, MySQL) with advanced client-side specialization, giving me a comprehensive view of the software lifecycle.',
    },
    'about.p2': {
      es: 'Actualmente, lidero la modernización de arquitecturas de alto rendimiento y la integración de Inteligencia Artificial Generativa para la automatización de flujos de trabajo.',
      en: 'Currently, I lead the modernization of high-performance architectures and the integration of Generative Artificial Intelligence for workflow automation.',
    },
    'about.p3': {
      es: 'Experto en gestión de estados complejos con RxJS y Redux. Fuera del código profesional, canalizo mi creatividad a través de DHung Labs, mi sello personal para el desarrollo de videojuegos indie.',
      en: 'Expert in complex state management with RxJS and Redux. Outside of professional work, I channel my creativity through DHung Labs, my personal brand for indie game development.',
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
      es: 'Apps móviles multiplataforma con Ionic y React Native. Llevando la experiencia web al bolsillo de tus usuarios.',
      en: "Cross-platform mobile apps with Ionic and React Native. Bringing the web experience to your users' pockets.",
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
    'projects.web.title': { es: 'Aplicaciones Web', en: 'Web Applications' },
    'projects.web.desc': {
      es: 'Proyectos frontend con Angular, arquitecturas escalables y experiencias de usuario cuidadas.',
      en: 'Frontend projects with Angular, scalable architectures, and polished user experiences.',
    },
    'projects.mobile.title': { es: 'Apps Móviles', en: 'Mobile Apps' },
    'projects.mobile.desc': {
      es: 'Explorando el desarrollo móvil multiplataforma con Ionic y React Native.',
      en: 'Exploring cross-platform mobile development with Ionic and React Native.',
    },
    'projects.games.title': { es: 'DHung Labs', en: 'DHung Labs' },
    'projects.games.desc': {
      es: 'Ideas que cobran vida, un pixel a la vez. Videojuegos indie desarrollados con Unity bajo mi sello personal.',
      en: 'Ideas come alive, one pixel at a time. Indie games developed with Unity under my personal brand.',
    },

    'tech.title': { es: 'Stack Tecnológico', en: 'Tech Stack' },
    'tech.subtitle': { es: 'Herramientas con las que trabajo', en: 'Tools I work with' },
    'tech.frontend': { es: 'Frontend', en: 'Frontend' },
    'tech.backend': { es: 'Backend', en: 'Backend' },
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
