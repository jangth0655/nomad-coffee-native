import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 15px 10px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

interface AuthButtonProps {
  onPress?: () => any;
  text: string;
  disabled: boolean;
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  text,
  disabled,
  loading,
}) => {
  return (
    <Button onPress={onPress} disabled={false}>
      <ButtonText>
        {loading ? <ActivityIndicator color="white" /> : text}
      </ButtonText>
    </Button>
  );
};

export default AuthButton;
