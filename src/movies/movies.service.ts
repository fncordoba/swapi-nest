import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository
  ) {}
  public create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(
      createMovieDto
    );
  }

  public findAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  public findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne(id);
  }

  public findOneByName(name: string): Promise<Movie> {
    const title = this.normalizeTitle(name);
    return this.movieRepository.findOneByName(title);
  }

  public async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id);
    const updatedMovie = Object.assign(movie, updateMovieDto);
    return this.movieRepository.update(id, updatedMovie);
  }

  public remove(id: number): Promise<void> {
    return this.movieRepository.remove(id);
  }

  private capitalizeWords(input: string): string {
    const exclusions = ['of', 'the', 'and', 'in', 'on', 'at', 'by', 'for', 'with'];
  
    return input
      .split(' ')
      .map(word => {
        if (exclusions.includes(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  
  private normalizeTitle(input: string): string {
    let title = input;
  
    title = title.toLowerCase();
  
    title = title.trim();

    title = title.replace(/\s+/g, ' ');
  
    title = this.capitalizeWords(title);
  
    return title;
  }
}
