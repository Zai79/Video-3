const { Client } = require("discord.js-selfbot-v13");
const express = require("express");

const client = new Client();

// ====== سيرفر ويب بسيط للـ Render ======
const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("✅ Selfbot voice online 24/7");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// ====== لما يدخل الحساب ======
client.on("ready", async () => {
  console.log(`✅ ${client.user.username} logged in!`);

  try {
    // جيب السيرفر والروم الصوتي من الإعدادات
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const channel = guild?.channels.cache.get(process.env.VOICE_CHANNEL_ID);

    if (channel && channel.isVoiceBased()) {
      await channel.join();
      console.log("🎧 دخل الروم الصوتي وباقي 24/7");
    } else {
      console.error("❌ ما لقيت الروم الصوتي، تأكد من GUILD_ID و VOICE_CHANNEL_ID");
    }
  } catch (err) {
    console.error("❌ خطأ أثناء محاولة الدخول للروم:", err);
  }
});

// ====== تسجيل دخول ======
client.login(process.env.USER_TOKEN);
