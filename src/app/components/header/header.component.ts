import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy {
  navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Noticias', path: '/noticias' },
    { label: 'Favoritos', path: '/favoritos' },
    { label: 'Contacto', path: '/contacto' },
    { label: 'Gestión', path: '/gestionar-noticias' },
  ];

  currentDate = this.getCurrentDate();
  private timerId?: number;

  constructor() {
    this.timerId = window.setInterval(() => {
      this.currentDate = this.getCurrentDate();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  private getCurrentDate(): string {
    return new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  }
}
