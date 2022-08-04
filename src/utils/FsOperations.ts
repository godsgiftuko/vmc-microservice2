const { join, dirname } = require('path');
const { existsSync } = require('fs');
const { writeFile, readFile } = require('fs').promises;
const storageFile = join(__dirname, '../data.json');
import { IDBStorage, ICreate, IUser } from "../interfaces";

export const readValueFromJSON = (property: string) => {	
	try {
		if (!existsSync(storageFile)) {
            return;
        }
        const JSONFile = require(storageFile);
		const findUserByEmail = (user: ICreate) => user.userInfo.email === property
		const user = JSONFile.find(findUserByEmail);
		return property ? user : JSONFile;
	} catch(error) {
		console.log(error);
		return error;
	}
}

export const writeValueToJSON = async (data: ICreate) => {	
	try {
		if (!existsSync(storageFile)) {
			return;
        }
        const json = JSON.stringify(data, null, 2);
		await writeFile(storageFile, json);
	  	return json;
    } catch (error) {
        console.log(error);
        return error;
    }
}