import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  iconName: "home" | "person" | "search";
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, color, focused }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 24 : 20}
    />
  );
};

export default TabIcon;
