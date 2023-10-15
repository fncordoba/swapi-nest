import { IsString, IsInt, IsArray, IsDate, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MovieDto {
  @IsString()
  title: string;

  @IsInt()
  episode_id: number;

  @IsString()
  opening_crawl: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsDate()
  release_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  characters: string[];

  @IsArray()
  @ValidateNested({ each: true })
  planets: string[];


  @IsArray()
  @ValidateNested({ each: true })
  starships: string[];


  @IsArray()
  @ValidateNested({ each: true })
  vehicles: string[];


  @IsArray()
  @ValidateNested({ each: true })
  species: string[];


  @IsDate()
  created: Date;

  @IsDate()
  edited: Date;

  @IsUrl()
  url: string;
}

export class MoviesResponseDto {
  @IsInt()
  count: number;

  @IsString({ each: true })
  next: string | null;

  @IsString({ each: true })
  previous: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovieDto)
  results: MovieDto[];
}

