import React, { useState, useEffect } from 'react';
import Board from './Board';
import Header from './Header';
import { GameState, GameStatus } from '../types';
import { createBoard, revealCell, checkWin } from '../utils/gameLogic';
import '../styles/Game.css';

interface GameProps {
  rows?: number;
  cols?: number;
  mines?: number;
}

type Difficulty = 'beginner' | 'intermediate' | 'expert';

interface DifficultySettings {
  rows: number;
  cols: number;
  mines: number;
}

const difficultyPresets: Record<Difficulty, DifficultySettings> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 }
};

const Game: React.FC<GameProps> = ({ 
  rows: initialRows = 10, 
  cols: initialCols = 10, 
  mines: initialMines = 15 
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [settings, setSettings] = useState<DifficultySettings>({
    rows: initialRows,
    cols: initialCols,
    mines: initialMines
  });
  
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    mineCount: settings.mines,
    flagCount: 0,
    status: 'idle'
  });

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [settings]);

  const resetGame = () => {
    setGameState({
      board: createBoard(settings.rows, settings.cols, settings.mines),
      mineCount: settings.mines,
      flagCount: 0,
      status: 'idle'
    });
  };
  
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = e.target.value as Difficulty;
    setDifficulty(newDifficulty);
    setSettings(difficultyPresets[newDifficulty]);
  };

  const handleCellClick = (row: number, col: number) => {
    // Ignore clicks if game is over or cell is flagged
    if (gameState.status === 'won' || gameState.status === 'lost') {
      return;
    }

    const cell = gameState.board[row][col];
    if (cell.isFlagged) {
      return;
    }

    // Start game on first click
    if (gameState.status === 'idle') {
      setGameState(prev => ({ ...prev, status: 'playing' }));
    }

    // Handle mine click
    if (cell.isMine) {
      // Reveal all mines
      const revealedBoard = gameState.board.map(row => 
        row.map(cell => 
          cell.isMine ? { ...cell, isRevealed: true } : cell
        )
      );
      
      setGameState(prev => ({
        ...prev,
        board: revealedBoard,
        status: 'lost'
      }));
      return;
    }

    // Reveal cell and check for win
    const newBoard = revealCell(gameState.board, row, col);
    const hasWon = checkWin(newBoard);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      status: hasWon ? 'won' : prev.status
    }));
  };

  const handleCellRightClick = (row: number, col: number) => {
    // Ignore right-clicks if game is over or cell is revealed
    if (gameState.status === 'won' || gameState.status === 'lost') {
      return;
    }

    const cell = gameState.board[row][col];
    if (cell.isRevealed) {
      return;
    }

    // Start game on first right-click
    if (gameState.status === 'idle') {
      setGameState(prev => ({ ...prev, status: 'playing' }));
    }

    // Toggle flag
    const newBoard = [...gameState.board];
    newBoard[row][col] = {
      ...cell,
      isFlagged: !cell.isFlagged
    };

    const newFlagCount = gameState.flagCount + (cell.isFlagged ? -1 : 1);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      flagCount: newFlagCount
    }));
  };

  return (
    <div className="game">
      <Header
        mineCount={gameState.mineCount}
        flagCount={gameState.flagCount}
        status={gameState.status}
        onReset={resetGame}
      />
      <Board
        board={gameState.board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
      <div className="controls">
        <select 
          className="difficulty-select" 
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button className="new-game-button" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Game;
