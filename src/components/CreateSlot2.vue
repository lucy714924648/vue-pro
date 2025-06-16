<script>
export default {
  name: "CreateSlot2",

  render(h) {
    const slots = this.$slots;
    const scopedSlots = this.$scopedSlots;
    console.log(slots);
    console.log(scopedSlots);

    const defaultSlots = slots.default;
    const slot1 = scopedSlots.slot1();
    // 处理作用域插槽，传入数据
    const slot2 = scopedSlots.slot2({ msg: "Hello from slot2" });

    return h("div", null, [...defaultSlots, ...slot1, ...slot2]);
  },
};
</script>