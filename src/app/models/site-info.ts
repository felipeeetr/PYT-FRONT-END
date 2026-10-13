// Elemento del menú de navegación principal.
export interface NavItem {
  label: string;
  path: string;
}

// Datos generales del sitio (marca y contacto).
export interface SiteInfo {
  nombre: string;
  eslogan: string;
  ciudad: string;
  email: string;
  telefono: string;
  sedes: string[];
}

// Única fuente de verdad para la marca y los datos de contacto.
// El componente raíz la envía al header y al footer mediante @Input, y la página de Contacto la reutiliza.
export const SITE_INFO: SiteInfo = {
  nombre: 'NotiWeb',
  eslogan: 'Plataforma de noticias',
  ciudad: 'Bogotá, Colombia',
  email: 'contacto@notiweb.com',
  telefono: '+57 300 000 0000',
  sedes: ['Bogotá, Colombia', 'Medellín, Colombia'],
};

// Enlaces del menú principal, compartidos por el header y el footer.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Noticias', path: '/noticias' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Contacto', path: '/contacto' },
  { label: 'Gestión', path: '/gestionar-noticias' },
];
