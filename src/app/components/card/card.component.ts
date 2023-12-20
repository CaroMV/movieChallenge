// movie-card.component.ts

import { Component, Input , OnInit} from '@angular/core';
import { Movie } from '../../interfaces/interfaces'; 

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent {
  @Input() backgroundImg!: string | null;
  @Input() title!: string;
  @Input() year!: string;
  backgroundUrl!: string;
}
