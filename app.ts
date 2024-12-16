import { scanDevices } from './IOTController';

const app = async () => {
    await scanDevices();
};

app();