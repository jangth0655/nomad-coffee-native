import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { isLoggedInVar } from "../apollo";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const Profile: React.FC<StackScreenProps> = ({ navigation }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.reset({
        routes: [{ name: "LogIn" }],
      });
    }
  }, [isLoggedIn]);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Profile</Text>
    </View>
  );
};

export default Profile;
