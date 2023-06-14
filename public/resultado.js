class ResultadoPartido {
    constructor(resultsContainer, resultadoPartido) {
      const partidoDisplay = resultsContainer.querySelector('#partido');
      const resultadoDisplay = resultsContainer.querySelector('#resultado');
      partidoDisplay.textContent = `${resultadoPartido.rival1} VS ${resultadoPartido.rival2}`;
      resultadoDisplay.textContent = resultadoPartido.resultado;
    }
  }
  
  export default ResultadoPartido;