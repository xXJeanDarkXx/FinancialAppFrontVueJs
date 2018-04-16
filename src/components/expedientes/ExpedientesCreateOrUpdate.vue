<template>
<div>
    <h2>{{ pageTitle }}</h2>
    
    <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm">
      <div style="display:inline-block">
      <el-form-item  label="Nombre" prop="Nombre">
        <el-input v-model="form.Nombre"></el-input>
      </el-form-item>
      <el-form-item  label="Apodo" prop="Apodo">
        <el-input v-model="form.Apodo"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="Email">
        <el-input v-model="form.Email"></el-input>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="Sexo" prop="Sexo">
        <el-radio-group v-model="form.Sexo">
        <el-radio value="M" :label="1">M</el-radio>
        <el-radio value="F" :label="2">F</el-radio>
</el-radio-group>
      </el-form-item>

      <el-form-item label="EstadoCivil" prop="EstadoCivil">
      <el-select v-model="form.EstadoCivil" placeholder="Estado Civil">
    <el-option
      v-for="item in opcionesestadocivil"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>

      </el-form-item>
      <el-form-item label="Nacionalidad" prop="Nacionalidad">
        <el-input v-model="form.Nacionalidad"></el-input>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="Cedula" prop="Cedula">
        <el-input v-model="form.Cedula"></el-input>
      </el-form-item>
      <el-form-item label="Direccion" prop="Direccion">
        <el-input v-model="form.Direccion"></el-input>
      </el-form-item>
      <el-form-item label="Ocupacion" prop="Ocupacion">
        <el-input v-model="form.Ocupacion"></el-input>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="Telefono" prop="Telefono">
        <el-input v-model="form.Telefono"></el-input>
      </el-form-item>
      <el-form-item label="Celular" prop="Celular">
        <el-input v-model="form.Celular"></el-input>
      </el-form-item>
      <el-form-item label="Rnc" prop="Rnc">
        <el-input v-model="form.Rnc"></el-input>
      </el-form-item>
      </div>
      <div style="display:inline-block">
      <el-form-item label="NoComercial" prop="NoComercial">
        <el-input v-model="form.NoComercial"></el-input>
      </el-form-item>
      <el-form-item label="Pasaporte" prop="Pasaporte">
        <el-input v-model="form.Pasaporte"></el-input>
      </el-form-item>
      <el-form-item label="FechaNacimiento" prop="FechaNacimiento">
      <el-date-picker value="1999-04-27" placeholder="Seleccione Fecha"  v-model="form.FechaNacimiento" format="yyyy/MM/dd" name="date"></el-date-picker>   
      </el-form-item>
      </div>
      <el-form-item label="DatosTrabajos" prop="DatosTrabajos">
        <el-input v-model="form.DatosTrabajos"></el-input>
      </el-form-item>
      <el-form-item label="Referencias" prop="Referencias">
        <el-input v-model="form.Referencias"></el-input>
      </el-form-item> 
      <el-form-item label="Comentarios" prop="Comentarios">
        <el-input v-model="form.Comentarios"></el-input>
      </el-form-item>
      
       <el-form-item  label="Nombre Categoria" prop="CategoriaNombre">
        <el-select v-model="form.CategoriaNombre" filterable >
     <el-option
     v-for="item in opcionescategoria"
      :key="item.categoriasId"
      :label="item.categoriasNombre"
      :value="item.categoriasNombre">
    </el-option>
        </el-select>
        <el-button type="success" icon="fa fa-add" @click="dialogCategoryVisible = true">+</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">Guardar</el-button>
      </el-form-item>
    </el-form>

<el-dialog
  title="Crear Categoria"
  :visible.sync="dialogCategoryVisible"
  size="tiny"
  :before-close="handleClose">
  <span>Ingrese los Datos</span>
  <el-form v-loading="loadingCategorias" :model="formCategoria" :rules="rulesCategorias" ref="ruleFormCategorias">
      <el-form-item label="Nombre" prop="CategoriasNombre">
        <el-input v-model="formCategoria.CategoriasNombre"></el-input>
      </el-form-item>
       <el-form-item label="Descripcion" prop="Descripcion">
        <el-input v-model="formCategoria.Descripcion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="dialogCategoryVisible = false">Cancel</el-button>
        <el-button @click="crearCategoria" type="success">Guardar</el-button>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    
  </span>
</el-dialog>

</div>
</template>

<script>

import datepicker from "../expedientes/datepicker/datepicker.vue";

export default {
  components: { datepicker },
  name: "ExpedientesCreateOrUpdate",
  data() {
    return {
      data:[],
      loading: false,
      loadingCategorias: false,
      dialogCategoryVisible: false,
      opcionesestadocivil: [{
          value: 'Soltero/a',
          label: 'Soltero/a'
        }, {
          value: 'Casado/a',
          label: 'Casado/a'
        }, {
          value: 'Union Libre',
          label: 'Union Libre'
        }, {
          value: 'Es Complicado...',
          label: 'Es Complicado...'
        },
        {
          value: 'Otro...',
          label: 'Otro...'
        },],
      formCategoria: {
        categoriasId : 0,
        CategoriasNombre: null,
        Descripcion: null,
      },
      rulesCategorias: {
        CategoriasNombre: [
          { required: true, message: "Debe ingresar un nombre de categoria" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],
        Descripcion: [
          { required: true, message: "La descripcion es requerida" }
        ]
      },
      form: {
        ExpedientesId: 0,
        Cedula: 0,
        Nombre: null,
        Apodo: null,
        Sexo: 1,
        Email: null,
        Pasaporte: null,
        Nacionalidad: null,
        Rnc: 0,
        Direccion: null,
        Celular: 0,
        Ocupacion: null,
        Estado: true,
        EstadoCivil: null,
        NoComercial: null,
        Telefono: 0,
        FechaNacimiento: null,
        Imagen: null,
        DatosTrabajos: null,
        Referencias: null,
        Comentarios: null,
        CategoriaNombre: null
      },
      opcionescategoria: [],
      rules: {
        Nombre: [
          { required: true, message: "Debe ingresar un nombre" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],
        Apodo: [
          { required: true, message: "El apellido es requerido" },
          { min: 3, message: "Debe contener como mínimo 3 caracteres" }
        ],

        bio: [{ required: true, message: "Este campo es requerido" }],

        Cedula: [
          { required: true, message: "Cedula requerida" },
          { max: 11, message: "Cedula solo contiene 11 caracteres" }
        ],

        Email: [
          {
            required: true
          }
        ],
        Nacionalidad: [
          {
            required: true,
            message: "Nacionalidad requerida"
          }
        ],
        Rnc: [
          {
            required: true,
            message: "RNC requerido, en caso de no tener digite Cedula"
          }
        ],
        NoComercial: [{ required: true }],
        /* Direccion: [{ required: true, message: "Direccion necesaria" }],*/
        Ocupacion: [{ required: true, message: "Registrar alguna ocupacion" }],
        EstadoCivil: [{ required: true, message: "Estado Civil requerido" }],
        FechaNacimiento: [
          { required: true, message: "Fecha de Nacimiento requerida" }
        ],
        DatosTrabajos: [{ required: false }],
        Referencias: [
          { required: true, message: "Agregar al menos una referencia" }
        ],
        Comentarios: [{ required: true, message: "Inserte algun comentario" }],
        Direccion: [
          { required: true, message: "Direccion no puede estar vacio" }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      return this.form.ExpedientesId === 0
        ? "Nuevo Expediente"
        : `${this.form.Nombre}`;
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
    self.getAllCategorias();
  },
  methods: {
    getAllCategorias(){
    let self = this;
      self.$store.state.services.CategoriasService
      .getAll()
      .then(r => { 
          self.loading = false;
          self.opcionescategoria = r.data;
          console.log("Lista Recuperada");
      }).catch( r => {
           self.$message({
               message: "No se pudo obtener la Lista, favor recarge",
               type: "error",
           });
           console.log(r);
      });
  },
    get(id) {
      if (id == undefined) return;
      let self = this;
      self.loading = true;
      self.$store.state.services.ExpedientesService.get(id)
        .then(r => {
          self.loading = false;
          self.form.ExpedientesId = r.data.expedientesId;
          self.form.Cedula = r.data.cedula;
          self.form.Nombre = r.data.nombre;
          self.form.Apodo = r.data.apodo;
          self.form.Sexo = r.data.sexo;
          self.form.Email = r.data.email;
          self.form.Pasaporte = r.data.pasaporte;
          self.form.Nacionalidad = r.data.nacionalidad;
          self.form.Rnc = r.data.rnc;
          self.form.Direccion = r.data.direccion;
          self.form.Celular = r.data.celular;
          self.form.Ocupacion = r.data.ocupacion;
          self.form.Estado = r.data.estado;
          self.form.EstadoCivil = r.data.estadoCivil;
          self.form.NoComercial = r.data.noComercial;
          self.form.Telefono = r.data.telefono;
          self.form.FechaNacimiento = r.data.fechaNacimiento;
          self.form.Imagen = r.data.imagen;
          self.form.DatosTrabajos = r.data.datosTrabajos;
          self.form.Referencias = r.data.referencias;
          self.form.Comentarios = r.data.comentarios;
          self.form.CategoriaNombre = r.data.categoriasNombre;
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
    crearCategoria(){
      let self= this;
     self.$refs["ruleFormCategorias"].validate(valid => {
       if(valid) {
         self.loadingCategorias = true;
           self.$store.states.services.CategoriasService
           .add(self.formCategoria)
         .then(r => {
                console.log(r);
                self.loadingCategorias = false;
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
                console.log(r);
                self.loadingCategorias = false;
              });
       }
     })
     self.dialogCategoryVisible = false;
     self.getAllCategorias();
    },
    handleClose(done) {
        this.$confirm('Seguro deseas cerrar el cuadro de dialogo?')
          .then(_ => {
            done();
            self.loadingCategorias = false;
          })
          .catch(_ => {});
    },
    save() {
      let self = this;
      if(self.form.Sexo == 1) {
        self.form.Sexo = 'M'
      }else{
      self.form.Sexo = 'F'
      }
      self.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.ExpedientesId > 0) {
            self.$store.state.services.ExpedientesService.update(self.form)
              .then(r => {
                self.loading = false;
                console.log(r);
                self.$router.push("/expedientes");
              })
              .catch(r => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error"
                });
                console.log(r);
              });
          } else {
            self.$store.state.services.ExpedientesService.add(self.form)
              .then(r => {
                console.log(r);
                self.loading = false;
                self.$router.push("/expedientes");
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