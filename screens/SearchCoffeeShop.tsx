import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import CoffeeShopList from "../components/CoffeeShop";
import { COFFEE_FRAGMENT, USER_FRAGMENT } from "../fragment";
import { ShopWithUser } from "../interface";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const SEE_COFFEE = gql`
  ${USER_FRAGMENT}
  ${COFFEE_FRAGMENT}
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...CoffShopFragment
      user {
        ...UserFragment
      }
      photos {
        id
        url
      }
    }
  }
`;

interface UserProfileProp {
  seeCoffeeShop: ShopWithUser;
}

const SearchCoffeeShop: React.FC<StackScreenProps> = ({
  route,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<UserProfileProp>(SEE_COFFEE, {
    variables: {
      id: route?.params?.id && route?.params?.id,
    },
  });

  const onRefresh = async () => {
    setRefreshing(false);
    await refetch();
    setRefreshing(true);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      contentContainerStyle={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && <ActivityIndicator />}
      <CoffeeShopList {...data?.seeCoffeeShop} navigation={navigation} />
    </ScrollView>
  );
};
export default SearchCoffeeShop;
