using Microsoft.AspNetCore.Mvc;
using MCUGen.Api.Models;
using MCUGen.Api.Services;

namespace MCUGen.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class GpioController : ControllerBase
{
    private readonly IGpioCodeGeneratorService _gpioCodeGeneratorService;
    
    public GpioController(IGpioCodeGeneratorService gpioCodeGeneratorService)
    {
        _gpioCodeGeneratorService = gpioCodeGeneratorService;
    }
    
    [HttpPost]
    public ActionResult<string> Post([FromBody] List <GpioConfig> gpioConfig)
    {
        var result = _gpioCodeGeneratorService.GenerateGpioCode(gpioConfig);

        if (!result.Success)
        {
            return BadRequest(result.Errors);
        }
        
        return Ok(result.GeneratedCode);
    }
}