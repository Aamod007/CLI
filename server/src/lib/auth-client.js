import { deviceAuthorizationClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    baseURL: "http://localhost:5000",
      plugins: [ 
    deviceAuthorizationClient(), 
  ], 
})