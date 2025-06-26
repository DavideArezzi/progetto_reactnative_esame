// src/models/PokemonDetail.ts

import { PokemonDetailResponse } from "../types/pokemon";

export class PokemonDetail {
  public readonly id: number;
  public readonly name: string;
  public readonly height: number;
  public readonly weight: number;
  public readonly types: string[];
  public readonly imageUrl: string;
  public readonly artworkUrl: string;
  public readonly stats: { name: string; value: number }[];
  public readonly baseExperience: number;

  constructor(data: PokemonDetailResponse) {
    this.id = data.id;
    this.name = this.capitalizeFirstLetter(data.name);
    this.height = data.height;
    this.weight = data.weight;
    this.types = data.types.map((type) =>
      this.capitalizeFirstLetter(type.type.name)
    );
    this.imageUrl = data.sprites.front_default;
    this.artworkUrl = data.sprites.other["official-artwork"].front_default;
    this.stats = data.stats.map((stat) => ({
      name: this.formatStatName(stat.stat.name),
      value: stat.base_stat,
    }));
    this.baseExperience = data.base_experience;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private formatStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      hp: "HP",
      attack: "Attacco",
      defense: "Difesa",
      "special-attack": "Att. Speciale",
      "special-defense": "Dif. Speciale",
      speed: "Velocità",
    };
    return statNames[statName] || statName;
  }

  get heightInMeters(): string {
    return (this.height / 10).toFixed(1) + " m";
  }

  get weightInKg(): string {
    return (this.weight / 10).toFixed(1) + " kg";
  }

  get typesString(): string {
    return this.types.join(", ");
  }
}
