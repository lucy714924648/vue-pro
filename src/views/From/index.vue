<template>
  <div>
    <form action="action_page.php" autocomplete="on">
      First name:<input type="text" name="fname" autofocus /><br />
      Last name:
      <input type="text" name="lname" /><br />
      E-mail: <input type="email" name="email" autocomplete="off" /><br />
      number:<input type="number" name="points" step="3" /><br />
      range:<input type="range" name="range" step="3" /><br />
      color:<input type="color" name="color" /><br />
      <!-- range:<input type="range" name="range" step="3" /><br /> -->
      progress:<progress value="20" max="100"></progress><br />
      meter:<meter
        value="10"
        min="0"
        max="100"
        low="20"
        height="80"
        optimum="70"
      ></meter>
      <input type="submit" />
      <input type="submit" formtarget="_blank" value="提交到新窗口/标签页" />
    </form>
  </div>
</template>


<script>
export default {};
</script>