import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- importa CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,           // se usi standalone component
  imports: [CommonModule],    // <--- qui lo importi
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  clicked = false;

  onClick() {
    this.clicked = true;
  }
}
