import { Routes } from '@angular/router';
import { Menu } from './menu/menu';

export const routes: Routes = [
  { path: '', component: Menu },  // Home page

  /* ──────────── Corsi ──────────── */
  {
    path: 'corsi',
    loadComponent: () =>
      import('./corsi/corsi').then(m => m.Corsi)
  },

  /* ──────────── Docenti ──────────── */
  {
    path: 'docenti',
    children: [
      {                                         // 1) lista  /docenti
        path: '',
        loadComponent: () =>
          import('./docenti/docenti').then(m => m.Docenti)
      },
      {                                         // 2) nuovo  /docenti/nuovo
        path: 'nuovo',
        loadComponent: () =>
          import('./new-docenti/new-docenti').then(m => m.NewDocenti)
      },
      {                                         // 3) modifica /docenti/:id
        path: ':id',
        loadComponent: () =>
          import('./new-docenti/new-docenti').then(m => m.NewDocenti)
      }
    ]
  },

  /* ──────────── Discenti ──────────── */
  {
    path: 'discenti',
    children: [
      {                                         // 1) lista  /discenti
        path: '',
        loadComponent: () =>
          import('./discenti/discenti').then(m => m.Discenti)
      },
      {                                         // 2) nuovo  /discenti/nuovo
        path: 'nuovo',
        loadComponent: () =>
          import('./new-discenti/new-discenti').then(m => m.NewDiscenti)
      },
      {                                         // 3) modifica /discenti/:id
        path: ':id',
        loadComponent: () =>
          import('./new-discenti/new-discenti').then(m => m.NewDiscenti)
      }
    ]
  },

  /* ──────────── Fallback ──────────── */
  { path: '**', redirectTo: '' }
];
