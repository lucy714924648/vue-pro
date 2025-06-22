

export default{
    // 指令绑定到元素上时调用
    bind(el,binding){

    },
    // 元素插入父节点时调用
    inserted(el,binding){
        // console.log(binding.value,binding.name,binding.args);
        const arr=['add','view'];
        if(!arr.includes(binding.value)){
            el.parentNode.removeChild(el)
        }
    }
}