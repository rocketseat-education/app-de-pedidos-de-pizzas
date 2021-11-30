import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';

import { OrderCard, OrderProps } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';

import { Container, Header, Title } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
      />

    </Container>
  )
}