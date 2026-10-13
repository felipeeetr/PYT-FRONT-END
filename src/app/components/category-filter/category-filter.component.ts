import { Component, EventEmitter, Input, Output } from '@angular/core';

// Botones de filtro por categoría.
// Implementa two-way binding propio: el padre lo usa como [(seleccionada)]="categoriaSeleccionada",
// que Angular traduce a [seleccionada]="..." (@Input) + (seleccionadaChange)="..." (@Output).
@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent {
  // Lista de categorías que se muestran como botones.
  @Input() categorias: readonly string[] = [];

  // Categoría activa que recibe del padre.
  @Input() seleccionada = '';

  // El sufijo "Change" es lo que permite usar la sintaxis [( )] en el padre.
  @Output() seleccionadaChange = new EventEmitter<string>();

  // Actualiza la categoría activa y avisa al padre.
  seleccionar(categoria: string): void {
    this.seleccionada = categoria;
    this.seleccionadaChange.emit(categoria);
  }
}
