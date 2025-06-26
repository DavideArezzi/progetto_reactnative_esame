// src/components/PokemonCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Pokemon } from "../models/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(pokemon)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.pokemonId}>#{pokemon.id.padStart(3, "0")}</Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 40,
    marginBottom: 12,
  },
  pokemonImage: {
    width: 70,
    height: 70,
  },
  infoContainer: {
    alignItems: "center",
  },
  pokemonId: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
    textAlign: "center",
  },
});

export default PokemonCard;
