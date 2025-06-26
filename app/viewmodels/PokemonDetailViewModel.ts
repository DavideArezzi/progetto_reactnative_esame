// src/viewmodels/PokemonDetailViewModel.ts
import { useState, useEffect } from "react";
import { PokemonDetail } from "../models/PokemonDetail";
import { PokemonService } from "../services/PokemonService";

export const usePokemonDetailViewModel = (pokemonId: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPokemonDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await PokemonService.getPokemonDetail(pokemonId);
      const pokemonDetail = new PokemonDetail(data);
      setPokemon(pokemonDetail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
      console.error("Error loading Pokemon detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    loadPokemonDetail();
  };

  useEffect(() => {
    if (pokemonId) {
      loadPokemonDetail();
    }
  }, [pokemonId]);

  return {
    pokemon,
    loading,
    error,
    retry,
  };
};
