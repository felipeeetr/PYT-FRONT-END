import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

// Página de inicio (/): portada con la noticia principal, las destacadas y las más recientes.
@Component({
  selector: 'app-home',
  imports: [RouterLink, NewsCardComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly noticiasService = inject(NoticiasService);

  // Hasta 3 noticias marcadas como destacadas.
  featured: Noticia[] = this.noticiasService.getFeatured();
  // Las 4 noticias más recientes.
  latestNews: Noticia[] = this.noticiasService.getAll().slice(0, 4);

  // Noticia de portada: la primera destacada o, si no hay, la más reciente.
  principal: Noticia | undefined = this.featured[0] ?? this.latestNews[0];
}
