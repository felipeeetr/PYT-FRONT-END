import { Injectable } from '@angular/core';
import { CategoriaNoticia, Noticia } from '../models/noticia';

// Servicio central del proyecto.
// Aquí se guardan, consultan y gestionan las noticias y los favoritos del periódico.
@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private readonly storageKey = 'periodico_noticias';
  private readonly favoritesKey = 'periodico_favoritos';
  private noticias: Noticia[] = [];

  constructor() {
    this.noticias = this.loadInitialData();
  }

  // Carga las noticias desde localStorage o crea la base inicial si no existe ningún dato.
  private loadInitialData(): Noticia[] {
    const savedNews = this.getStorageValue<Noticia[]>(this.storageKey);

    if (savedNews && savedNews.length > 0) {
      return savedNews;
    }

    const initialNews: Noticia[] = [
      {
        id: 1,
        titulo: 'La educación se reinventa con IA aplicada al aula',
        descripcion: 'Plataformas inteligentes están transformando la experiencia de aprendizaje.',
        contenido:
          'Las instituciones educativas están incorporando herramientas de inteligencia artificial para personalizar contenidos, apoyar la evaluación y crear rutas de aprendizaje adaptativas. La innovación no sustituye al docente, pero sí amplía las posibilidades de acompañamiento y seguimiento del progreso estudiantil.',
        categoria: 'Educación',
        fecha: '2026-09-13',
        autor: 'María López',
        imagen:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
        destacado: true,
      },
      {
        id: 2,
        titulo: 'Nuevas aplicaciones para viajar sin fricción',
        descripcion: 'La tecnología mejora la organización de viajes y la experiencia del turista.',
        contenido:
          'Destinos, reservas y recorridos turísticos están integrándose en experiencias más fluidas para viajeros que buscan una planificación sencilla. Desde inteligencia artificial en itinerarios hasta apps para recorridos urbanos, la experiencia del turismo avanza con un enfoque más personalizado.',
        categoria: 'Turismo',
        fecha: '2026-09-10',
        autor: 'Daniel Ruiz',
        imagen:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
        destacado: true,
      },
      {
        id: 3,
        titulo: 'El comercio local fortalece su presencia digital',
        descripcion: 'Pequeños negocios impulsan estrategias en plataformas digitales para crecer.',
        contenido:
          'Micronegocios y comercios vecinales están apostando por canales digitales para ampliar su alcance, fortalecer la relación con clientes y mejorar la visibilidad de sus productos. La venta online y la presencia en redes sociales ya forman parte del modelo comercial de muchas ciudades.',
        categoria: 'Comercio',
        fecha: '2026-09-08',
        autor: 'Ana Torres',
        imagen:
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
        destacado: true,
      },
      {
        id: 4,
        titulo: 'Tecnología sostenible gana terreno en Startups',
        descripcion: 'Las empresas buscan soluciones en energías limpias y uso eficiente de datos.',
        contenido:
          'Los equipos emergentes están enfocándose en productos con menor impacto ambiental, optimizando recursos y desarrollando soluciones con visión de largo plazo. La innovación se combina con sostenibilidad y eficiencia para abrir nuevos modelos de negocio.',
        categoria: 'Tecnología',
        fecha: '2026-09-05',
        autor: 'Carlos Vega',
        imagen:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
        destacado: false,
      },
      {
        id: 5,
        titulo: 'Programas de mentoría fortalecen el talento estudiantil',
        descripcion: 'Un enfoque cercano ayuda a estudiantes a desarrollar habilidades profesionales.',
        contenido:
          'Las experiencias de mentoría conectan a jóvenes con profesionales de la industria y fomentan el desarrollo de competencias clave. Estos programas permiten un acompañamiento más cercano, orientado a la práctica y a la construcción de redes laborales.',
        categoria: 'Educación',
        fecha: '2026-09-02',
        autor: 'Lucía Moreno',
        imagen:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        destacado: false,
      },
      {
        id: 6,
        titulo: 'Ciudades inteligentes orientan la movilidad sostenible',
        descripcion: 'Tecnología y planificación urbana avanzan hacia modelos más sostenibles.',
        contenido:
          'La integración de sensores, análisis de tráfico y soluciones basadas en datos permite mejorar la experiencia urbana. Las ciudades inteligentes trabajan para ordenar el tránsito, reducir tiempos y construir entornos más amigables para la comunidad.',
        categoria: 'Tecnología',
        fecha: '2026-08-29',
        autor: 'Sofía Peña',
        imagen:
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80',
        destacado: false,
      },
    ];

    this.saveToStorage(this.storageKey, initialNews);
    return initialNews;
  }

  // Devuelve todas las noticias disponibles.
  getAll(): Noticia[] {
    return [...this.noticias];
  }

  // Retorna las noticias destacadas para la página principal.
  getFeatured(): Noticia[] {
    return this.getAll().filter((noticia) => noticia.destacado).slice(0, 3);
  }

  // Busca una noticia por su ID para mostrar el detalle.
  getById(id: number): Noticia | undefined {
    return this.getAll().find((noticia) => noticia.id === id);
  }

  // Obtiene la lista de noticias marcadas como favoritas.
  getFavoritos(): Noticia[] {
    const favoritos = this.getStorageValue<number[]>(this.favoritesKey) ?? [];
    return this.getAll().filter((noticia) => favoritos.includes(noticia.id));
  }

  // Verifica si una noticia está marcada como favorita.
  isFavorito(id: number): boolean {
    const favoritos = this.getStorageValue<number[]>(this.favoritesKey) ?? [];
    return favoritos.includes(id);
  }

  // Agrega o elimina una noticia de favoritos.
  toggleFavorito(id: number): boolean {
    const favoritos = this.getStorageValue<number[]>(this.favoritesKey) ?? [];
    const isSaved = favoritos.includes(id);

    const next = isSaved ? favoritos.filter((favoritoId) => favoritoId !== id) : [...favoritos, id];
    this.saveToStorage(this.favoritesKey, next);

    return !isSaved;
  }

  // Agrega una nueva noticia a la lista y la guarda en memoria local.
  addNoticia(noticia: Partial<Noticia>): Noticia {
    const nuevaNoticia: Noticia = {
      id: Date.now(),
      titulo: noticia.titulo ?? 'Nueva noticia',
      descripcion: noticia.descripcion ?? 'Sin descripción disponible.',
      contenido: noticia.contenido ?? 'Sin contenido adicional.',
      categoria: (noticia.categoria as CategoriaNoticia) ?? 'General',
      fecha: noticia.fecha ?? new Date().toISOString().slice(0, 10),
      autor: noticia.autor ?? 'Equipo editorial',
      imagen:
        noticia.imagen ??
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80',
      destacado: noticia.destacado ?? false,
    };

    this.noticias = [nuevaNoticia, ...this.noticias];
    this.saveToStorage(this.storageKey, this.noticias);
    return nuevaNoticia;
  }

  // Elimina una noticia y limpia también su ID de favoritos si existía.
  deleteNoticia(id: number): void {
    this.noticias = this.noticias.filter((noticia) => noticia.id !== id);
    this.saveToStorage(this.storageKey, this.noticias);

    const favoritos = this.getStorageValue<number[]>(this.favoritesKey) ?? [];
    const nextFavorites = favoritos.filter((favoritoId) => favoritoId !== id);
    this.saveToStorage(this.favoritesKey, nextFavorites);
  }

  // Lee información almacenada en localStorage.
  private getStorageValue<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  // Guarda datos en localStorage para persistencia entre recargas.
  private saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
