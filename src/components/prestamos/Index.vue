<template>
<div>
<h2>Prestamos</h2>
<el-button id="btnCrearPrestamo" type="success" @click="redirect('/prestamos/add')">
       <i class="fa fa-plus hidden-sm hidden-md hidden-lg"></i> <i class="fa fa-money hidden-xs"></i>
        <span class="hidden-xs">Nuevo Préstamo</span></el-button>
        <el-button id="btnCrearPrestamo" type="primary" @click="redirect('/expedientes/add')">
       <i class="fa fa-plus hidden-sm hidden-md hidden-lg"></i> <i class="fa fa-money hidden-xs"></i>
        <span class="hidden-xs">Nuevo Expediente</span></el-button>
<div v-loading="loading">
  <el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column prop="ClienteNombre" label="Cliente" sortable>
          <template slot-scope="scope">
            {{ scope.row.clienteNombre }}
          </template>
        </el-table-column>

        <el-table-column prop="Monto" label="Monto"  sortable>
          <template slot-scope="scope">
             {{ scope.row.monto }}
          </template>
        </el-table-column>

        <el-table-column prop="FechaPrestamo" label="Fecha Prestamo"  sortable>
          <template slot-scope="scope">
             {{ scope.row.fechaPrestamo }}
          </template>
        </el-table-column>

        <el-table-column prop="cuotas" label="cuotas"  sortable>
          <template slot-scope="scope">
             {{ scope.row.cuotas }}
          </template>
        </el-table-column>

        <el-table-column prop="estadoPrestamo" label="Estado Prestamo"  sortable>
          <template slot-scope="scope">
             {{ scope.row.estadoPrestamo }}
          </template>
        </el-table-column>

        <el-table-column prop="diasGracia" label="Dias Gracia"  sortable>
          <template slot-scope="scope">
             {{ scope.row.diasGracia }}
          </template>
        </el-table-column>

        <el-table-column prop="ModalidadPrestamo" label="ModalidadPrestamo"  sortable>
          <template slot-scope="scope">
             {{ scope.row.modalidadPrestamo }}
          </template>
          </el-table-column>
          
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="danger" @click="remove(scope.row.expedientesId)">Eliminar</el-button>
            <el-button @click="$router.push(`/prestamos/${scope.row.noPrestamo}/edit`)">Editar</el-button>
          </template>
        </el-table-column>
      </el-table>
</div>
</div>
</template>

<script>
export default {
  name: "PrestamosIndex",
  data() {
    return {
      dataPrestamos: [],
      loading: false
    };
  },
  created() {
    let self = this;
    self.getAllPrestamos();
  },
  methods: {
   redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    },
    
    getAllPrestamos(){
      let self = this;

      self.loading = true;

      self.$store.state.services.PrestamosService
      .getAll()
      .then(function(r) { 
          self.loading = false;
          self.dataPrestamos = r.data;
          console.log("Lista Recuperada")
      }).catch( r => {
           self.$message({
               message: "No se pudo obtener la Lista, favor recarge",
               type: "error",
           });
           console.log(r);
      });
  }
    
  }
};
</script>