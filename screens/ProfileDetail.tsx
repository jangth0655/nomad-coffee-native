import React from "react";
import { Image, Text, View } from "react-native";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const ProfileDetail: React.FC<StackScreenProps> = ({ route }) => {
  const username = route.params && route.params.username;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>username</Text>
    </View>
  );
};

export default ProfileDetail;
