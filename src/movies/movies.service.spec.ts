import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((movie) => movie),
      save: jest.fn().mockImplementation((movie) => movie),
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(undefined),
      update: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined),
      findOneByName: jest.fn().mockResolvedValue(undefined),
    };

    service = new MoviesService(mockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const movie: CreateMovieDto = {
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        episodeId: 4,
        openingCrawl: 'It is a period of civil war.',
        releaseDate: new Date('1977-05-25'),
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
      };
      const result = await service.create(movie);
      expect(result).toEqual(movie);
    });
  });
  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(undefined);
    });
  });

  describe('findOneByName', () => {
    it('should return a movie', async () => {
      const result = await service.findOneByName('A New Hope');
      expect(result).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      jest.spyOn(
        mockRepository,
        'findOne',
      ).mockResolvedValueOnce({});
      const result = await service.update(1, {});
      expect(result).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(undefined);
    });
  });
});
