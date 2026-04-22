import type { PinData } from "./PinConfig.types";

export const portOptions = [
    { label: "Port A", value: "A" },
    { label: "Port B", value: "B" },
    { label: "Port C", value: "C" },
    { label: "Port D", value: "D" }
]

export const pinOptions = Array.from({ length: 16 }, (_, i) => ({
    label: i.toString(),
    value: i.toString()
}));

export const modeOptions = [
    { label: "Input", value: "InputMode" },
    { label: "Output", value: "OutputMode" },
    { label: "Alternate Function", value: "AlternateFunction" },
    { label: "Analog", value: "AnalogMode" }
];

export const outputTypeOptions = [
    { label: "Push-Pull", value: "OutputPushPull" },
    { label: "Open-drain", value: "OutputOpenDrain" }
];

export const outputSpeedOptions = [
    { label: "Low speed", value: "LowSpeed" },
    { label: "Medium speed", value: "MediumSpeed" },
    { label: "High speed", value: "HighSpeed" },
    { label: "Very high speed", value: "VeryHighSpeed" }
];

export const pullTypeOptions = [
    { label: "No pull-up, pull-down", value: "NoPull" },
    { label: "Pull-up", value: "PullUp" },
    { label: "Pull-down", value: "PullDown" }
]

export const defaultPin: PinData = {
    port: "A",
    pin: "0",
    mode: "InputMode",
    outputType: "OutputPushPull",
    outputSpeed: "LowSpeed",
    pullType: "NoPull"
}