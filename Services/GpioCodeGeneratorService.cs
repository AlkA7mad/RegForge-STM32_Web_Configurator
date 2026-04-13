using RegForge.Api.Models;
using System.Text;

namespace RegForge.Api.Services;

public class GpioCodeGeneratorService : IGpioCodeGeneratorService
{

    public string GenerateGpioCode(GpioConfig gpioConfig)
    {
        var port = gpioConfig.Port.ToString().ToUpper();
        
        StringBuilder stringBuilder = new StringBuilder("// Please include CMSIS file of your STM32 Board");
        stringBuilder.AppendLine("\n");
        stringBuilder.AppendLine("// GPIO configuration");
        stringBuilder.AppendLine("\n");
        // Enable GPIO Clock
        stringBuilder.AppendLine($"// Enable GPIO{port}");
        stringBuilder.AppendLine($"RCC->AHB2ENR |= RCC_AHB2ENR_GPIO{port}EN;");
        stringBuilder.AppendLine("\n");

        // Set GPIO port mode
        stringBuilder.AppendLine("// Set GPIO port mode");
        stringBuilder.AppendLine($"GPIO{port}->MODER &= ~(3U << ({gpioConfig.Pin}U * 2U));");
        stringBuilder.AppendLine($"GPIO{port}->MODER |= ({(int)gpioConfig.Mode}U << ({gpioConfig.Pin}U * 2U));");
        stringBuilder.AppendLine("\n");
        // Set GPIO port output type
        if (gpioConfig.Mode == PinMode.OutputMode)
        {
            stringBuilder.AppendLine("// Set GPIO output type");
            stringBuilder.AppendLine($"GPIO{port}->OTYPER &= ~(1U << ({gpioConfig.Pin}U));");
            stringBuilder.AppendLine($"GPIO{port}->OTYPER |= ({(int)gpioConfig.OutputType}U << ({gpioConfig.Pin}U));");
            stringBuilder.AppendLine("\n");

            // Set GPIO port output speed if present
            if (gpioConfig.OutputSpeed != null)
            {
                stringBuilder.AppendLine("// Set GPIO port speed");
                stringBuilder.AppendLine($"GPIO{port}->OSPEEDR &= ~(3U << ({gpioConfig.Pin}U * 2U));");
                stringBuilder.AppendLine(
                    $"GPIO{port}->OSPEEDR |= ({(int)gpioConfig.OutputSpeed}U << ({gpioConfig.Pin}U * 2U));");
                stringBuilder.AppendLine("\n");
            }
        }

        if (gpioConfig.Mode == PinMode.AlternateFunction)
        {
            stringBuilder.AppendLine("// alternate function coming soon");
            stringBuilder.AppendLine("\n");
        }
        
        // Set GPIO port pull-up/pull-down
        stringBuilder.AppendLine("// Set GPIO pull type");
        stringBuilder.AppendLine($"GPIO{port}->PUPDR &= ~(3U << ({gpioConfig.Pin}U * 2U));");
        stringBuilder.AppendLine($"GPIO{port}->PUPDR |= ({(int)gpioConfig.PullType}U << ({gpioConfig.Pin}U * 2U));");
        
        
        return stringBuilder.ToString();
    }
}