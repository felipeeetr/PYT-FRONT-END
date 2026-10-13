import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SITE_INFO } from '../../models/site-info';

// Página /contacto: formulario reactivo con validaciones y datos de contacto del periódico.
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  private readonly fb = inject(FormBuilder);

  // Datos de contacto del periódico (misma fuente que el footer).
  readonly contactInfo = SITE_INFO;
  // Controla la visibilidad del mensaje de éxito.
  enviado = false;

  // Formulario reactivo con las validaciones de cada campo.
  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Valida el formulario y simula el envío del mensaje.
  onSubmit(): void {
    this.enviado = false;
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    this.enviado = true;
    this.formulario.reset();
  }
}
