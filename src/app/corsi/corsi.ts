import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Corso } from '../models/corso.model';
import { Academy } from '../services/academy';

@Component({
  selector: 'app-corsi',
  standalone: true,
  templateUrl: './corsi.html',
  styleUrls: ['./corsi.css'],
  imports: [CommonModule, RouterModule]
})
export class Corsi implements OnInit {
  corsi = signal<Corso[]>([]);  // Array dei corsi
  loading = false;              // Stato di caricamento
  error: string | null = null;  // Messaggio di errore

  private readonly router = inject(Router);

  constructor(private academy: Academy) {}

  ngOnInit(): void {
    console.log('[INIT] Corsi inizializzato');

    this.loading = true;  // Inizializza come true per avviare il caricamento

    // Chiamata per ottenere la lista dei corsi
    this.academy.getCorsi().subscribe({
      next: list => {
        console.log('[RESPONSE]', list);  // Mostra la risposta
        this.corsi.set(list);  // Imposta i corsi ricevuti
        this.loading = false;  // Termina il caricamento
      },
      error: err => {
        console.error('[ERRORE HTTP]', err);  // Logga l'errore
        this.error = err.message;  // Mostra il messaggio di errore
        this.loading = false;      // Termina il caricamento
      }
    });
  }

  // Funzione per modificare un corso
  modifica(id: number): void {
    this.router.navigate(['corsi', id]);  // Naviga alla pagina di modifica del corso
  }

  // Funzione per eliminare un corso
  elimina(id: number): void {
    if (!confirm('Sei sicuro di voler eliminare questo corso?')) return;

    this.academy.deleteCorso(id).subscribe({
      next: () => {
        // Rimuove il corso dalla lista
        this.corsi.set(this.corsi().filter(c => c.id !== id));
      },
      error: err => console.error(err)  // Logga eventuali errori
    });
  }
}
