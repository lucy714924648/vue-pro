<template>
    <el-dialog title="员工导入" :visible.sync="showExcelDialog" @close="$emit('update:showExcelDialog', false)">
        <el-row type="flex" justify="center">
            <div class="upload-excel">
                <!-- accept=".xlsx,.xls" -->
                <input type="file" ref="fileInput" @change="fileChange">
            </div>
            <div class="drop">
                <i class="el-icon-upload"></i>
                <!-- // 下载导入模板  功能和导出逻辑一样   都是文件下载-->
                <el-button type="text">下载导入模板</el-button>
                <span>将文件拖拽到此处或</span>
                <el-button type="text" @click="uploadClick">点击上传</el-button>
            </div>
        </el-row>
        <el-row type="flex" justify="end">
            <!--update:props属性名，值  直接修改 .sync修饰的值  -->
            <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
        </el-row>
    </el-dialog>
</template>
<script>
export default {
    props: {
        showExcelDialog: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        
        uploadClick() {
            this.$refs.fileInput.click()
        },
        // 拿到文件
        fileChange(event) {
            const files = event.target.files
            //大于0 在上传
            if (files.length > 0) {
                try {
                    //调上传文件接口,参数formData
                    const formData = new FormData()
                    formData.append('file', files[0])
                    this.$message.success('上传成功')
                    //通知父组件更新列表数据
                    this.$emit('update:updateSucess')
                    //关闭弹层
                    this.$emit('update:showExcelDialog', false)
                } catch (error) {
                    //上传失败
                    this.$message.error(error)
                } finally {
                    //清空文件表单
                    this.$refs.fileInput.value = ''
                }
            }

        },
    }
}
</script>
<style></style>