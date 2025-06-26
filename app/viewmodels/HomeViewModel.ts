// src/viewmodels/HomeViewModel.ts
import { useState, useEffect } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonService } from "../services/PokemonService";

export const useHomeViewModel = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await PokemonService.getPokemonList(50); // Carichiamo più Pokémon
      const pokemonList = data.map((item) => new Pokemon(item));
      setPokemons(pokemonList);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Errore sconosciuto";
      setError(errorMessage);
      console.error("Error loading Pokemon list:", err);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    loadPokemons();
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    pokemons,
    loading,
    error,
    loadPokemons,
    retry,
  };
};
