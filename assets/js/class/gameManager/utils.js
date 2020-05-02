export const SpawnerType = {
  CHEST: 'CHEST',
  MONSTER: 'MONSTER',
}

export function randomNumber(min,max) {
  return Math.floor(Math.random() * max) + min
}
