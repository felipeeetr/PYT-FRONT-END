import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../../models/noticia';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-gestionar-noticias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestionar-noticias.component.html',
  styleUrl: './gestionar-noticias.component.css',
})
export class GestionarNoticiasComponent {
  noticias: Noticia[] = [];
  formulario: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly noticiasService: NoticiasService,
  ) {
    this.noticias = this.noticiasService.getAll();
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['Educación', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      contenido: ['', [Validators.required, Validators.minLength(50)]],
      autor: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      destacado: [false],
    });
  }

  guardarNoticia(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    this.noticiasService.addNoticia(this.formulario.value as Partial<Noticia>);
    this.noticias = this.noticiasService.getAll();
    this.formulario.reset({
      categoria: 'Educación',
      destacado: false,
    });
  }

  eliminarNoticia(id: number): void {
    this.noticiasService.deleteNoticia(id);
    this.noticias = this.noticiasService.getAll();
  }
}
