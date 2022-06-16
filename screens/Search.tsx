import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const Search: React.FC<StackScreenProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
        <Text style={{ color: "white" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
