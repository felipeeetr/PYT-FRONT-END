import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// Registra el idioma español (Colombia) para que pipes como DatePipe muestren fechas en español.
registerLocaleData(localeEsCo);

// Configuración global de la app.
// Aquí se activan los manejadores de errores del navegador, se registra el sistema de rutas
// (volviendo al inicio de la página en cada navegación) y se define el idioma por defecto.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
};
