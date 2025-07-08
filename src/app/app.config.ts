import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Importa provideHttpClient
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),    // Gestione degli errori globali
    provideZonelessChangeDetection(),        // Rilevamento dei cambiamenti senza zone
    provideRouter(routes),                   // Configura il router
    provideHttpClient()                      // Aggiungi HttpClient per poter usare le chiamate HTTP
  ]
};
