import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIAS, CategoriaNoticia, Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

// Patrón que exige al menos un carácter que no sea espacio (evita campos llenos solo de espacios).
const NO_SOLO_ESPACIOS = /\S/;

// Página /gestionar-noticias: formulario reactivo para crear noticias y lista para eliminarlas.
@Component({
  selector: 'app-gestionar-noticias',
  imports: [ReactiveFormsModule],
  templateUrl: './gestionar-noticias.component.html',
  styleUrl: './gestionar-noticias.component.css',
})
export class GestionarNoticiasComponent {
  private readonly fb = inject(FormBuilder);
  private readonly noticiasService = inject(NoticiasService);

  // Opciones del <select> de categoría.
  readonly categorias = CATEGORIAS;
  // Noticias que se muestran en la lista lateral.
  noticias: Noticia[] = this.noticiasService.getAll();
  // Controla la visibilidad del mensaje de éxito tras guardar.
  guardada = false;

  // Formulario reactivo con las validaciones de cada campo.
  formulario = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.pattern(NO_SOLO_ESPACIOS)]],
    categoria: ['Educación' as CategoriaNoticia, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    contenido: ['', [Validators.required, Validators.minLength(50)]],
    autor: ['', [Validators.required, Validators.pattern(NO_SOLO_ESPACIOS)]],
    imagen: ['', [Validators.required, Validators.pattern(/^https?:\/\/\S+$/)]],
    destacado: [false],
  });

  // Indica si un campo debe mostrar su mensaje de error (se usa en el template con @if y [class.invalid]).
  esInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.touched && control.invalid;
  }

  // Valida el formulario y, si es correcto, crea la noticia y limpia los campos.
  guardarNoticia(): void {
    this.guardada = false;
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    const valores = this.formulario.getRawValue();
    this.noticiasService.addNoticia({
      ...valores,
      titulo: valores.titulo.trim(),
      descripcion: valores.descripcion.trim(),
      contenido: valores.contenido.trim(),
      autor: valores.autor.trim(),
    });
    this.noticias = this.noticiasService.getAll();
    this.formulario.reset();
    this.guardada = true;
  }

  // Pide confirmación y elimina la noticia seleccionada.
  eliminarNoticia(noticia: Noticia): void {
    if (!confirm(`¿Eliminar la noticia "${noticia.titulo}"?`)) {
      return;
    }

    this.noticiasService.deleteNoticia(noticia.id);
    this.noticias = this.noticiasService.getAll();
  }
}
