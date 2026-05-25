using System.Text.Json;
using BoardModel = MCUGen.Api.Models.Board.Board;
using BoardDataModel = MCUGen.Api.Models.Board.BoardData;


namespace MCUGen.Api.Services.Board;

public class BoardService : IBoardService
{
    private Dictionary<string, BoardModel> _boards;
    private Dictionary<string, string> _boardFilePaths;

    private static readonly JsonSerializerOptions _options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

    public BoardService()
    {
        LoadBoards();
    }

    public List<BoardModel> GetBoards()
    {
        return _boards.Values.ToList();
    }

    public BoardDataModel GetBoardData(string boardId)
    {
        if (!_boardFilePaths.ContainsKey(boardId))
        {
            throw new KeyNotFoundException($"Board with id {boardId} not found");
        }
        
        string content = File.ReadAllText(_boardFilePaths[boardId]);
        BoardDataModel data = JsonSerializer.Deserialize<BoardDataModel>(content, _options);

        if (data == null)
        {
            throw new InvalidOperationException($"Something went wrong with {boardId}");
        }
        return data;
    }

    private void LoadBoards()
    {
        _boards = new Dictionary<string, BoardModel>();
        _boardFilePaths = new Dictionary<string, string>();
        
        var files = Directory.GetFiles("BoardDefinitions",  "*.json");

        foreach (var file in files)
        {
            string content = File.ReadAllText(file);
            
            var data = JsonSerializer.Deserialize<BoardDataModel>(content, _options);
            
            if (data == null) continue;

            _boards[data.Board.Id] = data.Board;
            _boardFilePaths[data.Board.Id] = file;
        }
    }
}