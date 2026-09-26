import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-noticia.component.html',
  styleUrl: './detalle-noticia.component.css',
})
export class DetalleNoticiaComponent implements OnInit {
  noticia?: Noticia;
  isFavorite = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly noticiasService: NoticiasService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.noticia = this.noticiasService.getById(id);

      if (this.noticia) {
        this.isFavorite = this.noticiasService.isFavorito(this.noticia.id);
      }
    });
  }

  toggleFavorite(): void {
    if (!this.noticia) {
      return;
    }

    this.isFavorite = this.noticiasService.toggleFavorito(this.noticia.id);
  }
}
