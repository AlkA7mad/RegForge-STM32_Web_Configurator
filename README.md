# MCUGen

🚧 **Work in Progress**

MCUGen is a web-based configuration tool for the STM32 Nucleo-G431RB microcontroller. It takes GPIO pin configurations as input through a REST API and generates ready-to-use bare-metal C initialization code using CMSIS headers.

## Why?

STM32CubeMX is powerful but complex and not available as a web application. MCUGen aims to simplify the configuration process for common tasks like GPIO setup, providing a lightweight and user-friendly alternative.

## Tech Stack

- **Backend:** C# / ASP.NET Core Web API (.NET 10)
- **Frontend:** TypeScript / React / Vite

## Current Features (V1.3)

### Backend

- Multi-pin GPIO configuration via single POST request
- Automatic duplicate-free RCC clock enable per port
- Supported registers: MODER, OTYPER, OSPEEDR, PUPDR
- Grouped code output (all clocks → all MODER → all OTYPER → etc.)
- Code generation using CMSIS naming conventions (`RCC->AHB2ENR`, `GPIOx->MODER`, etc.)
- Input validation with error messages:
  - Invalid port detection (only A, B, C, D allowed)
  - Invalid pin range detection (0–15)
  - Duplicate pin configuration detection

### Frontend

- Interactive GPIO pin configuration form
- Reusable, typed `Dropdown` component
- Per-pin `PinConfig` component with 6 configurable fields (port, pin, mode, output type, speed, pull type)
- Add/remove pins dynamically
- Generate Code button triggers POST request to backend
- Display generated C code or validation errors from the backend
- TypeScript + SCSS design tokens foundation

## API Usage

**POST** `/Gpio`

Request body:
```json
[
  {
    "port": "A",
    "pin": 5,
    "mode": "OutputMode",
    "outputType": "OutputPushPull",
    "outputSpeed": "LowSpeed",
    "pullType": "NoPull"
  },
  {
    "port": "B",
    "pin": 3,
    "mode": "InputMode",
    "outputType": "OutputPushPull",
    "outputSpeed": "LowSpeed",
    "pullType": "PullUp"
  }
]
```

**Response:**

```json
{
  "success": true,
  "generatedCode": "// Please include CMSIS file of your STM32 Board\n// GPIO configuration\n...",
  "errors": []
}
```
**Example generated code:**
```c
// Please include CMSIS file of your STM32 Board
// GPIO configuration
 
/**
 * Clock configuration
 * Enable Clock(s): A, B
 */
 
// Enable GPIOA
RCC->AHB2ENR |= RCC_AHB2ENR_GPIOAEN;
 
// Enable GPIOB
RCC->AHB2ENR |= RCC_AHB2ENR_GPIOBEN;
 
/**
 * MODER configuration
 */
 
// Set GPIOA port mode = OutputMode | Pin = 5
GPIOA->MODER &= ~(3U << (5U * 2U));
GPIOA->MODER |= (1U << (5U * 2U));
 
// Set GPIOB port mode = InputMode | Pin = 3
GPIOB->MODER &= ~(3U << (3U * 2U));
GPIOB->MODER |= (0U << (3U * 2U));
 
/**
 * OTYPER configuration
 */
 
// Set GPIOA output type | Pin = 5
GPIOA->OTYPER &= ~(1U << (5U));
GPIOA->OTYPER |= (0U << (5U));
 
/**
 * PUPDR configuration
 */
 
// Set GPIOA pull type | Pin = 5
GPIOA->PUPDR &= ~(3U << (5U * 2U));
GPIOA->PUPDR |= (0U << (5U * 2U));
 
// Set GPIOB pull type | Pin = 3
GPIOB->PUPDR &= ~(3U << (3U * 2U));
GPIOB->PUPDR |= (1U << (3U * 2U));
```

## Supported Board

| Board | Package | GPIO Ports |
|---|---|---|
| STM32G431RB | LQFP64 | A (0-15), B (0-15), C (0-15), D (2) |

## Getting Started

### Backend

```bash
cd MCUGen.Api
dotnet run
```

Backend runs at `http://localhost:5131`.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173/configurator`.

## License

This project is licensed under the GPL-3.0 Licence - see the [LICENSE](LICENSE) file for details.
