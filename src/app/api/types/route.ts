import { PokeApiListResponse } from "../_types/pokeapi";

export async function GET(_request: Request): Promise<Response> {
	try {
		const res = await fetch('https://pokeapi.co/api/v2/type?offset=0');
		const data: PokeApiListResponse = await res.json();

		let results = data.results.map(item => item.name);

		return Response.json(results);
	} catch (error) {
		return Response.json({ error }, { status: 502 });
	}
}

