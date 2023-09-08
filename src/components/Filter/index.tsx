import { Container, FilterStyleProps, Title } from '@components/Filter/styles';
import { TouchableOpacityProps } from 'react-native'
interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
    title: string;
}

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
    return (
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}