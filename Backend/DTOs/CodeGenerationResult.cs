using System.ComponentModel.DataAnnotations;

namespace RegForge.Api.DTOs;

public class CodeGenerationResult
{
    public bool Success { get; set; } = true;
    public string GeneratedCode { get; set; }
    public List<string> Errors { get; set; } = new List<string>();
}