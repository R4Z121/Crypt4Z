const main = () => {
    const render = () => {
        const nav_burger = document.querySelector('.nav-burger');
        const nav_list = document.querySelector('.nav-list');

        nav_burger.addEventListener('click', () => {
            nav_burger.classList.toggle('active');
            nav_list.classList.toggle('active');
        });
    }
    render();
}

export default main;