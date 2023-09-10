import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {

    try {
        const storage = await playersGetByGroup(group);

        const players = storage.filter(player => player.team === team);

        return players;

    } catch (err) { 
        throw err;
    }
    
}