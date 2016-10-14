import './assets/css/app.less';
import Bulb from './src/bulb';

const bulb = new Bulb();

function setEventHandlers() {
  const btnConnect = document.querySelector('.btn-connect');
  const btnStartTravis = document.querySelector('.btn-travis');

  btnConnect.addEventListener('click', bulb.connect);
  btnStartTravis.addEventListener('click', travis.init);
}

setEventHandlers();