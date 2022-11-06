import { Center, IBoxProps, Text } from "native-base";

import LogoImg from '../../assets/logo.svg';

export const SignIn = ({...rest}: IBoxProps) => {
  return (
    <Center
      flex={1}
      bg="gray.900"
      {...rest}
    >
      <LogoImg />
      <Text color="gray.200">
        SignIn
      </Text>
    </Center>
  )
}
