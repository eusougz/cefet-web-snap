(function () {
  const addEventListenerToArray = (elements, eventType, handler) => {
    elements.forEach((el) => el.addEventListener(eventType, handler));
  };

  const ocultarMarcacoesEl = document.querySelector(
    '#visibilidade-das-marcacoes'
  );
  const marcacoes = document.querySelectorAll('.marcacao');
  const xInputEl = document.querySelector('#x-da-marcacao');
  const yInputEl = document.querySelector('#y-da-marcacao');
  const larguraInputEl = document.querySelector('#largura-da-marcacao');
  const alturaInputEl = document.querySelector('#altura-da-marcacao');
  const tituloInputEl = document.querySelector('#titulo-da-marcacao');
  const conteudoInputEl = document.querySelector('#conteudo-da-marcacao');
  const corInputEl = document.querySelector('#cor-da-marcacao');
  const formatos = document.querySelectorAll(
    'input[type="radio"][name="formato-da-marcacao"]'
  );

  const selecionarMarcacao = (event) => {
    const marcacaoSelecionadaEl = document.querySelector('.selecionada');
    marcacaoSelecionadaEl.classList.remove('selecionada');

    preencherControles(event.currentTarget);
    event.currentTarget.classList.add('selecionada');
  };

  const preencherControles = (marcacaoEl) => {
    xInputEl.value = parseFloat(marcacaoEl.style.left);
    yInputEl.value = parseFloat(marcacaoEl.style.top);
    larguraInputEl.value = parseFloat(marcacaoEl.style.width);
    alturaInputEl.value = parseFloat(marcacaoEl.style.height);
    tituloInputEl.value = marcacaoEl.dataset.titulo;
    conteudoInputEl.value = marcacaoEl.dataset.conteudo;
    corInputEl.value = marcacaoEl.dataset.cor;
    formatos.forEach(formatoEl => {
        if (formatoEl.value === marcacaoEl.dataset.formato)
            formatoEl.checked = true;
        else
            formatoEl.checked = false;
    })
  };

  addEventListenerToArray(marcacoes, 'click', selecionarMarcacao);

  ocultarMarcacoesEl.addEventListener('click', () => {
    marcacoes.forEach((marcacaoEl) =>
        marcacaoEl.classList.toggle('marcacoes-ocultas')
      );
  });

  const escutarMudancaInputEAlterarEstiloMarcacao = (el, eventType, styleAttr, funcValue) => {
    el.addEventListener(eventType, () => {
      const marcacaoSelecionadaEl = document.querySelector('.marcacao.selecionada');
      marcacaoSelecionadaEl.style[styleAttr] = funcValue(el.value);
    });
  };

  const escutarMudancaInputEAlterarDadosMarcacao = (el, eventType, datasetAttr) => {
    el.addEventListener(eventType, () => {
      const marcacaoSelecionadaEl = document.querySelector('.marcacao.selecionada');
      marcacaoSelecionadaEl.dataset[datasetAttr] = el.value;
    });
  };

  const concatenarComPx = (value) => `${value}px`;
  escutarMudancaInputEAlterarEstiloMarcacao(xInputEl, 'input', 'left', concatenarComPx);
  escutarMudancaInputEAlterarEstiloMarcacao(yInputEl, 'input', 'top', concatenarComPx);
  escutarMudancaInputEAlterarEstiloMarcacao(larguraInputEl, 'input', 'width', concatenarComPx);
  escutarMudancaInputEAlterarEstiloMarcacao(alturaInputEl, 'input', 'height', concatenarComPx);

  escutarMudancaInputEAlterarDadosMarcacao(tituloInputEl, 'input', 'titulo');
  escutarMudancaInputEAlterarDadosMarcacao(conteudoInputEl, 'input', 'conteudo');
  escutarMudancaInputEAlterarDadosMarcacao(corInputEl, 'input', 'cor');

  const alterarFormatoMarcacaoSelecionada = (event) => {
    const marcacaoSelecionadaEl = document.querySelector('.marcacao.selecionada');

    const formatoParaAdicionar = event.currentTarget.value;
    marcacaoSelecionadaEl.classList.add(formatoParaAdicionar);
    marcacaoSelecionadaEl.dataset.formato = formatoParaAdicionar;

    const formatosParaRemover = [];
    formatos.forEach(formatoEl => {
        if (formatoEl.value !== formatoParaAdicionar)
            formatosParaRemover.push(formatoEl.value);
    })
    marcacaoSelecionadaEl.classList.remove(formatosParaRemover)
  };
  addEventListenerToArray(formatos, 'click', alterarFormatoMarcacaoSelecionada);

  const seletorImagemEl = document.querySelector('#imagem');
  const fotoAnotadaEl = document.querySelector('.foto-anotada > img');
  seletorImagemEl.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Check if the file is an image.
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      fotoAnotadaEl.src = event.target.result;
    });
    reader.readAsDataURL(file);
  });
})();
