import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroup = await groupsGetAll();
        const storage = JSON.stringify([...storedGroup, newGroup]);
        
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}