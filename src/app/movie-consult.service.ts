import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenresList, Movie } from './interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieConsultService {
  private readonly api_key = '070815a753ef2b84fbc641bb67a7a65b';
  private readonly urlAPI = 'https://api.themoviedb.org/3';
  //orden
  // private readonly orderParam = ['popularity.desc', 'popularity.desc', 'popularity.asc', 'revenue.desc', 'revenue.asc', 'primary_release_date.desc', 'primary_release_date.asc', 'vote_average.desc', 'vote_average.asc', 'vote_count.desc', 'vote_count.asc'];
  constructor(private readonly http: HttpClient) {}

  // MODIFIQUE EL SERVICIO PARA OBTENER LAS FILSM 
  getMovies(page: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.api_key).set('page', page.toString());
    
    return this.http.get<any>(`${this.urlAPI}/discover/movie`, { params })
      .pipe(map((response: any) => {
        return { movies: response.results || [], total_pages: response.total_pages };
        // ACÁ EN VEZ DE SOLO OBTENER RESPONSE.RESULTS, OBTENGO TOTAL_PAGES
      }));
  }
  

  getMovieDetails(movieid: number) : Observable<Movie> {
    return this.http.get<Movie>(`${this.urlAPI}/movie/${movieid}?api_key=${this.api_key}`);
  }

  getAllGenres(): Observable<GenresList> {
    return this.http.get<GenresList>(`${this.urlAPI}/genre/movie/list?api_key=${this.api_key}`)
  }

  getGenreFilter(page: number, genreId: string, selectedSort: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        api_key: this.api_key,
        page: page.toString(),
        with_genres: genreId,
        sort_by: selectedSort
      }
    });
  
    return this.http.get<any>(`${this.urlAPI}discover/movie`, { params });
  }
}
