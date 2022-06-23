import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

import { ShopWithUser } from "../interface";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const SEARCH_COFFEE_SHOP = gql`
  query searchCoffeeShops($keyword: String!, $page: Int) {
    searchCoffeeShops(keyword: $keyword, page: $page) {
      id
      name
      photos {
        id
        url
      }
    }
  }
`;

const Input = styled.TextInput<{ width: number }>`
  background-color: white;
  background-color: rgba(255, 255, 255, 1);
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 10px;
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Items = styled.TouchableOpacity`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px;
`;

const ImageBox = styled.View<{ width: number }>`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid white;
`;

interface SearchForm {
  keyword: string;
  error?: string;
}

interface SearchShopResponse {
  searchCoffeeShops: ShopWithUser[];
}

const Search: React.FC<StackScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm<SearchForm>();
  const [startQueryFn, { data, loading, called }] =
    useLazyQuery<SearchShopResponse>(SEARCH_COFFEE_SHOP);

  const SearchBox = () => (
    <Input
      width={width}
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  const onValid = ({ keyword }: SearchForm) => {
    if (loading) return;
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 1 });
  }, []);

  const renderItem: ListRenderItem<ShopWithUser> = ({ item }) => (
    <Items
      onPress={() =>
        navigation.navigate("SearchCoffeeShop", {
          id: item.id,
        })
      }
    >
      <ImageBox width={width}>
        {item.photos &&
          item.photos.map((photo) => (
            <Image
              key={photo.id}
              style={{ width: "100%", height: "100%" }}
              source={{ uri: photo.url }}
            />
          ))}
      </ImageBox>
      <Text style={{ color: "white", marginTop: 5 }}>Shop: {item.name}</Text>
    </Items>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Search</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data.searchCoffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchCoffeeShops}
              keyExtractor={(item) => item.id + ""}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
