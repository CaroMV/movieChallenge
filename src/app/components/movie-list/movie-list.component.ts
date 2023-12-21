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
  // Como estoy teniendo problemas para implementar la paginación, vamos a comentar
  // Primero debo generar una propiedad para gestionar la paginación
  currentPage = 1; // acá vamos a almacenar la pagina actual
  totalPages = 0 //
  // NECESITO TENER UN TOTAL PAGES ASI QUE TENGO QUE MODIFICAR EL SERVICIO PARA OBTENER ESTA INFO
  constructor(private readonly movieService: MovieConsultService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies(this.currentPage).subscribe(
      (res) => {
        console.log('Respuesta cargada por loadMovies(): ', res);
        this.movies = res.movies;
        this.totalPages = res.total_pages;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }
  
  getReleaseYear(releaseDate: string): string {
    return releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
  }
}
