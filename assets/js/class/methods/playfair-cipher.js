import AlpahbetsChar from "../alphabets-character.js";

class PlayFairCipher {
    setKeyBox(key){
        const alphabet = AlpahbetsChar.getAlphabets();
        const LETTER_REGEXP = /[a-zA-Z]/;
        const keyArr = [...new Set(key.toUpperCase().split("").concat(alphabet).filter(char => {
            if(LETTER_REGEXP.test(char)){
                if(char !== 'J'){
                    return char
                }
            }
        }))];
        const keyBox = new Array(5);
        let keyArrIdx = 0;
        for(let i = 0; i < keyBox.length; i++) {
            keyBox[i] = new Array(5);
            for(let j = 0;  j < keyBox[i].length; j++) {
                if(keyArr[keyArrIdx] !== ' '){
                    keyBox[i][j] = keyArr[keyArrIdx];
                }else{
                    j--;
                }
                keyArrIdx++;
            }
        }
        return keyBox;
    }
    getMessageBigram(messageArr){
        const J_idx = messageArr.findIndex(char => char == 'J');
        if(J_idx !== -1){
            messageArr[J_idx] = 'I';
        }
        const messageBigram = [];
        let messageBigramIdx = 0;
        for(let i = 0; i < messageArr.length; i++){
            if(!messageBigram[messageBigramIdx]){
                messageBigram[messageBigramIdx] = new Array();
            }
            messageBigram[messageBigramIdx].push(messageArr[i]);
            if(messageBigram[messageBigramIdx][1]){
                if(messageBigram[messageBigramIdx][1] == messageBigram[messageBigramIdx][0]){
                    messageBigram[messageBigramIdx][1] = 'X';
                    i--;
                }
                messageBigramIdx++;
            }
        }
        if(messageBigram[messageBigram.length-1].length % 2 != 0){
            messageBigram[messageBigram.length-1].push('X');
        }
        return messageBigram;
    }
    findMultiArrIdx(multiArr,target) {
        for(let i = 0; i < multiArr.length; i++){
            for(let j = 0; j < multiArr[0].length; j++){
                if(multiArr[i][j] == target){
                    return [i,j];
                }
            }
        }
    }
    static decrypt(message, key) {
        const XarrIdx = [];
        const resultArr = this.encrypt(message,key,(-1)).split("");
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
}

export default PlayFairCipher;