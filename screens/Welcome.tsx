import React from "react";
import { StackScreenProps } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome: React.FC<StackScreenProps> = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      <AuthButton
        onPress={goToCreateAccount}
        text="Create New Account"
        disabled={false}
      />

      <TouchableOpacity onPress={() => goToLogin()}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
