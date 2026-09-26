import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent {
  @Input() noticia!: Noticia;

  constructor(private readonly noticiasService: NoticiasService) {}

  get isFavorite(): boolean {
    return this.noticiasService.isFavorito(this.noticia.id);
  }

  toggleFavorito(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.noticiasService.toggleFavorito(this.noticia.id);
  }
}
