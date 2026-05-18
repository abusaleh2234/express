export const User_Role = {
    admin: "admin",
    agent: "agent",
    user: "user"
} as const;

export type Roles = "admin" | "agent" | "user"