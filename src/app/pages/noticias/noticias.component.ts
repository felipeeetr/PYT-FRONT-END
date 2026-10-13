import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { CATEGORIAS, Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';
import { normalizarTexto } from '../../utils/texto';

// Página /noticias: listado completo con filtro por categoría y buscador.
// Acepta ?categoria=Educación en la URL para abrir el listado ya filtrado.
@Component({
  selector: 'app-noticias',
  imports: [FormsModule, NewsCardComponent, CategoryFilterComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent implements OnInit {
  private readonly noticiasService = inject(NoticiasService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  // Todas las noticias disponibles (se filtran en noticiasFiltradas).
  noticias: Noticia[] = this.noticiasService.getAll();
  // Opciones del filtro: 'Todas' más las categorías del modelo.
  categorias: readonly string[] = ['Todas', ...CATEGORIAS];
  // Enlazada al filtro con two-way binding [(seleccionada)].
  categoriaSeleccionada = 'Todas';
  // Enlazado al buscador con two-way binding [(ngModel)].
  searchTerm = '';

  // Escucha el parámetro ?categoria de la URL. Se usa una suscripción (y no un snapshot) porque
  // Angular reutiliza este componente al pasar de /noticias?categoria=X a /noticias.
  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const categoria = params.get('categoria');
      this.categoriaSeleccionada =
        categoria && this.categorias.includes(categoria) ? categoria : 'Todas';
      // Los componentes son OnPush por defecto: se marca la vista para que refleje el cambio.
      this.cdr.markForCheck();
    });
  }

  // Noticias que cumplen la categoría seleccionada y el texto de búsqueda.
  get noticiasFiltradas(): Noticia[] {
    const termino = normalizarTexto(this.searchTerm.trim());

    return this.noticias.filter((noticia) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' || noticia.categoria === this.categoriaSeleccionada;
      const coincideBusqueda =
        !termino ||
        normalizarTexto(noticia.titulo).includes(termino) ||
        normalizarTexto(noticia.descripcion).includes(termino) ||
        normalizarTexto(noticia.categoria).includes(termino);

      return coincideCategoria && coincideBusqueda;
    });
  }

  // Restablece la búsqueda y la categoría.
  limpiarFiltros(): void {
    this.searchTerm = '';
    this.categoriaSeleccionada = 'Todas';
  }
}
