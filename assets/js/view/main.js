import Encrypt from "../class/encrypt.js";
import Decrypt from "../class/decrypt.js";

const main = () => {
    const render = () => {
        const nav_burger = document.querySelector('.nav-burger');
        const nav_list = document.querySelector('.nav-list');
        const id_link = document.querySelectorAll('.id-link');

        nav_burger.addEventListener('click', () => {
            nav_burger.classList.toggle('active');
            nav_list.classList.toggle('active');
        });

        if(id_link){
            id_link.forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault;
                    const target = link.dataset.target;
                    const offsetTop = document.querySelector("#" + target).offsetTop - 86;
                    
                    scroll({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                });
            });
        }

        const expand = document.querySelector('.input-expand');
        if(expand){
            const options = document.querySelector('.options');
            const lists = document.querySelectorAll('.options li');
            const hidden_input = document.querySelector('input#method');
            const text_value = document.querySelector('.input-expand p');

            expand.addEventListener('click', () => {
                expand.classList.toggle('active');
                options.classList.toggle('active');
            });

            lists.forEach(list => {
                list.addEventListener('click', () => {
                    const keyElement = document.getElementById('key');
                    const offsetElement = document.getElementById('offset');

                    hidden_input.value = list.textContent;
                    text_value.innerHTML = list.textContent;
                    expand.classList.toggle('active');
                    options.classList.toggle('active');

                    offsetElement.value = '';

                    if(list.textContent === 'Vigenere Cipher' || list.textContent === 'Playfair Cipher' || list.textContent === 'One Time Pad'){
                        keyElement.setAttribute('type','text');
                    }else{
                        keyElement.setAttribute('type','number');
                    }
                })
            });

        }

        const select_method = document.getElementById('method');
        if(select_method) {
            const encrypt_button = document.getElementById('encrypt');
            const decrypt_button = document.getElementById('decrypt');
            const keyElement = document.getElementById('key');
            const offsetElement = document.getElementById('offset');
            const plainTextElement = document.getElementById('plaintext');
            const cipherTextElement = document.getElementById('ciphertext');

            encrypt_button.addEventListener('click',() => {
                const method = select_method.value;
                encrypt(method,keyElement,offsetElement,plainTextElement,cipherTextElement);
            });

            decrypt_button.addEventListener('click', () => {
                const method = select_method.value;
                decrypt(method,keyElement,offsetElement,plainTextElement,cipherTextElement);
            });
        }

    }
    const encrypt = (method,keyElement,offsetElement,plainTextElement,cipherTextElement) => {
        try {
            switch(method) {
                case "Caesar Cipher":
                    cipherTextElement.value = Encrypt.caesar(plainTextElement.value,Number(keyElement.value));
                    break;
                case "Vigenere Cipher":
                    cipherTextElement.value = Encrypt.vigenere(plainTextElement.value,keyElement.value);
                    break;
                case "Rail Fence Cipher" :
                    cipherTextElement.value = Encrypt.rail_fence(plainTextElement.value,Number(keyElement.value),Number(offsetElement.value));
                    break;
                case "Playfair Cipher" :
                    cipherTextElement.value = Encrypt.playfair(plainTextElement.value,keyElement.value);
                    break;
                case "Affine Cipher" :
                    let offset = Number(offsetElement.value);
                    if(offset === 0) {
                        offset = 1;
                        offsetElement.value = 1;
                    }
                    cipherTextElement.value = Encrypt.affine(plainTextElement.value,Number(keyElement.value),offset);
                    break;
                case "One Time Pad" :
                    const {result,key} = Encrypt.otp(plainTextElement.value);
                    cipherTextElement.value = result;
                    keyElement.value = key;
                    break;
                default:
                    cipherTextElement.value = "Opps, method isn't available";
                    break;
            }
        }catch(err){
            cipherTextElement.value = "'ENCRYPT ERROR : Please enter valid key and offset !'"
        }
    }
    const decrypt = (method,keyElement,offsetElement,plainTextElement,cipherTextElement) => {
        try {
            switch(method) {
                case "Caesar Cipher":
                    plainTextElement.value = Decrypt.caesar(cipherTextElement.value,Number(keyElement.value));
                    break;
                case "Vigenere Cipher":
                    plainTextElement.value = Decrypt.vigenere(cipherTextElement.value,keyElement.value);
                    break;
                case "Rail Fence Cipher" :
                    plainTextElement.value = Decrypt.rail_fence(cipherTextElement.value,Number(keyElement.value),Number(offsetElement.value));
                    break;
                case "Playfair Cipher" :
                    plainTextElement.value = Decrypt.playfair(cipherTextElement.value,keyElement.value);
                    break;
                case "Affine Cipher" :
                    let offset = Number(offsetElement.value);
                    if(offset === 0) {
                        offset = 1;
                        offsetElement.value = 1;
                    }
                    plainTextElement.value = Decrypt.affine(cipherTextElement.value,Number(keyElement.value),offset);
                    break;
                case "One Time Pad" :
                    plainTextElement.value = Decrypt.otp(cipherTextElement.value,keyElement.value);
                    keyElement.value = '';
                    break;
                default:
                    plainTextElement.value = "Opps, method isn't available";
                    break;
            }
        }catch(err){
            plainTextElement.value = "'DECRYPT ERROR : Please enter valid key and offset !'"
        }
    }
    render();
}

export default main;