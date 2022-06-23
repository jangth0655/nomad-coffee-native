import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { Photo, User } from "../interface";
import { RootStackParamList } from "../shared.types";

const Container = styled.View`
  margin-bottom: 24px;
`;

const Header = styled.View`
  flex-direction: row;
  margin-bottom: 7px;
  align-items: center;
`;

const UserAvatar = styled.Image``;

const EmptyUserAvatar = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Username = styled.Text`
  color: white;
`;

const Name = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PayloadTitle = styled.Text`
  color: white;
  font-weight: 600;
`;

const Payload = styled.Text`
  color: white;
`;

const Slug = styled.Text`
  color: white;
  margin-bottom: 5px;
`;

const Category = styled(Slug)``;

const File = styled.Image``;

const Actions = styled.View``;

const ActionContent = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const ActionDescription = styled.View``;

interface CoffeeShopProps {
  id?: number;
  name?: string;
  slug?: string;
  payload?: string;
  photos?: Photo[];
  user?: User;
  navigation?: NativeStackNavigationProp<RootStackParamList, any>;
}

const CoffeeShopList: React.FC<CoffeeShopProps> = ({
  id,
  name,
  slug,
  payload,
  photos,
  user,
  navigation,
}) => {
  const { width, height } = useWindowDimensions();
  const onProfile = () => {
    navigation?.navigate("ProfileDetail", {
      username: user?.username,
    });
  };

  const CategoryName = (slug?: string) => {
    const [name] = slug ? slug.split("-") : [];
    return name;
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => onProfile()}
          style={{
            marginRight: 5,
          }}
        >
          {user?.avatarURL ? (
            <UserAvatar
              style={{
                width: 20,
                height: 20,
              }}
              source={{ uri: user?.avatarURL && user.avatarURL }}
            />
          ) : (
            <EmptyUserAvatar />
          )}
        </TouchableOpacity>
        <Username>{user?.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: height - 500,
        }}
        source={{ uri: photos ? photos[0].url : "" }}
      />
      <Actions>
        <Name>{name}</Name>
        <ActionContent>
          <PayloadTitle>Slug :</PayloadTitle>
          <Slug> {slug}</Slug>
        </ActionContent>
        <ActionContent>
          <PayloadTitle>Category :</PayloadTitle>
          <Category> {CategoryName(slug)}</Category>
        </ActionContent>
      </Actions>

      <Actions>
        <ActionDescription>
          <PayloadTitle>Description</PayloadTitle>
          <Payload> {payload}</Payload>
        </ActionDescription>
      </Actions>
    </Container>
  );
};

export default CoffeeShopList;
