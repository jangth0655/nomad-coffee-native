import { gql, useMutation } from "@apollo/client";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const CreateAccountButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 12px;
`;

interface LoginForm {
  username: string;
  password: string;
}

interface LoginMutation {
  ok: boolean;
  error?: string;
  token?: string;
}

const LogIn: React.FC<StackScreenProps> = ({ route, navigation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    defaultValues: {
      username: route?.params?.username,
      password: route.params?.password,
    },
  });
  const onCompleted = async (data: any) => {
    const { ok, token } = data.login;
    if (ok) {
      await logUserIn(token);
      navigation.navigate("TabNav");
    }
  };
  const [loginMutation, { loading }] = useMutation<LoginMutation>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const onNext = (nextOne: RefObject<TextInput>) => {
    nextOne?.current?.focus();
  };

  const onValid = (data: LoginForm) => {
    if (loading) return;
    loginMutation({
      variables: {
        ...data,
      },
    });
  };

  const onCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <AuthTextInput
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        secureTextEntry={true}
      />
      <AuthButton
        disabled={!watch("username") || !watch("password")}
        text="Submit"
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
      <CreateAccountButton onPress={() => onCreateAccount()}>
        <ButtonText>Create Account &rarr;</ButtonText>
      </CreateAccountButton>
    </AuthLayout>
  );
};

export default LogIn;
