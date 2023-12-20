// movie-card.component.ts

import { Component, Input , OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent {
  @Input() backdropPath: string | null = '';
  @Input() title: string | undefined;
  @Input() year: string | undefined;

  get backgroundUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500'; 
    return this.backdropPath ? `${baseUrl}/${this.backdropPath}` : '';
  }
}
