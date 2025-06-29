<template>
    <div>
        <h1>employee</h1>
        <div class="employee-main">
            <div class="left">
                <el-input placeholder="请输入姓名" prefix-icon="el-icon-search" v-model="queryParams.keyword"
                    @input="inputSearch">
                </el-input>
                <!-- tree -->
                <el-tree ref="treeDep" node-key="id" :data="depsData" :props="defaultProps" default-expand-all
                    @current-change="currentChange" :expand-on-click-node="false" highlight-current>
                </el-tree>
            </div>
            <div class="right">
                <el-row>
                    <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
                    <el-button size="mini" @click="showExcelDialog = true">导入excel</el-button>
                    <el-button size="mini" @click="exportExcel">导出excel</el-button>
                </el-row>
                <!-- table -->
                <el-table :data="tableData">
                    <el-table-column label="头像" prop="staffPhoto" align="center"></el-table-column>
                    <el-table-column label="姓名" prop="username"></el-table-column>
                    <el-table-column label="手机号" prop="mobile" sortable></el-table-column>
                    <el-table-column label="工号" prop="workNumber" sortable></el-table-column>
                    <el-table-column label="聘用形式" prop="formOfEmployment"></el-table-column>
                    <el-table-column label="部门" prop="departmentName"></el-table-column>
                    <el-table-column label="入职时间" prop="timeOfEntry" sortable></el-table-column>
                    <el-table-column label="操作" width="280px">
                        <template v-slot="{ row }">
                            <el-button size="mini" type="text"
                                @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
                            <el-button size="mini" type="text">角色</el-button>
                            <el-button size="mini" type="text">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!-- fenye -->
                <el-col style="height: 60px;" type="flex" justify="end" align="middle">
                    <el-pagination layout="total,prev, pager, next" :total="1000" :page-size="queryParams.pageSize"
                        :current-page="queryParams.currentPage" @current-change="currentPageChange">
                    </el-pagination>
                </el-col>
            </div>
        </div>
        <!-- 导入弹层 -->
        <ImportExcel :showExcelDialog.sync="showExcelDialog" @updateSucess="updateSucess"></ImportExcel>
    </div>
</template>
<script>
import { generateDepartmentData } from "./employee"
import ImportExcel from "./components/ImportExcel"
import FileSaver from 'file-saver'
export default {
    components: {
        ImportExcel
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
            queryParams: {
                departmentId: null,
                pageSize: 10,
                currentPage: 1,
                keyword: ''//搜索框模糊查询子段
            },
            tableData: [],
            showExcelDialog: false,
        }
    },
    created() {
        this.depsData = generateDepartmentData(50)
        this.queryParams.departmentId = this.depsData[0].id
        this.$nextTick(() => {
            this.$refs.treeDep.setCurrentKey(this.queryParams.departmentId)
        })
        // 输出生成的数据
        this.tableData = this.generateEmployees(30);


    },
    methods: {
        // 加防抖
        inputSearch(val) {
            this.queryParams.currentPage = 1
            //模糊查询的时候把当前页设置成1
            //再去调用查询表格数据的接口

            //此处是自己模拟的
            this.tableData = this.tableData.filter((item) => item.username.includes(this.queryParams.keyword))

        },
        // 生成30条员工数据
        generateEmployees(count = 30) {
            return Array.from({ length: count }, (_, i) => {
                const id = i + 1;
                const employmentTypes = ['full_time', 'part_time', 'contract', 'intern'];
                const departments = ['Development', 'Design', 'Marketing', 'HR', 'Finance', 'Operations'];

                return {
                    "id": id,
                    "staffPhoto": `https://picsum.photos/id/${id}/200/200`,
                    "mobile": `13800138${String(id).padStart(4, '0')}`,
                    "username": `user${id}`,
                    "formOfEmployment": employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
                    "workNumber": `W${String(id).padStart(3, '0')}`,
                    "departmentName": departments[Math.floor(Math.random() * departments.length)],
                    "timeOfEntry": `202${Math.floor(Math.random() * 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
                };
            });
        },
        // 切换部门
        currentChange(node) {
            this.queryParams.departmentId = node.id
            //更新当前页是第一页
            this.queryParams.currentPage = 1
            //调用获取员工的接口
        },
        // 当前页码改变时
        currentPageChange(newpage) {
            this.queryParams.currentPage = newpage;
            //调用获取员工的接口
        },
        // 导出功能
        exportExcel() {
            //1.调用导出接口，返回blob流，responseType：blob
            //2. npm file-saver. save
            // FileSaver.saveAs(Blob对象,文件名称). 保存到本地
            // FileSaver.saveAs(Blob,'员工信息表.xlsx')
        },
        updateSucess(){
            //上传文件成功后
            //调用获取列表页数据接口
        }
    }
}
</script>
<style>
.employee-main {
    display: flex;
    background-color: #fff;
}

.left {
    width: 300px;
    border-right: 1px solid;
    padding: 20px;
}

.right {
    flex: 1;
    padding: 20px;
}
</style>