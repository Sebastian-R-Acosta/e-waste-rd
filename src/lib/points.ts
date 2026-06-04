const BONUS_BY_TYPE: Record<string, number> = {
  baterias: 5,
  celulares: 3,
  monitores: 4,
  computadoras: 4,
  cables: 2,
  electrodomesticos: 3,
  impresoras: 3,
  tablets: 4,
  televisores: 5,
  consolas: 3,
}

export function calculatePoints(deviceType: string, weightKg: number, deliveryCount: number): number {
  const base = Math.round(weightKg * 10)
  const bonus = BONUS_BY_TYPE[deviceType.toLowerCase()] || 0
  const bonusPts = Math.round(weightKg * bonus)
  const multiplier = deliveryCount % 10 === 0 ? 2 : deliveryCount % 5 === 0 ? 1.5 : 1
  return Math.round((base + bonusPts) * multiplier)
}

export function calculateLevel(points: number): string {
  if (points >= 2000) return "oro"
  if (points >= 500) return "plata"
  return "bronce"
}

export function nextLevelProgress(points: number): { current: string; next: string; progress: number } {
  if (points >= 2000) return { current: "oro", next: "oro", progress: 100 }
  if (points >= 500) {
    return { current: "plata", next: "oro", progress: Math.round(((points - 500) / 1500) * 100) }
  }
  return { current: "bronce", next: "plata", progress: Math.round((points / 500) * 100) }
}

export function calculateCo2Saved(kg: number): number {
  return Math.round(kg * 1.2 * 100) / 100
}
