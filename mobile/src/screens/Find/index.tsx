import { Heading, VStack } from "native-base";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const Find = (): JSX.Element => {
  return (
    <VStack flex={1}>
      <Header showBackButton title="Buscar por código" />

      <VStack flex={1} mt={8} alignItems="center" mx={5}>
        <Heading fontFamily="heading" fontSize="xl" mb={8} textAlign="center" color="white">
          Encontre um bolão através de seu código único
        </Heading>

        <Input placeholder="Qual o código do bolão?" />
        <Button title="Buscar bolão" mt={2} />
      </VStack>
    </VStack>
  )
}
