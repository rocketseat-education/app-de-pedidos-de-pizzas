import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { UserStackRoutes } from './user.stack.routes';
import { UserTabRoutes } from './user.tab.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <UserTabRoutes />
    </NavigationContainer>
  );
}