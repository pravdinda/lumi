<template>
  <el-dialog
    title="Print settings"
    :visible.sync="$root.app.print"
    width="30%"
    center
  >
    <div class="input-block">
      <div class="input-label">Select a printer</div>
      <el-select v-model="printer" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="input-block">
        <a class="button" :disabled="printer == null" @click="print">Print</a>
    </div>
  </el-dialog>
</template>


<script>
export default {
  name: "PrintForm",
  data: () => {
    return {
       printer: null,
       options: [
         {value:0, label: 'Sonic print x56321' },
         {value:1, label: 'Space Jam 456' },
         {value:2, label: 'Ferrary print 9x' },
         {value:3, label: 'Main printer device' },
       ]
    }
  },
  methods: {
    print(){
      if(this.printer == null) return;
      this.$root.app.print = false;
      this.printer = null;

      this.$message({
        message: "Successfully sent to print",
        type: "success",
      });

    }
  }
};
</script>

