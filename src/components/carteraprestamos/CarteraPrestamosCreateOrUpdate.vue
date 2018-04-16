<template>
<div>
    <h2>{{ pageTitle }}</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Nombre" prop="carteraNombre">
        <el-input v-model="form.carteraNombre"></el-input>
      </el-form-item>
       <el-form-item label="Descripcion" prop="descripcion">
        <el-input v-model="form.descripcion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">Guardar</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  name: "CarteraPrestamosCreateOrUpdate",
  data() {
    return {
      loading: false,
      form: {
        carteraId : 0,
        carteraNombre: null,
        descripcion: null,
      },
      rules: {
        carteraNombre: [
          { required: true, message: "Debe ingresar un nombre de categoria" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],
        DescripdescripcioncionCarteraPrestamos: [
          { required: true, message: "La descripcion es requerida" }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.carteraId === 0
        ? "Nueva Cartera"
        : `${this.form.carteraNombre}`;
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
      self.$store.state.services.CarteraPrestamosService
        .get(id)
        .then(r => {
          self.loading = false;
          self.form.carteraId = r.data.carteraId;
          self.form.carteraNombre = r.data.carteraNombre;
          self.form.descripcion = r.data.descripcion;

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

          if (self.form.carteraId > 0) {
            self.$store.state.services.CarteraPrestamosService
              .update(self.form)
              .then(r => {
                self.loading = false;
                self.$router.push("/carteraprestamos");
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
              });
          } else {
            self.$store.state.services.CarteraPrestamosService
              .add(self.form)
              .then(r => {
                self.loading = false;
                self.$router.push("/carteraprestamos");
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