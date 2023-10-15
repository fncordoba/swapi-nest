import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @Auth( ValidRoles.admin )
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @Auth( ValidRoles.user, ValidRoles.superUser, ValidRoles.admin )
  @ApiOperation({ summary: 'Retrieve all movies' })
  @ApiResponse({ status: 200, description: 'List of movies' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @Auth( ValidRoles.admin )
  @ApiOperation({ summary: 'Retrieve a movie by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the movie to retrieve' })
  @ApiResponse({ status: 200, description: 'Movie details' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Get('name/:name')
  @Auth( ValidRoles.user )
  @ApiOperation({ summary: 'Retrieve a movie by name' })
  @ApiParam({ name: 'name', type: String, description: 'Name of the movie to retrieve' })
  @ApiResponse({ status: 200, description: 'Movie details' })
  findOneByName(@Param('name') name: string) {
    return this.moviesService.findOneByName(name);
  }

  @Patch(':id')
  @Auth( ValidRoles.other_for_test )
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the movie to update' })
  @ApiResponse({ status: 200, description: 'Movie has been updated.' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the movie to delete' })
  @ApiResponse({ status: 200, description: 'Movie has been deleted.' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
