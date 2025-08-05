import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
    index("./loginModule/login/Login.tsx"),
    route("/register","./loginModule/register/Register.tsx"),
    route("/upload","./usersModule/Upload.tsx"),
    route("/uploaded","./usersModule/admin/uploadedFiles/Uploaded.tsx"),
    route("/providers","./usersModule/admin/listProviders/listProviders.tsx"),    
    route("/logs","./usersModule/admin/logs/logs.tsx"),

] satisfies RouteConfig;
