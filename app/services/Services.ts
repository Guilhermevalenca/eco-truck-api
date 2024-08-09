import {readdirSync} from "fs";
import {join} from 'path';

type InstanceDirectory = {
    files: Array<string>,
    directory: string
}

export default abstract class Services {
    static instanceDirectory(path: string): InstanceDirectory {
        const directory = join(__dirname, path);
        return {
            files: readdirSync(directory),
            directory: directory
        };
    }
}