import { Center, IBoxProps, Text } from "native-base";

export const SignIn = ({...rest}: IBoxProps) => {
  return (
    <Center
      flex={1}
      bg="gray.900"
      {...rest}
    >
      <Text color="gray.200">
        Open up App.js to start working on your app!
      </Text>
    </Center>
  )
}
