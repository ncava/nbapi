import resultadosnba from "./nba.js";
import ResultadoPartido from "./resultado.js";
import SetearResultado from "./setearResultado.js";

class App {
  constructor() {
    this.resultadosnba = new resultadosnba();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const setForm = document.querySelector('#set');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);

    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener('click', this.resultadosnba.logout);
  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const setearResultado = new SetearResultado(resultsContainer);
    const postBody = setearResultado.read();

    const status = resultsContainer.querySelector('#status');
    status.textContent = '';

    this.resultadosnba.save(postBody)
      .then(result => {
        // Update definition
        new ResultadoPartido(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });
  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const rival1 = document.querySelector('#rival1').value;
    const rival2 = document.querySelector('#rival2').value;
    const fecha = document.querySelector('#fecha').value;
    const partido = {
      rival1: rival1,
      rival2: rival2,
      fecha: fecha
    };
    this.resultadosnba.doLookup(partido)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show partido information.
    new ResultadoPartido(resultsContainer, result);

    // Prep set partido form.
    const setearResultado = new SetearResultado(resultsContainer);
    setearResultado.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();
