using MCUGen.Api.Models.Board;
using MCUGen.Api.Services.Board;
using Microsoft.AspNetCore.Mvc;

namespace MCUGen.Api.Controllers;

[ApiController]
[Route("boards")]
public class BoardController: ControllerBase
{
    private readonly IBoardService _boardService;

    public BoardController(IBoardService boardService)
    {
        _boardService = boardService;
    }

    [HttpGet]
    public ActionResult<List <Board>> GetBoards()
    {
        return Ok(_boardService.GetBoards());
    }
    
    
    [HttpGet("{id}/options")]
    public ActionResult<BoardData> GetBoardData(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Board ID must be provided.");
        }
        try
        {
            return Ok(_boardService.GetBoardData(id));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = $"Board '{id}' not found." });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Failed to load board data." });
        }
    }
}