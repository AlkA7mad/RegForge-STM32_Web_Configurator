// PinConfig.tsx

import {
  modeOptions,
  outputSpeedOptions,
  outputTypeOptions,
  pinOptions,
  portOptions,
  pullTypeOptions,
} from "../../constants/gpioOptions";
import type { PinConfigProps } from "../../constants/PinConfig.types";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./PinConfig.module.scss"

function PinConfig({ pin, onChange, onRemove }: PinConfigProps) {
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
          options={portOptions}
          value={pin.port}
          onChange={(newPort) => onChange({ ...pin, port: newPort })}
        />
        <Dropdown
          label="Pin"
          options={pinOptions}
          value={pin.pin}
          onChange={(newPin) => onChange({ ...pin, pin: newPin })}
        />
        <Dropdown
          label="Mode"
          options={modeOptions}
          value={pin.mode}
          onChange={(newMode) => onChange({ ...pin, mode: newMode })}
        />
        <Dropdown
          label="Output type"
          options={outputTypeOptions}
          value={pin.outputType}
          onChange={(newOutputType) =>
            onChange({ ...pin, outputType: newOutputType })
          }
        />
        <Dropdown
          label="Output speed"
          options={outputSpeedOptions}
          value={pin.outputSpeed}
          onChange={(newOutputSpeed) =>
            onChange({ ...pin, outputSpeed: newOutputSpeed })
          }
        />
        <Dropdown
          label="Pull type"
          options={pullTypeOptions}
          value={pin.pullType}
          onChange={(newPullType) =>
            onChange({ ...pin, pullType: newPullType })
          }
        />
      </div>
    </div>
  );
}

export default PinConfig;
