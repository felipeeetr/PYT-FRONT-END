// Pasa un texto a minúsculas y le quita las tildes ("Educación" -> "educacion").
// Se usa en el buscador de noticias y para generar clases CSS por categoría.
export function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}
