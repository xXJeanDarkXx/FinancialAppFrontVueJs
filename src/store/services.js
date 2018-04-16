import Axios from 'axios'
import ExpedientesService from '../services/ExpedientesService'
import CategoriasService from '../services/CategoriasService'
import CarteraPrestamosService from '../services/CarteraPrestamosService'
import PrestamosService from '../services/PrestamosService'
import ExpedientesPrestamosService from '../services/ExpedientesPrestamosService'
// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'
let apiUrl = 'https://financialapp.azurewebsites.net/'
export default {
    ExpedientesService: new ExpedientesService(Axios, apiUrl),
    CategoriasService: new CategoriasService(Axios, apiUrl),
    CarteraPrestamosService: new CarteraPrestamosService(Axios, apiUrl),
    PrestamosService: new PrestamosService(Axios, apiUrl),
    ExpedientesPrestamosService: new ExpedientesPrestamosService(Axios, apiUrl)
}