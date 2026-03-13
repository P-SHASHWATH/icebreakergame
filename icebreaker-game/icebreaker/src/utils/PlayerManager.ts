/**
 * PlayerManager.ts
 * Handles player creation, validation, and management.
 */

export interface Player {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

const PLAYER_COLORS = [
  '#fbbf24', // amber
  '#f472b6', // pink
  '#60a5fa', // blue
  '#34d399', // emerald
  '#a78bfa', // violet
  '#fb923c', // orange
];

const PLAYER_EMOJIS = ['🦁', '🦊', '🐺', '🐼', '🦋', '🐉'];

/** Create a player object from a name */
export function createPlayer(name: string, index: number): Player {
  return {
    id: `player-${index}-${Date.now()}`,
    name: name.trim(),
    color: PLAYER_COLORS[index % PLAYER_COLORS.length],
    emoji: PLAYER_EMOJIS[index % PLAYER_EMOJIS.length],
  };
}

/** Validate that all player names are non-empty and unique */
export function validatePlayers(names: string[]): string | null {
  const trimmed = names.map((n) => n.trim());
  if (trimmed.some((n) => n.length === 0)) {
    return 'All players need a name!';
  }
  if (trimmed.some((n) => n.length > 24)) {
    return 'Names must be 24 characters or less.';
  }
  const unique = new Set(trimmed.map((n) => n.toLowerCase()));
  if (unique.size !== trimmed.length) {
    return 'Each player needs a unique name!';
  }
  return null;
}

/** Build Player array from names */
export function buildPlayers(names: string[]): Player[] {
  return names.map((name, i) => createPlayer(name, i));
}
