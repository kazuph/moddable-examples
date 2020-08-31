export default class OmronEnvSensor {
  static MAC_ADDR = 'C2:81:0A:88:42:C9';
  static decode(data) {
    trace(`Omron Sensor: ${data}\n`);

    const buffer = data.buffer;
    const res = {
      no: new DataView(buffer, 0, 1).getUint8(0),
      temp: new DataView(buffer, 1, 2).getUint16(0, true) / 100,
      hum: new DataView(buffer, 3, 2).getUint16(0, true) / 100,
      light: new DataView(buffer, 5, 2).getUint16(0, true),
      uv: new DataView(buffer, 7, 2).getUint16(0, true) / 100,
      pressure: new DataView(buffer, 9, 2).getUint16(0, true) / 10,
      sound: new DataView(buffer, 11, 2).getUint16(0, true) / 100,
      disconf: new DataView(buffer, 13, 2).getUint16(0, true) / 100,
      heat: new DataView(buffer, 15, 2).getUint16(0, true) / 100,
      rfu: new DataView(buffer, 17, 2).getUint16(0, true),
      battery: Math.round(new DataView(buffer, 19, 1).getUint8(0) / 255 * 100),
    };

    trace(`Omron Sensor\n`);
    trace(`${res.temp}\n`);
    trace(`${res.hum}\n`);
    trace(`${res.battery}\n`);

    return { temp: res.temp, hum: res.hum, batt: res.battery };
  };
}