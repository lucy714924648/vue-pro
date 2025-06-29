<template>
    <div>
        <el-dialog title="添加子部门" :visible.sync="showDepDialog" width="30%" @close="handleClose">
            <span>这是一段信息</span>

        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        showDepDialog: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        handleClose(){
            this.$emit('update:showDepDialog',false)
        }
    }
}
</script>