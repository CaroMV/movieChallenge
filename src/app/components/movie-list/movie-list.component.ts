import { Component } from '@angular/core';
import { MovieConsultService } from '../../movie-consult.service';
import { Movie } from '../../interfaces/interfaces';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: Movie[] | undefined;
  constructor(private readonly movieService: MovieConsultService) {}

  ngOnInit(): void {
    this.movieService.getMovies(1).subscribe((res)=>{
      this.movies = res
    })
  }
}
