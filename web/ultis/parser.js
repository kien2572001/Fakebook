export const parserUserCookies = (cookies) => {
  let user = JSON.parse(cookies.user);
  let tempUser = user;
  tempUser.firstName = user.first_name || null;
  tempUser.lastName = user.last_name || null;
  tempUser.email = user.email || null;
  tempUser.dateOfBirth = user.date_of_birth || null;
  tempUser.emailVerifiedAt = user.email_verified_at || null;
  tempUser.socialId = user.social_id || null;
  tempUser.socialType = user.social_type || null;
  tempUser.createdAt = user.created_at || null;
  tempUser.updatedAt = user.updated_at || null;
  return tempUser;
};
