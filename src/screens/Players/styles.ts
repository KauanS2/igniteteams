import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 24px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};   
`

export const Form = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};  
    justify-content: center;
    flex-direction: row;
    border-radius: 6px;
`