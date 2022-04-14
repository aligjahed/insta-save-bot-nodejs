const dotenv = require("dotenv").config();
const axios = require("axios").default;
const { Composer } = require("micro-bot");

const { getPostLink } = require("./igdownloader");

const app = new Composer();

app.start((ctx) =>
  ctx.reply(
    "⭕️❗️اینستاگرام دانلودر فارسی❗️⭕ \n\n 🔹به ربات Insta Save Farsi خوش آمدید. \n\n 🔸لیست دستورات : \n\n ▫️ /getPost ( دریافت پست ) \n\n ◾️ /help ( راهنمای استفاده ) \n\n 🔵 @InstaSaveFarsi_bot 🔵 "
  )
);

app.command("getPost", async (ctx) => {
  ctx.reply("لطفا لینک پست مورد نظر را ارسال کنید. 🌐");

  app.on("text", async (ctx) => {
    ctx.reply("لطفا صبر کنید... ⚠️");

    const inputLink = makeLink(ctx.message.text);

    try {
      const res = await getPostLink(inputLink);

      if (res.outType === "video")
        ctx.replyWithVideo(
          { url: res.link },
          {
            caption:
              "⭕️❗️اینستاگرام دانلودر فارسی❗️⭕ \n\n 🔵 @InstaSaveFarsi_bot 🔵",
          }
        );
      else if (res.outType === "photo")
        ctx.replyWithPhoto(
          { url: res.link },
          {
            caption:
              "⭕️❗️اینستاگرام دانلودر فارسی❗️⭕ \n\n 🔵 @InstaSaveFarsi_bot 🔵",
          }
        );
    } catch (err) {
      console.log(err);
      ctx.reply(
        "مشکلی رخ داد .. . 🚫 \n\n بعدا مجددا تلاش کنید یا از دستور /help استفاده کنید❗️"
      );
    }
  });
});

app.help(async (ctx) => {
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/7re4rt20mfl9hbw/1.jpg?dl=0"
  );
  await ctx.reply("ابتدا پست مورد نظر را انتخاب کنید. ");
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/pb3zduqnehxmmyt/2.jpg?dl=0"
  );
  await ctx.reply("سپس بر روی سه نقطه بالای پست کلیک کنید");
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/kyd2e4pqz10kdy7/3.jpg?dl=0"
  );
  await ctx.reply("با کلیک بر روی گزینه Link لینک پست را کپی کنید. ");
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/haoo6tv2aqfgbjx/4.jpg?dl=0"
  );
  await ctx.reply(
    "به تلگرام برگشته و در صفحه ربات دستور /getPost را وارد نمایید."
  );
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/uobren8v7iglj9b/5.jpg?dl=0"
  );
  await ctx.reply(
    "لینک پست را که در مراحل قبل کپی کردید برای ربات ارسال کنید و منتظر بمانید \n\n توجه: لینک پست ارسالی نباید متعلق به یک صفحه شخصی یا private باشد."
  );
  await ctx.replyWithPhoto(
    "https://www.dropbox.com/s/ri7chfi75rqffjr/6.jpg?dl=0"
  );
  await ctx.reply(
    "پست شما با موفقیت ذخیره شده و میتوانید ان را در گالری ذخیره نمایید"
  );
});

const makeLink = (link) => {
  let splitedLink = link.split("/");

  let finalLink = `https://www.instagram.com/${splitedLink[3]}/${splitedLink[4]}/`;

  return finalLink;
};

module.exports = app;
