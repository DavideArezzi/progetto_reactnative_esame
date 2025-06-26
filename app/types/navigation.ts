// src/types/Navigation.ts
export type RootStackParamList = {
  Home: undefined;
  PokemonDetail: {
    pokemonId: string;
    pokemonName: string;
  };
};

// Aiuto per TypeScript con la navigazione
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
