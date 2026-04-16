using RegForge.Api.Models.Enum;

namespace RegForge.Api.Models;


public class GpioConfig
{
    public char Port { get; set; }
    public int Pin { get; set; }
    public PinMode Mode { get; set; }
    public OutputType OutputType { get; set; }
    public OutputSpeed OutputSpeed { get; set; }
    public PullType PullType { get; set; }
}