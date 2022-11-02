class AffineCipher {
    findKoef(offset){
        for(offset;offset <= 26; offset++){
            for(let i = 1; i <= 26; i++){
                if((offset*i)%26 === 1) return i;
            }
        }
    }
}

export default AffineCipher;