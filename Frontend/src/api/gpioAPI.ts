import type { PinData } from "../constants/PinConfig.types";

interface CodeGenerationResult {
    success: boolean;
    generatedCode: string;
    errors: string[];
}

export async function generateGpioCode(pins: PinData[]): Promise<CodeGenerationResult> {
    
    const payload = pins.map(p => ({...p, pin: Number(p.pin) }));
    console.log(payload);

    const response = await fetch("http://localhost:5131/Gpio", {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    console.log(response);

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    return response.json();
    
}