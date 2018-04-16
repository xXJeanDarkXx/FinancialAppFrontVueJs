<template>
<div>
<h2>Verificar Existencia</h2>
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <div style="display:inline-block">
      <el-form-item  label="cedula" prop="cedula">
        <el-input v-model="form.cedula"></el-input>
      </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="get" type="primary">Buscar</el-button>
        <el-button @click="redirect('/expedientes/add')" type="danger">Omitir</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      loading: false,
      data: [],
      form: {
        cedula: "",
      }
    };
  },
  methods: {
redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    },

  get(evt){
    
    if(self.form.cedula != ""){
      let self = this;
      self.loading = true;
      self.$store.state.services.ExpedientesService
      .getCedula(self.form.cedula)
      .then(r => { 
          if(r.data.cedula == self.form.cedula){
          self.$message({
               message: "Persona ya existente",
               type: "error",
           });
           self.loading = false;
          }else{
            self.loading = false;
          self.$message({
               message: "Persona no existente, continue",
           });
            self.$router.push('/expedientes/add');
           console.log(r);
           self.loading = false;
          }
          
      }).catch( r => {
           self.$message({
               message: "Ha ocurrido un error, intente de nuevo",
               type: "error"
           });
           self.loading = false;
           console.log(r);
      });
    }else{
      self.$message({
               message: "Rellenar Campo",
               type: "error",
           });
    }
    
  },

  
  }
};
</script>