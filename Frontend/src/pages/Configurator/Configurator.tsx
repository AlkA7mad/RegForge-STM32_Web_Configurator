// Configurator.tsx

import { useState } from "react";
import PinConfig from "../../components/PinConfig/PinConfig";
import type { PinData } from "../../constants/PinConfig.types";
import { defaultPin } from "../../constants/gpioOptions";
import { generateGpioCode } from "../../api/gpioAPI";

function Configurator() {
  const [pins, setPins] = useState<PinData[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleGenerate() {
    try {
      const result = await generateGpioCode(pins);
      if (result.success) {
        setGeneratedCode(result.generatedCode);
        setErrors([]);
      } else {
        setGeneratedCode("");
        setErrors(result.errors);
      }

      if (pins.length === 0) {
        setErrors(["Add at least one pin before generating code"]);
        return;
      }
    } catch (err) {
      setErrors([
        `Network error: ${err instanceof Error ? err.message : "unknown"}`,
      ]);
      setGeneratedCode("");
    }
  }

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
        <button onClick={handleGenerate}>Generate Code</button>

        <div className="generatedCode">
          <label>Generated Code</label>
          {generatedCode && <pre>{generatedCode}</pre>}
          <label>Errors</label>

          {errors.length > 0 && (
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Configurator;
