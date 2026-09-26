import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, NewsCardComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent {
  noticias: Noticia[] = [];
  categoriaSeleccionada = 'Todas';
  categorias = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];
  searchTerm = '';

  constructor(private readonly noticiasService: NoticiasService) {
    this.noticias = this.noticiasService.getAll();
  }

  get noticiasFiltradas(): Noticia[] {
    const termino = this.searchTerm.trim().toLowerCase();

    const filtradas = this.noticias.filter((noticia) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' || noticia.categoria === this.categoriaSeleccionada;
      const coincideBusqueda =
        !termino ||
        noticia.titulo.toLowerCase().includes(termino) ||
        noticia.descripcion.toLowerCase().includes(termino) ||
        noticia.categoria.toLowerCase().includes(termino);

      return coincideCategoria && coincideBusqueda;
    });

    return filtradas;
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }
}
