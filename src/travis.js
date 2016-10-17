import axios from 'axios';
import config from '../config';
import { TRAVIS_FAILED } from '../constants';

const API_URL = 'https://api.travis-ci.com';
const API_HEADERS = {
  Accept: 'application/vnd.travis-ci.2+json',
};

class Travis {
  constructor() {
    this.status = null;
    this.running = false;
    this.intervalId = null;
  }

  init() {
    const repository = document.getElementById('repository').value;

    if (this.running) {
      clearInterval(this.intervalId);
      this.running = false;
      this.status = null;
    }

    this.authenticate()
      .then(accessToken => {
        this.running = true;
        this.intervalId = setInterval(() => {
          this.getStatus(accessToken, repository).then(status => {
            this.status = status;
          });
        }, 5000);
      });
  }

  authenticate() {
    return axios({
      method: 'post',
      url: `${API_URL}/auth/github`,
      data: {
        github_token: config.GITHUB_TOKEN,
      },
      headers: API_HEADERS,
    })
    .then(response => response.data.access_token)
    .catch(error => {
      console.error(error);
    });
  }

  getStatus(accessToken, repository) {
    const headers = Object.assign({}, API_HEADERS, {
      Authorization: `token ${accessToken}`
    });

    return axios({
      method: 'get',
      url: `${API_URL}/repos/${config.GITHUB_ACCOUNT_NAME}/${repository}/builds`,
      headers,
      dataType: 'json',
    })
    .then(response => {
      return response.data.builds[0].state;
    })
    .catch((e) => {
      return TRAVIS_FAILED;
    });
  }
}

export default Travis;