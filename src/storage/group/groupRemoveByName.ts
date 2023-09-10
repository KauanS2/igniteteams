import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION, GROUP_COLLECTION } from "@storage/storageConfig";

import { groupsGetAll } from "@storage/group/groupsGetAll";

export async function groupRemoveByName(groupDeleted: string) {
    try {
        const storedGroups = await groupsGetAll();

        const groups = storedGroups.filter((group) => group !== groupDeleted);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupDeleted}`);

    } catch (err) { 
        throw err;
    }
}