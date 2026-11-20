import { PokemonSummary } from '../_types';
import { PokeApiListResponse } from '../_types/pokeapi';

type RouteParams = {
	page: number;
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<RouteParams> },
): Promise<Response> {
	const { page } = await params;
	const LIMIT = 20;

	try {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${LIMIT * (page - 1)}`,
		);

		if (!res.ok) throw new Error(`Erro ao obter dados de Pokemons página ${page}`);

		const data: PokeApiListResponse = await res.json();

		let results: PokemonSummary[] = [];
		data.results.forEach(async item => {
			const result = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${item.name}`,
			);
			const data = await result.json();
			results.push({
				id: data.id,
				name: data.name,
				type: data.types[0].type.name,
			});
		});

		return Response.json({
			page: Number(data.previous) + 1,
			totalPages: Math.trunc(data.count / LIMIT),
			results,
		});
	} catch (error) {
		return Response.json({ error }, { status: 502 });
	}
}
