import { Component } from '@angular/core';
import { MonsterListComponent } from './monster-list/monster-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MonsterListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isAdmin = false;

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
}