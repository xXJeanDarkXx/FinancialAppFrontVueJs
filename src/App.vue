
<template>
<el-container>
  <el-header>
    <h1>Financial App</h1>
    
  </el-header>
  <el-container>
    <el-aside style="width:240px;">
      <navegationmenu></navegationmenu>
    </el-aside>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>© <a target="_blank">{{ 'Desarrollado por xXJeanDarkXx ' + new Date().getFullYear() + " - Matricula: 2016-3600 (Para Stanley)" }}</a></el-footer>
    </el-container>
  </el-container>
</el-container>
</template>



<script>
import navegationmenu from "@/components/shared/NavegationMenu";

export default {
  components: {
    navegationmenu
  },
  props: {
    source: String
  }
};
</script>