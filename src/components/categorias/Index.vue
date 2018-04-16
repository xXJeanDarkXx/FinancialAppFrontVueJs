<template>
<div>
<h2>Categorias</h2>
<el-button id="btnCrearPrestamo" type="success" @click="redirect('/categorias/add')">
       <i class="fa fa-plus hidden-sm hidden-md hidden-lg"></i> <i class="fa fa-money hidden-xs"></i>
        <span class="hidden-xs">Nueva Categoria</span></el-button>
        
<el-table v-loading="loading" :data="data" style="width: 100%">
        <el-table-column prop="categoriasNombre" label="Nombre" sortable>
          <template slot-scope="scope">
            {{ scope.row.categoriasNombre }}
          </template>
        </el-table-column>
        <el-table-column prop="descripcion" label="Descripcion" width="500" sortable>
          <template slot-scope="scope">
            {{ scope.row.descripcion }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button type="danger" @click="remove(scope.row.categoriasId)">Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
</div>
</template>

<script>
export default {
  name: "CategoriasIndex",
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

      self.$store.state.services.CategoriasService
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
        self.$store.state.services.CategoriasService
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