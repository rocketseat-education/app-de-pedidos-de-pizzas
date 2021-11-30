import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT
}))`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;

export const Photo = styled.Image`
  width: 240px;
  height: 240px;
  border-radius: 120px;
  align-self: center;
  position: relative;
  top: -120px;
`;

export const Sizes = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;  
`;