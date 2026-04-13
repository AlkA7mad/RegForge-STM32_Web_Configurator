using RegForge.Api.Models;

namespace RegForge.Api.Services;

public interface IGpioCodeGeneratorService
{
    public string GenerateGpioCode(GpioConfig gpioConfig);
}