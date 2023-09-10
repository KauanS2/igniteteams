import { Container } from "@components/Input/styles";
import { TextInputProps, TextInput } from "react-native";
import { useTheme } from "styled-components/native";

interface InputProps extends TextInputProps {
    inputRef?: React.RefObject<TextInput>
}
export function Input({inputRef,  ...rest} : InputProps) {
    const {COLORS} = useTheme()
    return (
        <Container
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    )
}