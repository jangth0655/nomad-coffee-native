export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Welcome: undefined;
  LogIn:
    | {
        username: string;
        password: string;
      }
    | undefined;
  CreateAccount: undefined;
  Detail: undefined;
  TabNav: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};
