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
  const turnOff = document.querySelector('.turn-off');
  const turnOn = document.querySelector('.turn-on');
  const redOn = document.querySelector('.red-btn');
  const greenOn = document.querySelector('.green-btn');
  const amberOn = document.querySelector('.amber-btn');
  const blueOn = document.querySelector('.blue-btn');
  const whiteOn = document.querySelector('.white-btn');

  // Connent and travis init
  btnConnect.addEventListener('click', bulb.connect.bind(bulb));
  btnStartTravis.addEventListener('click', travis.init);

  // Turn on or off
  turnOff.addEventListener('click', bulb.turnOff.bind(bulb));
  turnOn.addEventListener('click', bulb.turnOn.bind(bulb));

  // Color controls
  redOn.addEventListener('click', bulb.red.bind(bulb));
  greenOn.addEventListener('click', bulb.green.bind(bulb));
  blueOn.addEventListener('click', bulb.blue.bind(bulb));
  amberOn.addEventListener('click', bulb.startBlinking.bind(bulb));
  whiteOn.addEventListener('click', bulb.white.bind(bulb));
}

setEventHandlers();
