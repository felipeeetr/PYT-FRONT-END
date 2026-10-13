import { Component, Input, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem, SiteInfo } from '../../models/site-info';

// Encabezado global: fecha actual, marca y menú de navegación.
// Recibe los datos desde el componente raíz (App) mediante @Input.
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy {
  // Datos de la marca (nombre, eslogan, ciudad).
  @Input({ required: true }) siteInfo!: SiteInfo;

  // Enlaces del menú principal.
  @Input() navItems: NavItem[] = [];

  // Signal: al llamar a set() Angular actualiza la vista aunque el cambio venga de un setInterval.
  readonly currentDate = signal(this.getCurrentDate());
  private readonly timerId = window.setInterval(() => {
    this.currentDate.set(this.getCurrentDate());
  }, 60000);

  // Detiene el temporizador cuando el componente se destruye.
  ngOnDestroy(): void {
    window.clearInterval(this.timerId);
  }

  // Devuelve la fecha actual en español, por ejemplo "martes, 13 de octubre de 2026".
  private getCurrentDate(): string {
    return new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  }
}
