<template>
    <div>
        <el-tree :data="depsData" :props="defaultProps" default-expand-all>
            <template v-slot="{ data }">
                <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
                    <el-col>
                        {{ data.name }}
                    </el-col>
                    <el-col :span="4">
                        <span style="margin-right: 20px;">{{ data.managerName }}</span>
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                <el-dropdown-item command="edit">编辑子部门</el-dropdown-item>
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </template>
        </el-tree>
        <!-- 添加子部门弹层 -->
         <AddDepDialog :showDepDialog.sync="showDepDialog"></AddDepDialog>
    </div>
</template>
<script>
import { generateDepartmentData } from "../Employee/employee"
import AddDepDialog from "./components/AddDepDialog.vue"
export default {
    components: {
        AddDepDialog
    },
    data() {
        return {
            depsData: [],
            // depsData: [{
            //     "id": 1,
            //     "pid": 0,
            //     "name": "传智教育",
            //     "managerName": "管理员",
            //     "children": [
            //         {
            //             "id": 4,
            //             "pid": 1,
            //             "name": "人事部",
            //             "managerName": "管理员2",
            //             "children": [
            //                 {
            //                     "id": 10,
            //                     "pid": 4,
            //                     "name": "税务管理部",
            //                     "managerName": "管理员3",
            //                 }
            //             ]
            //         }
            //     ]
            // }
            // ],
            defaultProps: {
                children: 'children',
                label: 'name'

            },
            showDepDialog: false,
        };
    },
    created() {
        this.depsData = generateDepartmentData(50)
        console.log(this.depsData);

    },
    methods: {
        // handleNodeClick(data) {
        //     console.log(data);
        // }
        handleCommand(command) {
            // alert(command);
            if (command === 'add') {
                this.showDepDialog = true
            }
        }
    }
};
</script>
<style></style>