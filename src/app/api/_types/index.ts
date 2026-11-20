export interface PokemonSummary {
  id: number;
  name: string;
  type: string;
}

export interface PokemonListResponse {
  page: number;
  totalPages: number;
  results: PokemonSummary[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  stats: {
    height: number;
    weight: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  evolutionChain: Omit<PokemonSummary, 'type'>[];
}

export interface Team {
  id: number;
  pokemons: PokemonSummary[];
  name: string;
  createdAt: string;
}
