import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

// Componente raíz de la aplicación.
// Aquí se cargan los elementos globales de la página, como el encabezado y el pie de página.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
