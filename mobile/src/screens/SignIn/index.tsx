import { Fontisto } from '@expo/vector-icons';
import { Center, IBoxProps, Icon, Text } from "native-base";

import { useAuth } from '../../hooks/useAuth';
import { Button } from "../../components/Button";
import { Background } from '../../components/Background';

import LogoImg from '../../assets/logo.svg';

export const SignIn = ({...rest}: IBoxProps) => {
  const { signIn } = useAuth();

  return (
    <Background>
      <Center
        p={7}
        flex={1}
        bg="gray.900"
        {...rest}
      >
        <LogoImg width={212} height={40} />

        <Button
          mt={12}
          title="Entrar com o Google"
          type="SECONDARY"
          leftIcon={
            <Icon as={Fontisto} name="google" color="white" size="md" />
          }
          onPress={signIn}
        />

        <Text
          mt={4}
          textAlign="center"
          color="gray.200"
          fontSize="sm"
          w={266}
        >
          Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
        </Text>
      </Center>
    </Background>
  )
}
