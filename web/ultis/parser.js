export const parserUserCookies = (cookies) => {
  let user = JSON.parse(cookies.user);
  let tempUser = user;
  tempUser.firstName = user.first_name;
  tempUser.lastName = user.last_name;
  tempUser.email = user.email;
  tempUser.dateOfBirth = user.date_of_birth;
  tempUser.emailVerifiedAt = user.email_verified_at;
  tempUser.socialId = user.social_id;
  tempUser.socialType = user.social_type;
  tempUser.createdAt = user.created_at;
  tempUser.updatedAt = user.updated_at;
  return tempUser;
};
