export default [
  {
    path: '/:slug',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue')
  },
  {
    path: '/:slug/map',
    name: 'map',
    component: () => import(/* webpackChunkName: "map" */ '../pages/map.vue')
  },
  {
    path: '/:slug/plans',
    name: 'plans',
    // redirect:{name:"landplan"},
    component: () => import(/* webpackChunkName: "plans" */ '../pages/plans.vue'),
    children:[
      {
        path: '/:slug/plans/landplan',
        name: 'landplan',
        component: () => import(/* webpackChunkName: "landplan" */ '../pages/landplan.vue'),
      },
      {
        path: '/:slug/plans/elevation',
        name: 'elevation',
        component: () => import(/* webpackChunkName: "elevation" */ '../pages/elevation.vue'),
      },
      {
        path: '/:slug/plans/floorplan',
        name: 'floorplan',
        component: () => import(/* webpackChunkName: "floorplan" */ '../pages/floorplan.vue'),
      },
      {
        path: '/:slug/plans/madori',
        name: 'madori',
        component: () => import(/* webpackChunkName: "madori" */ '../pages/madori.vue'),
      },
      {
        path: '/:slug/plans/madori/:planId',
        name: 'plan',
        component: () => import(/* webpackChunkName: "plan" */ '../pages/plan.vue'),
      }
    ]
  },
  {
    path: '/:slug/color-select',
    name: 'colorSelect',
    component: () => import(/* webpackChunkName: "colorSelect" */ '../pages/color-select.vue')
  },
  {
    path: '/:slug/vistas',
    name: 'vistas',
    component: () => import(/* webpackChunkName: "vistas" */ '../pages/vistas.vue')
  },
  {
    path: '/:slug/units',
    name: 'units',
    component: () => import(/* webpackChunkName: "units" */ '../pages/units.vue')
  },
  {
    path: '/:slug/loan',
    name: 'loan',
    component: () => import(/* webpackChunkName: "loan" */ '../pages/loan.vue')
  },
  {
    path: '/:slug/gallery',
    name: 'gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../pages/gallery.vue')
  },
  {
    path: '/:slug/documents',
    name: 'documents',
    component: () => import(/* webpackChunkName: "document" */ '../pages/documents.vue')
  }
]