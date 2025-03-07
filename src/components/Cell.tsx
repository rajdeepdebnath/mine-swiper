import React from 'react';
import { CellData } from '../types';
import '../styles/Cell.css';

interface CellProps {
  data: CellData;
  onClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ data, onClick, onRightClick }) => {
  const handleClick = () => {
    onClick(data.row, data.col);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick(data.row, data.col);
  };

  const getCellContent = () => {
    if (data.isFlagged) return '🚩';
    if (!data.isRevealed) return '';
    if (data.isMine) return '💣';
    return data.neighborMines > 0 ? data.neighborMines : '';
  };

  const getCellClass = () => {
    let className = 'cell';
    if (data.isRevealed) {
      className += ' revealed';
      if (data.isMine) {
        className += ' mine';
      } else {
        className += ` neighbors-${data.neighborMines}`;
      }
    }
    return className;
  };

  return (
    <div 
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;
