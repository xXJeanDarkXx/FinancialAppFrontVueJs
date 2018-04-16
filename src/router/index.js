import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/components/Default'

import ExpedientesIndex from '@/components/expedientes/Index'
import ExpedientesCreateOrUpdate from '@/components/expedientes/ExpedientesCreateOrUpdate'

import CategoriasIndex from '@/components/categorias/Index'
import CategoriasCreateOrUpdate from '@/components/categorias/CategoriasCreateOrUpdate'

import CarteraPrestamosIndex from '@/components/carteraprestamos/Index'
import CarteraPrestamosCreateOrUpdate from '@/components/carteraprestamos/CarteraPrestamosCreateOrUpdate'

import PrestamosIndex from '@/components/prestamos/Index'
import PrestamosCreateOrUpdate from '@/components/prestamos/PrestamosCreateOrUpdate'

import Verify from '@/components/expedientes/Verify'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Default', component: Default },
  { path: '/expedientes', name: 'ExpedientesIndex', component: ExpedientesIndex },
  { path: '/expedientes/add', name: 'ExpedientesCreate', component: ExpedientesCreateOrUpdate },
  { path: '/expedientes/:id/edit', name: 'ExpedientesEdit', component: ExpedientesCreateOrUpdate },
  { path: '/categorias', name: 'CategoriasIndex', component: CategoriasIndex },
  { path: '/categorias/add', name: 'CategoriasCreate', component: CategoriasCreateOrUpdate },
  { path: '/categorias/:id/edit', name: 'CategoriasEdit', component: CategoriasCreateOrUpdate },
  { path: '/carteraprestamos', name: 'CarteraPrestamosIndex', component: CarteraPrestamosIndex },
  { path: '/carteraprestamos/add', name: 'CarteraPrestamosCreate', component: CarteraPrestamosCreateOrUpdate },
  { path: '/carteraprestamos/:id/edit', name: 'CarteraPrestamosEdit', component: CarteraPrestamosCreateOrUpdate },
  { path: '/prestamos', name: 'PrestamosIndex', component: PrestamosIndex },
  { path: '/prestamos/add', name: 'PrestamosCreate', component: PrestamosCreateOrUpdate },
  { path: '/prestamos/:id/edit', name: 'PrestamosEdit', component: PrestamosCreateOrUpdate },
  { path: '/expedientes/Verify', name: 'Verify', component: Verify }
]

export default new Router({
  routes
})
