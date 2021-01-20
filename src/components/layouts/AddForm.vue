<template>
  <el-dialog
    title="Add Label"
    :visible.sync="$root.app.add"
    width="30%"
    center
  >
    <div class="input-block">
      <div class="input-label">Label name</div>
      <el-input v-model="name" />
      </el-select>
    </div>
  <div class="input-block">

      <div class="input-label">Label size</div>
      <el-select v-model="size" placeholder="Select">
        <el-option
          v-for="item in $root.app.sizes"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    
    <div class="input-block">
        <a class="button" :disabled="name == null" @click="add">Add</a>
    </div>
  </el-dialog>
</template>


<script>
export default {
  name: "AddForm",
  data: () => {
    return {
       name: null,
       size: 0
    }
  },
  methods: {
    add(){
      if(this.name == null) return;
      const id = this.$root.app.generator();
      this.$root.app.stickers.unshift(
          {
        id,
        name: this.name,
        elems: [{
            id: this.$root.app.generator(),
            content: "Some text",
            transform: ''
          }],
        user_id: this.$root.app.user.id,
        created_at: this.$moment().format('YYYY-MM-DD h:mm'),
        size: this.size,
      },
      );

      this.$root.app.add = false;
      this.name = null;
      this.size = 0;

      this.$router.push("/tools/stickers/"+id);

      this.$message({
        message: "Successfully add label",
        type: "success",
      });

    }
  }
};
</script>

