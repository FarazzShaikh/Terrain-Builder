let screen = document.querySelector('.instructions')
let div_img = document.querySelector('.instructions .img')

screen.addEventListener('click', () => {
    div_img.style.filter = 'invert(100%)'
    setTimeout(() => {
        div_img.style.opacity = '0'
        setTimeout(() => {
            screen.style.opacity = '0'
            screen.style.pointerEvents = 'none'
            setTimeout(() => {
                screen.style.display = 'none'
            }, 300);
        }, 600);
    }, 500);
})