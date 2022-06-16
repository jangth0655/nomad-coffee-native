import { Text, View } from "react-native";
import { StackScreenProps } from "../navigators/LoggedOutNav";

const Detail: React.FC<StackScreenProps> = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Detail</Text>
    </View>
  );
};
export default Detail;
