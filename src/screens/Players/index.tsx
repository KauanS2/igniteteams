import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form } from "@screens/Players/styles";

export function Players() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome da turma" subtitle="adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" />
            </Form>
            <Filter title="Turma A"/>
        </Container>
    )
}