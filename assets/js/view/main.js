const main = () => {
    const render = () => {
        const nav_burger = document.querySelector('.nav-burger');
        const nav_list = document.querySelector('.nav-list');

        nav_burger.addEventListener('click', () => {
            nav_burger.classList.toggle('active');
            nav_list.classList.toggle('active');
        });

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
                    hidden_input.value = list.textContent;
                    text_value.innerHTML = list.textContent;
                    expand.classList.toggle('active');
                    options.classList.toggle('active');
                })
            });

        }
    }
    render();
}

export default main;