<template>
  <div class="user-list">
    <h2>用户列表</h2>

    <!-- 添加用户表单 -->
    <div class="add-user">
      <input v-model="newUser.name" placeholder="用户名" />
      <input v-model.number="newUser.age" type="number" placeholder="年龄" />
      <button @click="handleAddUser">添加用户</button>
    </div>

    <!-- 用户列表 -->
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="users">
      <div v-for="user in users" :key="user.id" class="user-item">
        <span>{{ user.name }}</span>
        <span>{{ user.age }}岁</span>
        <button @click="handleEditUser(user)">编辑</button>
        <button @click="handleDeleteUser(user.id)">删除</button>
      </div>
    </div>

    <!-- 编辑用户弹窗 -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>编辑用户</h3>
        <input v-model="editingUser.name" placeholder="用户名" />
        <input
          v-model.number="editingUser.age"
          type="number"
          placeholder="年龄"
        />
        <div class="modal-buttons">
          <button @click="handleUpdateUser">保存</button>
          <button @click="showEditModal = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/mockApi";

// 状态
const users = ref([]);
const loading = ref(false);
const error = ref(null);
const newUser = ref({ name: "", age: null });
const showEditModal = ref(false);
const editingUser = ref({ id: null, name: "", age: null });

// 获取用户列表
const loadUsers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetchUsers();
    users.value = response.data;
  } catch (err) {
    error.value = "加载用户列表失败";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 添加用户
const handleAddUser = async () => {
  if (!newUser.value.name || !newUser.value.age) {
    alert("请填写完整信息");
    return;
  }
  try {
    await createUser(newUser.value);
    newUser.value = { name: "", age: null };
    await loadUsers();
  } catch (err) {
    error.value = "添加用户失败";
    console.error(err);
  }
};

// 编辑用户
const handleEditUser = (user) => {
  editingUser.value = { ...user };
  showEditModal.value = true;
};

// 更新用户
const handleUpdateUser = async () => {
  try {
    await updateUser(editingUser.value.id, editingUser.value);
    showEditModal.value = false;
    await loadUsers();
  } catch (err) {
    error.value = "更新用户失败";
    console.error(err);
  }
};

// 删除用户
const handleDeleteUser = async (id) => {
  if (!confirm("确定要删除这个用户吗？")) return;
  try {
    await deleteUser(id);
    await loadUsers();
  } catch (err) {
    error.value = "删除用户失败";
    console.error(err);
  }
};

// 组件挂载时加载数据
onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-user {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.loading {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
  text-align: center;
  padding: 20px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

input {
  padding: 5px;
  margin: 5px 0;
}
</style> 