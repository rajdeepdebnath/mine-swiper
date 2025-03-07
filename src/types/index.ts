export interface CellData {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameState {
  board: CellData[][];
  mineCount: number;
  flagCount: number;
  status: GameStatus;
}
export interface CellData {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameState {
  board: CellData[][];
  mineCount: number;
  flagCount: number;
  status: GameStatus;
}
