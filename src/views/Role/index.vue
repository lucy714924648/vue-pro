<template>
    <div>
        <!-- 角色管理内容 -->
        <div>
            <el-button type="primary" size="mini" @click="dialogVisible = true">添加角色</el-button>
        </div>
        <!-- table表格组件 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="角色" width="180" align="center">
                <template v-slot="{ row }">
                    <el-input v-if="row.isEdit" v-model="row.editRow.name"></el-input>
                    <span v-else>{{ row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="启用" width="180" align="center">
                <template v-slot="{ row }">
                    <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1"
                        :inactive-value="0"></el-switch>
                    <span v-else>{{ row.state === 0 ? '未启用' : '已启用' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" width="180" align="center">
                <template v-slot="{ row }">
                    <el-input v-if="row.isEdit" state v-model="row.editRow.description"></el-input>
                    <span v-else>{{ row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template v-slot="{ row }">
                    <template v-if="row.isEdit">
                        <!-- 编辑状态 显示的按钮 -->
                        <el-button size="mini" type="text" @click="editConfirmBtn(row)">确定</el-button>
                        <el-button size="mini" type="text" @click="row.isEdit = false">取消</el-button>
                    </template>
                    <!-- 非编辑状态  显示的按钮  -->
                    <template v-else>
                        <el-button size="mini" type="text">分配权限</el-button>
                        <el-button size="mini" type="text" @click="handleEdit($index, row)">编辑</el-button>
                        <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDelete(row)">

                            <el-button size="mini" slot="reference" type="text"
                                style="margin-left: 10px;">删除</el-button>
                        </el-popconfirm>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" style="height: 60px;" align="middle" justify="end">
            <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.pagesize"
                :current-page="page.currentPage" @current-change="currentChange">
            </el-pagination>
        </el-row>
        <!-- 新增弹层 -->
        <el-dialog title="新增角色" :visible.sync="dialogVisible" width="30%" @close="addCancel">
            <el-form :model="ruleForm" :rules="roleRules" ref="roleForm" label-width="100px">
                <el-form-item label="角色名称" prop="name">
                    <template v-slot="{ row }">
                        <el-input v-if="row.isEdit" v-model="ruleForm.name"></el-input>
                        <span v-else>{{ row.name }}</span>
                    </template>
                </el-form-item>
                <el-form-item label="启用" prop="state">
                    <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="center">
                        <el-col :span="12">
                            <el-button type="primary" size="mini" @click="addConfim">确定</el-button>
                            <el-button size="mini" @click="addCancel">取消</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>

            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->

        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            page: {
                total: 13,
                pagesize: 10,
                currentPage: 1
            },
            dialogVisible: false,//是否显示弹层
            ruleForm: {
                name: "",
                state: 1,
                description: ""
            },
            roleRules: {
                name: [{
                    required: true, message: '不能为空', trigger: 'blur'
                }],
                state: [],
                description: [
                    {
                        required: true, message: '不能为空', trigger: 'blur'
                    }
                ]
            }
        }
    },
    created() {
        this.tableData = new Array(13).fill(0).map((item, index) => {
            return {
                name: `lily${index + 1}`,
                state: Math.floor(Math.random() * 2), // 随机状态0或1
                description: `单元 ${index + 1}`
            }
        })
        this.tableData.forEach(item => {
            // item.isEdit = false
            this.$set(item, 'isEdit', false)
            // 缓存编辑数据
            this.$set(item, 'editRow', {
                name: item.name,
                state: item.state,
                description: item.description
            })
        });
        console.log(this.tableData);

    },
    methods: {
        //编辑
        handleEdit(index, row) {
            row.isEdit = true
            // console.log(this.tableData);
            //重新更新
            row.editRow.name = row.name;
            row.editRow.state = row.state;
            row.editRow.description = row.description;

        },
        //删除
        handleDelete(row) {
            //调用删除接口
            this.$message.success('删除成功')
            // 判断是不是这一页的最后一条数据
            if (this.tableData.length === 1) {
                this.page.currentPage--
            }
            //更新数据,调用更新列表数据

        },
        // 当前页码改变时
        currentChange(newpage) {
            this.page.currentPage = newpage;
            // 更新newpage表格数据
            this.tableData = new Array(1).fill(0).map((item, index) => {
                return {
                    name: `lily${index + 1}`,
                    state: Math.floor(Math.random() * 2), // 随机状态0或1
                    description: `单元 ${index + 1}`
                }
            })

        },
        handleClose() {

        },
        addConfim() {
            this.$refs.roleForm.validate((valid) => {
                if (valid) {
                    //调用新增角色数据接口
                    // console.log(this.ruleForm);
                    this.$message.success('新增角色成功')
                    //更新角色列表数据
                    //重置新增表单，关闭新增弹层
                    this.addCancel()
                }

            })
        },
        addCancel() {
            //重置新增表单，关闭新增弹层
            this.$refs.roleForm.resetFields()
            this.dialogVisible = false
        },
        editConfirmBtn(row) {
            if (row.editRow.name && row.editRow.description) {
                // 调用更新编辑角色接口
                // 用editRow的数据更新row的数据
                Object.assign(row, {
                    ...row.editRow,
                    isEdit: false
                })

            } else {
                this.$message.error('角色名或者描述不能为空')
            }
        }
    }
}
</script>
<style></style>