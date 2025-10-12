export type UserRole = 'admin' | 'speaker' | 'candidate'

export type User = {
  id: string
  role: UserRole
  firstName: string
  lastName: string
  bio: string
  linkedin: string
  profilePicture: string
  company: string
  pronouns: string
  title: string
  email: string
}
