<template>
<div>
<h2>Rutas</h2>
<el-button id="btnCrearPrestamo" type="success" @click="redirect('/expedientes/verify')">
       <i class="fa fa-plus hidden-sm hidden-md hidden-lg"></i> <i class="fa fa-money hidden-xs"></i>
        <span class="hidden-xs">Nuevo Expediente</span></el-button>
<el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column prop="Nombre" label="Nombre" sortable>
          <template slot-scope="scope">
            {{ scope.row.nombre }}
          </template>
        </el-table-column>

<el-table-column prop="Direccion" label="Direccion" sortable>
          <template slot-scope="scope">
            {{ scope.row.direccion }}
          </template>
        </el-table-column>

      </el-table>


</div>
</template>

<script>
export default {
  name: "ExpedientesIndex",
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  created() {
    let self = this;
    self.getAll();
    },
  methods: {
redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    },
    viewDetaills(id){
      let self = this;
      if(id != 0){
        self.expedientesDetails = true;
        
      }
    },

  getAll(){
      let self = this;

      self.loading = true;

      self.$store.state.services.ExpedientesService
      .getAll()
      .then(function(r) { 
          self.loading = false;
          self.data = r.data;
          console.log("Lista Recuperada")
      }).catch( r => {
           self.$message({
               message: "No se pudo obtener la Lista, favor recarge",
               type: "error",
           });
           console.log(r);
      });
  },
}
};
</script>