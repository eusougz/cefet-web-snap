(function () {
    const fotoAnotadaEl = document.querySelector('.foto-anotada > img');
    const filtroSelectEl = document.querySelector('#filtro-da-foto');
    filtroSelectEl.addEventListener('change', () => {
        console.log(fotoAnotadaEl.style);
        fotoAnotadaEl.style.filter = filtroSelectEl.value;
    })
})();
