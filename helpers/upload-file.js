import * as path from "path";
import {v4 as uuidv4} from "uuid";


export default (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const {file} = files;
        const nameSplit = file.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`Extension ${extension} is not allowed, only ${validExtensions}`);
        }
        const fileName = uuidv4() + '.' + extension;
        const uploadPath = path.join('../uploads/', folder, fileName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(fileName);
        });
    });
}
