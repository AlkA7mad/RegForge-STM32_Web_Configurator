
interface DropdownOption {
  label: string;
  value: string;
}

export interface GpioDropdownOptions {
  modes: DropdownOption[];
  outputTypes: DropdownOption[];
  speeds: DropdownOption[];
  pulls: DropdownOption[];
  ports: DropdownOption[];
}

export interface BoardData {
    board: BoardDetails;
    gpio: GpioOptions;
    pins: { [key: string]: PinInfo};
}

export interface Board {
    id: string;
    name: string;
    mcu: string;
    package: string;
}

export interface BoardDetails extends Board {
    defaultReservedPins: { [key: string]: string};
}

export interface GpioOptions {
    ports: { [key: string]: PortInfo};
    modes: string[];
    outputTypes: string[];
    speeds: string[];
    pulls: string[];
}

export interface PinInfo {
    position: number;
    fiveVTolerant: boolean;
    analog: string[];
    af: { [key: string]: string};
}

export interface PortInfo {
    baseAddress: string;
    pins: number[];
}
