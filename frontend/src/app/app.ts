import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Services } from './components/services/services';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { TechStack } from './components/tech-stack/tech-stack';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, About, Services, Experience, Projects, TechStack, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly theme = inject(ThemeService);

  protected readonly bgClass = computed(() =>
    this.theme.isDark()
      ? 'bg-dark-bg text-dark-text'
      : 'bg-light-bg text-light-text',
  );
}
