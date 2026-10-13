import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleNoticiaComponent } from './pages/detalle-noticia/detalle-noticia.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { GestionarNoticiasComponent } from './pages/gestionar-noticias/gestionar-noticias.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

// Definición de todas las rutas de la aplicación.
// Cada path indica qué componente se muestra cuando el usuario navega a una URL específica,
// y title define el texto de la pestaña del navegador.
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | NotiWeb' },
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias | NotiWeb' },
  { path: 'detalle-noticia/:id', component: DetalleNoticiaComponent, title: 'Detalle | NotiWeb' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Favoritos | NotiWeb' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto | NotiWeb' },
  {
    path: 'gestionar-noticias',
    component: GestionarNoticiasComponent,
    title: 'Gestión | NotiWeb',
  },
  { path: '**', redirectTo: '' },
];
