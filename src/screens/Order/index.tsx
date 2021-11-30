import React from 'react';
import { Platform } from 'react-native';

import { Container } from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

    </Container>
  )
}
