import './assets/css/app.less';
import Bulb from './src/bulb';
import Travis from './src/travis';
import { CREATED, STARTED, PASSED, FAILED } from './constants';

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

  // Turn on or off
  turnOff.addEventListener('click', bulb.turnOff.bind(bulb));
  turnOn.addEventListener('click', bulb.turnOn.bind(bulb));

  // Color controls
  redOn.addEventListener('click', bulb.red.bind(bulb));
  greenOn.addEventListener('click', bulb.green.bind(bulb));
  blueOn.addEventListener('click', bulb.blue.bind(bulb));
  amberOn.addEventListener('click', bulb.setAmberBlink.bind(bulb));
  whiteOn.addEventListener('click', bulb.white.bind(bulb));
  btnStartTravis.addEventListener('click', initTravis);
}

function initTravis() {
  travis.init();

  setInterval(() => {
    console.log(travis.status);

    switch (travis.status) {
      case CREATED:
        bulb.white();
      break;

      case STARTED:
        bulb.setAmberBlink();
      break;

      case PASSED:
        bulb.green();
      break;

      case FAILED:
        bulb.red();
      break;

      default:
        bulb.setBlueBlink();
    }
  }, 1000);
}

setEventHandlers();
