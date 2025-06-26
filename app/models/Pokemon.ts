import { PokemonListItem } from "../types/pokemon";

export class Pokemon {
  public readonly name: string;
  public readonly id: string;
  public readonly imageUrl: string;

  constructor(data: PokemonListItem) {
    this.name = data.name;
    this.id = data.url.split("/").slice(-2, -1)[0]; // Extracting ID from URL
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }

  private extractIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : "0";
  }
}
