(function () {
  const balaozinhoEl = document.querySelector('#balaozinho');
  const marcacoes = document.querySelectorAll('.marcacao');

  const mostrarBalaozinho = (event) => {
    balaozinhoEl.innerHTML = `
                <h2>${event.currentTarget.dataset.titulo}</h2>
                <p>${event.currentTarget.dataset.conteudo}</p>
            `;
    balaozinhoEl.style.color = event.currentTarget.dataset.cor;
    balaozinhoEl.style.position = 'absolute';
    balaozinhoEl.style.top = `${event.pageY}px`;
    balaozinhoEl.style.left = `${event.pageX}px`;
  };

  const esconderBalaozinho = (event) => {
    balaozinhoEl.innerHTML = '';
  };

  marcacoes.forEach((marcacaoEl) => {
    marcacaoEl.addEventListener('mousemove', mostrarBalaozinho);
    marcacaoEl.addEventListener('mouseout', esconderBalaozinho);
  });
})();
