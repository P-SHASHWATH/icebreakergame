/**
 * App.tsx
 * Root component. Orchestrates all phases using the useGame hook.
 * Phase flow: landing → player-select → player-setup → playing → summary
 */

import React from 'react';
import { useGame } from './hooks/useGame';
import { LandingPage } from './pages/LandingPage';
import { PlayerSelectPage } from './pages/PlayerSelectPage';
import { PlayerSetupPage } from './pages/PlayerSetupPage';
import { GamePage } from './pages/GamePage';
import { SummaryPage } from './pages/SummaryPage';

// How many players did the user select? Stored in a local state between phases.
const App: React.FC = () => {
  const { game, actions } = useGame();
  const [playerCount, setPlayerCount] = React.useState(4);

  const handlePlayerCountSelect = (count: number) => {
    setPlayerCount(count);
    actions.goToPhase('player-setup');
  };

  const handlePlayerSetupConfirm = (names: string[], timerEnabled: boolean) => {
    actions.setPlayers(names);
    actions.startGame(timerEnabled);
  };

  const handlePlayAgain = () => {
    // Keep same players, restart game
    actions.startGame(game.timerEnabled);
  };

  switch (game.phase) {
    case 'landing':
      return <LandingPage onStart={() => actions.goToPhase('player-select')} />;

    case 'player-select':
      return (
        <PlayerSelectPage
          onSelect={handlePlayerCountSelect}
          onBack={() => actions.goToPhase('landing')}
        />
      );

    case 'player-setup':
      return (
        <PlayerSetupPage
          playerCount={playerCount}
          onConfirm={handlePlayerSetupConfirm}
          onBack={() => actions.goToPhase('player-select')}
        />
      );

    case 'playing':
      return (
        <GamePage
          game={game}
          actions={{
            nextQuestion: actions.nextQuestion,
            skipPlayer: actions.skipPlayer,
            shuffleQuestion: actions.shuffleQuestion,
            exitGame: actions.exitGame,
            toggleTimer: actions.toggleTimer,
          }}
        />
      );

    case 'summary':
      return (
        <SummaryPage
          game={game}
          onPlayAgain={handlePlayAgain}
          onHome={actions.resetGame}
        />
      );

    default:
      return <LandingPage onStart={() => actions.goToPhase('player-select')} />;
  }
};

export default App;
