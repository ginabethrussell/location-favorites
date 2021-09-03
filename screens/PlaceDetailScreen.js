import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailScreen = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.route.params["placeTitle"],
    });
  });

  return (
    <View>
      <Text>Place Detail Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PlaceDetailScreen;
