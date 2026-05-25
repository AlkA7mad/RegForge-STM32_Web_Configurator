using MCUGen.Api.Models.Peripherals;

namespace MCUGen.Api.Models;

public class PeripheralConfig
{
    public List<GpioConfig>? GpioConfigs { get; set; }
}