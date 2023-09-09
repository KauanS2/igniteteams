import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useRoute } from '@react-navigation/native'
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { Container, Form, HeaderList, NumberOfPlayers } from "@screens/Players/styles";
import { useState } from "react";
import { FlatList, Alert } from "react-native";
import { AppError } from "@utils/AppError";
import { playerAddByGroups } from "@storage/player/playerAddByGroups";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";

interface RouteParamsProps {
    group: string
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeams] = useState('Turma A')
    const [players, setPlayers] = useState<string[]>([])

    const route = useRoute()

    const { group } = route.params as RouteParamsProps

    function handlePlayersRemove() {
        
        
    }
    async function handlePlayersAdd() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroups(newPlayer, group)
            const player = await playersGetByGroup(group)
            console.log(player)


        } catch (err) {
            if (err instanceof AppError) {
                Alert.alert('Nova pessoa', err.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
         }
        
    }
    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} onChangeText={setNewPlayerName} />
                <ButtonIcon icon="add" onPress={handlePlayersAdd} />

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