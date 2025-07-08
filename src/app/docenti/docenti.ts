import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Docente } from '../models/docente.model';
import { Academy } from '../services/academy';

@Component({
  selector: 'app-discenti',
  standalone: true,
  templateUrl: './docenti.html',
  styleUrls: ['./docenti.css'],
  imports: [CommonModule, RouterModule]
})

export class Docenti implements OnInit {
  docenti = signal<Docente[]>([]);
  loading = false;
  error: string | null = null;

  private readonly router = inject(Router);

  constructor(private academy: Academy) {}

  ngOnInit(): void {
  console.log('[INIT] Discenti inizializzato');

  this.academy.getDocenti().subscribe({
    next: list => {
      console.log('[RESPONSE]', list); // 👈 questo è cruciale
      this.docenti.set(list);
      this.loading = false;
    },
    error: err => {
      console.error('[ERRORE HTTP]', err);
      this.error = err.message;
      this.loading = false;
    }
  });
}


  modifica(id: number): void {
    this.router.navigate(['docenti', id]);
  }

  elimina(id: number): void {
  if (!confirm('Sei sicuro di voler eliminare questo docente?')) return;

  this.academy.deleteDocente(id).subscribe({
    next: () => {
      this.docenti.set(this.docenti().filter(d => d.id !== id));
    },
    error: err => console.error(err)
  });
}

} 