// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RootStackParamList } from "./types/navigation";
import HomeScreen from "./screens/HomeScreen";
import PokemonDetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3498db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Pokédex",
          }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{
            title: "Dettagli Pokémon",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
