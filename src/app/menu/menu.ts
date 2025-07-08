import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']  // Corretto qui!
})
export class Menu {}
