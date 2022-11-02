import AlpahbetsChar from "./alphabets-character.js";
import PlayFairCipher from "./methods/playfair-cipher.js";

class Encrypt {
    static caesar(message,key) {
        const alphabet = AlpahbetsChar.getAlphabets();
        const result = message.split("").map(char => {
            if((/[a-zA-Z]/).test(char)) {
                if(alphabet.includes(char)) return alphabet[(26 + (alphabet.indexOf(char.toUpperCase()) + key))%26];
                else return alphabet[(26 + (alphabet.indexOf(char.toUpperCase()) + key))%26].toLowerCase();
            }else {
                return char;
            }
        }).join("");
        return result;
    }
    static vigenere(message,key,coef=1){
        const alphabet = AlpahbetsChar.getAlphabets();
        const keyArr = key.split("");
        let iteration = 0;
        const result = message.split("").map(char => {
            if((/[a-zA-Z]/).test(char)){
                const keyIndex = iteration%keyArr.length;
                let newChar = (alphabet.indexOf(char.toUpperCase()) + (coef * alphabet.indexOf(keyArr[keyIndex].toUpperCase())))%26
                if(newChar < 0) newChar = 26 + newChar;
                iteration++;
                
                const lowerCase = !alphabet.includes(char);
                if(lowerCase) return alphabet[newChar].toLowerCase();
                else return alphabet[newChar];
            }else{
                return char;
            }
        }).join("");
        return result;
    }
    static rail_fence(message,key,offset){
        if (message != ""){
            if(key < 2) key = 2;
            const resultArr = new Array(key);
            const messageLength = message.length + offset;
            for(let i = 0; i < resultArr.length; i++){
                resultArr[i] = new Array(messageLength);
            }
            const messageChars = message.split("");
            let row = 0;
            let messageIdx = 0;
            let target = "down"
            for(let col = 0; col < messageLength; col++){
                if(col >= offset){
                    resultArr[row][col] = messageChars[messageIdx];
                    messageIdx++;
                }else{
                    resultArr[row][col] = '';
                }
                if(target === "down"){
                    if(row+1 === key){
                        target = "up";
                        row--;
                    }else{
                        row++;
                    }
                }else if(target === "up"){
                    if(row-1 < 0){
                        target = "down";
                        row++;
                    }else{
                        row--;
                    }
                }
            }
            return resultArr.flat().join("");
        }else{
            return "";
        }
    }
    static playfair(message,key, offset = 1) {
        if(message !== " ") {
            const pfc = new PlayFairCipher();
            const keyBox = pfc.setKeyBox(key);
            const LETTER_REGEXP = /[a-zA-Z]/;
            const messageArr = message.toUpperCase().split('').filter(char => {
                if(LETTER_REGEXP.test(char)){
                    return char;
                }
            });
            const messageBigram = pfc.getMessageBigram(messageArr);
            
            const result = messageBigram.map(el => {
                const coor1 = pfc.findMultiArrIdx(keyBox,el[0]);
                const coor2 = pfc.findMultiArrIdx(keyBox,el[1]);
    
                if(coor1[0] == coor2[0]){
                    coor1[1] = (5+(coor1[1] + offset))%5;
                    coor2[1] = (5+(coor2[1] + offset))%5;
                    return [keyBox[coor1[0]][coor1[1]],keyBox[coor2[0]][coor2[1]]];
                }else if(coor1[1] == coor2[1]){
                    coor1[0] = (5+(coor1[0] + offset))%5;
                    coor2[0] = (5+(coor2[0] + offset))%5;
                    return [keyBox[coor1[0]][coor1[1]],keyBox[coor2[0]][coor2[1]]];
                }else{
                    return [keyBox[coor1[0]][coor2[1]],keyBox[coor2[0]][coor1[1]]];
                }
            })
            return result.flat().join("");
        }else{
            return "";
        }
    }
    static affine(message, key, offset) {
        const alphabets = AlpahbetsChar.getAlphabets();
        const result = message.split('').map(char => {
            if((/[a-zA-Z]/).test(char)){
                if(alphabets.includes(char)){
                    return alphabets[(26 + (offset * alphabets.indexOf(char.toUpperCase()) + key))%26];
                }else{
                    return alphabets[(26 + (offset * alphabets.indexOf(char.toUpperCase()) + key))%26].toLowerCase();
                }
            }else{
                return char;
            }
        });
        return result.join("");
    }
    static otp(message){
        const alphabets = AlpahbetsChar.getAlphabets();
        const characters = alphabets.join('');
        let key = '';
        const result = message.split('').map(char => {
            if((/[a-zA-Z]/).test(char)){
                const randomKeyChar = characters.charAt(Math.floor(Math.random() * characters.length));
                key += randomKeyChar.toLowerCase();
                if(alphabets.includes(char)){
                    return alphabets[(26 + (alphabets.indexOf(char) + alphabets.indexOf(randomKeyChar)))%26];
                }else{
                    return alphabets[(26 + (alphabets.indexOf(char.toUpperCase()) + alphabets.indexOf(randomKeyChar)))%26].toLowerCase();
                }
            }else{
                return char;
            }
        }).join('');
        return {result,key};
    }
}

export default Encrypt;