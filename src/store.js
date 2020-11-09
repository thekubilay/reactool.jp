import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "./modules/auth/apis/store";
import { projects } from "./modules/dashboard/store/projects.store";
import { project } from "./modules/sumipad/store/project.store";
import { gmapApi } from "./modules/dashboard/store/coords.store";
import { coords } from "./modules/gmap/store/coords.store";
import { plans } from "./modules/dashboard/store/plans.store";
import { plan } from "./modules/sumipad/store/plan.store";
import { vistas } from "./modules/dashboard/store/vistas.store";
import { vista } from "./modules/sumipad/store/vista.store";
import { gallery } from "./modules/dashboard/store/gallery.store";
import { documents } from "./modules/dashboard/store/documents.store";
import { unit } from "./modules/dashboard/store/unit.store";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    projects,
    project,
    gmapApi,
    coords,
    plans,
    plan,
    vistas,
    vista, 
    gallery,
    documents,
    unit,
  }
})
