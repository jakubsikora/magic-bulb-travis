class Bulb {
  constructor() {
    this.turnedOn = false;
    this.characteristic = null;
  }

  connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
      {
        filters: [{ services: [0xffe5] }]
      })
      .then(device => {
        console.log('> Found ' + device.name);
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
      })
      .then(server => {
        console.log('Getting Service 0xffe5 - Light control...');
        return server.getPrimaryService(0xffe5);
      })
      .then(service => {
        console.log('Getting Characteristic 0xffe9 - Light control...');
        return service.getCharacteristic(0xffe9);
      })
      .then(characteristic => {
        console.log('All ready!');
        this.characteristic = characteristic;
        this.turnOff();
        this.onConnected();
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }

  onConnected() {
    document.querySelector('.btn-connect').classList.add('hidden');
    document.querySelector('.start-icon').classList.add('hidden');

    document.querySelector('.btn-travis').classList.remove('hidden');
    document.querySelector('.on-off-switcher').classList.remove('hidden');
    document.querySelector('.connected-icon').classList.remove('hidden');

    this.turnedOn = false;
  }

  turnOn() {
    let data = new Uint8Array([0xcc, 0x23, 0x33]);
    return this.characteristic.writeValue(data)
      .catch(err => console.log('Error when turning on! ', err))
      .then(() => {
          this.turnedOn = true;
          this.toggleButtons();
      });
  }

  turnOff() {
    let data = new Uint8Array([0xcc, 0x24, 0x33]);
    return this.characteristic.writeValue(data)
      .catch(err => console.log('Error when turning off! ', err))
      .then(() => {
          this.turnedOn = false;
          this.toggleButtons();
      });
  }

  toggleOn() {
    if (this.turnedOn) {
      this.turnOff();
      this.deactivate();
    } else {
      this.turnOn().then(() => this.green());
      this.activate();
    }
  }

  activate() {
    document.querySelector('.fa-lightbulb-o').classList.add('icon-active');
    document.querySelector('.select-repository').classList.remove('hidden');
    document.querySelector('.color-buttons').classList.remove('hidden');
    document.querySelector('.status-wrapper').classList.remove('hidden');
  }

  deactivate() {
    document.querySelector('.fa-lightbulb-o').classList.remove('icon-active');
    document.querySelector('.select-repository').classList.add('hidden');
    document.querySelector('.color-buttons').classList.add('hidden');
    document.querySelector('.status-wrapper').classList.add('hidden');
  }

  toggleButtons() {
    Array.from(document.querySelectorAll('.color-buttons button'))
      .forEach(colorButton => {
        colorButton.disabled = !this.turnedOn;
    });
  }

  setColor(red, green, blue) {
    const data = new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);

    return this.characteristic.writeValue(data);
  }

  setAmberBlink() {
    const data = new Uint8Array([0xbb, 0x29, 0x01, 0x44]);

    return this.characteristic.writeValue(data);
  }

  setBlueBlink() {
    const data = new Uint8Array([0xbb, 0x28, 0x01, 0x44]);

    return this.characteristic.writeValue(data);
  }

  setRedBlink() {
    const data = new Uint8Array([0xbb, 0x26, 0x01, 0x44]);

    return this.characteristic.writeValue(data);
  }

  pink() {
    return this.setColor(255, 192, 203);
  }

  red() {
    return this.setColor(255, 0, 0);
  }

  green() {
    return this.setColor(0, 255, 0);
  }

  blue() {
    return this.setColor(0, 0, 255);
  }

  white() {
    return this.setColor(255, 255, 255);
  }
}

export default Bulb;
