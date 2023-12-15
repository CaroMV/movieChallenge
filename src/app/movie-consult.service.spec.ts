import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieConsultService } from './movie-consult.service';

//mocks
const randomMovieListMock = [
  {
    "adult": false,
    "backdrop_path": "/backdrop_path_1.jpg",
    "genre_ids": [16, 28, 12],
    "id": 123456,
    "original_language": "en",
    "original_title": "Random Movie 1",
    "overview": "A brief overview of Random Movie 1.",
    "popularity": 789.123,
    "poster_path": "/poster_path_1.jpg",
    "release_date": "2023-12-15",
    "title": "Random Movie 1",
    "video": false,
    "vote_average": 8.5,
    "vote_count": 456
  },
  {
    "adult": false,
    "backdrop_path": "/backdrop_path_20.jpg",
    "genre_ids": [14, 35, 10751],
    "id": 987654,
    "original_language": "es",
    "original_title": "Película Aleatoria 20",
    "overview": "Una breve descripción de Película Aleatoria 20.",
    "popularity": 123.456,
    "poster_path": "/poster_path_20.jpg",
    "release_date": "2023-11-01",
    "title": "Película Aleatoria 20",
    "video": false,
    "vote_average": 7.2,
    "vote_count": 654
  }
];

const randomMovieDetails = {
  "adult": false,
  "backdrop_path": "/backdrop_path_random.jpg",
  "genre_ids": [14, 27, 53],
  "id": 987654,
  "original_language": "es",
  "original_title": "Película Aleatoria",
  "overview": "Una descripción emocionante de la Película Aleatoria con giros inesperados y momentos de suspenso.",
  "popularity": 456.789,
  "poster_path": "/poster_path_random.jpg",
  "release_date": "2023-11-30",
  "title": "Película Aleatoria",
  "video": false,
  "vote_average": 8.9,
  "vote_count": 321
};
const mockMovieId = 893723;

const randomGenresList = {
  "genres": [
    {
      "id": 123,
      "name": "Epic"
    },
    {
      "id": 456,
      "name": "Superhero"
    },
    {
      "id": 789,
      "name": "Magical Realism"
    },
    {
      "id": 101,
      "name": "Sci-Fi Comedy"
    },
    {
      "id": 202,
      "name": "Historical Fantasy"
    },
    {
      "id": 303,
      "name": "Adventure Comedy"
    },
    {
      "id": 404,
      "name": "Neo-Noir"
    },
    {
      "id": 505,
      "name": "Animated Musical"
    },
    {
      "id": 606,
      "name": "Space Opera"
    },
    {
      "id": 707,
      "name": "Mystery Thriller"
    },
    {
      "id": 808,
      "name": "Romantic Comedy"
    },
    {
      "id": 909,
      "name": "Action Drama"
    },
    {
      "id": 1010,
      "name": "Psychological Horror"
    },
    {
      "id": 1111,
      "name": "Family Adventure"
    },
    {
      "id": 1212,
      "name": "Post-Apocalyptic"
    },
    {
      "id": 1313,
      "name": "Political Documentary"
    },
    {
      "id": 1414,
      "name": "Cyberpunk"
    },
    {
      "id": 1515,
      "name": "Sports Drama"
    },
    {
      "id": 1616,
      "name": "Spy Thriller"
    },
    {
      "id": 1717,
      "name": "Wild West Comedy"
    }
  ]
};
const mockPage1 = 1;
const mockGenreId1 = '16';
const mockSelectedSort1 = 'popularity.desc';

describe('MovieConsultService', () => {
  let service: MovieConsultService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieConsultService],
    });

    service = TestBed.inject(MovieConsultService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of movies', () => {
    const page = 1;
    const mockMovies = randomMovieListMock;

    service.getMovies(page).subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpTestingController.expectOne(`${service['urlAPI']}/discover/movie?page=${page}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockMovies);
  });

  it('should get details of a movie', () => {
    const movieId = mockMovieId;
    const mockMovieDetails = randomMovieDetails;

    service.getMovieDetails(movieId).subscribe((movieDetails) => {
      expect(movieDetails).toEqual(mockMovieDetails);
    });

    const req = httpTestingController.expectOne(`${service['urlAPI']}/movie/${movieId}?api_key=${service['api_key']}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockMovieDetails);
  });

  it('should get a list of genres', () => {
    const mockGenresListResponse = randomGenresList;

    service.getAllGenres().subscribe((genresList) => {
      expect(genresList).toEqual(mockGenresListResponse);
    });

    const req = httpTestingController.expectOne(`${service['urlAPI']}/genre/movie/list?api_key=${service['api_key']}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockGenresListResponse);
  });

  it('should get filtered movies by genre and sort', () => {
    const page = mockPage1;
    const genreId = mockGenreId1;
    const selectedSort = mockSelectedSort1;
    const mockFilteredMovies = randomMovieListMock;

    service.getGenreFilter(page, genreId, selectedSort).subscribe((filteredMovies) => {
      expect(filteredMovies).toEqual(mockFilteredMovies);
    });

    const req = httpTestingController.expectOne(
      `${service['urlAPI']}discover/movie?api_key=${service['api_key']}&page=${page}&with_genres=${genreId}&sort_by=${selectedSort}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockFilteredMovies);
  });
});
