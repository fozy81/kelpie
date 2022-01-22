import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import QRCode from 'qrcode';

export default class ProjectController extends Controller {
  @tracked archive = false;
  @action
  showArchive() {
    this.archive = !this.archive;
  }

  @tracked date = new Date().valueOf() - 15000;
  @action
  archiveDate() {
    this.date = new Date().valueOf() - 15000;
  }

  @tracked print = false;
  @action
  showPrinting() {
    this.print = !this.print;
  }

  @tracked qr = null;
  @action
  createQr(id) {
    let url = `${id}`;

    QRCode.toCanvas(document.getElementById(id), url, function (error) {
      if (error) console.error(error);
      console.log('success!');
    });

    return null;
  }
}
