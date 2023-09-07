import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";

export function Groups() {
  return (
      <Container>
        <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />
      
      <GroupCard title="Nome da turma" />
      </Container>
  );
}
