import { useState } from 'react'
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon } from "@screens/NewGroup/styles";

export function NewGroup() {

    const [group, setGroup] = useState('');

    const navigation = useNavigation()

    function handleGoPlayers() {
        navigation.navigate('players', { group })
    }
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Nova Turma" subtitle="crie a turma para adicionar novas pessoas" />
                <Input placeholder="Nova turma" onChangeText={setGroup} />
                <Button style={{marginTop: 20}} title="Criar" onPress={handleGoPlayers}/>
            </Content>
        </Container>
    )
}