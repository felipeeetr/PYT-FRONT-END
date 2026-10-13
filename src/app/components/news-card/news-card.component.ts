import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { normalizarTexto } from '../../utils/texto';

// Evento que la tarjeta envía al componente padre cuando cambia un favorito.
export interface FavoritoCambio {
  id: number;
  favorito: boolean;
}

// Tarjeta reutilizable que muestra el resumen de una noticia.
// Se usa en Inicio, Noticias y Favoritos: el padre le envía la noticia (@Input)
// y la tarjeta le avisa al padre cuando el usuario marca o quita un favorito (@Output).
@Component({
  selector: 'app-news-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent {
  private readonly noticiasService = inject(NoticiasService);

  // @Input: el padre pasa la noticia con property binding -> [noticia]="noticia".
  @Input({ required: true }) noticia!: Noticia;

  // @Output: comunicación hijo -> padre con event binding -> (favoritoCambiado)="...".
  @Output() favoritoCambiado = new EventEmitter<FavoritoCambio>();

  // Indica si la noticia está guardada en favoritos (se usa en class binding y attribute binding).
  get isFavorite(): boolean {
    return this.noticiasService.isFavorito(this.noticia.id);
  }

  // Clase CSS según la categoría, para colorear la etiqueta (class binding).
  get categoriaClass(): string {
    return 'cat-' + normalizarTexto(this.noticia.categoria);
  }

  // Marca o desmarca la noticia como favorita y notifica al componente padre.
  toggleFavorito(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const favorito = this.noticiasService.toggleFavorito(this.noticia.id);
    this.favoritoCambiado.emit({ id: this.noticia.id, favorito });
  }
}
