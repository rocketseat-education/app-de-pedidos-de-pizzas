import React, { useState } from 'react';
import { Platform } from 'react-native';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';

import { Container, Header, Photo, Sizes } from './styles';

export function Order() {
  const [size, setSize] = useState('');

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack
          onPress={() => { }}
          style={{ marginBottom: 108 }}
        />
      </Header>

      <Photo source={{ uri: 'http://github.com/rodrigorgtic.png' }} />

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
    </Container>
  )
}
