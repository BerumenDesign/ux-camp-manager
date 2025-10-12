export type UserRole = 'admin' | 'speaker' | 'candidate'

export type User = {
  id: string
  role: UserRole
  firstName: string
  lastName: string
  bio: string
  linkedIn: string
  avatarUrl: string
  company: string
  pronouns: string
  title: string
  email: string
}
