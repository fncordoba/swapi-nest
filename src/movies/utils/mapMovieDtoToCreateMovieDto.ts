import { CreateMovieDto } from "../dto/create-movie.dto";
import { MovieDto } from "../dto/fetch-movie.dto";


export function mapMovieDtoToCreateMovieDto(movieData: MovieDto): CreateMovieDto {
  return {
    title: movieData.title,
    episodeId: movieData.episode_id,
    openingCrawl: movieData.opening_crawl,
    director: movieData.director,
    producer: movieData.producer,
    releaseDate: movieData.release_date,
    characters: movieData.characters,
    planets: movieData.planets,
    starships: movieData.starships,
    vehicles: movieData.vehicles,
    species: movieData.species,
  };
}
