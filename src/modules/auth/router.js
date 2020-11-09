import login from "./views/login"
export default [
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {requiresVisitor: true}
  },
]