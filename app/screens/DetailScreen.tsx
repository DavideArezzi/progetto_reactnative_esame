// src/screens/PokemonDetailScreen.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { usePokemonDetailViewModel } from "../viewmodels/PokemonDetailViewModel";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;
type PokemonDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonDetail"
>;

const PokemonDetailScreen: React.FC = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const navigation = useNavigation<PokemonDetailNavigationProp>();
  const { pokemonId, pokemonName } = route.params;

  const { pokemon, loading, error, retry } =
    usePokemonDetailViewModel(pokemonId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: pokemonName,
    });
  }, [navigation, pokemonName]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Caricamento dettagli...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryButtonText}>Riprova</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Pokémon non trovato</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: pokemon.artworkUrl }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <Text style={styles.pokemonId}>
          #{pokemon.id.toString().padStart(3, "0")}
        </Text>
      </View>

      <View style={styles.typesContainer}>
        {pokemon.types.map((type, index) => (
          <View
            key={index}
            style={[styles.typeChip, { backgroundColor: getTypeColor(type) }]}
          >
            <Text style={styles.typeText}>{type}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informazioni Base</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Altezza:</Text>
          <Text style={styles.infoValue}>{pokemon.heightInMeters}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Peso:</Text>
          <Text style={styles.infoValue}>{pokemon.weightInKg}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Esperienza base:</Text>
          <Text style={styles.infoValue}>{pokemon.baseExperience}</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Statistiche</Text>
        {pokemon.stats.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statName}>{stat.name}</Text>
            <View style={styles.statBarContainer}>
              <View
                style={[
                  styles.statBar,
                  { width: `${Math.min((stat.value / 150) * 100, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    Normal: "#A8A878",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Grass: "#78C850",
    Ice: "#98D8D8",
    Fighting: "#C03028",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Flying: "#A890F0",
    Psychic: "#F85888",
    Bug: "#A8B820",
    Rock: "#B8A038",
    Ghost: "#705898",
    Dragon: "#7038F8",
    Dark: "#705848",
    Steel: "#B8B8D0",
    Fairy: "#EE99AC",
  };
  return typeColors[type] || "#68A090";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    marginBottom: 10,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  pokemonId: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statsSection: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statName: {
    width: 100,
    fontSize: 14,
    color: "#666",
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  statBar: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 4,
  },
  statValue: {
    width: 40,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PokemonDetailScreen;
