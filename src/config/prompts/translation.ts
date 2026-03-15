import type { PromptCategory } from "../promptConfig";

// 翻译本地化类提示词
export const translationCategory: PromptCategory = {
  id: "translation",
  name: "翻译本地化",
  nameEn: "Daily Life & Translation",
  icon: "Globe",
  description: "菜单翻译、漫画本地化,保留原始纹理",
  prompts: [
    {
      id: "menu-translation",
      title: "菜单翻译",
      titleEn: "Physical Store/Travel Translation",
      description: "翻译菜单或标志,同时保留原始表面纹理",
      prompt: `Translate the Chinese dish names on the wall menu into English for foreign tourists. Texture Preservation: Crucial! Maintain the original aged, greasy, and textured look of the wall/paper. The new English text should look like it was written/printed on the same surface, with slight fading or wear to match. Currency: Keep the '¥' symbol and price numbers exactly as they are; do not convert currency. Layout: align the English translations next to or replacing the Chinese characters naturally.`,
      tags: ["翻译", "菜单", "旅行", "本地化"],
      source: "WeChat Article",
      previewImage: "https://github.com/user-attachments/assets/46c82371-4f9d-431c-9a11-65f51862a792",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "comic-localization",
      title: "漫画/表情包本地化",
      titleEn: "Digital Content Localization",
      description: "通过清除文字气泡并替换为匹配字体的内容来翻译漫画或表情包",
      prompt: `Translate the text in the speech bubbles/captions from [Japanese/English] to [Chinese]. Seamless Cleaning: Erase the original text and perfectly fill the background (e.g., the white speech bubble or the colored image background). Style Matching: Render the translated Chinese text using a casual, handwritten-style font (or bold impact font for memes) that matches the aesthetic of the original image. Fit: Ensure the text fits naturally within the bubbles without overcrowding.`,
      tags: ["翻译", "漫画", "表情包", "本地化"],
      source: "WeChat Article",
      previewImage: "https://github.com/user-attachments/assets/2cb58cf3-c05f-45d0-9f04-67fd7ba00267",
      nodeTemplate: { requiresImageInput: true, generatorType: "fast", aspectRatio: "1:1" },
    },
    {
      id: "landmark-card",
      title: "地标问路卡",
      titleEn: "Landmark Navigation Card",
      description: "设计地标问路或打车卡片",
      prompt: `设计一张简洁的2D数字旅行闪卡(全屏,垂直布局)。
视觉:上半部分显示一张清晰、高质量的[浅草寺]插图或照片抠图。
文字内容:
1. 顶部叠加(巨大,日语):'ここへお願いします' (请带我到这里)。
2. 中间(巨大汉字):'[浅草寺]'。
3. 底部(英语):'Senso-ji Temple'。
风格:海报设计,扁平色彩,没有纸张纹理,没有现实环境。只是在干净背景上的图形和文字。`,
      tags: ["地标", "问路", "打车", "旅行"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/landmark_card.png",
      nodeTemplate: { requiresImageInput: false, generatorType: "fast", aspectRatio: "9:16" },
    },
    {
      id: "travel-journal-handwritten",
      title: "旅行手账图",
      titleEn: "Travel Journal Handwritten",
      description: "生成手账形式的旅游指南",
      prompt: `生成 [中国珠海] 的旅游指南,要求手账形式,画面要纯中文。`,
      tags: ["旅行", "手账", "旅游", "指南"],
      source: "@canghecode",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/journal.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "9:16" },
    },
{
      id: "p-61437f",
      title: "旅行手账插画生成",
      titleEn: "旅行手账插画生成",
      description: "旅行手账插画生成",
      prompt: `请绘制一张色彩鲜艳、竖版（9:16）手绘风格的《{城市名}旅行手账插画》，画风仿佛由一位充满好奇心的孩子用蜡笔创作，整体使用柔和温暖的浅色背景（如浅黄色），搭配红色、蓝色、绿色等明亮色调，营造温馨、童趣、满满旅行气息的氛围。

一、主画面：手账式旅行路线
在插画中央绘制一条"蜿蜒曲折的旅行路线"，路线用箭头 + 虚线连接多个地点，由 {天数} 日行程自动生成推荐景点：
- "第 1 站：{景点 1 推荐 + 简短趣味描述}"
- "第 2 站：{景点 2 推荐 + 简短趣味描述}"
- "第 3 站：{景点 3 推荐 + 简短趣味描述}"
- …
- "最终站：{当地招牌美食/纪念品 + 温馨结束语}"
> 旅程站点数量随天数自动生成：
> 若用户未输入天数，则按默认 1 日 / 精华线路生成。

二、周围趣味元素（全部根据城市自动替换）
在路线周围加入大量充满童趣的小元素，例如：
- 可爱的旅行角色： "拿着当地特色小吃的小朋友"、 "背着旅行包的冒险小孩"等。
- 当地标志性建筑的童趣 Q 版手绘： 如 "{城市地标1}"、"{城市地标2}"、"{城市地标3}"。
- 有趣的提示牌： "小心迷路！"、"注意人流！"、"前方好吃的！"（可根据城市语境调整）。
- 贴纸式小标语： "{城市名}旅行记忆已解锁！" "{城市名}美食大冒险！" "下一站去哪儿？"
- 当地美食的可爱小图标： 如 "{城市美食1}"、"{城市美食2}"、"{城市美食3}"。
- 感叹句（保持童真风）： "原来{城市名}这么好玩！" "我要再来一次！"

三、整体风格要求
- 手绘蜡笔风 / 儿童旅行日志风格
- 色彩鲜艳、构图饱满但温暖
- 强调旅行的欢乐与探索感
- 所有文字采用可爱的手写字体
- 让整个画面像一本童趣满满的旅行手账页面`,
      tags: ["旅游", "插画"],
      source: "@dotey",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/travel_journal_illustration.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-ed107b",
      title: "原生感菜单翻译",
      titleEn: "原生感菜单翻译",
      description: "原生感菜单翻译",
      prompt: `为外国游客将墙上菜单的中文菜名翻译成英文。
纹理保留：至关重要！保持墙壁/纸张原有的陈旧、油腻和有纹理的外观。新的英文文本应该看起来像是写/印在同一个表面上的，带有轻微的褪色或磨损以匹配。
货币：保持'¥'符号和价格数字完全不变；不要转换货币。
布局：将英文翻译自然地对齐在中文旁边或替换掉中文。`,
      tags: ["旅游", "AI生成"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/menu_translation.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};
