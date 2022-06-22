import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../shared.types";

interface SearchUserProps {
  id: number;
  username: string;
  avatarURL?: string;
  navigation?: NativeStackNavigationProp<RootStackParamList, any>;
}

const SearchUsers: React.FC<SearchUserProps> = ({
  username,
  id,
  avatarURL,
  navigation,
}) => {
  const onProfile = () => {
    navigation?.navigate("ProfileDetail");
  };
  return (
    <TouchableOpacity
      onPress={() => onProfile()}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      {avatarURL ? <Image source={{ uri: avatarURL }} /> : null}
      <Text style={{ color: "white" }}>{username}</Text>
    </TouchableOpacity>
  );
};

export default SearchUsers;
