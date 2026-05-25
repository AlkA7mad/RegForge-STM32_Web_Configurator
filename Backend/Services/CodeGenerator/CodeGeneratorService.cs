using MCUGen.Api.Models.Enum;
using MCUGen.Api.DTOs;
using MCUGen.Api.Services.Board;
using Scriban;

namespace MCUGen.Api.Services.CodeGenerator;

public class CodeGeneratorService : ICodeGeneratorService
{
    private readonly IBoardService _boardService;

    public CodeGeneratorService(IBoardService boardService)
    {
        _boardService = boardService;
    }
    public CodeGenerationResult GenerateCode(CodeGenerationRequest request)
    {
        if (request.PeripheralConfig.GpioConfigs != null)
        {
            var gpioConfig = request.PeripheralConfig.GpioConfigs;
            var validationResult = ValidateConfig(request);
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

        return new CodeGenerationResult();
    }

    private CodeGenerationResult ValidateConfig(CodeGenerationRequest request)
    {
        var boardData =  _boardService.GetBoardData(request.BoardId);
        CodeGenerationResult codeGenerationResult =  new CodeGenerationResult();

        if (request.PeripheralConfig.GpioConfigs != null)
        {
            var gpioConfig = request.PeripheralConfig.GpioConfigs;
            
            var duplicates = gpioConfig
                .GroupBy(x => new { x.Port, x.Pin})
                .Any(y => y.Count() > 1);
        
            if (gpioConfig.Count == 0)
            {
                codeGenerationResult.Success = false;
                codeGenerationResult.Errors.Add("No GPIO config found");
            }

            foreach (var config in gpioConfig)
            {
                var portKey = $"GPIO{config.Port.ToString().ToUpper()}";
                if (!boardData.Gpio.Ports.TryGetValue(portKey, out var portInfo))
                {
                    codeGenerationResult.Success = false;
                    codeGenerationResult.Errors.Add("Invalid GPIO port");
                    continue;
                }

                if (!boardData.Gpio.Ports[portKey].Pins.Contains(config.Pin))
                {
                    codeGenerationResult.Success = false;
                    codeGenerationResult.Errors.Add("Invalid GPIO pin");
                }
            }
            
            if (duplicates)
            {
                codeGenerationResult.Success = false;
                codeGenerationResult.Errors.Add("Duplicate GPIO pin configuration found");
            }
        }
        
        return  codeGenerationResult;
    }
}