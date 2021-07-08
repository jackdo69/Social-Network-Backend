export const {
  ACCESS_TOKEN_SECRET = 'long live the chicken',
  REFRESH_TOKEN_SECRET = 'behold the wizard',
  TOKEN_EXPIRE = 60 * 60, //in seconds as jwt doc
} = process.env;
