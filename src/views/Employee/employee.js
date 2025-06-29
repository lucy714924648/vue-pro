
/**
 * 生成三层树形结构的部门数据
 * @param {number} count 需要生成的部门总数（建议30-50条以保证三层结构）
 * @returns {object[]} 包含顶级部门的数组，每个部门含children子节点
 */
export const generateDepartmentData = (count = 30) => {
  // 部门名称库（三级结构）
  const topLevelNames = ["传智教育", "研发中心", "运营中心", "市场部", "财务部", "人力资源部", "行政部"];
  const secondLevelNames = ["技术部", "产品部", "设计部", "开发部", "测试部", "运维部", "策划部", "推广部", "销售部", "会计部", "薪酬部", "培训部", "后勤保障部"];
  const thirdLevelNames = ["前端开发组", "后端开发组", "移动开发组", "UI设计组", "交互设计组", "测试一组", "测试二组", "系统运维组", "网络运维组", "品牌推广组", "渠道销售组", "成本会计组", "薪资福利组", "新员工培训组", "资产管理组", "车辆管理组"];
  
  // 经理名称库
  const managerNames = ["张经理", "王经理", "李经理", "赵经理", "刘经理", "陈经理", "杨经理", "黄经理", "周经理", "吴经理"];
  
  let id = 1;                      // 唯一ID生成器
  const departments = [];          // 存储所有顶级部门
  
  // 生成顶级部门（第一层）
  const topLevelCount = Math.min(count, topLevelNames.length);
  for (let i = 0; i < topLevelCount && id <= count; i++) {
    const topDept = {
      id: id++,
      pid: 0,
      name: topLevelNames[i],
      managerName: managerNames[i % managerNames.length],
      children: []  // 用于存储二级部门
    };
    departments.push(topDept);
    
    // 为每个顶级部门生成二级部门（第二层）
    const secondLevelCount = Math.floor(Math.random() * 4) + 1;  // 1-4个二级部门
    for (let j = 0; j < secondLevelCount && id <= count; j++) {
      const secondDept = {
        id: id++,
        pid: topDept.id,
        name: secondLevelNames[(i * secondLevelNames.length + j) % secondLevelNames.length],
        managerName: managerNames[(i * managerNames.length + j) % managerNames.length],
        children: []  // 用于存储三级部门
      };
      topDept.children.push(secondDept);
      
      // 为二级部门生成三级部门（第三层，保证每个二级部门至少有1个三级部门）
      const thirdLevelCount = Math.floor(Math.random() * 3) + 1;  // 1-3个三级部门
      for (let k = 0; k < thirdLevelCount && id <= count; k++) {
        const thirdDept = {
          id: id++,
          pid: secondDept.id,
          name: thirdLevelNames[(i * secondLevelNames.length * thirdLevelNames.length + j * thirdLevelNames.length + k) % thirdLevelNames.length],
          managerName: managerNames[(i * managerNames.length * managerNames.length + j * managerNames.length + k) % managerNames.length]
        };
        secondDept.children.push(thirdDept);
      }
    }
  }
  
  return departments;
};

// 生成30条数据（示例调用）
// const depsData = generateDepartmentData(30);
// console.log(JSON.stringify(depsData, null, 2));