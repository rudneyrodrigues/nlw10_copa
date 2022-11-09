import { Divider, Text, useTheme, VStack } from "native-base";
import { MagnifyingGlass } from 'phosphor-react-native';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export const Pools = (): JSX.Element => {
  const { colors, sizes } = useTheme();

  return (
    <VStack flex={1}>
      <Header title="Meus bolões" />

      <VStack mx={5} alignItems="center">
        <Button
          mt={6}
          title="Buscar bolão por código"
          leftIcon={<MagnifyingGlass color={colors.black} size={sizes[6]} />}
        />

        <Divider my={4} bg="gray.600" />

        <Text color="gray.300" fontSize="sm" textAlign="center">
          Você ainda não está participando de {`\n`}
          nenhum bolão, que tal buscar um por código {`\n`}
          ou criar um novo?
        </Text>
      </VStack>
    </VStack>
  )
}
