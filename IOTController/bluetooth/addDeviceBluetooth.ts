import { BluetoothController } from "./bluetoothClass";

const bluetooth = BluetoothController.getInstance();

export const scanDevices = async () => {
    await bluetooth.startScan();
};

export const connectDevice = async (deviceName: string) => {
    await bluetooth.connectToDevice(deviceName);
};