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
  ProfileDetail: undefined;
  Upload: undefined;
  TabNav: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};
