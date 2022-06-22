import { gql } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { USER_FRAGMENT } from "../fragment";
import { User } from "../interface";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const SEARCH_USER = gql`
  ${USER_FRAGMENT}
  query searchUser($keyword: String!) {
    searchUser(keyword: $keyword) {
      ...UserFragment
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

interface SearchForm {
  keyword: string;
  error?: string;
}

interface SearchUserResponse {
  searchUser: User[];
}

const Search: React.FC<StackScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default Search;
