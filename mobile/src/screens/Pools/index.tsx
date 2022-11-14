import { MagnifyingGlass } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider, Flex, Text, useTheme, VStack } from "native-base";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Background } from "../../components/Background";
import { RootTabParamList } from '../../routes/app.routes';

type navigationProps = StackNavigationProp<RootTabParamList>;

export const Pools = (): JSX.Element => {
  const { colors, sizes } = useTheme();

  const { navigate } = useNavigation<navigationProps>();

  return (
    <Background>
      <VStack flex={1}>
        <Header title="Meus bolões" />

        <Flex w="full" flex={1} px={5} align="center" justify="space-between">
          <VStack w="full" mx={5} alignItems="center">
            <Button
              mt={6}
              title="Buscar bolão por código"
              leftIcon={<MagnifyingGlass color={colors.black} size={sizes[6]} />}
              onPress={() => navigate('Find')}
            />

            <Divider my={4} bg="gray.600" />

            <Text color="gray.300" fontSize="sm" textAlign="center">
              Você ainda não está participando de {`\n`}
              nenhum bolão, que tal buscar um por código {`\n`}
              ou criar um novo?
            </Text>
          </VStack>
        </Flex>
      </VStack>
    </Background>
  )
}
