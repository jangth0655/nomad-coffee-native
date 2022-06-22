import { Text, View } from "react-native";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const ProfileDetail: React.FC<StackScreenProps> = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>ProfileDetail</Text>
    </View>
  );
};
export default ProfileDetail;
