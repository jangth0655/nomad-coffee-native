import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import CoffeeShopList from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";
import { USER_FRAGMENT } from "../fragment";
import { CoffeeShop, ShopWithUser } from "../interface";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const SEE_COFFEE_SHOPS = gql`
  ${USER_FRAGMENT}
  query seeCoffeeShops($offset: Int) {
    seeCoffeeShops(offset: $offset) {
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
  const { data, loading, refetch, fetchMore } = useQuery<SeeCoffeeShops>(
    SEE_COFFEE_SHOPS,
    {
      variables: {
        offset: 0,
      },
    }
  );

  const renderShop: ListRenderItem<CoffeeShop> = ({ item }) => {
    return <CoffeeShopList {...item} navigation={navigation} />;
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(false);
      await refetch();
      setRefreshing(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          return fetchMore({
            variables: {
              offset: data?.seeCoffeeShops.length,
            },
          });
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        renderItem={renderShop}
        keyExtractor={(item, index) => item.id + "" + index}
      />
    </ScreenLayout>
  );
};

export default Home;
