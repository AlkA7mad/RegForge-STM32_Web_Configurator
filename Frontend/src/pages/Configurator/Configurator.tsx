import { useState } from "react";
import PinConfig from "../../components/PinConfig/PinConfig";
import type { PinData } from "../../constants/PinConfig.types";
import { defaultPin } from "../../constants/gpioOptions";

function Configurator() {
  const [pins, setPins] = useState<PinData[]>([]);

  return (
    <>
      <div>
        <h1>MCUGen – STM32 Configurator</h1>
        <div className="configuration">
          {pins.map((pin, index) => (
            <PinConfig
              key={index}
              pin={pin}
              onChange={(updatedPin) => {
                setPins(pins.map((p, i) => (i === index ? updatedPin : p)));
              }}
              onRemove={() => setPins(pins.filter((_, i) => i !== index))}
            />
          ))}
        </div>
        <button onClick={() => setPins([...pins, defaultPin])}>Add Pin</button>
        <button>Generate Code</button>

        <div className="generatedCode"></div>
      </div>
    </>
  );
}

export default Configurator;
