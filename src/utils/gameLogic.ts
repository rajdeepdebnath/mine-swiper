import { CellData, GameState } from '../types';

// Create a new board with randomly placed mines
export const createBoard = (rows: number, cols: number, mines: number): CellData[][] => {
  // Initialize empty board
  const board: CellData[][] = Array(rows).fill(null).map((_, rowIndex) => 
    Array(cols).fill(null).map((_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }))
  );
  
  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
  
  // Calculate neighbor mines
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighborMines = countNeighborMines(board, row, col);
      }
    }
  }
  
  return board;
};

// Count mines in neighboring cells
export const countNeighborMines = (board: CellData[][], row: number, col: number): number => {
  const rows = board.length;
  const cols = board[0].length;
  let count = 0;
  
  // Check all 8 neighboring cells
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      if (r !== row || c !== col) {
        if (board[r][c].isMine) {
          count++;
        }
      }
    }
  }
  
  return count;
};

// Reveal a cell and its neighbors if it has no adjacent mines
export const revealCell = (board: CellData[][], row: number, col: number): CellData[][] => {
  let newBoard = [...board.map(row => [...row])];
  
  // If already revealed or flagged, do nothing
  if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
    return newBoard;
  }
  
  // Reveal the cell
  newBoard[row][col].isRevealed = true;
  
  // If cell has no neighboring mines, reveal neighbors
  if (newBoard[row][col].neighborMines === 0 && !newBoard[row][col].isMine) {
    const rows = newBoard.length;
    const cols = newBoard[0].length;
    
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        if (r !== row || c !== col) {
          if (!newBoard[r][c].isRevealed && !newBoard[r][c].isFlagged) {
            newBoard = revealCell(newBoard, r, c);
          }
        }
      }
    }
  }
  
  return newBoard;
};

// Check if the game is won
export const checkWin = (board: CellData[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // If there's a non-mine cell that's not revealed, game is not won yet
      if (!board[row][col].isMine && !board[row][col].isRevealed) {
        return false;
      }
    }
  }
  return true;
};
import { CellData, GameState } from '../types';

// Create a new board with randomly placed mines
export const createBoard = (rows: number, cols: number, mines: number): CellData[][] => {
  // Initialize empty board
  const board: CellData[][] = Array(rows).fill(null).map((_, rowIndex) => 
    Array(cols).fill(null).map((_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }))
  );
  
  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
  
  // Calculate neighbor mines
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighborMines = countNeighborMines(board, row, col);
      }
    }
  }
  
  return board;
};

// Count mines in neighboring cells
export const countNeighborMines = (board: CellData[][], row: number, col: number): number => {
  const rows = board.length;
  const cols = board[0].length;
  let count = 0;
  
  // Check all 8 neighboring cells
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      if (r !== row || c !== col) {
        if (board[r][c].isMine) {
          count++;
        }
      }
    }
  }
  
  return count;
};

// Reveal a cell and its neighbors if it has no adjacent mines
export const revealCell = (board: CellData[][], row: number, col: number): CellData[][] => {
  let newBoard = [...board.map(row => [...row])];
  
  // If already revealed or flagged, do nothing
  if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
    return newBoard;
  }
  
  // Reveal the cell
  newBoard[row][col].isRevealed = true;
  
  // If cell has no neighboring mines, reveal neighbors
  if (newBoard[row][col].neighborMines === 0 && !newBoard[row][col].isMine) {
    const rows = newBoard.length;
    const cols = newBoard[0].length;
    
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        if (r !== row || c !== col) {
          if (!newBoard[r][c].isRevealed && !newBoard[r][c].isFlagged) {
            newBoard = revealCell(newBoard, r, c);
          }
        }
      }
    }
  }
  
  return newBoard;
};

// Check if the game is won
export const checkWin = (board: CellData[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // If there's a non-mine cell that's not revealed, game is not won yet
      if (!board[row][col].isMine && !board[row][col].isRevealed) {
        return false;
      }
    }
  }
  return true;
};
