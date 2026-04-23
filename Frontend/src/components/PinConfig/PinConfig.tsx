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

function PinConfig({ pin, onChange, onRemove }: PinConfigProps) {
  return (
    <>
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
      <button onClick={onRemove}>Remove</button>
    </>
  );
}

export default PinConfig;
