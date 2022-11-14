import { Heading, Text, VStack } from "native-base";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Background } from "../../components/Background";

import LogoImg from '../../assets/logo.svg';

export const New = (): JSX.Element => {
  return (
    <Background>
      <VStack flex={1}>
        <Header title="Criar novo bolão" />

        <VStack flex={1} mt={8} alignItems="center" mx={5}>
          <LogoImg width={212} height={40} />

          <Heading fontFamily="heading" fontSize="xl" my={8} textAlign="center" color="white">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </Heading>

          <Input placeholder="Qual o nome do seu bolão?" />
          <Button title="Criar meu bolão" mt={2} />

          <Text color="gray.300" mt={4} textAlign="center" fontSize="sm" maxW={279.17}>
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
          </Text>
        </VStack>
      </VStack>
    </Background>
  )
}
