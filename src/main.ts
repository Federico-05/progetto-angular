import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';  // Questo è corretto
import { AppComponent } from './app/app';  // Corretto il percorso

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
