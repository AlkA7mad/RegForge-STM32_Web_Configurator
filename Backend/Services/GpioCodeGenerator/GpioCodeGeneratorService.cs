using MCUGen.Api.Models;
using MCUGen.Api.DTOs;
using Scriban;

namespace MCUGen.Api.Services.GpioCodeGenerator;

public class GpioCodeGeneratorService : IGpioCodeGeneratorService
{
    public CodeGenerationResult GenerateGpioCode(List <GpioConfig> gpioConfig)
    {
        var validationResult = ValidateConfig(gpioConfig);
        if (!validationResult.Success)
        {
            return validationResult;
        }

        var templateData = new
        {
            ports = gpioConfig.Select(x => x.Port.ToString().ToUpper()).Distinct().ToList(),
            has_outputs = gpioConfig.Any(x => x.Mode == PinMode.Output),
            has_alternate_functions = gpioConfig.Any(x => x.Mode == PinMode.AlternateFunction),
            pins = gpioConfig.Select(config => new
            {
                port = config.Port.ToString().ToUpper(),
                pin = config.Pin,
                mode = config.Mode.ToString(),
                mode_value = (int)config.Mode,
                output_type_value = (int)config.OutputType,
                output_speed_value = (int)config.OutputSpeed,
                pull_type_value    = (int)config.PullType,
            }).ToList()
        };

        var templateText = File.ReadAllText("CodeGeneratorTemplates/BareMetal/gpio.sbn");
        var template = Template.Parse(templateText);
        var generatedCode = template.Render(templateData);
        
        return new CodeGenerationResult()
        {
            Success = true,
            GeneratedCode = generatedCode,
            Errors = new List<string>()
        };
    }

    private CodeGenerationResult ValidateConfig(List<GpioConfig> gpioConfig)
    {
        // Validation only for STM32 Nucleo G431RB (temp solution)
        CodeGenerationResult codeGenerationResult =  new CodeGenerationResult();

        var allowedPorts = new List<char> { 'A',  'B', 'C', 'D', 'a', 'b', 'c', 'd' };
        var allowedPins = Enumerable.Range(0, 16).ToList();
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