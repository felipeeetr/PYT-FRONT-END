// Tipo de categorías que pueden tener las noticias del periódico.
export type CategoriaNoticia = 'Educación' | 'Tecnología' | 'Turismo' | 'Comercio' | 'General';

// Estructura principal de una noticia.
// Sirve para definir qué información debe tener cada artículo del portal.
export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  categoria: CategoriaNoticia;
  fecha: string;
  autor: string;
  imagen: string;
  destacado: boolean;
}
