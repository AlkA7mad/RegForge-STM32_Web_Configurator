using MCUGen.Api.DTOs;

namespace MCUGen.Api.Services.CodeGenerator;

public interface ICodeGeneratorService
{
    public CodeGenerationResult GenerateCode(CodeGenerationRequest request);
}