# RegForge-STM32_Web_Configurator

🚧 **Work in Progress**

RegForge is a web-based configuration tool for the STM32 Nucleo-G431RB microcontroller. It takes GPIO pin configurations as input through a REST API and generates ready-to-use bare-metal C initialization code using CMSIS headers.

## Why?

STM32CubeMX is powerful but complex and not available as a web application. RegForge aims to simplify the configuration process for common tasks like GPIO setup, providing a lightweight and user-friendly alternative.

## Tech Stack

- **Backend:** C# / ASP.NET Core Web API (.NET 8)
- **Frontend:** TypeScript / React / Vite *(planned)*

## Current Features (V1)

- GPIO pin configuration via POST endpoint
- Supported registers: MODER, OTYPER, OSPEEDR, PUPDR
- Code generation using CMSIS naming conventions (`RCC->AHB2ENR`, `GPIOx->MODER`, etc.)

## API Usage

**POST** `/Gpio`

Request body:
```json
{
  "port": "A",
  "pin": 5,
  "mode": "OutputMode",
  "outputType": "OutputPushPull",
  "outputSpeed": "LowSpeed",
  "pullType": "NoPull"
}
```

Response:
```c
// Please include CMSIS file of your STM32 Board

// GPIO configuration

// Enable GPIOA
RCC->AHB2ENR |= RCC_AHB2ENR_GPIOAEN;

// Set GPIO port mode
GPIOA->MODER &= ~(3U << (5U * 2U));
GPIOA->MODER |= (1U << (5U * 2U));

// Set GPIO output type
GPIOA->OTYPER &= ~(1U << (5U));
GPIOA->OTYPER |= (0U << (5U));

// Set GPIO port speed
GPIOA->OSPEEDR &= ~(3U << (5U * 2U));
GPIOA->OSPEEDR |= (0U << (5U * 2U));

// Set GPIO pull type
GPIOA->PUPDR &= ~(3U << (5U * 2U));
GPIOA->PUPDR |= (0U << (5U * 2U));
```

## Supported Board

| Board | Package | GPIO Ports |
|---|---|---|
| STM32G431RB | LQFP64 | A (0-15), B (0-15), C (0-15), D (2) |
