import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import {
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Academy }  from '../services/academy';
import { Discente }  from '../models/discente.model';

@Component({
  standalone: true,
  selector: 'app-new-discenti',
  templateUrl: './new-discenti.html',
  styleUrls: ['./new-discenti.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule ]
})
export class NewDiscenti implements OnInit {
  /* ───────────── DI ───────────── */
  private fb      = inject(NonNullableFormBuilder);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private academy = inject(Academy);

  /* ─────────── Stato ──────────── */
  id?: number;          // presente solo in edit
  isEdit = false;
  submitted = false;    // usato nel template

  /* ─────────── Form ───────────── */
  form = this.fb.group({
    nome:    this.fb.control('', Validators.required),
    cognome: this.fb.control('', Validators.required),
    eta: this.fb.control(0, Validators.required),  // imposto un valore predefinito di 0
    cittaResidenza: this.fb.control('', Validators.required),
  });

  get f() { return this.form.controls; }   // alias per il template

  /* ─────────── Lifecycle ──────── */
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param !== null) {
      this.id = Number(param);
      this.isEdit = true;

      /* carica il record da modificare */
      this.academy.getDiscente(this.id).subscribe({
        next : discente => this.form.patchValue(discente),
        error: err     => console.error(err)
      });
    }
  }

  /* ─────── Submit (POST / PUT) ─── */
  onSave(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    // Aggiungiamo l'ID solo se siamo in modalità modifica
    const dto: Discente = {
      id: this.isEdit ? this.id! : 0,  // Usa l'id esistente in caso di modifica, altrimenti 0 per una nuova creazione
      ...formValue
    };

    if (this.isEdit && this.id !== undefined) {
      /* --------- UPDATE --------- */
      this.academy.updateDiscente(this.id, dto).subscribe({
        next : ()   => this.router.navigate(['discenti']),
        error: err  => console.error(err)
      });

    } else {
      /* --------- CREATE --------- */
      this.academy.createDiscente(dto).subscribe({
        next : ()   => this.router.navigate(['discenti']),
        error: err  => console.error(err)
      });
    }
  }
}
