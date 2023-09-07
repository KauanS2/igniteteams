import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "@screens/NewGroup/styles";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Nova Turma" subtitle="crie a turma para adicionar novas pessoas" />
                <Input placeholder="Nova turma" />
                <Button style={{marginTop: 20}} title="Criar"/>
            </Content>
        </Container>
    )
}