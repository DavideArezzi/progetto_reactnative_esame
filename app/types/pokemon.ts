// src/types/Pokemon.ts
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  base_experience: number;
}
