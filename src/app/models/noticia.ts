// Lista única de categorías del periódico.
// Se reutiliza en los filtros de Noticias y en el formulario de Gestión para que nunca se desincronicen.
export const CATEGORIAS = ['Educación', 'Tecnología', 'Turismo', 'Comercio', 'General'] as const;

// Tipo de categorías que pueden tener las noticias del periódico (derivado de CATEGORIAS).
export type CategoriaNoticia = (typeof CATEGORIAS)[number];

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
