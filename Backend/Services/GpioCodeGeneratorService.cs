using MCUGen.Api.Models;
using System.Text;
using MCUGen.Api.DTOs;

namespace MCUGen.Api.Services;

public class GpioCodeGeneratorService : IGpioCodeGeneratorService
{
    public CodeGenerationResult GenerateGpioCode(List <GpioConfig> gpioConfig)
    {
        // Validate configuration
        var validationResult = ValidateConfig(gpioConfig);
        if (!validationResult.Success)
        {
            return validationResult;
        }
        // Get all unique ports in uppercase into a list
        var distinctPorts = gpioConfig.Select(x => x.Port.ToString().ToUpper()).Distinct().ToList();
        
        StringBuilder stringBuilder = new StringBuilder("// Please include CMSIS file of your STM32 Board\n");
        stringBuilder.AppendLine("// GPIO configuration\n");

        // Enable GPIO Clocks
        EnableClock(stringBuilder, distinctPorts);

        // Configure MODER
        ConfigureModer(stringBuilder, gpioConfig);
        
        if (gpioConfig.Any(x => x.Mode == PinMode.OutputMode))
        {
            // Configure OTYPER
            ConfigureOtyper(stringBuilder, gpioConfig);
        
            // Configure OSPEEDR
            ConfigureOspeedr(stringBuilder, gpioConfig);
        }
        
        // Configure PUPDR
        ConfigurePupdr(stringBuilder, gpioConfig);

        if (gpioConfig.Any(x => x.Mode == PinMode.AlternateFunction))
        {
            // Configure AF
            ConfigureAlternateFunction(stringBuilder, gpioConfig);
        }

        return new CodeGenerationResult
        {
            Success = true,
            GeneratedCode = stringBuilder.ToString(),
            Errors = new List<string>()
        };
    }

    private void EnableClock(StringBuilder sb, List<string> distinctPorts)
    {
        sb.AppendLine("/**\n" +
                      " * Clock configuration\n" +
                      $" * Enable Clock(s): {string.Join(",", distinctPorts)}\n" +
                      " */\n"
                      );
        foreach (var port in distinctPorts)
        {
            sb.AppendLine($"// Enable GPIO{port}");
            sb.AppendLine($"RCC->AHB2ENR |= RCC_AHB2ENR_GPIO{port}EN;\n");
        }
    }

    private void ConfigureModer(StringBuilder sb, List<GpioConfig> gpioConfig)
    {
        sb.AppendLine("/**\n" +
                      " * MODER configuration\n" +
                      " */\n"
                      );
        foreach (var config in gpioConfig)
        {
            var port = config.Port.ToString().ToUpper();
            sb.AppendLine($"// Set GPIO{port} port mode = {config.Mode} | Pin = {config.Pin}");
            sb.AppendLine($"GPIO{port}->MODER &= ~(3U << ({config.Pin}U * 2U));");
            sb.AppendLine($"GPIO{port}->MODER |= ({(int)config.Mode}U << ({config.Pin}U * 2U));\n");

        }
    }

    private void ConfigureOtyper(StringBuilder sb, List<GpioConfig> gpioConfig)
    {
        sb.AppendLine("/**\n" +
                      " * OTYPER configuration\n" +
                      " */\n"
                      );
        foreach (var config in gpioConfig)
        {
            var port = config.Port.ToString().ToUpper();
            if (config.Mode == PinMode.OutputMode)
            {
                sb.AppendLine($"// Set GPIO{port} output type | Pin = {config.Pin}");
                sb.AppendLine($"GPIO{port}->OTYPER &= ~(1U << ({config.Pin}U));");
                sb.AppendLine($"GPIO{port}->OTYPER |= ({(int)config.OutputType}U << ({config.Pin}U));\n");
            }
        }
    }

    private void ConfigureOspeedr(StringBuilder sb, List<GpioConfig> gpioConfig)
    {
        sb.AppendLine("/**\n" +
                      " * OSPEEDR configuration\n" +
                      " */\n"
                      );
        foreach (var config in gpioConfig)
        {
            var port = config.Port.ToString().ToUpper();
            
            if (config.OutputSpeed != null && config.Mode == PinMode.OutputMode)
            {
                sb.AppendLine($"// Set GPIO{port} port speed | Pin = {config.Pin}");
                sb.AppendLine($"GPIO{port}->OSPEEDR &= ~(3U << ({config.Pin}U * 2U));");
                sb.AppendLine(
                    $"GPIO{port}->OSPEEDR |= ({(int)config.OutputSpeed}U << ({config.Pin}U * 2U));\n");
            }
        }
    }

    private void ConfigurePupdr(StringBuilder sb, List<GpioConfig> gpioConfig)
    {
        sb.AppendLine("/**\n" +
                      " * PUPDR configuration\n" +
                      " */\n"
                      );
        foreach (var config in gpioConfig)
        {
            var port = config.Port.ToString().ToUpper();
            sb.AppendLine($"// Set GPIO{port} pull type | Pin = {config.Pin}");
            sb.AppendLine($"GPIO{port}->PUPDR &= ~(3U << ({config.Pin}U * 2U));");
            sb.AppendLine($"GPIO{port}->PUPDR |= ({(int)config.PullType}U << ({config.Pin}U * 2U));\n");
            
        }
    }

    private void ConfigureAlternateFunction(StringBuilder sb, List<GpioConfig> gpioConfig)
    {
        sb.AppendLine("/**\n" +
                      " * Alternate function configuration\n" +
                      " */\n"
        );
        sb.AppendLine("// Alternate function coming soon!");
    }

    private CodeGenerationResult ValidateConfig(List<GpioConfig> gpioConfig)
    {
        // Validation only for STM32 Nucleo G431RB (temp solution)
        CodeGenerationResult codeGenerationResult =  new CodeGenerationResult();

        // Define allowed ports
        var allowedPorts = new List<char> { 'A',  'B', 'C', 'D', 'a', 'b', 'c', 'd' };
        // Define allowed pin range
        var allowedPins = Enumerable.Range(0, 16).ToList();
        // Define duplicates
        var duplicates = gpioConfig
            .GroupBy(x => new { x.Port, x.Pin})
            .Any(y => y.Count() > 1);
        
        if (gpioConfig.Count == 0)
        {
            codeGenerationResult.Success = false;
            codeGenerationResult.Errors.Add("No GPIO config found");
        }

        if (gpioConfig.Any(x => !allowedPorts.Contains(x.Port)))
        {
            codeGenerationResult.Success = false;
            codeGenerationResult.Errors.Add("Invalid GPIO port");
        }

        if (gpioConfig.Any(x => !allowedPins.Contains(x.Pin)))
        {
            codeGenerationResult.Success = false;
            codeGenerationResult.Errors.Add("Invalid GPIO pin");
        }

        if (duplicates)
        {
            codeGenerationResult.Success = false;
            codeGenerationResult.Errors.Add("Duplicate GPIO pin configuration found");
        }
        return  codeGenerationResult;
    }
}