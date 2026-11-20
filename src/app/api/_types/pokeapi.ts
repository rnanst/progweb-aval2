export interface PokeApiListResponse {
	count: number;
	next: string;
	previous: number | null;
	results: Array<{
		name: string;
		url: string;
	}>;
}

export interface PokeApiResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
	stats: Array<{
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}>;
	species: {
		name: string;
		url: string;
	};
	sprites: {
		front_default: string | null;
		other?: {
			'official-artwork'?: {
				front_default: string | null;
			};
		};
	};
}

export interface SpeciesResponse {
	evolution_chain: { url: string };
}

export interface EvolutionNode {
	species: { name: string; url: string };
	evolves_to: EvolutionNode[];
}

export interface EvolutionChainResponse {
	chain: EvolutionNode;
}
