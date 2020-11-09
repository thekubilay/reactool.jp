export default [
  {
    path: '/projects',
    name: 'projects',
    meta: {requiresAuth: true},  
    component: () => import(/* webpackChunkName: "projects" */ '../pages/projects.vue'),
    children:[
      {
        meta: {requiresAuth: true},  
        path: '/projects/:id/',
        name: 'project',
        component: () => import(/* webpackChunkName: "project" */ '../pages/project.vue')
      },
    ]
  },
  
]