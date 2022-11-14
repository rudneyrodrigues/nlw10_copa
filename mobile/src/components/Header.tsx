import { Text, HStack, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft, Export } from 'phosphor-react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ButtonIcon } from './ButtonIcon';
import { RootTabParamList } from '../routes/app.routes';

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
}

type navigationProps = StackNavigationProp<RootTabParamList>;

export function Header({ title, showBackButton = false, showShareButton = false }: Props) {
  const { navigate } = useNavigation<navigationProps>();

  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} onPress={() => {
              navigate('Pools')
            }} />
            : <EmptyBoxSpace />
        }

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        {
          showShareButton
            ?
            <ButtonIcon icon={Export} />
            :
            <EmptyBoxSpace />
        }
      </HStack>
    </HStack>
  );
}
