# RegForge-STM32_Web_Configurator

🚧 **Work in Progress**

RegForge is a web-based configuration tool for the STM32 Nucleo-G431RB microcontroller. It takes GPIO pin configurations as input through a REST API and generates ready-to-use bare-metal C initialization code using CMSIS headers.

## Why?

STM32CubeMX is powerful but complex and not available as a web application. RegForge aims to simplify the configuration process for common tasks like GPIO setup, providing a lightweight and user-friendly alternative.

## Tech Stack

- **Backend:** C# / ASP.NET Core Web API (.NET 8)
- **Frontend:** TypeScript / React / Vite *(planned)*

## Current Features (V1.2)

- Multi-pin GPIO configuration via single POST request
- Automatic duplicate-free RCC clock enable per port
- Supported registers: MODER, OTYPER, OSPEEDR, PUPDR
- Grouped code output (all clocks → all MODER → all OTYPER → etc.)
- Code generation using CMSIS naming conventions (`RCC->AHB2ENR`, `GPIOx->MODER`, etc.)
- Input validation with error messages:
    - Invalid port detection (only A, B, C, D allowed)
    - Invalid pin range detection (0-15)
    - Duplicate pin configuration detection

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

Response:
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

```bash
cd RegForge.Api
dotnet run
```

## License

This project is licensed under the GPL-3.0 Licence - see the [LICENSE](LICENSE) file for details.
