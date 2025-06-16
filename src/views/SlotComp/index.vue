<template>
  <div class="slot">
    <CreateSlot2>
      <p>default slot</p>
      <template slot="slot1">
        <p>slot1</p>
      </template>
      <template slot="slot2" slot-scope="{ msg }">
        slot2:
        <p>{{ msg }}</p>
      </template>
    </CreateSlot2>
  </div>
</template>

<script>
// import CreateSlot from "../../components/CreateSlot.vue";
import CreateSlot2 from "../../components/CreateSlot2.vue";
// import CreateSlot from "../../utils/slots.js";
export default {
  name: "SlotComp",
  components: { CreateSlot2 },
};
</script>