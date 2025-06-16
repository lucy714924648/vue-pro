<template>
  <div class="chat-container">
    <!-- 左侧联系人列表 -->
    <div class="contacts-list">
      <div class="contact-item">联系人 1</div>
      <div class="contact-item">联系人 2</div>
      <div class="contact-item">联系人 3</div>
      <div class="contact-item">联系人 4</div>
      <div class="contact-item">联系人 5</div>
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-area">
      <!-- 聊天记录 -->
      <div class="messages">
        <div class="message received">你好！</div>
        <div class="message sent">你好，最近怎么样？</div>
        <div class="message received">还不错，你呢？</div>
        <div class="message sent">我也很好！</div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <textarea placeholder="输入消息..."></textarea>
        <button>发送</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
 <style scope>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chat-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 左侧联系人列表 */
.contacts-list {
  width: 300px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.contact-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.contact-item:hover {
  background-color: #f0f0f0;
}

/* 右侧聊天区域 */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 聊天记录区域 */
.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin-bottom: 15px;
  max-width: 70%;
}

.message.sent {
  margin-left: auto;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 10px;
}

.message.received {
  background-color: white;
  padding: 10px;
  border-radius: 10px 10px 10px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 输入区域 */
.input-area {
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 10px;
}

.input-area textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  height: 60px;
}

.input-area button {
  padding: 0 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-area button:hover {
  background-color: #45a049;
}
</style>