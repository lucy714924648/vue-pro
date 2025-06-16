// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟数据
const mockData = {
  users: [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 }
  ],
  posts: [
    { id: 1, title: '文章1', content: '内容1' },
    { id: 2, title: '文章2', content: '内容2' }
  ]
};

// GET 请求示例
export const fetchUsers = async () => {
  await delay(1000); // 模拟网络延迟
  return {
    code: 200,
    data: mockData.users,
    message: '获取成功'
  };
};

// POST 请求示例
export const createUser = async (userData) => {
  await delay(1000);
  const newUser = {
    id: mockData.users.length + 1,
    ...userData
  };
  mockData.users.push(newUser);
  return {
    code: 200,
    data: newUser,
    message: '创建成功'
  };
};

// PUT 请求示例
export const updateUser = async (id, userData) => {
  await delay(1000);
  const index = mockData.users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new Error('用户不存在');
  }
  mockData.users[index] = { ...mockData.users[index], ...userData };
  return {
    code: 200,
    data: mockData.users[index],
    message: '更新成功'
  };
};

// DELETE 请求示例
export const deleteUser = async (id) => {
  await delay(1000);
  const index = mockData.users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new Error('用户不存在');
  }
  mockData.users.splice(index, 1);
  return {
    code: 200,
    message: '删除成功'
  };
}; 