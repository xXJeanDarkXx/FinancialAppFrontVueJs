<template>
<div>
    <h2>{{ pageTitle }}</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Nombre" prop="CategoriasNombre">
        <el-input @keyup.enter="save" v-model="form.CategoriasNombre"></el-input>
      </el-form-item>
       <el-form-item label="Descripcion" prop="Descripcion">
        <el-input @keyup.enter="save" v-model="form.Descripcion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">Guardar</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  name: "CategoriasCreateOrUpdate",
  data() {
    return {
      loading: false,
      form: {
        categoriasId : 0,
        CategoriasNombre: null,
        Descripcion: null,
      },
      rules: {
        CategoriasNombre: [
          { required: true, message: "Debe ingresar un nombre de categoria" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],
        Descripcion: [
          { required: true, message: "La descripcion es requerida" }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.categoriasId === 0
        ? "Nueva Categoria"
        : `${this.form.CategoriasNombre}`;
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
  },
  methods: {
    get(id) {
      if (id == undefined) return;

      let self = this;

      self.loading = true;
      self.$store.state.services.CategoriasService
        .get(id)
        .then(r => {
          self.loading = false;
          self.form.categoriasId = r.data.categoriasId;
          self.form.CategoriasNombre = r.data.categoriasNombre;
          self.form.Descripcion = r.data.descripcion;

        })
        .catch(r => {
          self.$message({
            message: "Ocurrió un error inesperado",
            type: "error"
          });
        });
    },
    save() {
      let self = this;
      self.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.categoriasId > 0) {
            self.$store.state.services.CategoriasService
              .update(self.form)
              .then(r => {
                console.log(r);
                self.loading = false;
                self.$router.push("/categorias");
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
              });
          } else {
            self.$store.state.services.CategoriasService
              .add(self.form)
              .then(r => {
                console.log(r);
                self.loading = false;
                self.$router.push("/categorias");
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
              });
          }
        }
      });
    }
  }
};
</script>