<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
                <el-input v-model="ruleForm.workNumber"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <!-- !!$route.params.id两个！！可以讲string类型转换成boolean 两次取反-->
                <el-input v-model="ruleForm.mobile" :disabled="!!$route.params.id"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="departmentId">
                <!-- <el-input v-model="ruleForm.departmentName"></el-input> -->
                <!-- 级联组件 -->
                <SelectTree v-model="ruleForm.departmentId"></SelectTree>
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
                    <el-option label="非正式" value="0"></el-option>
                    <el-option label="正式" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职日期" prop="timeOfEntry">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.timeOfEntry"></el-date-picker>
            </el-form-item>
            <el-form-item label="转正日期" prop="correctionTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.correctionTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="员工头像" prop="staffPhoto">
                <UploadFile v-model="ruleForm.staffPhoto"></UploadFile>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import SelectTree from './components/SelectTree.vue'
import UploadFile from './components/UploadFile.vue'
export default {
    name: 'Detail',
    components: { SelectTree, UploadFile },
    data() {
        return {
            ruleForm: {
                username: "",
                workNumber: '',
                mobile: '',
                departmentId: null,//部门id
                formOfEmployment: null,
                timeOfEntry: "",
                correctionTime: "",
                staffPhoto:""
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: '/^1[3-9]\d{9}$/', message: '请输入正确的手机号', trigger: 'blur' }
                ],
                departmentId: [
                    { required: true, message: '请输入聘用形式', trigger: 'blur' },
                ],
                formOfEmployment: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' },
                ],

                timeOfEntry: [
                    { required: true, message: '请输入入职时间', trigger: 'blur' },
                ],
                correctionTime: [
                    { required: true, message: '请输入转正职时间', trigger: 'blur' },
                    {
                        validator: (ruel, value, cb) => {
                            if (this.ruleForm.timeOfEntry) {
                                if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
                                    cb(new Error('转正时间要大于入职时间'))
                                    return
                                }
                            }
                            cb()

                        }
                    }
                ],

            }
        }
    },
    created() {
        let id = this.$route.params.id
        //点击查看跳转到此页
        // 数据回显根据id查询接口数据，然后给ruleForm赋值就可以
    }
}
</script>
<style></style>