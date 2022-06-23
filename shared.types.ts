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
  SearchCoffeeShop: { id: number } | undefined;
  Upload: undefined;
  TabNav: undefined;
  ProfileDetail: { username?: string } | undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};
