import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class ScannerComponent extends Component {
  @tracked cameraStream;
  @tracked lastScan = [];
  @tracked results = A([]);

  constructor(owner, args) {
    super(owner, args);

    this.start();
  }

  @service store;
  @action
  handleData(data) {
    console.log('scan value: ' + data);
    console.log('last scaned value(s): ' + this.lastScan);
    if (!this.lastScan.includes(data)) {
      this.lastScan += data;
      let result = this.store.query('container', {
        filter: {
          containerId: data,
        },
        limit: 2,
      });
      this.results.pushObject(result);
    }
  }

  @action
  async start() {
    let options = { video: { facingMode: 'environment' } };
    let stream = await navigator.mediaDevices.getUserMedia(options);

    this.cameraStream = stream;
  }
}
