using RegForge.Api.DTOs;
using RegForge.Api.Models;

namespace RegForge.Api.Services;

public interface IGpioCodeGeneratorService
{
    public CodeGenerationResult GenerateGpioCode(List <GpioConfig> gpioConfig);
}