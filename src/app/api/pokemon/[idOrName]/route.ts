import { PokemonDetails } from '../../_types';
import {
	EvolutionChainResponse,
	EvolutionNode,
	PokeApiResponse,
	SpeciesResponse,
} from '../../_types/pokeapi';

type RouteParams = {
	idOrName: string | number;
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<RouteParams> },
): Promise<Response> {
	const { idOrName } = await params;

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
	const data: PokeApiResponse = await res.json();

	const { id, name, height, weight, stats, types, species } = data;

	const hp = stats.find(stat => stat.stat.name === 'hp')!.base_stat;
	const attack = stats.find(stat => stat.stat.name === 'attack')!.base_stat;
	const defense = stats.find(stat => stat.stat.name === 'defense')!.base_stat;
	const speed = stats.find(stat => stat.stat.name === 'speed')!.base_stat;
	const pkTypes = types.map(tp => tp.type.name);
	try {
		const evolutionChain = await resolveEvolutionChain(species);
		const pokemon: PokemonDetails = {
			id,
			name,
			types: pkTypes,
			stats: { height, weight, hp, attack, defense, speed },
			evolutionChain,
		};

		return Response.json({ pokemon });
	} catch (error) {
		return Response.json({ error }, { status: 502 });
	}
}

async function resolveEvolutionChain(
	species: PokeApiResponse['species'],
): Promise<PokemonDetails['evolutionChain']> {
	const speciesResponse = await fetch(species.url);

	if (!speciesResponse.ok) throw new Error('Falha ao consultar a espécie.');

	const speciesData: SpeciesResponse = await speciesResponse.json();

	const chainResponse = await fetch(speciesData.evolution_chain.url);
	if (!chainResponse.ok) {
		throw new Error('Falha ao consultar a cadeia de evolução');
	}
	const chainData: EvolutionChainResponse = await chainResponse.json();

	return flattenEvolution(chainData.chain);
}

function flattenEvolution(
	node: EvolutionNode,
): PokemonDetails['evolutionChain'] {
	const id = Number(node.species.url.match(/\/(\d+)\/?$/)?.[1]);

	return [
		{ id, name: node.species.name },
		...node.evolves_to.flatMap(flattenEvolution),
	];
}
