import EnvSensorClient from "env_sensor_client";
import { Application, Style, Skin, Label } from 'piu/MC';

const FONT16 = 'OpenSans-Regular-16';
const FONT24 = 'OpenSans-Regular-24';
const FONT52 = 'OpenSans-Regular-52';
const scanLabel = new Label(null, {
	style: new Style({ font: FONT16, color: 'white' }),
	skin: new Skin({
		fill: ['black', 'green']
	}),
	top: 0,
	height: 15,
	left: 0,
	right: 0,
	string: ''
});

const sbLabel = new Label(null, {
	style: new Style({ font: FONT52, color: 'white' }),
	skin: new Skin({
		fill: ['black', 'green']
	}),
	top: 0,
	height: 80,
	left: 0,
	right: 0,
	string: ''
});

const sbBtLabel = new Label(null, {
	style: new Style({ font: FONT24, color: 'white' }),
	skin: new Skin({
		fill: ['black', 'green']
	}),
	top: 80,
	height: 20,
	left: 0,
	right: 0,
	string: ''
});

const omLabel = new Label(null, {
	style: new Style({ font: FONT52, color: 'white' }),
	skin: new Skin({
		fill: ['black', 'red']
	}),
	top: 100,
	height: 80,
	left: 0,
	right: 0,
	string: ''
});

const omBtLabel = new Label(null, {
	style: new Style({ font: FONT24, color: 'white' }),
	skin: new Skin({
		fill: ['black', 'red']
	}),
	top: 180,
	height: 20,
	left: 0,
	right: 0,
	string: ''
});

const diffLabel = new Label(null, {
	style: new Style({ font: FONT24, color: 'white' }),
	skin: new Skin({
		fill: ['black']
	}),
	top: 200,
	height: 40,
	left: 0,
	right: 0,
	string: ''
});

const application = new Application(null, {
	contents: [sbLabel, sbBtLabel, omLabel, omBtLabel, scanLabel, diffLabel],
	displayListLength: 4096,
	touchCount: 0,
	skin: new Skin({
		fill: '#FFFFFF'
	})
});

const onDiscoveredDevice = (device) => {
	scanLabel.string = `Found: ${device.address}, ${device.scanResponse.completeName}\n`;
};

const onDiscoveredSb = (data) => {
	trace(`Found Sb`);
	sbLabel.string = `${data.temp} / ${data.hum} %`;
	sbLabel.state = 1;
	sbBtLabel.string = `batt ${data.batt} %`;
	sbBtLabel.state = 1;
};

const onDiscoveredOm = (data) => {
	trace(`Found Om`);
	omLabel.string = `${data.temp.toFixed(1)} / ${Math.round(data.hum)} %`;
	omLabel.state = 1;
	omBtLabel.string = `batt ${data.batt} %`;
	omBtLabel.state = 1;
};

const onDiscoveredBoth = (sbData, omData) => {
	scanLabel.string = "";
	scanLabel.state = 1;
	diffLabel.string = `Diff: ${(sbData.temp - omData.temp).toFixed(1)} / ${(sbData.hum - omData.hum).toFixed(1)} %`;
};

const client = new EnvSensorClient({
	onDiscoveredDevice,
	onDiscoveredSb,
	onDiscoveredOm,
	onDiscoveredBoth,
});

sbLabel.string = "Scanning...";
sbLabel.state = 0;
sbBtLabel.state = 0;
omLabel.string = "Scanning...";
omLabel.state = 0;
omBtLabel.state = 0;
