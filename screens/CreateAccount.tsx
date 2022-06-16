import { gql, useMutation } from "@apollo/client";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
    $githubUsername: String
    $location: String
  ) {
    createAccount(
      username: $username
      email: $email
      password: $password
      name: $name
      githubUsername: $githubUsername
      location: $location
    ) {
      ok
      error
    }
  }
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 12px;
`;

interface CreateAccountForm {
  username: string;
  password: string;
  email: string;
  location?: string;
  githubUsername?: string;
  name?: string;
  error?: string;
}

interface CreateAccountMutation {
  createAccount: {
    ok: boolean;
    error?: string;
  };
}

const CreateAccount: React.FC<StackScreenProps> = ({ navigation }) => {
  const { register, handleSubmit, setValue, setError, getValues } =
    useForm<CreateAccountForm>();
  const onCompleted = (data: any) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      navigation.navigate("LogIn", {
        username: getValues("username"),
        password: getValues("password"),
      });
    } else {
      setError("error", { message: "Failed Create Account." });
    }
  };
  const [createAccountMutation, { loading }] =
    useMutation<CreateAccountMutation>(CREATE_ACCOUNT_MUTATION, {
      onCompleted,
    });

  const emailRef: React.MutableRefObject<null> = useRef(null);
  const nameRef: React.MutableRefObject<null> = useRef(null);
  const githubUsernameRef: React.MutableRefObject<null> = useRef(null);
  const locationRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextOne: RefObject<HTMLInputElement>) => {
    nextOne?.current?.focus();
  };

  const onValid = (data: CreateAccountForm) => {
    if (loading) return;
    createAccountMutation({
      variables: {
        ...data,
      },
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("location");
    register("githubUsername");
    register("name");
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <AuthTextInput
        autoFocus
        placeholder="Username"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(nameRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <AuthTextInput
        ref={nameRef}
        placeholder="name"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(githubUsernameRef)}
        onChangeText={(text) => setValue("name", text)}
      />
      <AuthTextInput
        ref={githubUsernameRef}
        placeholder="githubUsername"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(locationRef)}
        onChangeText={(text) => setValue("githubUsername", text)}
      />
      <AuthTextInput
        ref={locationRef}
        placeholder="location"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("location", text)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="done"
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
        secureTextEntry={true}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
      <BackButton onPress={() => goBack()}>
        <ButtonText>Back &rarr;</ButtonText>
      </BackButton>
    </AuthLayout>
  );
};

export default CreateAccount;
