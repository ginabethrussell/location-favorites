import React from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapView";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const { onLocationPicked } = props;

  React.useEffect(() => {
    if (props.route.params) {
      let mapPickedLocation = props.route.params["pickedLocation"];
      setPickedLocation(mapPickedLocation);
      onLocationPicked({
        lat: mapPickedLocation.lat,
        long: mapPickedLocation.long,
      });
    }
  }, [props.route, onLocationPicked]);

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need location permissions to make this work!");
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not get location. Please try again later or pick a location from the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
