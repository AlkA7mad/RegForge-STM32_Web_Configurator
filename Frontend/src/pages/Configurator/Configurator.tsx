// Configurator.tsx

import { useState } from "react";
import PinConfig from "../../components/PinConfig/PinConfig";
import type { PinData } from "../../constants/PinConfig.types";
import { defaultPin } from "../../constants/gpioOptions";
import { generateGpioCode } from "../../api/gpioAPI";
import styles from "./Configurator.module.scss";

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
    <div className={styles.page}>
      <h1 className={styles.title}>MCUGen – STM32 Configurator</h1>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.configuration}>
            {pins.length === 0 ? (
              <div className={styles.empty}>
                No pins configurated yet. click "Add Pin" to get started
              </div>
            ) : (
              pins.map((pin, index) => (
                <PinConfig
                  key={index}
                  pin={pin}
                  onChange={(updatedPin) => {
                    setPins(pins.map((p, i) => (i === index ? updatedPin : p)));
                  }}
                  onRemove={() => setPins(pins.filter((_, i) => i !== index))}
                />
              ))
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => setPins([...pins, defaultPin])}
            >
              Add Pin
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleGenerate}
            >
              Generate Code
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.codePanel}>
            <div className={styles.panelLabel}>Generated Code</div>
            {generatedCode ? (
              <pre className={styles.code}>{generatedCode}</pre>
            ) : (
              <div className={styles.placeholder}>
                // Your initialization code will appear here
              </div>
            )}

            {errors.length > 0 && (
              <ul className={styles.errors}>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
