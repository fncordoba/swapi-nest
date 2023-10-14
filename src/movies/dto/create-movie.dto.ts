import { IsString, IsInt, IsDate, IsArray, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsInt()
  episodeId: number;

  @IsString()
  openingCrawl: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsDate()
  releaseDate: Date;

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  characters: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  planets: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  starships: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  vehicles: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  species: string[];
}
