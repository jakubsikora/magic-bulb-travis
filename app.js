import './assets/css/app.less';
import Bulb from './src/bulb';
import Travis from './src/travis';
import config from './config';

console.log(config);

const bulb = new Bulb();
const travis = new Travis();

function setEventHandlers() {
  const btnConnect = document.querySelector('.btn-connect');
  const btnStartTravis = document.querySelector('.btn-travis');

  btnConnect.addEventListener('click', bulb.connect);
  btnStartTravis.addEventListener('click', travis.init);
}

setEventHandlers();