// src/services/PokemonService.ts

import { PokemonDetailResponse, PokemonListItem } from "../types/pokemon";

export class PokemonService {
  private static readonly BASE_URL = "https://pokeapi.co/api/v2";

  static async getPokemonList(
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonListItem[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw new Error("Errore nel caricamento della lista Pokémon");
    }
  }

  static async getPokemonDetail(
    pokemonId: string
  ): Promise<PokemonDetailResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon/${pokemonId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
      throw new Error("Errore nel caricamento dei dettagli Pokémon");
    }
  }
}
