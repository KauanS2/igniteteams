import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroup = await groupsGetAll();

        const groupAlreadyExists = storedGroup.includes(newGroup);

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.')    
        }
        const storage = JSON.stringify([...storedGroup, newGroup]);
        
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}