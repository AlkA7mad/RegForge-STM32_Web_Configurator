import type { Board, BoardData } from "../types/boardData.type";

export async function getBoards(): Promise<Board[]> {
    
    const response = await fetch("http://localhost:5131/boards");

    if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
    }

    const data: Board[] = await response.json();

    return data;
}

export async function getBoardData(boardId: string): Promise<BoardData> {
    
    const response = await fetch(`http://localhost:5131/boards/${boardId}/options`);

    if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
    }

    const data: BoardData = await response.json();

    return data;
}