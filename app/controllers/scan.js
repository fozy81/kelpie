import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScanController extends Controller {
  @tracked scan = [];
  @tracked lastQRread = undefined;
  @action
  onScan(result) {
    console.log('scanning success: ' + result);
    console.log('scan current: ' + this.scan);
    console.log('scan last: ' + this.lastQRread);
    if (result !== this.lastQRread) {
      this.scan += result;
    }
    this.lastQRread = result; 
    this.onScan(result);
  }

  // Switch to true if the same QR code is scanned over and over
  @tracked callDuplicateSuccess = false;

  @action
  startVideoScanning(result) {
    console.log('restart scanning: ' + result);
    this.codeReader.decodeFromInputVideoDeviceContinuously(
      this.device,
      this.elementId,
      (result, error) => {
        if (result) {
          if (
            this.onScanSuccess &&
            (this.callDuplicateSuccess || this.lastQRread != result.text)
          ) {
            result += `lastQRread ${this.result.text}`;
            this.onScanSuccess(result);
          }
        }
        if (error) {
          if (this.onScanError) {
            this.onScanError(error);
          }
        }
      }
    );
  }
}
