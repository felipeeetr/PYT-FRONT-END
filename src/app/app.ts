import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NAV_ITEMS, SITE_INFO } from './models/site-info';

// Componente raíz de la aplicación.
// Aquí se cargan los elementos globales de la página, como el encabezado y el pie de página,
// y se les envían los datos del sitio mediante property binding hacia sus @Input.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // Datos de marca y contacto que se envían al header y al footer.
  readonly siteInfo = SITE_INFO;
  // Enlaces del menú compartidos por el header y el footer.
  readonly navItems = NAV_ITEMS;
}
