import React from "react";
import { View, Button, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(placesActions.clearPlaces());
  };
  React.useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "All Places",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              props.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() =>
              props.navigation.navigate("PlaceDetail", {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              })
            }
          />
        )}
        ListFooterComponent={
          <Button title="Clear All" onPress={handleClearAll} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default PlacesListScreen;
