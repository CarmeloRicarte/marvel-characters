import type {
  Character,
  CharacterDataWrapper,
  ErrorResponse,
} from '@marvel/models';

export const CharactersMock: Character[] = [
  {
    id: 1009368,
    name: 'Iron Man',
    description:
      'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
    modified: '2016-09-28T12:08:19-0400',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
      extension: 'jpg',
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009368',
    urls: [
      {
        type: 'detail',
        url: 'http://marvel.com/characters/29/iron_man?utm_campaign=apiRef&utm_source=638445b07d32cd12ad75e007ee02287c',
      },
      {
        type: 'wiki',
        url: 'http://marvel.com/universe/Iron_Man_(Anthony_Stark)?utm_campaign=apiRef&utm_source=638445b07d32cd12ad75e007ee02287c',
      },
      {
        type: 'comiclink',
        url: 'http://marvel.com/comics/characters/1009368/iron_man?utm_campaign=apiRef&utm_source=638445b07d32cd12ad75e007ee02287c',
      },
    ],
  },
];

export const getByNameWithNoResultsMock: CharacterDataWrapper = {
  code: 200,
  status: 'Ok',
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
  etag: '79ef3436d0dc139b17693635b99776556e29f495',
  data: {
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: [],
  },
};

export const getPaginatedNoResultsMock: CharacterDataWrapper = {
  code: 200,
  status: 'Ok',
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
  etag: '79ef3436d0dc139b17693635b99776556e29f495',
  data: {
    offset: 0,
    limit: 10,
    total: 0,
    count: 0,
    results: [],
  },
};

export const getPaginatedWithResultsMock: CharacterDataWrapper = {
  code: 200,
  status: 'Ok',
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
  etag: '79ef3436d0dc139b17693635b99776556e29f495',
  data: {
    offset: 0,
    limit: 10,
    total: 0,
    count: 0,
    results: CharactersMock,
  },
};

export const getPaginatedErrorMock: ErrorResponse = {
  code: 409,
  status: 'You must pass an integer limit greater than 0.',
};

export const getByNameWithResultsMock: CharacterDataWrapper = {
  code: 200,
  status: 'Ok',
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
  etag: '0ffa7d5f5964c42e157fe41dfb6afd8cb25e74e4',
  data: {
    offset: 0,
    limit: 20,
    total: 1,
    count: 1,
    results: CharactersMock,
  },
};
