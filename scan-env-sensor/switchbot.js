
export default class Switchbot {
  static MAC_ADDR = 'FF:9A:A5:8C:F8:44';
  static decode(data) {
    trace(`Switchbot: ${data}\n`);
    const batt = data[24] & 0b01111111;
    const isTemperatureAboveFreezing = data[26] & 0b10000000;
    let temp = (data[25] & 0b00001111) / 10 + (data[26] & 0b01111111);
    if (isTemperatureAboveFreezing < 0) temp = -temp;
    const hum = data[27] & 0b01111111;

    trace(`${temp}\n`);
    trace(`${hum}\n`);
    trace(`${batt}\n`);

    return { temp, hum, batt };
  };
}