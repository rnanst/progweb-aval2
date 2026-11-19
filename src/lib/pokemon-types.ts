export interface PokemonTypeInfo {
  label: string;
  color: string;
  dark: boolean; // true = texto escuro (fundo claro)
}

export const POKEMON_TYPES: Record<string, PokemonTypeInfo> = {
  grass: { label: "Planta", color: "#4caf50", dark: true },
  fire: { label: "Fogo", color: "#ff7043", dark: true },
  water: { label: "Água", color: "#42a5f5", dark: true },
  bug: { label: "Inseto", color: "#aed581", dark: true },
  normal: { label: "Normal", color: "#bdbdbd", dark: true },
  poison: { label: "Venenoso", color: "#ba68c8", dark: true },
  electric: { label: "Elétrico", color: "#ffd54f", dark: true },
  ground: { label: "Terra", color: "#bcaaa4", dark: true },
  fighting: { label: "Lutador", color: "#e57373", dark: true },
  psychic: { label: "Psíquico", color: "#f06292", dark: true },
  rock: { label: "Pedra", color: "#a1887f", dark: true },
  flying: { label: "Voador", color: "#90caf9", dark: true },
  ghost: { label: "Fantasma", color: "#7e57c2", dark: false },
  ice: { label: "Gelo", color: "#80deea", dark: true },
  dragon: { label: "Dragão", color: "#5c6bc0", dark: false },
  steel: { label: "Metálico", color: "#b0bec5", dark: true },
  dark: { label: "Noturno", color: "#455a64", dark: false },
  fairy: { label: "Fada", color: "#f8bbd0", dark: true },
};

export function getTypeInfo(slug: string): PokemonTypeInfo {
  return (
    POKEMON_TYPES[slug] ?? { label: slug, color: "#e0e0e0", dark: true }
  );
}