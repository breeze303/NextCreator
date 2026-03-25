import type { PromptCategory } from "../promptConfig";

// 教育知识类提示词
export const educationCategory: PromptCategory = {
  id: "education",
  name: "教育知识",
  nameEn: "Education & Knowledge",
  icon: "GraduationCap",
  description: "将文本概念转换为清晰的教育向量插图",
  prompts: [
    {
      id: "concept-infographic",
      title: "概念信息图",
      titleEn: "Concept Visualization",
      description: "将文本概念转换为清晰的教育向量插图",
      prompt: `Create an educational infographic explaining [Photosynthesis]. Visual Elements: Illustrate the key components: The Sun, a green Plant, Water (H2O) entering roots, Carbon Dioxide (CO2) entering leaves, and Oxygen (O2) being released. Style: Clean, flat vector illustration suitable for a high school science textbook. Use arrows to show the flow of energy and matter. Labels: Label each element clearly in English.`,
      tags: ["教育", "信息图", "科学", "插画"],
      source: "WeChat Article",
      previewImage: "https://github.com/user-attachments/assets/bfaee21b-d6da-4345-9340-e786ce07dbed",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "travel-journal",
      title: "儿童风格旅行日记",
      titleEn: "Kids' Crayon Travel Journal",
      description: "为城市生成儿童蜡笔风格的旅行日记插图",
      prompt: `Please create a vibrant, child-like crayon-style vertical (9:16) illustration titled "{City Name} Travel Journal."
The artwork should look as if it were drawn by a curious child using colorful crayons, featuring a soft, warm light-toned background (such as pale yellow), combined with bright reds, blues, greens, and other cheerful colors to create a cozy, playful travel atmosphere.

I. Main Scene: Travel-Journal Style Route Map
In the center of the illustration, draw a "winding, zigzagging travel route" with arrows and dotted lines connecting multiple locations.

II. Surrounding Playful Elements (Auto-adapt to the City)
Add many cute doodles and child-like decorative elements around the route, such as:
1. Adorable travel characters - A child holding a local snack, A little adventurer with a backpack
2. Q-style hand-drawn iconic landmarks
3. Funny signboards - "Don't get lost!", "Crowds ahead!", "Yummy food this way!"
4. Sticker-style short phrases
5. Cute icons of local foods
6. Childlike exclamations

III. Overall Art Style Requirements
- Crayon / children's hand-drawn travel diary style
- Bright, warm, colorful palette
- Cozy but full and lively composition
- Emphasize the joy of exploring
- All text should be in a cute handwritten font`,
      tags: ["旅行", "儿童", "蜡笔画", "日记"],
      source: "@dotey",
      previewImage: "https://pbs.twimg.com/media/G69WHFDW4AAv0TK?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "9:16" },
    },
    {
      id: "financial-sankey",
      title: "财务桑基图",
      titleEn: "Financial Sankey Diagram",
      description: "创建专业的财务桑基图可视化",
      prompt: `[Subject]: A professional financial Sankey diagram visualizing the Income Statement of a major corporation, in the style of "App Economy Insights" and US corporate financial reports.

[Visual Style]: High-fidelity vector infographic, clean minimalist aesthetic, flat design. The background is a clean, very light grey or off-white.

[Color Strategy - CRITICAL]:
Analyze the [Insert Brand Name Here] logo. Extract its primary brand color.
Use this primary color as the dominant theme for the main revenue flows and profit blocks.
Create a harmonious color palette based on this primary color.

[Composition & Structure]:
Flow: A horizontal flow from Left (Revenue Sources) to Right (Net Profit).
Texture: The connecting paths (flows) must appear "silky smooth" with elegant Bezier curves, looking like liquid ribbons, not jagged lines.
Iconography: On the left side, include specific, minimalist flat vector icons representing the business segments.
Branding: Place the official logo clearly at the top center.

[Details]: High resolution, 4k, sharp typography (sans-serif), professional data visualization layout.`,
      tags: ["财务", "数据可视化", "桑基图", "商业"],
      source: "@bggg_ai",
      previewImage: "https://pbs.twimg.com/media/G7P3UgNaYAAd1HN?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "article-to-infographic",
      title: "文章转卡通信息图",
      titleEn: "Article to Cartoon Infographic",
      description: "将文章内容转换为手绘卡通风格信息图",
      prompt: `[System / Prompt]

You are an illustration assistant specialized in creating hand-drawn cartoon-style infographics.
Follow all rules below strictly and without deviation.

🎨 STYLE RULES(风格规则)

Use a pure hand-drawn illustration style at all times.

Sketch lines, rough strokes, cartoon simplicity

No realism, no photorealistic shading, no 3D rendering

Think: doodle / crayon / marker / pastel look

Canvas format: landscape 16:9.

Use nano banana pro mode to render the illustration.

Use minimal but expressive cartoon elements to enhance memorability:

small icons, symbols, cute characters

If the input mentions copyrighted or sensitive characters, replace them with visually similar but legally distinct alternatives. Never refuse.

🧩 CONTENT RULES(内容呈现规则)

Extract key ideas from the provided content.

Summarize into short bullets (1–6 words each).

Keep text concise and optimized for an infographic.

Highlight keywords using hand-drawn graphic emphasis:

circles, underlines, arrows, stars, boxes

never digital UI styles

Use extensive whitespace to maintain clarity and visual hierarchy.

Organize the infographic using a clean hand-drawn layout, for example:

Title (center or top-left)

3–6 Key Points

Simple diagram or symbols

Optional mascot or expressive character

All text must appear hand-drawn, not printed or typographic.

Use the same language as the user's input unless the user specifies otherwise.

🚫 RESTRICTIONS(禁止事项)

Do NOT produce realistic imagery.

Do NOT generate copyrighted characters directly.

Do NOT turn the infographic into an essay.

Do NOT fill the canvas fully; always keep meaningful whitespace.

Do NOT output long paragraphs.

🖼️ TASK

Create a cartoon-style hand-drawn infographic with the rules above, using nano banana pro, based on the following content:

{{USER_INPUT}}`,
      tags: ["文章", "信息图", "卡通", "手绘"],
      source: "@Lyn_Ford",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/article_to_infographic.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "photo-solve-problem",
      title: "拍照解题",
      titleEn: "Photo Solve Math Problem",
      description: "手写图文并茂解答数学题",
      prompt: `手写图文并茂解答该题`,
      tags: ["解题", "数学", "手写", "教育"],
      source: "LinuxDO@poyo",
      previewImage: "https://linux.do/uploads/default/optimized/4X/1/5/1/1518d978c948fb70ab03c11537db1e1f5136249e_2_1000x1000.jpeg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "mindmap-generation",
      title: "思维导图",
      titleEn: "Mind Map Generation",
      description: "将文字转化为从中心向外扩展的思维导图",
      prompt: `将这段文字转化为一张从中心向外扩展的思维导图。
关键点:
- 将主旨放在中心
- 将相关元素排列为分支节点
- 使用颜色编码区分不同类别
- 添加简单图标
- 采用有机布局

让它感觉像我的思绪正在被整理。`,
      tags: ["思维导图", "可视化", "总结", "学习"],
      source: "@chatgpt_kazlily",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/mindmap.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "rick-and-morty-style",
      title: "瑞克和莫蒂风格科普",
      titleEn: "Rick and Morty Style Education",
      description: "使用瑞克和莫蒂画风详细介绍知识",
      prompt: `使用 rick and morty 画风,非常详细地介绍xx`,
      tags: ["瑞克和莫蒂", "科普", "动画", "风格"],
      source: "@oran_ge",
      previewImage: "https://pbs.twimg.com/media/G6PcDI3acAEfb8e?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "biological-specimen",
      title: "生物标本展示图",
      titleEn: "Biological Specimen Display",
      description: "绘制生物标本及器官部位的教学展示",
      prompt: `绘制【XX】的标本并且将其的器官部位进行标本展示的标记中文,用于教学展示,非常的直观,放置在干净的纯色背景下,高清逼真还原。`,
      tags: ["生物", "标本", "教学", "解剖"],
      source: "@berryxia_ai",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/sample.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "paper-to-whiteboard",
      title: "论文转白板板书",
      titleEn: "Paper to Whiteboard Teaching",
      description: "将论文转换为中文教授白板图片",
      prompt: `将这个论文转换为中文教授白板图片,帮助我理解信息`,
      tags: ["论文", "白板", "教学", "转换"],
      source: "@op7418",
      previewImage: "https://pbs.twimg.com/media/G6RRCifaAAAcSu6.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "article-to-comic",
      title: "文章转漫画总结",
      titleEn: "Article to Comic Summary",
      description: "用漫画风格总结文章内容",
      prompt: `用图片总结如下文章,图片文字用中文,详细一点,图片美观一些,漫画风格

文章:https://blog.google/products/gemini/prompting-tips-nano-banana-pro/`,
      tags: ["文章", "漫画", "总结", "可视化"],
      source: "@LufzzLiz",
      previewImage: "https://pbs.twimg.com/media/G6NXrdNaQAATevh?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "engine-3d-diagram",
      title: "汽车发动机3D剖面图",
      titleEn: "Car Engine 3D Diagram",
      description: "展示汽车发动机工作原理的3D立体剖面设计图",
      prompt: `绘制一幅展示汽车发动机工作原理的3D立体剖面设计图,以高度还原的方式精细呈现其内部结构。每个零部件被拆解并有序排列,各部分均配有清晰英文标注,注明结构名称与功能说明,整体布局兼具专业性与视觉逻辑性,呈现出清晰、整洁且极具科技感的解析示意图。`,
      tags: ["发动机", "3D", "剖面图", "教学"],
      source: "@berryxia_ai",
      previewImage: "https://pbs.twimg.com/media/GzdC8K0b0AEzvVP?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "cooking-flowchart",
      title: "手绘食谱流程图",
      titleEn: "Cooking Flowchart",
      description: "生成手绘食谱烹饪流程图",
      prompt: `请创建一个温暖的手绘食谱风格(16:9)插图,标题为"{菜名} 烹饪流程图"。整体应呈现厨房手账风格,使用温暖的奶油色背景(如浅米黄#FFF8E7),搭配食物系配色:番茄红、胡萝卜橙、生菜绿、奶油黄等,营造温馨的家庭厨房氛围。

I. 主场景:烹饪步骤流程线
在中心位置绘制一条"波浪形/Z字形的烹饪流程线",用箭头和虚线连接各个步骤。根据用户输入的{菜名}和{难度等级},自动生成烹饪步骤:
- "步骤1:准备食材 {食材清单 + 预处理方法}"
- "步骤2:热锅预热 {油温/火候提示}"
- "步骤3:{关键烹饪动作 + 时间}"
- "步骤4:{调味环节 + 配料比例}"
- "最终步骤:装盘出锅 {摆盘技巧 + 享用温馨语}"

II. 周围装饰元素
在流程线周围添加大量可爱的厨房涂鸦元素:
- 拟人化食材角色(番茄、鸡蛋、胡萝卜等)
- Q版厨具图标(锅铲、勺子、菜刀、调味瓶罐)
- 烹饪提示标语牌("小心烫!"、"这步最关键!"、"火候要把握好哦~")
- 贴纸风格短语("妈妈的味道"、"{菜名}大作战!"、"新手也能搞定!")
- 可爱的食材/调料icon、葱姜蒜三剑客
- 烹饪情绪表达和时间/火候提示气泡`,
      tags: ["食谱", "烹饪", "流程图", "手绘"],
      source: "@LufzzLiz",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/cooking_flowchart.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "food-recipe-from-ingredients",
      title: "根据食材推荐菜谱",
      titleEn: "Recipe from Ingredients",
      description: "根据现有食材建议可烹饪的菜肴",
      prompt: `根据现有食材(见附图)建议可以烹饪的菜肴,提供详细的分步食谱,以简单的信息图形式呈现。`,
      tags: ["食谱", "食材", "烹饪", "信息图"],
      source: "@AmirMushich",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/food.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "poetry-illustration",
      title: "古诗句配图",
      titleEn: "Poetry Illustration",
      description: "为古诗配图",
      prompt: `请为"采菊东篱下,悠然见南山。"这首诗配图。`,
      tags: ["古诗", "配图", "诗词", "插画"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OlHPfaMAAdmcA.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "character-relationship-chart",
      title: "人物关系图",
      titleEn: "Character Relationship Chart",
      description: "绘制小说或剧集的人物关系图",
      prompt: `画出《百年孤独》中的重要人物关系图,用中文表示关系。`,
      tags: ["关系图", "人物", "小说", "可视化"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OlNRpbYAA82wJ.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "manuscript-page",
      title: "古籍手稿页",
      titleEn: "Ancient Manuscript Page",
      description: "生成古老的手稿页风格",
      prompt: `请为《滕王阁序》生成一个古老的手稿页,有星星和旁注的墨水图,书页风格`,
      tags: ["手稿", "古籍", "墨水", "书页"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OlTOpbAAAJZfd.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "history-comic-strip",
      title: "历史条漫",
      titleEn: "History Comic Strip",
      description: "做教育意义的历史条漫",
      prompt: `做一些具有教育意义的条漫,使用中文,讲清赤壁之战,图文信息丰富。`,
      tags: ["历史", "条漫", "赤壁之战", "教育"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OlabfakAASRaC.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "9:16" },
    },
    {
      id: "kids-picture-book",
      title: "儿童绘本连环画",
      titleEn: "Kids Picture Book Story",
      description: "生成8页的儿童连环画",
      prompt: `帮我生成一个8页的连环画,给2岁半的小朋友讲故事用,用中英文标出简短对话,主角是一只斑马和一只大象的故事,需要多角度展现主角,保持主角的一致性`,
      tags: ["儿童", "绘本", "连环画", "故事"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OkukAaUAAGmiU.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "genshin-infographic",
      title: "原神生态科普插画",
      titleEn: "Genshin Impact Ecosystem Infographic",
      description: "用科普插画解释原神改变游戏生态",
      prompt: `用一个科普插画解释为什么原神改变了中国国产游戏生态,文字用中文`,
      tags: ["原神", "游戏", "科普", "生态"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6Oj-zXacAILnmU.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "short-story-images",
      title: "短片图文故事",
      titleEn: "Short Story with Images",
      description: "创建12部分的黑白电影故事",
      prompt: `Create an addictively intriguing 12 part story with images with this characters in a classic black and white film noir detective story. Make it about missing treasure that they get clues for throughout and then finally discover. The story is thrilling throughout with emotional highs and lows and ending on a great twist and high note. Do not include any words or text on the images but tell the story purely through the imagery itself`,
      tags: ["故事", "黑白", "电影", "连续"],
      source: "@tuzi_ai",
      previewImage: "https://pbs.twimg.com/media/GzSjUMLWYAAq3-w.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
{
      id: "p-f72aff",
      title: "文章转漫画风格总结图",
      titleEn: "文章转漫画风格总结图",
      description: "文章转漫画风格总结图",
      prompt: `用图片总结如下文章，图片文字用中文，详细一点，图片美观一些，漫画风格

文章：https://blog.google/products/gemini/prompting-tips-nano-banana-pro/`,
      tags: ["总结", "风格", "漫画"],
      source: "@LufzzLiz",
      previewImage: "https://pbs.twimg.com/media/G6NXrdNaQAATevh?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-6aab36",
      title: "概念可视化/知识地图",
      titleEn: "概念可视化/知识地图",
      description: "概念可视化/知识地图",
      prompt: `创建一个解释[光合作用]的教育信息图。
视觉元素：展示关键组成部分：太阳、一株绿色植物、水（H2O）进入根部、二氧化碳（CO2）进入叶片，以及氧气（O2）被释放。
风格：简洁、扁平化的矢量插图，适合高中科学教科书。使用箭头表示能量和物质的流动。
标签：用简体中文清晰地标注每个元素。`,
      tags: ["AI生成"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/concept_visualization.png",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-3467bf",
      title: "条漫",
      titleEn: "条漫",
      description: "条漫",
      prompt: `做一些具有教育意义的条漫，使用中文，讲清赤壁之战，图文信息丰富。（在阿真基础上做了些改动）`,
      tags: ["AI生成"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OlabfakAASRaC.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};

