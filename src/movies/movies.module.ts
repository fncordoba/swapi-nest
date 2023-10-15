import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieRepository } from './movies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    AuthModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository]
})
export class MoviesModule {}
