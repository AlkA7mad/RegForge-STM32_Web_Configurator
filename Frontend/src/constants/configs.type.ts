import type { PinData } from "../constants/PinConfig.type";

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