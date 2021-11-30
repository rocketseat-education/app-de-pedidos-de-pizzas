import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { ProductProps } from '@src/components/ProductCard';
import { OrderNavigationProps } from '@src/@types/navigation';

import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  InputGroup,
  FormRow,
  Price
} from './styles';

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00';

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert('Pedido', 'Não foi possível carregar o produto'));
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Photo source={{ uri: pizza.photo_url }} />

        <Form>
          <Title>{pizza.name}</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>
            {
              PIZZA_TYPES.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  onPress={() => setSize(item.id)}
                  selected={size === item.id}
                />
              ))
            }
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" onChangeText={(value) => setQuantity(Number(value))} />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  )
}
