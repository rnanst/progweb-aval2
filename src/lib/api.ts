import type {
  PokemonDetail,
  PokemonListResponse,
  TeamMember,
} from "@/types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  if (!res.ok) {
    let message = "Ocorreu um erro inesperado.";
    try {
      const body: { error?: string } = await res.json();
      if (body.error) message = body.error;
    } catch {
      // resposta sem JSON: mantém a mensagem padrão
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function getPokemonList(
  page: number,
  type?: string,
): Promise<PokemonListResponse> {
  const params = new URLSearchParams({ page: String(page) });
  if (type) params.set("type", type);
  return request(`/api/pokemon?${params.toString()}`);
}

export function getPokemon(idOrName: string): Promise<PokemonDetail> {
  return request(`/api/pokemon/${encodeURIComponent(idOrName)}`);
}

export function getTypes(): Promise<string[]> {
  return request("/api/types");
}

export function getTeam(): Promise<TeamMember[]> {
  return request("/api/team");
}

export function addToTeam(pokemon: {
  pokemonId: number;
  name: string;
  imageUrl: string;
}): Promise<TeamMember> {
  return request("/api/team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon),
  });
}

export function updateNickname(
  id: number,
  nickname: string,
): Promise<TeamMember> {
  return request(`/api/team/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname }),
  });
}

export function removeFromTeam(id: number): Promise<void> {
  return request(`/api/team/${id}`, { method: "DELETE" });
}