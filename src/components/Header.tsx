import React from 'react';
import { GameStatus } from '../types';
import '../styles/Header.css';

interface HeaderProps {
  mineCount: number;
  flagCount: number;
  status: GameStatus;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ mineCount, flagCount, status, onReset }) => {
  const getStatusText = () => {
    switch (status) {
      case 'idle': return 'Ready to play!';
      case 'playing': return 'Game in progress';
      case 'won': return 'You won! 🎉';
      case 'lost': return 'Game over! 💥';
      default: return '';
    }
  };

  const getStatusEmoji = () => {
    switch (status) {
      case 'idle': return '🙂';
      case 'playing': return '😊';
      case 'won': return '😎';
      case 'lost': return '😵';
      default: return '🙂';
    }
  };

  return (
    <div className="header">
      <div className="mine-counter">
        {mineCount - flagCount}
      </div>
      <div className="status">
        {getStatusText()}
      </div>
      <button className="reset-button" onClick={onReset}>
        {getStatusEmoji()}
      </button>
    </div>
  );
};

export default Header;
