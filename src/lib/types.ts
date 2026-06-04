export interface User {
  id: string
  email: string
  name: string
  points: number
  level: string
}

export interface Transaction {
  id: string
  type: string
  amount: number
  balanceAfter: number
  reference: string | null
  note: string | null
  createdAt: string
}

export interface Reward {
  id: string
  name: string
  description: string
  type: string
  cost: number
  partner: string | null
  discountPercent: number | null
  imageUrl: string | null
}

export interface Certificate {
  id: string
  totalPoints: number
  totalKg: number
  co2Saved: number
  hash: string
  type: string
  createdAt: string
}

export interface UserStats {
  points: number
  level: number
  totalKg: number
  co2Saved: number
  dropOffCount: number
  redemptionsCount: number
  certificatesCount: number
  memberSince: string
  progress: { current: number; next: number; remaining: number; percent: number }
}
