import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, NewsCardComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
})
export class FavoritosComponent {
  noticias: Noticia[] = [];

  constructor(private readonly noticiasService: NoticiasService) {
    this.noticias = this.noticiasService.getFavoritos();
  }

  actualizarLista(): void {
    this.noticias = this.noticiasService.getFavoritos();
  }
}
