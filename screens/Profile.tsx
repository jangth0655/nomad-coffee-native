import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";
import useUser from "../libs/useUser";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const Profile: React.FC<StackScreenProps> = ({ navigation, route }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      title: `${user?.username}' Profile`,
    });
  }, []);

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
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
