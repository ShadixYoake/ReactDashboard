import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";


export default [
  // parent route
  route("/login", "./login/Login.tsx"),
  route("/register", "./register/Register.tsx"),
  route("/upload", "./upload/upload.tsx"),
  route("/", "./App.tsx", [
    // child routes
    index("./home.tsx"),
    route("settings", "./settings.tsx"),
  ]),
] satisfies RouteConfig;