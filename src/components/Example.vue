<script>
export default {
  name: "SlotComp",
  render(h) {
    const slots = this.$slots;
    const defaultSlots = slots.default ? slots.default() : [];
    const slot1 = slots.slot1 ? slots.slot1() : [];
    const slot2 = slots.slot2 ? slots.slot2() : [];

    return h("div", null, [...defaultSlots, ...slot1, ...slot2]);
  },
};
</script> 