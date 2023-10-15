import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";

import axios from "axios";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MoviesResponseDto } from "./dto/fetch-movie.dto";
import { mapMovieDtoToCreateMovieDto } from "./utils/mapMovieDtoToCreateMovieDto";

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private repository: Repository<Movie>,
  ) {}

  public async fetchAllMoviesFromSwapi(): Promise<any> {
    const apiUrl = 'https://swapi.dev/api/films';
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movies from SWAPI: ${error.message}`);
    }
  }

  public async create(movie: CreateMovieDto): Promise<Movie> {
    const created = this.repository.create(movie)
    return await this.repository.save(created).catch(
      (error) => {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    );
  }

  public async findAll(): Promise<Movie[]> {
    return await this.repository.find().catch(
      (error) => {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    );
  }

  public async findOne(id: number): Promise<Movie> {
    return await this.repository.findOne({ where: { id } }).catch(
      (error) => {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    );
  }

  public async update(id: number, movie: Movie): Promise<Movie> {
    await this.repository.update(id, movie);
    return await this.repository.findOne({ where: { id } }).catch(
      (error) => {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    );
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete(id).catch(
      (error) => {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    );
  }

  public async findOneByName(name: string): Promise<Movie> {
    let movie = await this.repository.findOne({ where: { title: name } });
  
    if (!movie) {
      // Buscar todas las películas en SWAPI
      const allMovies: MoviesResponseDto = await this.fetchAllMoviesFromSwapi();
  
      // Buscar la película por nombre en los resultados de SWAPI
      const movieData = allMovies.results.find(movie => movie.title === name);
      
      if (movieData) {
        const mapDataForCreateMovie: CreateMovieDto = mapMovieDtoToCreateMovieDto(movieData);
        movie = await this.create(mapDataForCreateMovie);  

        return movie;
      } else {
        throw new Error(`Movie with title "${name}" not found`);
      }
    }
    return movie;
  }
}