import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("auth/register", "./routes/register.tsx"),
] satisfies RouteConfig;
