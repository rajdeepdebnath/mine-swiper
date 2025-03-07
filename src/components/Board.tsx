import React from 'react';
import Cell from './Cell';
import { CellData } from '../types';
import '../styles/Board.css';

interface BoardProps {
  board: CellData[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellRightClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data={cell}
              onClick={onCellClick}
              onRightClick={onCellRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
