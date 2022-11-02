import Encrypt from "./encrypt.js";
import AffineCipher from "./methods/affine-cipher.js";
import AlpahbetsChar from "./alphabets-character.js";

class Decrypt {
    static caesar(message,key){
        return Encrypt.caesar(message,(key * -1));
    }
    static vigenere(message,key){
        return Encrypt.vigenere(message,key,-1);
    }
    static rail_fence(message,key,offset){
        if(message != ""){
            if(key < 2) key = 2;
            const messageChars = message.split("");
            const resultArr = new Array(key);
            const messageLength = message.length + offset;
            for(let i = 0; i < resultArr.length; i++){
                resultArr[i] = new Array(messageLength);
            }
            let messageIndex = 0;
            for(let fillRow = 0; fillRow < key; fillRow++){
                let row = 0;
                let target = "down";
                for(let col = 0; col < messageLength; col++){
                    if(col >= offset){
                        if(row == fillRow){
                            resultArr[row][col] = messageChars[messageIndex];
                            messageIndex++;
                        }
                    }
                    if(target == "down"){
                        if(row+1 === key){
                            target = "up";
                            row--;
                        }else{
                            row++;
                        }
                    }else if(target == "up"){
                        if(row-1 < 0){
                            target = "down";
                            row++;
                        }else{
                            row--;
                        }
                    }
                }
            }
            const result = [];
            for(let j = 0; j < messageLength; j++){
                for(let i = 0; i < key; i++){
                    if(resultArr[i][j]){
                        result.push(resultArr[i][j]);
                    }
                }
            }
            return result.join("");
        }else{
            return "";
        }
    }
    static playfair(message, key) {
        const XarrIdx = [];
        const resultArr = Encrypt.playfair(message,key,(-1)).split("");
        if(resultArr.length%2 == 0 && resultArr[resultArr.length-1] == 'X'){
            resultArr.pop();
        }
        resultArr.forEach((char,index) => {
            if(char == 'X') {
                XarrIdx.push(index);
            }
        });
        for(let i = 0; i < XarrIdx.length; i++){
            if(resultArr[XarrIdx[i]-1] == resultArr[XarrIdx[i]+1]) {
                resultArr.splice(XarrIdx[i],1);
            }
        }
        return resultArr.join("");
    }
    static affine(message, key, offset) {
        const alphabets = AlpahbetsChar.getAlphabets();
        const afc = new AffineCipher();
        const m = afc.findKoef(offset)
        const result = message.split('').map(char => {
            if((/[a-zA-Z]/).test(char)){
                if(alphabets.includes(char)){
                    return alphabets[(26 + ((m*(alphabets.indexOf(char.toUpperCase())-key))%26))%26];
                }else{
                    return alphabets[(26 + ((m*(alphabets.indexOf(char.toUpperCase())-key))%26))%26].toLowerCase();
                }
            }else{
                return char;
            }
        });
        return result.join("");
    }
    static otp(message,key){
        const alphabets = AlpahbetsChar.getAlphabets();
        const keyArr = key.split("");
        let keyIteration = 0;
        const result = message.split('').map((char) => {
            if((/[a-zA-Z]/).test(char)){
                if(alphabets.includes(char)){
                    const cipher =  alphabets[(26 + (alphabets.indexOf(char) - alphabets.indexOf(keyArr[keyIteration].toUpperCase())))%26];
                    keyIteration++;
                    return cipher;
                }else{
                    const cipher = alphabets[(26 + (alphabets.indexOf(char.toUpperCase()) - alphabets.indexOf(keyArr[keyIteration].toUpperCase())))%26].toLowerCase();
                    keyIteration++;
                    return cipher;
                }
            }else{
                return char;
            }
        }).join('');
        return result;
    }
}

export default Decrypt;