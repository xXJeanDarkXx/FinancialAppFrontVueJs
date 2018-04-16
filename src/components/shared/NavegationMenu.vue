<template>
<el-menu default-active="0">
    <template v-for="item, i in items">
        <el-submenu :index="i.toString()" v-if="item.children !== undefined">
            <template slot="title">
                <i :class="'fa fa-' + item.icon"></i>
                <span>{{ item.text }}</span>
            </template>
            <el-menu-item-group title="Opciones">
                <el-menu-item v-for="child, c in item.children" :index="(i.toString() + c)" @click="redirect(child.path)">
                    <i :class="'fa fa-' + child.icon"></i> <span>{{ child.text }}</span>
                </el-menu-item>
            </el-menu-item-group>    
        </el-submenu>
        <el-menu-item index="2" v-if="item.children === undefined" @click="redirect(item.path)">
            <i :class="'fa fa-' + item.icon"></i>
            <span>{{ item.text }}</span>
        </el-menu-item>
    </template>
</el-menu>
</template>

<script>
export default {
  name: "NavegationMenu",
  data: () => ({
    items: [
      { icon: "home", text: "Inicio", path: "/" },
     /* {
        icon: "user",
        text: "Estudiantes",
        children: [
          { icon: "plus", text: "Agregar", path: "/students/add" },
          { icon: "list", text: "Listar", path: "/students" },
        ]
      },*/
    /*  {
        icon: "star",
        text: "Ejemplo",
        children: [{ icon: "list", text: "Listar", path: "/example" }]
      },*/
      /*{
        icon: "wrench",
        text: "Configuración",
        children: [
          { icon: "list", text: "Opción 1", path: "/configuration/opcion1" },
          { icon: "list", text: "Opción 2", path: "/configuration/opcion2" }
        ]
      },*/
      
      {
        icon: "cash",
        text: "Prestamos",
        children: [
          { icon: "list", text: "Lista De Prestamos", path: "/prestamos" },
          /*{ icon: "list", text: "Reporte Expedientes", path: "/prestamos/ReportePrestamos" },
          { icon: "list", text: "Ubicaciones", path: "/ubicaciones" }*/
        ]
      },
      {
        icon: "cash",
        text: "Cartera de Prestamos",
        path: "/carteraprestamos"
      },
      {
        icon: "",
        text: "Expedientes",
        children: [
          { icon: "list", text: "Listar Expedientes", path: "/expedientes" },
          { icon: "list", text: "Categorias", path: "/categorias" }
        ]
      },
     /* {
        icon: "",
        text: "Cobros",
        children: [
          { icon: "list", text: "Rutas", path: "/expedientes" },
          { icon: "list", text: "Agenda Cobros", path: "/expedientes/ReporteExpedientes" },
          { icon: "list", text: "Ubicaciones", path: "/ubicaciones" }

        ]
      },*/
     /* {
        icon: "",
        text: "Garantias",
        paht: "/garantias"
      },
      {
        icon: "",
        text: "Consultas",
        paht: "/consultas"
      },*/
    ]
  }),
  methods: {
    redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>