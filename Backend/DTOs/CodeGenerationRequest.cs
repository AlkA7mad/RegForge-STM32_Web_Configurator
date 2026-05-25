using MCUGen.Api.Models;

namespace MCUGen.Api.DTOs;

public class CodeGenerationRequest
{
    public string BoardId { get; set; }
    public Preferences Preferences { get; set; }
    public PeripheralConfig PeripheralConfig { get; set; }
}