<template>
    <el-cascader :value="value" :options="depsData" :props="props" @change="changeSelect" separator="-s">

    </el-cascader>
</template>
<script>
import { generateDepartmentData } from "../employee"
export default {
    // 父组件的v-model,
    // 子组件props value属性接收和触发input通知父组件更新数据
    //级联菜单改变时触发input
    props: {
        value: {
            type: Number,//存储的部门id
            default: null
        }
    },
    data() {
        return {
            props: {
                label: "name",//默认是label
                value: "id"//默认是value
            },
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
        }
    },
    methods: {
        //级联菜单改变时触发input
        changeSelect(data) {
            //数组最后一位，部门id
            let len = data.length
            if (len > 0) {
                this.$emit('input', data[len - 1])
            } else {
                //没有得话，部门id 传null
                this.$emit('input', null)
            }

        }
    },
    created() {
        this.depsData = generateDepartmentData(50)
        console.log(this.depsData);

    }
}
</script>