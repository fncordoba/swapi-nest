import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";

import axios from "axios";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Movie)
    private repository: Repository<Movie>,
  ) {}

  async fetchAllMoviesFromSwapi(): Promise<any> {
    const apiUrl = 'https://swapi.dev/api/films';
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movies from SWAPI: ${error.message}`);
    }
  }

  async create(movie: Movie): Promise<Movie> {
    return await this.repository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    await this.repository.update(id, movie);
    return await this.repository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}