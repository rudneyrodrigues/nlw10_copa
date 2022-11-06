import { ReactNode } from "react";
import { View } from "native-base";

interface BackgroundProps {
  onLayout?: () => void;
  children?: ReactNode;
}

export const Background = ({ onLayout, children }: BackgroundProps) => {
  return (
    <View flex={1} bg="gray.900" onLayout={onLayout}>
      { children }
    </View>
  )
}
