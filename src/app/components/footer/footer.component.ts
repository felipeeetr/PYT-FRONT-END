import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem, SiteInfo } from '../../models/site-info';

// Pie de página global: descripción del periódico, enlaces y datos de contacto.
// Recibe la misma información que el header desde el componente raíz (App) mediante @Input.
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Datos de la marca y de contacto.
  @Input({ required: true }) siteInfo!: SiteInfo;

  // Enlaces de las secciones del sitio.
  @Input() navItems: NavItem[] = [];

  // Año actual para el aviso de copyright.
  readonly anioActual = new Date().getFullYear();
}
