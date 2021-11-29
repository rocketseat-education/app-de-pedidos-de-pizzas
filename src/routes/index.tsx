import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { UserStackRoutes } from './user.stack.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
}