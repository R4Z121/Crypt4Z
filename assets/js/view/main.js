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
                    const offsetSection = document.querySelector('.input-offset');

                    hidden_input.value = list.textContent;
                    text_value.innerHTML = list.textContent;
                    expand.classList.toggle('active');
                    options.classList.toggle('active');
                    
                    if(list.textContent === 'Rail Fence Cipher' || list.textContent === 'Affine Cipher') {
                        offsetSection.classList.replace('hidden','flex');
                    }else{
                        offsetSection.classList.replace('flex','hidden');
                    }
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

        const navigators = document.querySelectorAll('.navigator p');
        if(navigators) {
            navigators.forEach(el => {
                el.addEventListener('click',() => {
                    const active_navigator = document.querySelector('.navigator .active');
                    active_navigator.classList.remove('active');
                    el.classList.add('active');
                });
            });
        }

        const input_file = document.querySelector('.input-file input[type=file]');
        const text_file = document.querySelector('.input-file input[type=text');
        if(input_file){
            input_file.addEventListener('change', () => {
                const result_canvas_section = document.getElementById('result-canvas-section');
                if(result_canvas_section.classList.contains('flex')) {
                    result_canvas_section.classList.replace('flex','hidden');
                }
                const file = input_file.files[0];
                text_file.value = file.name;
                const original_canvas_section = document.getElementById('original-canvas-section');
                const original_canvas = document.getElementById('original-image');
                original_canvas_section.classList.replace('hidden','flex');
                renderImage(file,original_canvas);
            });
        }

        const encode_stegano_btn = document.getElementById('encrypt-steganography');
        if(encode_stegano_btn) {
            const decode_stegano_btn = document.getElementById('decrypt-steganography');
            const original_canvas = document.getElementById('original-image');
            const result_canvas = document.getElementById('result-image');
            const text = document.getElementById('plaintext');

            encode_stegano_btn.addEventListener('click', () => {
                let success = true;
                if(input_file.files[0]) {
                    input_file.value = '';
                    text_file.value = '';
                    success = encode_stegano(original_canvas,text.value,result_canvas);
                    if(!success) {
                        makeAlert("Message is too long for choosen image ....");
                    }else {
                        const result_canvas_section = document.getElementById('result-canvas-section');
                        const downloadResultBtn = document.getElementById("download-result");
                        downloadResultBtn.download = "canvas-message.png";
                        downloadResultBtn.href= result_canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
                        result_canvas_section.classList.replace('hidden','flex');
                        downloadResultBtn.classList.remove('hidden');
                    }
                }else{
                    makeAlert('Please upload an image to cover your message !');
                }
            });
            decode_stegano_btn.addEventListener('click', () => {
                if(input_file.files[0]) {
                    input_file.value = '';
                    text_file.value = '';
                    decode_stegano(original_canvas,text);
                }else{
                    makeAlert('Please upload an image that might contain secret messages');
                }
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
    const renderImage = (file, canvas) => {
        const reader = new FileReader();
        const img = new Image();
        const ctx = canvas.getContext("2d");

        if(file) {
            reader.readAsDataURL(file);
        }

        reader.onloadend = () => {
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0);
            }
        }
    }
    const encode_stegano = (original_canvas,text,result_canvas) => {
        const original_ctx = original_canvas.getContext('2d');
        const result_ctx = result_canvas.getContext('2d');

        const width = original_canvas.width;
        const height = original_canvas.height;

        if((text.length * 8) > (width * height * 3)) {
            return false;
        }

        result_canvas.width = width;
        result_canvas.height = height;

        let message_binary = text.split('').map(char => {
            let binary_char = char.charCodeAt(0).toString(2);
            while(binary_char.length < 8) {
                binary_char = "0" + binary_char;
            }
            return binary_char;
        }).join("").split("");

        const original_data = original_ctx.getImageData(0,0,width,height);
        const original_pixels = original_data.data;
        let message_index = 0;
        for(let start = 0; start < original_pixels.length; start+=4) {
            for(let pixel = 0; pixel < 3; pixel++) {
                const index = start + pixel;
                if(original_pixels[index] % 2 !== 0) {
                    original_pixels[index]--;
                }
                if(message_index < message_binary.length){
                    original_pixels[index] += Number(message_binary[message_index]);
                    message_index++;
                }
            }
        }
        result_ctx.putImageData(original_data,0,0);
        return true;
    }
    const decode_stegano = (original_canvas,message_element) => {
        const ctx = original_canvas.getContext('2d');
        const width = original_canvas.width;
        const height = original_canvas.height;
        const image_data = ctx.getImageData(0,0,width,height);
        const pixels = image_data.data;
        let message_binary = "";
        const message_array = [];

        for(let i = 0; i < pixels.length; i+=4) {
            for(let j = 0; j < 3; j++) {
                if(pixels[i+j] % 2 != 0) {
                    message_binary += '1';
                }else{
                    message_binary += '0';
                }
                if(message_binary.length == 8) {
                    message_array.push(message_binary);
                    message_binary = "";
                }
            }
        }

        const message = message_array.map(binary => String.fromCharCode(parseInt(binary,2))).join("");
        console.log(message);
        message_element.value = message;
    }
    const makeAlert = (message) => {
        const alertBody = document.getElementById('alert-section');
        alertBody.classList.replace('hidden','flex');
        const alertMessage = document.getElementById('alert-text');
        const closeAlert = document.getElementById('close-alert');

        alertMessage.innerText = message;
        closeAlert.addEventListener('click', () => {
            alertBody.classList.replace('flex','hidden');
        });
    }
    render();
}

export default main;