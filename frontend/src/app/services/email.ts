import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor() {
    emailjs.init(environment.emailjs.publicKey);
  }

  send(form: ContactForm): Observable<unknown> {
    return from(
      emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: 'Diego Hung',
      }),
    );
  }
}
