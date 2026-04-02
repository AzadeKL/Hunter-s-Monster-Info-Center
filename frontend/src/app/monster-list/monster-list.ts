import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster-list.html',
  styleUrl: './monster-list.css'
})
export class MonsterListComponent {
  @Input() isAdmin = false;

  monsters = [
    {
      name: 'Rathalos',
      tags: 'Flying Wyvern',
      sources: 'MH World'
    },
    {
      name: 'Nergigante',
      tags: 'Elder Dragon',
      sources: 'MH World'
    }
  ];
}