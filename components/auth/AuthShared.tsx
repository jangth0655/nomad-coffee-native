import styled from "styled-components/native";

export const AuthTextInput = styled.TextInput<{ lastOne?: boolean }>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  margin-bottom: 5px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? 8 : 4)}px;
`;
