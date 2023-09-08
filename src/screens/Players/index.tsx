import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { Container, Form, HeaderList, NumberOfPlayers } from "@screens/Players/styles";
import { useState } from "react";
import { FlatList } from "react-native";

export function Players() {

    const [team, setTeams] = useState('Turma A')
    const [players, setPlayers] = useState<string[]>(['Kauan'])

    function handlePlayersRemove() {
        
    }
    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Nome da turma" subtitle="adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon icon="add" />

            </Form>

            <HeaderList>
                <FlatList
                data={['Turma A', 'Turma B']}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Filter title={item} isActive={team === item} onPress={() => setTeams(item)} />
                )}
                horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard name={item} onRemove={handlePlayersRemove}/>
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas nesse time."/>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1}
                ]}
            />
            <Button title="Remover turma" type="SECONDARY"/>
            
        </Container>
    )
}