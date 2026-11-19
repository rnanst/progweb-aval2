// PokéAPI: height em decímetros, weight em hectogramas
export function formatHeight(decimeters: number): string {
  return `${decimeters * 10}cm`;
}

export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)}kg`;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}