using MCUGen.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using MCUGen.Api.Services.CodeGenerator;

namespace MCUGen.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CodeGeneratorController : ControllerBase
{
    private readonly ICodeGeneratorService _codeGeneratorService;
    
    public CodeGeneratorController(ICodeGeneratorService codeGeneratorService)
    {
        _codeGeneratorService = codeGeneratorService;
    }
    
    [HttpPost]
    public ActionResult<CodeGenerationResult> Post([FromBody] CodeGenerationRequest request)
    {
        var result = _codeGeneratorService.GenerateCode(request);

        if (!result.Success)
        {
            return BadRequest(result);
        }
        
        return Ok(result);
    }
}