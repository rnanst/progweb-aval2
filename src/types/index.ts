export interface PokemonSummary {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonListResponse {
  page: number;
  totalPages: number;
  results: PokemonSummary[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number; // ajustar conforme o backend (dm cru ou cm)
  weight: number; // ajustar conforme o backend (hg cru ou kg)
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  evolutionChain: string[];
}

export interface TeamMember {
  id: number;
  pokemonId: number;
  name: string;
  imageUrl: string;
  nickname: string | null;
  createdAt: string;
}