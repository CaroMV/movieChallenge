import { Component, OnInit  } from '@angular/core';
import { MovieConsultService } from '../../movie-consult.service';
import { Movie } from '../../interfaces/interfaces';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private readonly movieService: MovieConsultService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies(1).subscribe(
      (res) => {
        console.log(res); // Verifica qué está devolviendo la API
        this.movies = res;
      },
      (error) => {
        console.error(error); // Muestra cualquier error en la consola
      }
    );
  }
  
  getReleaseYear(releaseDate: string): string {
    return releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
  }
}