var database_api = "";

switch (process.env.NODE_ENV) {
  case "development":
    database_api =  process.env.VUE_APP_DATABASE_URL;
    break;
  case "production":
    database_api =  process.env.VUE_APP_DATABASE_URL;
    break
  default:
    break;
  }

export const API_HANDLER = {
  database_api,
};