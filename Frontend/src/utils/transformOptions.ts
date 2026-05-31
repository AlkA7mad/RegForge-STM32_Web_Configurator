import type { GpioOptions, GpioDropdownOptions } from "../types/boardData.type";

export function transformOptions(gpio: GpioOptions): GpioDropdownOptions {
  const modes = gpio.modes.map((m) => ({
    label: splitPascalCase(m),
    value: m,
  }));
  const outputTypes = gpio.outputTypes.map((t) => ({
    label: splitPascalCase(t),
    value: t,
  }));
  const speeds = gpio.speeds.map((s) => ({
    label: splitPascalCase(s),
    value: s,
  }));
  const pulls = gpio.pulls.map((p) => ({
    label: splitPascalCase(p),
    value: p,
  }));

  const ports = Object.keys(gpio.ports).map((key) => ({
    label: key.replace("GPIO", "Port "),
    value: key.replace("GPIO", ""),
  }));

  return { modes, outputTypes, speeds, pulls, ports };
}

function splitPascalCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}
