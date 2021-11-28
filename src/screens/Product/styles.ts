import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
 flex: 1;
 background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;