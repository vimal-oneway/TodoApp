export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      ENV?: 'test' | 'dev' | 'prod';
      COOKIE_SECRET:string;
      SER_URL:string;
      CLIENT_ID:string;
      CLI_URL:string;
      CLIENT_SECRET:string;
    }
  }
}
