import './assets/css/app.less';
import Bulb from './src/bulb';

const bulb = new Bulb();

function setEventHandlers() {
  const btnConnect = document.querySelector('.btn-connect');

  btnConnect.addEventListener('click', bulb.connect);
}

setEventHandlers();