import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";
import { USER_FRAGMENT } from "../fragment";
import { ShopWithUser } from "../interface";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const SEE_COFFEE_SHOPS = gql`
  ${USER_FRAGMENT}
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      payload
      photos {
        id
        url
      }
      slug
      user {
        ...UserFragment
      }
    }
  }
`;

interface SeeCoffeeShops {
  seeCoffeeShops: ShopWithUser[];
}

const Home: React.FC<StackScreenProps> = ({ navigation }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<SeeCoffeeShops>(SEE_COFFEE_SHOPS);

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
        <Text style={{ color: "white" }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
