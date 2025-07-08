import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Discente } from '../models/discente.model';
import { Academy } from '../services/academy';

@Component({
  selector: 'app-discenti',
  standalone: true,
  templateUrl: './discenti.html',
  styleUrls: ['./discenti.css'],
  imports: [CommonModule, RouterModule]
})

export class Discenti implements OnInit {
  //discenti: Discente[] = [];
  discenti = signal<Discente[]>([]);
  loading = true;
  error: string | null = null;

  private readonly router = inject(Router);

  constructor(private academy: Academy) {}

  ngOnInit(): void {
  console.log('[INIT] Discenti inizializzato');

  this.academy.getDiscenti().subscribe({
    next: list => {
      console.log('[RESPONSE]', list); // 👈 questo è cruciale
      this.discenti.set(list);
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
    this.router.navigate(['discenti', id]);
  }

  elimina(id: number): void {
  if (!confirm('Sei sicuro di voler eliminare questo discente?')) return;

  this.academy.deleteDiscente(id).subscribe({
    next: () => {
      // Aggiorna il signal rimuovendo il discente con l'id specificato
      this.discenti.set(this.discenti().filter(d => d.id !== id));
    },
    error: err => console.error(err)
  });
}

} 