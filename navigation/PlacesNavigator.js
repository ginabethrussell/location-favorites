import * as React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const PlacesStack = createNativeStackNavigator();

export default function PlacesNavigator() {
  return (
    <NavigationContainer>
      <PlacesStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      >
        <PlacesStack.Screen name="Places" component={PlacesListScreen} />
        <PlacesStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
        <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} />
        <PlacesStack.Screen name="Map" component={MapScreen} />
      </PlacesStack.Navigator>
    </NavigationContainer>
  );
}
