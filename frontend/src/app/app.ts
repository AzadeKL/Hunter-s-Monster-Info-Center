import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 👈 THIS is the important part
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isAdmin = false;

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
}