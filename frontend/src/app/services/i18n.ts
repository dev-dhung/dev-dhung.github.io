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
      es: 'Desarrollador Fullstack | IA Generativa · Construyendo productos digitales escalables',
      en: 'Fullstack Developer | Generative AI · Building scalable digital products',
    },
    'hero.cta': { es: 'Contáctame', en: 'Get in Touch' },
    'hero.cv': { es: 'Descargar CV', en: 'Download CV' },

    'about.title': { es: 'Sobre Mí', en: 'About Me' },
    'about.subtitle': { es: 'Un poco de mi camino', en: 'A bit about my journey' },
    'about.p1': {
      es: 'Mi enfoque se centra en transformar requerimientos complejos en productos digitales que no solo funcionen, sino que sean fáciles de mantener y escalar. Priorizo la arquitectura limpia y el rendimiento, asegurando que cada solución técnica contribuya a la estabilidad del sistema a largo plazo.',
      en: 'My focus centers on transforming complex requirements into digital products that not only work but are also easy to maintain and scale. I prioritize clean architecture and performance, ensuring that every technical solution contributes to long-term system stability.',
    },
    'about.p2': {
      es: 'He trabajado en entornos de alta demanda, desde telecomunicaciones hasta el desarrollo de aplicaciones móviles, lo que me ha dado una visión integral para resolver problemas desde múltiples ángulos. Mi flujo de trabajo integra herramientas de IA generativa, lo que me permite optimizar los ciclos de desarrollo y elevar el estándar de entrega sin comprometer la calidad del código.',
      en: 'I have worked in high-demand environments—ranging from telecommunications to mobile application development—giving me an end-to-end vision to solve technical problems from multiple angles. My workflow integrates Generative AI tools, allowing me to optimize development cycles and raise delivery standards without compromising code quality.',
    },
    'about.p3': {
      es: 'Fuera del código profesional, canalizo mi creatividad a través de DH Studios, mi sello personal para el desarrollo de videojuegos indie, donde combino la disciplina del software con la narrativa interactiva.',
      en: 'Outside of professional code, I channel my creativity through DH Studios, my personal brand for indie game development, where I combine software discipline with interactive storytelling.',
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
    'projects.featured': { es: 'Destacado', en: 'Featured' },
    'projects.visitSite': { es: 'Visitar sitio', en: 'Visit site' },
    'projects.apps.title': { es: 'Web & Apps', en: 'Web & Apps' },
    'projects.apps.desc': {
      es: 'Aplicaciones web y móviles con Angular, Ionic y más. Proyectos profesionales y personales.',
      en: 'Web and mobile applications with Angular, Ionic, and more. Professional and personal projects.',
    },
    'projects.labs.title': { es: 'DH Studios', en: 'DH Studios' },
    'projects.labs.desc': {
      es: 'Creatividad impulsada por sistemas. Videojuegos indie con Unity bajo mi sello personal.',
      en: 'Systems Driven Creativity. Indie games with Unity under my personal brand.',
    },
    'studios.slogan': {
      es: 'Creatividad impulsada por sistemas',
      en: 'Systems Driven Creativity',
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
