import './assets/css/app.less';
import Bulb from './src/bulb';
import Travis from './src/travis';
import config from './config';
import { CREATED, STARTED, PASSED, FAILED, TRAVIS_FAILED } from './constants';

const bulb = new Bulb();
const travis = new Travis();
let intervalId = null;

function populateRepositories() {
  const selectRepository = document.getElementById('repository');
  let optionsHTML = '';

  config.GITHUB_REPOS.forEach(repo => {
    optionsHTML += `<option value="${repo}">${repo}</option>`
  });

  selectRepository.innerHTML = optionsHTML;
}

function setEventHandlers() {
  const btnConnect = document.querySelector('.btn-connect');
  const btnStartTravis = document.querySelector('.btn-travis');
  const turnOnOff = document.querySelector('.input');
  const redOn = document.querySelector('.red-btn');
  const greenOn = document.querySelector('.green-btn');
  const amberOn = document.querySelector('.amber-btn');
  const blueOn = document.querySelector('.blue-btn');
  const whiteOn = document.querySelector('.white-btn');

  // Connent and travis init
  btnConnect.addEventListener('click', bulb.connect.bind(bulb));

  // Turn on or off
  turnOnOff.addEventListener('click', toggleOnOff);

  // Color controls
  redOn.addEventListener('click', bulb.red.bind(bulb));
  greenOn.addEventListener('click', bulb.green.bind(bulb));
  blueOn.addEventListener('click', bulb.blue.bind(bulb));
  amberOn.addEventListener('click', bulb.setAmberBlink.bind(bulb));
  whiteOn.addEventListener('click', bulb.white.bind(bulb));
  btnStartTravis.addEventListener('click', initTravis);
}

function toggleOnOff() {
  const travisStatus = document.querySelector('.travis-status');

  if (bulb.turnedOn) {
    clearInterval(intervalId);
    travisStatus.innerHTML = '';
  } else {
    clearAlert();
    document.querySelector('.travis-status').classList.add('alert-info');
    travisStatus.innerHTML = 'Waiting for user...';
  }

  bulb.toggleOn();
}

function initTravis() {
  const travisStatus = document.querySelector('.travis-status');

  travis.init();

  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    clearAlert();

    switch (travis.status) {
      case CREATED:
        bulb.setBlueBlink();
        document.querySelector('.travis-status').classList.add('alert-info');
        travisStatus.innerHTML = 'Travis job created. Initilizing...';
      break;

      case STARTED:
        bulb.setAmberBlink();
        document.querySelector('.travis-status').classList.add('alert-warning');
        travisStatus.innerHTML = 'Travis is running... Hope for the best :D';
      break;

      case PASSED:
        bulb.green();
        document.querySelector('.travis-status').classList.add('alert-success');
        travisStatus.innerHTML = 'Passed! All good!';
      break;

      case FAILED:
        bulb.setRedBlink();
        document.querySelector('.travis-status').classList.add('alert-danger');
        travisStatus.innerHTML = 'Travis build failed :/';
      break;

      case TRAVIS_FAILED:
        bulb.pink();
        document.querySelector('.travis-status').classList.add('alert-danger');
        travisStatus.innerHTML = 'Travis failed :/';
      break;


      default:
        bulb.setBlueBlink();
        document.querySelector('.travis-status').classList.add('alert-info');
        travisStatus.innerHTML = 'Connecting to Travis...';
    }
  }, 1000);
}

function clearAlert() {
  document.querySelector('.travis-status').classList.remove('alert-info');
  document.querySelector('.travis-status').classList.remove('alert-danger');
  document.querySelector('.travis-status').classList.remove('alert-warning');
  document.querySelector('.travis-status').classList.remove('alert-success');
}

populateRepositories();
setEventHandlers();
