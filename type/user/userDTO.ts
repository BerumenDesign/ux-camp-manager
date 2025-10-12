const userDTO = (userData) => {
  return {
    id: userData.id,
    role: userData.role,
    firstName: userData.first_name,
    lastName: userData.last_name,
    bio: userData.bio,
    linkedIn: userData.linkedin,
    avatarUrl: userData.avatar_url,
    company: userData.company,
    pronouns: userData.pronouns,
    title: userData.title,
    email: userData.email,
  }
}

export default userDTO
