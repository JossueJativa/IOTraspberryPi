import noble from 'noble';

export class BluetoothController {
    private static instance: BluetoothController;
    private connectedDevice: noble.Peripheral | null = null;
    private constructor() { }

    public static getInstance(): BluetoothController {
        if (!BluetoothController.instance) {
            BluetoothController.instance = new BluetoothController();
        }

        return BluetoothController.instance;
    }

    public startScan = async (): Promise<void> => {
        console.log('Scanning for devices...');

        noble.on('discover', (peripheral) => {
            console.log(`Dispositivo encontrado: ${peripheral.advertisement.localName} (${peripheral.id})`);
        });

        noble.startScanning([], false, (error) => {
            if (error) {
                console.error(`Error to start scanning: ${error}`);
            } else {
                console.log('Scanning...');
            }
        });
    };

    public connectToDevice = async (deviceName: string): Promise<void> => {
        console.log('trying to connect to', deviceName);

        noble.on('discover', (peripheral) => {
            if (peripheral.advertisement.localName === deviceName) {
                console.log('Connecting to', peripheral.advertisement.localName);
                
                noble.stopScanning();

                peripheral.connect((error) => {
                    if (error) {
                        console.error(`Error to connect to device: ${error}`);
                    } else {
                        console.log('Connected to', peripheral.advertisement.localName);

                        this.connectedDevice = peripheral;

                        peripheral.on('disconnect', () => {
                            console.log('Disconnected from', peripheral.advertisement.localName);
                            this.connectedDevice = null;
                        });
                    }
                });
            }
        });

        noble.startScanning();
    };

    public disconnect = async (): Promise<void> => {
        if (this.connectedDevice) {
            this.connectedDevice.disconnect(() => {
                console.log('Disconnected from', this.connectedDevice?.advertisement.localName);
                this.connectedDevice = null;
            });
        } else {
            console.log('No device connected');
        }
    };
}