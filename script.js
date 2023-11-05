const nav = document.querySelector('.nav');
const visibleMenu = document.querySelector('.visible-menu');
const hiddenMenu = document.querySelector('.hidden-menu');
const burgerBtn = document.querySelector('.burger');
const burgerCount = document.querySelector('.burger-count');
let breaks = [];

function updateNav() {
    /*1. Объявляем переменную, в которую сохраняем ширину меню
    2. Если у кнопки есть класс hidden, то записываем в переменную ширину всего меню
    3. Если же нет, то записываем ширину меню - ширина кнопки*/
    let navWidth = burgerBtn.classList.contains('hidden')
        ? nav.offsetWidth
        : nav.offsetWidth - burgerBtn.offsetWidth;

    /*Получаем ширину видимого меню*/
    let visibleMenuWidth = visibleMenu.offsetWidth;

    if (visibleMenuWidth > navWidth) {
        breaks.push(visibleMenuWidth);
        hiddenMenu.prepend(
            visibleMenu.lastElementChild
        ); /**prepend - добавляет в начало */
        burgerBtn.classList.remove('hidden');
        burgerCount.innerText = breaks.length;
        updateNav();
    } else {
        if (navWidth > breaks[breaks.length - 1]) {
            breaks.pop();
            visibleMenu.append(hiddenMenu.firstElementChild);
            burgerCount.innerText = breaks.length;
        }
        if (breaks.length < 1) {
            burgerBtn.classList.add('hidden')
            hiddenMenu.classList.remove('active')
        }
    }
}

burgerBtn.addEventListener('click', () => {
    hiddenMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
});

/*При изменении размера окна, вызываем функцию*/
window.addEventListener('resize', updateNav);
/**также функцию вызываем, когда заходим на страницу */
document.addEventListener('DOMContentLoaded', updateNav);
