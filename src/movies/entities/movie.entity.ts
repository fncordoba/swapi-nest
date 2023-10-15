import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { IsInt, IsString, IsDate, IsArray, IsUrl,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the movie' })
  @IsString()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'The episode number of the movie' })
  @IsInt()
  @Column({ type: 'int' })
  episodeId: number;

  @ApiProperty({ description: 'The opening crawl text of the movie' })
  @IsString()
  @Column({ type: 'text' })
  openingCrawl: string;

  @ApiProperty({ description: 'The director of the movie' })
  @IsString()
  @Column({ type: 'varchar', length: 255 })
  director: string;

  @ApiProperty({ description: 'The producer(s) of the movie' })
  @IsString()
  @Column({ type: 'varchar', length: 500 })
  producer: string;

  @ApiProperty({ description: 'The release date of the movie' })
  @IsDate()
  @Column({ type: 'date' })
  releaseDate: Date;

  @ApiProperty({ description: 'List of character URLs' })
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @Column({ type: 'text', array: true })
  characters: string[];

  @ApiProperty({ description: 'List of planet URLs' })
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @Column({ type: 'text', array: true })
  planets: string[];

  @ApiProperty({ description: 'List of starship URLs' })
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @Column({ type: 'text', array: true })
  starships: string[];

  @ApiProperty({ description: 'List of vehicle URLs' })
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @Column({ type: 'text', array: true })
  vehicles: string[];

  @ApiProperty({ description: 'List of species URLs' })
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @Column({ type: 'text', array: true })
  species: string[];
}