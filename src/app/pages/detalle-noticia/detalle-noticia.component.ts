import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

// Página /detalle-noticia/:id: muestra el contenido completo de una noticia.
// Lee el parámetro :id de la URL y permite agregarla o quitarla de favoritos.
@Component({
  selector: 'app-detalle-noticia',
  imports: [RouterLink, DatePipe],
  templateUrl: './detalle-noticia.component.html',
  styleUrl: './detalle-noticia.component.css',
})
export class DetalleNoticiaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly noticiasService = inject(NoticiasService);

  // Noticia que se muestra (undefined si el :id no existe).
  noticia?: Noticia;
  // Estado del botón de favoritos.
  isFavorite = false;

  // Se suscribe a los parámetros de la ruta para cargar la noticia cuando cambia el :id.
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.noticia = this.noticiasService.getById(id);
      this.isFavorite = this.noticia ? this.noticiasService.isFavorito(this.noticia.id) : false;
    });
  }

  // Agrega o quita la noticia actual de favoritos.
  toggleFavorite(): void {
    if (!this.noticia) {
      return;
    }

    this.isFavorite = this.noticiasService.toggleFavorito(this.noticia.id);
  }
}
