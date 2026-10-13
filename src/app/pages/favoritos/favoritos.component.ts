import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

// Página /favoritos: muestra las noticias que el usuario guardó.
// Escucha el @Output (favoritoCambiado) de cada tarjeta para refrescar la lista al quitar un favorito.
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, NewsCardComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
})
export class FavoritosComponent {
  private readonly noticiasService = inject(NoticiasService);

  // Noticias marcadas como favoritas.
  noticias: Noticia[] = this.noticiasService.getFavoritos();

  // Vuelve a leer los favoritos guardados (se llama cuando una tarjeta emite favoritoCambiado).
  actualizarLista(): void {
    this.noticias = this.noticiasService.getFavoritos();
  }
}
