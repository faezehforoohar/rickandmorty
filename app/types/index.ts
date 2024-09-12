export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location extends Origin {}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterResponse {
  info: Info;
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  url: string;
}
