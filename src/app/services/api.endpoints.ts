export class Api {
  public static API_DOMAIN = 'http://localhost:3000/';

  public static AUTH = `${Api.API_DOMAIN}api/v1/authenticate`;
  public static USERS = `${Api.API_DOMAIN}api/v1/users`;
  public static ADDRESSES = `${Api.API_DOMAIN}api/v1/addresses`;
}