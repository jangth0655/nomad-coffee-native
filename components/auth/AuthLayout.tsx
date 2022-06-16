import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const AuthLayout: React.FC = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
      style={{ flex: 1 }}
    >
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <Logo
            resizeMode="center"
            source={require("../../assets/favicon.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AuthLayout;
