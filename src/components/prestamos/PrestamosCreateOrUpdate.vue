<template>
<div>
    <h2>{{ pageTitle }}</h2>
    
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <div style="display:inline-block">
        <el-form-item label="Nombre Cliente" prop="NombreCliente">
        <el-select v-model="form.NombreCliente">
          <el-option
          v-for="item in dataCliente "
          :key="item.nombre"
          :label="item.nombre"
          :value="item.nombre"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item  label="Moneda" prop="Moneda">
        <el-select v-model="form.Moneda">
          <el-option
          v-for="item in monedaOptions "
         :key="item.value"
        :label="item.value"
         :value="item.value">
      </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="Frecuencia" prop="Frecuencia">
        <el-input v-model="form.Frecuencia">
        </el-input>
      </el-form-item>
      <el-form-item label="Categoria Prestamo" prop="Categoria">
        <el-select v-model="form.Categoria">
          <el-option
          v-for="item in categoriaPrestamoOptions "
      :key="item.value"
      :label="item.value"
      :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="Tasa" prop="Tasa">
        <el-input v-model="form.Tasa">
        </el-input>
      </el-form-item>
      <el-form-item label="Monto" prop="Monto">
      <el-input v-model="form.Monto" placeholder="Monto"></el-input>
      </el-form-item>
      <el-form-item label="Fecha Prestamo" prop="FechaPrestamo">
      <el-date-picker placeholder="Seleccione Fecha"  v-model="form.FechaPrestamo" format="yyyy/MM/dd" name="date">
      </el-date-picker> 
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="Cuotas" prop="Cuotas">
        <el-input v-model="form.Cuotas"></el-input>
      </el-form-item>
      <el-form-item label="FechaPrimerPago" prop="FechaPrimerPago">
      <el-date-picker placeholder="Seleccione Fecha"  v-model="form.FechaPrimerPago" format="yyyy/MM/dd" name="date">
      </el-date-picker>  
      </el-form-item>
      <el-form-item label="CostoCierre" prop="CostoCierre">
        <el-input type="number" v-model="form.CostoCierre"></el-input>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="DiasGracia" prop="DiasGracia">
        <el-input type="number" v-model="form.DiasGracia"></el-input>
      </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="save" type="primary">Guardar</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>

export default {
  name: "PrestamosCreateOrUpdate",
  data() {
    return {
      loading: false,
      dataClientes: [],
      monedaOptions:[{
        label: 'RD$',
        value: 'RD$'
      },{
        label: 'US$',
        value: 'US$'
      }],
      categoriaPrestamoOptions:[{
        value: 'Prestamo de Consumo',
        label: 'Prestamos de consumo'
      },
      {
        value: 'Microcredito',
        lavel: 'Microcredito'
      },{
        value: 'Prestamos hipotecarios',
        lavel: 'Prestamos hipotecarios'
      }],
      form_Expedientes_PrestamosService: {
        Id:0,
        Cedula_Expediente: 0,
        NoPrestamo: 0,
      },
      form: {
        NoPrestamo: 0,
        Moneda: null,
        Frecuencia: null,
        CategoriaNombre: null,
        Tasa: null,
        Monto: 1,
        FechaPrestamo: null,
        Cuotas: 0,
        FechaPrimerPago: null,
        CostoCierre: null,
        DiasGracia: 0,
        FechaVencimiento: null,
        DiaVencimiento: null,
        CreadorPrestamo: null,
        EstadoPrestamo: null,
        ModalidadPagoPrestamo: null,
        NombreCliente: null,
      },
      rules: {
        Moneda: [
          { required: true, message: "Debe seleccionar un tipo de moneda" }
        ],

        Tasa: [
          { required: true, message: "La Tasa del Prestamos Es necesaria" },
          { max: 11, message: "Cedula solo contiene 11 caracteres" }
        ],

        CategoriaNombre: [
          {
            required: false
          }
        ],
        Frecuencia: [
          {
            required: false,
            message: "Nacionalidad requerida"
          }
        ],
        Monto: [
          {
            required: true,
            message: "RNC requerido, en caso de no tener digite Cedula"
          },
          {type: number, message: "Solo introducir numero"}
        ],
        FechaPrestamo: [{ required: true }],
        /* Direccion: [{ required: true, message: "Direccion necesaria" }],*/
        FechaPrimerPago: [{ required: true, message: "Seleccionar fecha"},
        ],
        CostoCierre: [{ required: false}],
        DiasGracia: [
          { required: false, message: "Fecha de Nacimiento requerida" }
        ],
        FechaVencimiento: [{ required: false }],
        DiaVencimiento: [
          { required: false}
        ],
        ModalidadPagoPrestamo: [{ required: true, message: "Inserte alguna modalidad" }],
        NombreCliente: [{required:true, message: "Se necesita el cliente"}]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.NoPrestamo === 0
        ? "Nuevo Prestamo"
        : `Prestamo Numero: ${this.form.NoPrestamo}`;
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
    self.getAllClientes();
  },
  methods: {

    getAllClientes(){
 let self = this;

      self.loading = true;

      self.$store.state.services.ExpedientesService
      .getAll()
      .then(function(r) { 
          self.loading = false;
          self.dataClientes = r.data;
          console.log("Lista Recuperada")
      }).catch( r => {
           self.$message({
               message: "No se pudo obtener la Lista, favor recarge",
               type: "error",
           });
           console.log(r);
      });
  },
  getExpedientes_Prestamos(id){
    if(id == undefined) return;
    let self = this;

    self.loading = true;
    self.$store.state.services.ExpedientesPrestamosService.get(id)
    .then(r => {
      self.form_Expedientes_PrestamosService.Id = r.data.Id,
      self.form_Expedientes_PrestamosService.Cedula_Expediente = r.data.cedula_Expediente,
      self.form_Expedientes_PrestamosService.NoPrestamo = r.data.noPrestamo 
    }).catch(r => {
          self.$message({
            message: "Ocurrió un error inesperado",
            type: "error"
          });
        });
  },
    get(id) {
      if (id == undefined) return;
      let self = this;

      self.loading = true;
      self.$store.state.services.PrestamosService.get(id)
        .then(r => {
          self.loading = false;
          self.form.NoPrestamo = r.data.noPrestamo;
          self.form.Moneda = r.data.moneda;
          self.form.Frecuencia = r.data.frecuencia;
          self.form.CategoriaNombre = r.data.categoriaNombre;
          self.form.Tasa = r.data.tasa;
          self.form.Monto = r.data.monto;
          self.form.FechaPrestamo = r.data.fechaPrestamo;
          self.form.Cuotas = r.data.cuotas;
          self.form.FechaPrimerPago = r.data.fechaPrimerPago;
          self.form.CostoCierre = r.data.costoCierre;
          self.form.DiasGracia = r.data.diasGracia;
          self.form.FechaVencimiento = r.data.fechaVencimiento;
          self.form.DiaVencimiento = r.data.diaVencimiento;
          self.form.CreadorPrestamo = r.data.creadorPrestamo;
          self.form.EstadoPrestamo = r.data.estadoPrestamo;
          self.form.ModalidadPagoPrestamo = r.data.modalidadPagoPrestamo;
          self.form.NombreCliente = r.data.clienteNombre;
        })
        .catch(r => {
          self.$message({
            message: "Ocurrió un error inesperado",
            type: "error"
          });
        });
    },
    imprimir(value) {
      console.log(value);
    },
    save() {
      let self = this;
      self.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.NoPrestamo > 0) {
            self.$store.state.services.PrestamosService.update(self.form)
              .then(r => {
                console.log(r);
                self.$store.state.services.ExpedientesPrestamosService.update(self.form_Expedientes_PrestamosService)
                .then(r => {
                  self.loading = false;
                  console.log(r);
                  self.$router.push("/prestamos");
                });
                
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
                console.log(r);
              });
          } else {
            self.$store.state.services.PrestamosService.add(self.form)
              .then(r => {
                console.log(r);
                self.$store.state.sevices.ExpedientesPrestamosService.add(self.form_Expedientes_PrestamosService)
                .then(r => {
                  self.loading = false;
                })
                
                self.$router.push("/prestamos");
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
                console.log(r);
              });
          }
        } else {
          self.$message({
            message: "Completar Formulario",
            type: "error"
          });
        }
      });
    }
  }
};
</script>