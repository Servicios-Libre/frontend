declare module "next-auth" {
  interface Session {
    backendJwt?: string;
  }
}