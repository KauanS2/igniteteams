import { ButtonIconTypeStyleProps, Container, Icon } from "@components/ButtonIcon/styles";

import { TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons"

interface ButtonIconProps extends TouchableOpacityProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
}
export function ButtonIcon({icon, type = 'PRIMARY', ...rest}: ButtonIconProps) {
    return (
        <Container {...rest}>
            <Icon
                name={icon}
                type={type}
            />
        </Container>
    )
}