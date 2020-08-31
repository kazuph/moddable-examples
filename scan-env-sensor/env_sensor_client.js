import BLEClient from "bleclient";
import Timer from 'timer';
import Switchbot from "switchbot";
import OmronEnvSensor from "omron_env_sensor";

export default class EnvSensorClient extends BLEClient {
  constructor({ onDiscoveredDevice, onDiscoveredSb, onDiscoveredOm, onDiscoveredBoth }) {
    super();
    this.sbData = null;
    this.omData = null;
    this.onDiscoveredDevice = onDiscoveredDevice;
    this.onDiscoveredSb = onDiscoveredSb;
    this.onDiscoveredOm = onDiscoveredOm;
    this.onDiscoveredBoth = onDiscoveredBoth;
  }

  scan() {
    this.onReady();
  }

  onReady() {
    this.startScanning({ duplicates: false });
  }

  onDiscovered(device) {
    this.onDiscoveredDevice(device);

    let scanResponse = device.scanResponse;
    trace(`Found: ${device.address}, ${device.scanResponse.completeName}\n`);
    if (device.address.toString() === Switchbot.MAC_ADDR) {

      trace(`Found Sb`);
      const buffer = scanResponse.buffer;
      if (buffer.byteLength === 28) {
        this.sbData = Switchbot.decode(new Uint8Array(buffer));
        this.onDiscoveredSb(this.sbData);
      }
    }

    if (device.address.toString() === OmronEnvSensor.MAC_ADDR) {
      trace(`Found Om`);
      this.omData = OmronEnvSensor.decode(new Uint8Array(scanResponse.manufacturerSpecific.data));
      this.onDiscoveredOm(this.omData);
    }

    if (this.sbData && this.omData) {
      this.stopScanning();
      Timer.set(() => {
        this.sbData = null;
        this.omData = null;
        this.startScanning({ duplicates: false });
      }, 1000 * 30);

      this.onDiscoveredBoth(this.sbData, this.omData);
    }

  }

}
