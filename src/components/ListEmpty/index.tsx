import { Container, Message } from "@components/ListEmpty/styles";

interface ListEmptyProps {
    message: string;
}
export function ListEmpty({message}: ListEmptyProps) {
    return (
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    )
}