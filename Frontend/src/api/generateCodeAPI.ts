import type { BoardConfigs } from "../constants/configs.type";


interface CodeGenerationResult {
  success: boolean;
  generatedCode: string;
  errors: string[];
}

export async function generateCode(
  configs: BoardConfigs,
): Promise<CodeGenerationResult> {

  const payload = {
    ...configs,
    peripheralConfig: {
      gpioConfigs: configs.peripheralConfig.gpioConfigs.map((p) => ({
        ...p,
        pin: Number(p.pin),
      })),
    },
  };

  const response = await fetch("http://localhost:5131/CodeGenerator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.status >= 500) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data: CodeGenerationResult = await response.json();

  return data;
}
