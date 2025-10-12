import { User } from './user'

const userDTO = (userData): User => {
  return {
    id: userData.id,
    role: userData.role,
    firstName: userData.first_name,
    lastName: userData.last_name,
    bio: userData.bio,
    linkedin: userData.linkedin_url || userData.linkedin,
    profilePicture: userData.avatar_url,
    company: userData.company,
    pronouns: userData.pronouns,
    title: userData.title,
    email: userData.email,
  }
}

export default userDTO
