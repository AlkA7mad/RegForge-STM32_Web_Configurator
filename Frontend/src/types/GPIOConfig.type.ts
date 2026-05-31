import type { PortInfo, GpioDropdownOptions } from "./boardData.type";

export interface GPIOConfigProps {
    pin: PinData;
    options: GpioDropdownOptions
    ports: { [key: string]: PortInfo}
    onChange: (updatedPin: PinData) => void;
    onRemove: () => void;
};

export interface PinData {
    id: string;
    port: string;
    pin: string;
    mode: string;
    outputType: string;
    outputSpeed: string;
    pullType: string;
};

export const defaultPin: Omit<PinData, "id"> = {
  port: "A",
  pin: "0",
  mode: "Input",
  outputType: "PushPull",
  outputSpeed: "Low",
  pullType: "None"
};