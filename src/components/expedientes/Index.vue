<template>
<div>
<h2>Expedientes</h2>
<el-button id="btnCrearPrestamo" type="success" @click="redirect('/expedientes/verify')">
       <i class="fa fa-plus hidden-sm hidden-md hidden-lg"></i> <i class="fa fa-money hidden-xs"></i>
        <span class="hidden-xs">Nuevo Expediente</span></el-button>
<el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column prop="Nombre" label="Nombre" sortable>
          <template slot-scope="scope">
            {{ scope.row.nombre }}
          </template>
        </el-table-column>

        <el-table-column prop="Apodo" label="Apodo"  sortable>
          <template slot-scope="scope">
             {{ scope.row.apodo }}
          </template>
        </el-table-column>

        <el-table-column prop="rnc" label="RNC"  sortable>
          <template slot-scope="scope">
             {{ scope.row.rnc }}
          </template>
        </el-table-column>

        <el-table-column prop="noComercial" label="noComercial"  sortable>
          <template slot-scope="scope">
             {{ scope.row.noComercial }}
          </template>
        </el-table-column>

        <el-table-column prop="cedula" label="cedula"  sortable>
          <template slot-scope="scope">
             {{ scope.row.cedula }}
          </template>
        </el-table-column>

        <el-table-column prop="NoComercial" label="NoComercial"  sortable>
          <template slot-scope="scope">
             {{ scope.row.cedula }}
          </template>
        </el-table-column>

        <el-table-column prop="celular" label="celular"  sortable>
          <template slot-scope="scope">
             {{ scope.row.celular }}
          </template>
          </el-table-column>
          <el-table-column prop="telefono" label="telefono"  sortable>
          <template slot-scope="scope">
             {{ scope.row.telefono }}
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="danger" @click="remove(scope.row.expedientesId)">Eliminar</el-button>
            <el-button @click="$router.push(`/expedientes/${scope.row.expedientesId}/edit`)">Editar</el-button>
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
      data: []
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

   remove(id) {
      let self = this;

      self
        .$confirm("Esta seguro de realizar esta acción?", "Confirmación", {
          confirmButtonText: "Si",
          cancelButtonText: "Cancelar",
          type: "warning"
        })
        .then(() => {
          _remove();
        })
        .catch(() => {});

      function _remove() {
        self.$store.state.services.ExpedientesService
          .remove(id)
          .then(r => {
            self.loading = false;
            self.getAll();
          })
          .catch(r => {
            self.$message({
              message: "Ocurrió un error inesperado",
              type: "error"
            });
          });
      }
    }
  }
};
</script>