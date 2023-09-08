import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY';

interface ButtonIconProps {
    type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)`
    height: 56px;
    width: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 12px;
`

export const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(({ theme, type }) => ({
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``