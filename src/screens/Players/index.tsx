import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Input } from "@components/Input";

import { playerAddByGroups } from "@storage/player/playerAddByGroups";
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { useRoute, useNavigation } from '@react-navigation/native'

import { Container, Form, HeaderList, NumberOfPlayers } from "@screens/Players/styles";

import { useEffect, useState, useRef } from "react";
import { FlatList, Alert, TextInput } from "react-native";

import { AppError } from "@utils/AppError";

interface RouteParamsProps {
    group: string
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeams] = useState('Turma A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation();

    const route = useRoute()

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const { group } = route.params as RouteParamsProps

    async function handlePlayersRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error);
            Alert.alert('Remover', 'Não foi possível remover essa pessoa.')
        }
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
            newPlayerNameInputRef.current?.blur()
            setNewPlayerName('')
            fetchPlayersByTeam();
        } catch (err) {
            if (err instanceof AppError) {
                Alert.alert('Nova pessoa', err.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
         }    
    }
    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
        } catch (err) { 
            console.log(err)
            Alert.alert('Pessoas', 'Não foi possível filtrar as pessoas pelo time.')
        } finally {
            setIsLoading(false);
        }
    }
    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups')

        } catch (error) {
            console.log(error);
            Alert.alert('Remover', 'Não foi possível remover o grupo.')
        }   
    }
    async function handleRemoveGroup() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() },
            ]
        )
    }
    useEffect(() => {
        fetchPlayersByTeam()
    }, [team]);
    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false} onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handlePlayersAdd}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon="add"
                    onPress={handlePlayersAdd} />

            </Form>

            <HeaderList>
                <FlatList
                data={['Turma A', 'Turma B']}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Filter
                        title={item}
                        isActive={team === item}
                        onPress={() =>
                            setTeams(item)}
                    />
                )}
                horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {isLoading ? <Loading /> :
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlePlayersRemove(item.name)} />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty message="Não há pessoas nesse time." />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }
                <Button
                    title="Remover turma"
                    type="SECONDARY"
                    onPress={handleRemoveGroup}
                />
            
            
        </Container>
    )
}