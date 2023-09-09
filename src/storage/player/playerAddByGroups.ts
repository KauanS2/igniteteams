import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";


export async function playerAddByGroups(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group);

        const playersAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if (playersAlreadyExists.length > 0) {
            throw new AppError('Esta pessoa já está adicionada em um time.')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer])
        await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw error;
    }
}