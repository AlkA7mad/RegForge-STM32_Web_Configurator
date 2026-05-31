import type { PinData } from "./GPIOConfig.type";

export interface BoardConfigs {
  boardId: string;
  preferences: Preferences;
  peripheralConfig: PeripheralConfig;
}

interface Preferences {
  language?: string;
  abstraction?: string;
}

interface PeripheralConfig {
  gpioConfigs: PinData[];
}