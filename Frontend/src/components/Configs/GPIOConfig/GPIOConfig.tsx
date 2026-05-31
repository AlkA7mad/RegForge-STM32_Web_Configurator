import Dropdown from "../../Dropdown/Dropdown";

import type { GPIOConfigProps } from "../../../types/GPIOConfig.type";

import styles from "./GPIOConfig.module.scss";

function GPIOConfig({
  pin,
  options,
  ports,
  onChange,
  onRemove,
}: GPIOConfigProps) {
  const portKey = `GPIO${pin.port}`;
  const pinOptions =
    ports[portKey]?.pins.map((p) => ({
      label: p.toString(),
      value: p.toString(),
    })) ?? [];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>
          P{pin.port}
          {pin.pin}
        </span>
        <button className={styles.removeButton} onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className={styles.grid}>
        <Dropdown
          label="Port"
          options={options.ports}
          value={pin.port}
          onChange={(newPort) =>
            onChange({
              ...pin,
              port: newPort,
              pin: ports[`GPIO${newPort}`].pins[0].toString(),
            })
          }
        />
        <Dropdown
          label="Pin"
          options={pinOptions}
          value={pin.pin}
          onChange={(newPin) => onChange({ ...pin, pin: newPin })}
        />
        <Dropdown
          label="Mode"
          options={options.modes}
          value={pin.mode}
          onChange={(newMode) => onChange({ ...pin, mode: newMode })}
        />
        {pin.mode === "Output" && (
          <>
            <Dropdown
              label="Output type"
              options={options.outputTypes}
              value={pin.outputType}
              onChange={(newOutputType) =>
                onChange({ ...pin, outputType: newOutputType })
              }
            />
            <Dropdown
              label="Output speed"
              options={options.speeds}
              value={pin.outputSpeed}
              onChange={(newOutputSpeed) =>
                onChange({ ...pin, outputSpeed: newOutputSpeed })
              }
            />{" "}
          </>
        )}

        <Dropdown
          label="Pull type"
          options={options.pulls}
          value={pin.pullType}
          onChange={(newPullType) =>
            onChange({ ...pin, pullType: newPullType })
          }
        />
      </div>
    </div>
  );
}

export default GPIOConfig;
