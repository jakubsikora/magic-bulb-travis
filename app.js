import './assets/css/app.less';
import Bulb from './src/bulb';
import Travis from './src/travis';
import { CREATED, STARTED, PASSED, FAILED } from './constants';

const bulb = new Bulb();
const travis = new Travis();

function setEventHandlers() {
  const btnConnect = document.querySelector('.btn-connect');
  const btnStartTravis = document.querySelector('.btn-travis');

  btnConnect.addEventListener('click', bulb.connect);
  btnStartTravis.addEventListener('click', initTravis);
}

function initTravis() {
  travis.init();

  setInterval(() => {
    console.log(travis.status);

    switch (travis.status) {
      case CREATED:
      break;

      case STARTED:
      break;

      case PASSED:
      break;

      case FAILED:
      break;

      default:
    }
  }, 1000);
}

setEventHandlers();