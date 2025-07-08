import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, Navbar, Footer, Menu]  // Assicurati che il Footer sia importato qui
})
export class AppComponent {
  title = 'angular-frontend';
  isHomePage = false;

  constructor(private router: Router) {
    // Ascolta i cambiamenti di rotta
    this.router.events.subscribe(event => {
      // Verifica se l'evento è NavigationEnd, che significa che la rotta è stata cambiata
      if (event instanceof NavigationEnd) {
        // Imposta 'isHomePage' su true se la rotta è la home, altrimenti su false
        this.isHomePage = this.router.url === '/';
      }
    });
  }
}
