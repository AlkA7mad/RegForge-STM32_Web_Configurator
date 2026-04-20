using MCUGen.Api.DTOs;
using MCUGen.Api.Models;

namespace MCUGen.Api.Services;

public interface IGpioCodeGeneratorService
{
    public CodeGenerationResult GenerateGpioCode(List <GpioConfig> gpioConfig);
}