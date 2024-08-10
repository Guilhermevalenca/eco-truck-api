import CryptoJS from "crypto-js";
import env from "@config/env";

export default class CryptServices {
    static encryptData(data: string): string {
        return CryptoJS.AES.encrypt(data, env.SECRET_KEY ?? 'Sem chave definida').toString();
    }
    static decryptData(ciphertext: string): string {
        const bytes = CryptoJS.AES.decrypt(ciphertext, env.SECRET_KEY ?? 'Sem chave definida');
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}