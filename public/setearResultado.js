class SetearResultado {
  constructor(resultsContainer) {
    this.setearRival1 = resultsContainer.querySelector('#set-rival1');
    this.setearRival2 = resultsContainer.querySelector('#set-rival2');
    this.setearFecha = resultsContainer.querySelector('#set-fecha');
    this.setearResultado = resultsContainer.querySelector('#set-resultado');      
  }

  show(resultadoPartido) {
    this.setearRival1.value = resultadoPartido.rival1;
    this.setearRival2.value = resultadoPartido.rival2;
    this.setearFecha.value = resultadoPartido.fecha;
    this.setearResultado.value = resultadoPartido.resultado;
  }

  read() {
    const result = {
      rival1: this.setearRival1.value,
      rival2: this.setearRival2.value,
      fecha: this.setearFecha.value,
      resultado: this.setearResultado.value
    };
    return result;
  }
}

export default SetearResultado;