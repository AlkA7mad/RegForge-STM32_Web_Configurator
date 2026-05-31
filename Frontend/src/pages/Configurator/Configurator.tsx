import { useEffect, useState } from "react";

import PinConfig from "../../components/PinConfig/PinConfig";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import type { BoardData } from "../../constants/boardData.type";
import type { BoardConfigs } from "../../constants/configs.type";
import type { GpioDropdownOptions } from "../../constants/boardData.type";
import type { PinData } from "../../constants/PinConfig.type";
import { defaultPin } from "../../constants/PinConfig.type";

import { generateCode } from "../../api/generateCodeAPI";
import { getBoardData } from "../../api/boardAPI";

import { transformOptions } from "../../utils/transformOptions";

import styles from "./Configurator.module.scss";

function Configurator() {
  const [pins, setPins] = useState<PinData[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [options, setOptions] = useState<GpioDropdownOptions | null>(null);

  useEffect(() => {
    async function laodBoardData() {
      const data = await getBoardData("NUCLEO-G431RB");
      setBoardData(data);
      setOptions(transformOptions(data.gpio));
    }
    laodBoardData();
  }, []);

  async function handleGenerate() {
    try {
      if (pins.length === 0) {
        setErrors(["Add at least one pin before generating code"]);
        return;
      }

      setIsLoading(true);

      const configs: BoardConfigs = {
        boardId: "NUCLEO-G431RB",
        preferences: {
          language: "",
          abstraction: ""
        },
        peripheralConfig: {
          gpioConfigs: pins
        }
      };

      const result = await generateCode(configs);
      if (result.success) {
        setGeneratedCode(result.generatedCode);
        setErrors([]);
      } else {
        setGeneratedCode("");
        setErrors(result.errors);
      }
    } catch (err) {
      setErrors([
        `Network error: ${err instanceof Error ? err.message : "unknown"}`,
      ]);
      setGeneratedCode("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleRemove(pin: PinData) {
    const newPins = pins.filter((p) => p.id !== pin.id);
    setPins(newPins);
    if (newPins.length === 0) {
      setGeneratedCode("");
      setErrors([]);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MCUGen – STM32 Configurator</h1>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.configuration}>
            {options === null || boardData === null ? (
              <div>Loading board data...</div>
            ) : pins.length === 0 ? (
              <div className={styles.empty}>
                No pins configurated yet. click "Add Pin" to get started
              </div>
            ) : (
              pins.map((pin) => (
                <PinConfig
                  key={pin.id}
                  pin={pin}
                  options={options}
                  ports={boardData.gpio.ports}
                  onChange={(updatedPin) => {
                    setPins(
                      pins.map((p) => (p.id === pin.id ? updatedPin : p)),
                    );
                  }}
                  onRemove={() => handleRemove(pin)}
                />
              ))
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() =>
                setPins([...pins, { ...defaultPin, id: crypto.randomUUID() }])
              }
              disabled={isLoading}
            >
              Add Pin
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleGenerate}
              disabled={isLoading}
            >
              Generate Code
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.codePanel}>
            <div className={styles.panelLabel}>Generated Code</div>
            {isLoading ? (
              <LoadingSpinner />
            ) : generatedCode ? (
              <pre className={styles.code}>{generatedCode}</pre>
            ) : (
              <div className={styles.placeholder}></div>
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
