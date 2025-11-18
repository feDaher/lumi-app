import { View } from "react-native";

const Box: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <View className={className}>{children}</View>
);

export default Box;
