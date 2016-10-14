let ledCharacteristic = null;
let turnedOn = false;

class Bulb {
  constructor() {
    this.name = null;
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
        ledCharacteristic = characteristic;
        this.onConnected();
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }

  onConnected() {
    document.querySelector('.btn-connect').classList.add('hidden');
    document.querySelector('.color-buttons').classList.remove('hidden');
    document.querySelector('.power-button').classList.remove('hidden');
    turnedOn = false;
  }

  turnOn() {
    let data = new Uint8Array([0xcc, 0x23, 0x33]);
    return ledCharacteristic.writeValue(data)
      .catch(err => console.log('Error when turning on! ', err))
      .then(() => {
          turnedOn = true;
          this.toggleButtons();
      });
  }

  turnOff() {
    let data = new Uint8Array([0xcc, 0x24, 0x33]);
    return ledCharacteristic.writeValue(data)
      .catch(err => console.log('Error when turning off! ', err))
      .then(() => {
          turnedOn = false;
          this.toggleButtons();
      });
  }

  turnOnOff() {
    if (turnedOn) {
      this.turnOff();
    } else {
      this.turnOn();
    }
  }

  toggleButtons() {
    Array.from(document.querySelectorAll('.color-buttons button'))
      .forEach(function(colorButton) {
        colorButton.disabled = !turnedOn;
    });
  }

  setColor(red, green, blue) {
    let data = new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);

    return ledCharacteristic.writeValue(data)
      .catch(err => console.log('Error when writing value! ', err));
  }

  setAmberBlink() {
    let data = new Uint8Array([0xbb, 0x29, 0x01, 0x44]);

    return ledCharacteristic.writeValue(data)
      .catch(err => console.log('Error when writing value! ', err));
  }

  setBlueBlink() {
    let data = new Uint8Array([0xbb, 0x28, 0x01, 0x44]);

    return ledCharacteristic.writeValue(data)
      .catch(err => console.log('Error when writing value! ', err));
  }

  red() {
    return this.setColor(255, 0, 0)
      .then(() => console.log('Color set to Red'));
  }

  green() {
    return this.setColor(0, 255, 0)
      .then(() => console.log('Color set to Green'));
  }

  blue() {
    return this.setColor(0, 0, 255)
      .then(() => console.log('Color set to blue'));
  }

  white() {
    return this.setColor(255, 255, 255)
      .then(() => console.log('Color set to white'));
  }
}

export default Bulb;
