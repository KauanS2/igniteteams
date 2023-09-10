import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function playersGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}-${group}`)
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []; 

        return players
    } catch (error) {
        throw error;
    }
}