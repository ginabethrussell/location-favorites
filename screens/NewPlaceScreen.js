import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import Colors from "../constants/Colors";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const dispatch = useDispatch();

  const imageTakenHandler = (imagePath) => setSelectedImage(imagePath);
  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };
  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  const locationPickedHandler = React.useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Add Place",
    });
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
export default NewPlaceScreen;
