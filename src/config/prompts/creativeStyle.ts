import type { PromptCategory } from "../promptConfig";

// 艺术风格转换类提示词
export const creativeStyleCategory: PromptCategory = {
  id: "creativeStyle",
  name: "风格转换",
  nameEn: "Style Transformation",
  icon: "Palette",
  description: "各种艺术风格转换、特效处理、材质替换",
  prompts: [
    {
      id: "mosaic-pixel-avatar",
      title: "马赛克风格头像",
      titleEn: "Mosaic Pixel Avatar",
      description: "低多边形马赛克风格转换",
      prompt: `Transform this image into a refined low-poly mosaic style. Preserve the original structure and recognizable details, especially facial features and contours. Use small, high-density polygons to maintain clarity and identity while creating a crystalline, faceted look. Keep the original color palette for a harmonious and natural aesthetic. Avoid altering or adding new elements.`,
      tags: ["马赛克", "像素", "低多边形", "头像"],
      source: "@fy360593",
      previewImage: "https://pbs.twimg.com/media/Gv5ykAJa4AE3BGm.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "gorillaz-style",
      title: "Gorillaz风格插图",
      titleEn: "Gorillaz Style Illustration",
      description: "粗糙的Gorillaz乐队风格转换",
      prompt: `将此图像重新设计成粗糙的Gorillaz风格插图,大胆厚黑轮廓,锐利棱角边缘,平面表现照明,风格化高对比阴影,脏乱破损表面纹理, muted color palette: washed-out teals, olive greens, rusty reds, mustard yellows, dusty browns, raw grungy urban atmosphere, comic book flatness mixed with painterly grit, hand-drawn finish with faded gradients, graphic novel aesthetic with a rebellious, animated tone, dark stylish tone, full of attitude。`,
      tags: ["Gorillaz", "插画", "风格", "涂鸦"],
      source: "@azed_ai",
      previewImage: "https://pbs.twimg.com/media/GvV0CElbQAAy7SL.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "1920s-fairy-tale",
      title: "1920年代童话插图",
      titleEn: "1920s Fairy Tale Illustration",
      description: "Arthur Rackham风格的童话插图",
      prompt: `将此图像转换为1920年代童话插图,风格如Arthur Rackham。使用muted watercolor tones和intricate ink linework。填充场景以奇幻森林生物、扭曲树枝和隐藏魔法物体。整体色调神秘、迷人且略微诡异。添加手写书法风格的字幕和谜语。`,
      tags: ["童话", "1920年代", "水彩", "奇幻"],
      source: "@vkuoo",
      previewImage: "https://pbs.twimg.com/media/GsezilOaYAAqCpa.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "1950s-poster-style",
      title: "1950年代海报",
      titleEn: "1950s Poster Style",
      description: "中世纪现代主义平面设计海报",
      prompt: `将此图像转换为1950年代海报,风格如mid-century modern graphic designers。使用flat, geometric color blocks with strong typographic elements。整体色调乐观、怀旧且促销。添加大胆位置标签和促销口号。`,
      tags: ["1950年代", "海报", "复古", "平面"],
      source: "@vkuoo",
      previewImage: "https://pbs.twimg.com/media/Gsq9KwEagAARnH0.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "glass-retexture",
      title: "玻璃材质重塑",
      titleEn: "Glass Material Retexture",
      description: "将物体材质转换为玻璃质感",
      prompt: `retexture the image attached based on the json below:

{
  "style": "photorealistic",
  "material": "glass",
  "background": "plain white",
  "object_position": "centered",
  "lighting": "soft, diffused studio lighting",
  "camera_angle": "eye-level, straight-on",
  "resolution": "high",
  "aspect_ratio": "2:3",
  "details": {
    "reflections": true,
    "shadows": false,
    "transparency": true
  }
}`,
      tags: ["玻璃", "材质", "转换", "3D"],
      source: "@egeberkina",
      previewImage: "https://camo.githubusercontent.com/f6ea76545847586388ceb6dc749054b2a91be35fe42c51eb9f2e3cdd31337ebc/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d51436453414e324979696779485656706c7058474c2e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "2:3" },
    },
    {
      id: "whiteboard-marker-art",
      title: "白板马克笔艺术",
      titleEn: "Whiteboard Marker Art",
      description: "模拟玻璃白板上的褪色马克笔画",
      prompt: `Create a photo of vagabonds musashi praying drawn on a glass whiteboard in a slightly faded green marker`,
      tags: ["白板", "马克笔", "艺术", "创意"],
      source: "@nicdunz",
      previewImage: "https://github.com/user-attachments/assets/b399c4d9-151b-4e15-9a40-f092f7a892b9",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "4:3" },
    },
    {
      id: "chalkboard-anime",
      title: "黑板动漫画",
      titleEn: "Chalkboard Anime Art Documentation",
      description: "黑板上的动漫角色粉笔画的写实记录",
      prompt: `{
  "intent": "Photorealistic documentation of a specific chalkboard art piece featuring a single anime character, capturing the ephemeral nature of the medium within a classroom context.",
  "frame": {
    "aspect_ratio": "4:3",
    "composition": "A centered medium shot focusing on the chalkboard mural. The composition includes the teacher's desk in the immediate foreground to provide scale, with the artwork of the single character dominating the background space.",
    "style_mode": "documentary_realism, texture-focused, ambient naturalism"
  },
  "subject": {
    "primary_subject": "A large-scale, intricate chalk drawing of Boa Hancock from 'One Piece' on a standard green classroom blackboard.",
    "visual_details": "The illustration depicts Boa Hancock in a commanding pose, positioned centrally on the board. She is drawn with her signature long, straight black hair with a hime cut, rendered using dense application of black chalk with white accents for sheen."
  },
  "environment": {
    "location": "A standard Japanese school classroom.",
    "foreground_elements": "A wooden teacher's desk occupies the lower foreground. Scattered across the surface are a yellow box of colored chalks, loose sticks of red, white, and blue pastel chalk, and a dust-covered black felt eraser."
  },
  "lighting": {
    "type": "Diffuse ambient classroom lighting.",
    "quality": "Soft, nondirectional illumination provided by overhead fluorescent fixtures mixed with daylight from windows on the left."
  }
}`,
      tags: ["黑板", "动漫", "粉笔画", "教室"],
      source: "@IamEmily2050",
      previewImage: "https://pbs.twimg.com/media/G65Uh3ebkAEqbv5?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "4:3" },
    },
    {
      id: "childrens-book-crayon",
      title: "儿童图书蜡笔画",
      titleEn: "Children's Book Crayon Style",
      description: "儿童图书插画风格的蜡笔画",
      prompt: `DRAWING a drawing of [Character], crayon on white paper, in the style of a children's book illustration – simple, cute, and full-color, with [two glitter accent colors] glitter accents and high detail.`,
      tags: ["儿童", "蜡笔", "插画", "可爱"],
      source: "@GoSailGlobal",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/childrens_book_crayon_style.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "emoji-combination",
      title: "表情符号组合",
      titleEn: "Emoji Combination",
      description: "以Google风格组合表情符号",
      prompt: `combine these emojis: 🍌 + 😎, on a white background as a google emoji design`,
      tags: ["表情符号", "设计", "创意", "Google"],
      source: "@NanoBanana",
      previewImage: "https://pbs.twimg.com/media/G7PmjRBXgAAVKXd?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "fast", aspectRatio: "1:1" },
    },
    {
      id: "painting-process-four-panel",
      title: "绘画过程四宫格",
      titleEn: "Painting Process Four Panels",
      description: "照片变插画并附带绘画过程",
      prompt: `为人物生成绘画过程四宫格,第一步:线稿,第二步平铺颜色,第三步:增加阴影,第四步:细化成型。不要文字`,
      tags: ["绘画", "过程", "四宫格", "教程"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://pbs.twimg.com/media/GzmdRuBboAAXOTg.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "cinematic-keyframe",
      title: "电影关键帧生成器",
      titleEn: "Cinematic Keyframe Generator",
      description: "从参考图片生成电影级关键帧和故事板",
      prompt: `<role>
You are an award-winning trailer director + cinematographer + storyboard artist. Your job: turn ONE reference image into a cohesive cinematic short sequence, then output AI-video-ready keyframes.
</role>

<input>
User provides: one reference image (image).
</input>

<non-negotiable rules - continuity & truthfulness>
1) First, analyze the full composition: identify ALL key subjects (person/group/vehicle/object/animal/props/environment elements) and describe spatial relationships and interactions.
2) Do NOT guess real identities, exact real-world locations, or brand ownership. Stick to visible facts.
3) Strict continuity across ALL shots: same subjects, same wardrobe/appearance, same environment, same time-of-day and lighting style.
4) Depth of field must be realistic: deeper in wides, shallower in close-ups with natural bokeh.
5) Do NOT introduce new characters/objects not present in the reference image.
</non-negotiable rules>

<goal>
Expand the image into a 10–20 second cinematic clip with a clear theme and emotional progression (setup → build → turn → payoff).
</goal>

<step 5 - contact sheet output>
You MUST output ONE single master image: a Cinematic Contact Sheet / Storyboard Grid containing ALL keyframes in one large image.
- Default grid: 3x3. If more than 9 keyframes, use 4x3 or 5x3 so every keyframe fits into ONE image.
Requirements:
1) The single master image must include every keyframe as a separate panel.
2) Each panel must be clearly labeled: KF number + shot type + suggested duration.
3) Strict continuity across ALL panels.
</step 5>`,
      tags: ["电影", "关键帧", "故事板", "视频"],
      source: "@underwoodxie96",
      previewImage: "https://pbs.twimg.com/media/G64FgZKXMAAXP_g?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "aging-through-years",
      title: "岁月变迁",
      titleEn: "Aging Through the Years",
      description: "展示单一主体的时间一致性和老化效果",
      prompt: `Generate the holiday photo of this person through the ages up to 80 years old`,
      tags: ["老化", "时间序列", "人像", "创意"],
      source: "@dr_cintas",
      previewImage: "https://github.com/user-attachments/assets/74fced67-0715-46d3-b788-d9ed9e98873b",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
{
      id: "p-63db51",
      title: "复刻90年代末宝丽来派对氛围感照片",
      titleEn: "复刻90年代末宝丽来派对氛围感照片",
      description: "复刻90年代末宝丽来派对氛围感照片",
      prompt: `1:1 宽高比，一张90年代末的宝丽来照片。上传图片的人物出现在照片中，被捕捉到一个随意、不完美的瞬间。背景是一个脏乱的房屋地下室，身后有人在开派对。照片具有低光宝丽来摄影的真实外观，带有动态模糊、刺眼的闪光灯、颗粒感和真实派对快照中典型的不佳构图。`,
      tags: ["滤镜", "AI生成"],
      source: "@Arminn_Ai",
      previewImage: "https://pbs.twimg.com/media/G5o8EfRXQAAxv0R?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-be9c05",
      title: "战术监控风格拼贴图像生成",
      titleEn: "战术监控风格拼贴图像生成",
      description: "战术监控风格拼贴图像生成",
      prompt: `基于用户提供的人物参考图生成监控风格拼贴图像，保持人物身份与整体特征前提下进行场景重构。

核心要求：
1. 生成类型：集合全身画面与多处局部特写于一体的监控风格拼贴图像（4:5比例，1440×1920分辨率）
2. 视觉风格：高端战术监控界面与数据可视化，融合城市街拍、监控录像、数据叠加UI、赛博颓废与千禧复古元素
3. 场景环境：城市铺装广场，晴朗傍晚金色时段，强烈自然阳光形成高对比度光线与深色投影
4. 画面布局：单人全身行走姿态为主体，三处局部放大裁特写，碎片化拼贴排版，红色战术线条连接
5. 监控元素：叠加红色识别框、参数信息、时间码、数据条，包含数字串"19 5 3 21 18 9 20 25"、字母组合"CCWW""TR521"、时间码"18/02"、标记"#83575//""#25747//"
6. 色彩风格：城市中性灰白深色调，深红锈红界面元素点缀，冷色温叠加高饱和红色数据图形
7. 成像质感：高保真写实，轻微数字噪点、扫描线等瑕疵模拟监控设备质感
8. 拍摄参数：较高视角俯拍，35–50mm焦段，大景深保持背景清晰

情绪氛围：冷静、疏离、被窥视的城市漫步感，突出"被观察的时髦感"与都市冷漠气质并存。`,
      tags: ["风格", "AI生成"],
      source: "@qisi_ai",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/tactical_monitoring_collage.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "4:5" },
    },
    {
      id: "p-773c8b",
      title: "巨物恐惧症风格，好莱坞灾难片质感",
      titleEn: "巨物恐惧症风格，好莱坞灾难片质感",
      description: "巨物恐惧症风格，好莱坞灾难片质感",
      prompt: `巨物恐惧症风格，好莱坞灾难片质感。一个巨大的红烧牛肉面桶从天而降，砸在繁华的十字路口。面桶上原本的品牌名变成了一行巨大的警示语：“深夜放毒，这是对减肥最大的不尊重”。旁边的高楼大厦LED大屏上配合地显示：“忍住！吃了这顿明天再减！”。`,
      tags: ["风格", "AI生成"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6NWDdCakAELqTM.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-46f4d9",
      title: "真实摄影风格，一只肥胖的狸花猫",
      titleEn: "真实摄影风格，一只肥胖的狸花猫",
      description: "真实摄影风格，一只肥胖的狸花猫",
      prompt: `真实摄影风格，一只肥胖的狸花猫慵懒地趴在故宫红墙琉璃瓦上晒太阳。猫咪脖子上挂着一个精致的金色吊牌，吊牌上刻着汉字“御猫”。蓝天白云，光影斑驳。`,
      tags: ["风格", "AI生成"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6NSh5racA8_oZz.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-729302",
      title: "图片转真人风格电影海报",
      titleEn: "图片转真人风格电影海报",
      description: "图片转真人风格电影海报",
      prompt: `1:1真人电影海报`,
      tags: ["海报", "风格"],
      source: "@SVD_Studio_Q",
      previewImage: "https://pbs.twimg.com/media/G6N_7N5acAAiZih?format=jpg&name=4096x4096",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "emoji-b28194",
      title: "镀铬emoji徽章",
      titleEn: "emoji",
      description: "镀铬emoji徽章",
      prompt: `高精度的 3D 渲染图，按照 emoji 图标 {👍} 展示一个金属质感的徽章，固定在竖直的商品卡片上，具有超光滑的镀铬质感和圆润的 3D 图标造型，风格化的未来主义设计，带有柔和的反光与干净的阴影。纸质卡片顶部中央带有一个冲切的欧式挂孔，徽章上方是醒目的标题 "{Awesome}"，下方配有趣味标语 "{Smash that ⭐ if you like it!}"。背景为柔和的灰色，使用柔光摄影棚灯光，整体风格极简。`,
      tags: ["AI生成"],
      source: "@egeberkina",
      previewImage: "https://camo.githubusercontent.com/4a973f06b0fc116ae1f42b5a5ec370f08ae0606212cd5f5e1b6e2fd5e1724b06/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d2d51577a495941744f374b433348746868736a48302e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-621c7e",
      title: "怀旧动漫风格电影海报",
      titleEn: "怀旧动漫风格电影海报",
      description: "怀旧动漫风格电影海报",
      prompt: `{The Lord of the Rings} 风格的动漫电影海报，动漫画风为《恶魔高中 DXD（High School DXD）》风格。海报上可见明显的折痕痕迹，因长时间反复折叠，造成部分区域出现褶皱处的物理性损伤和擦痕，颜色也在某些地方出现了褪色。表面遍布无规律的折痕、翻折印记与划痕，这些都是在不断搬动过程中逐渐积累的微小损耗，如同熵增不可逆的过程在不断扩展。
然而，留存在我们心中的美好记忆却始终完整无缺。当你凝视这张充满怀旧氛围的海报时，所感受到的，正是那些随时间累积、变得无比珍贵的收藏品所承载的情感本质。`,
      tags: ["动漫", "海报", "风格"],
      source: "photis (Sora)",
      previewImage: "https://github.com/JimmyLv/awesome-nano-banana/raw/main/cases/76/example_anime_nostalgic_poster.png",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-21f20e",
      title: "8位像素图标",
      titleEn: "8位像素图标",
      description: "8位像素图标",
      prompt: `创建一个极简主义的 8 位像素风格的 [🍔] 标志，居中放置在纯白背景上。使用有限的复古调色板，搭配像素化细节、锐利边缘和干净的块状形态。标志应简洁、具有标志性，并能在像素艺术风格中清晰识别——灵感来自经典街机游戏美学。`,
      tags: ["AI生成"],
      source: "@egeberkina",
      previewImage: "https://camo.githubusercontent.com/83e38ad7752cde79777020605aac1e000faec10e8b77ee4dc27a177f30032d6f/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d4830453845715131306a72626530643871373133372e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "emoji-152023",
      title: "纸艺风格 Emoji 图标",
      titleEn: "Emoji",
      description: "纸艺风格 Emoji 图标",
      prompt: `一个纸艺风格的"🔥"图标，漂浮在纯白背景上。这个表情符号由彩色剪纸手工制作而成，具有可见的纸张纹理、折痕和分层形状。它在下方投下柔和的阴影，营造出轻盈感和立体感。整体设计简洁、有趣、干净，图像居中，周围留有大量留白。使用柔和的影棚光照以突出纸张的质感与边缘。`,
      tags: ["风格", "AI生成"],
      source: "@egeberkina",
      previewImage: "https://camo.githubusercontent.com/b7a7c89709c5637e3dc6c5f53aa869c009d14009a01057e4862bf055495f18fa/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d536f5a50325a773148435258474f4e46645a5344732e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "rpg-ca045a",
      title: "RPG 风格角色卡片制作",
      titleEn: "RPG 风格角色卡片制作",
      description: "RPG 风格角色卡片制作",
      prompt: `创建一张 RPG 收藏风格的数字角色卡。角色设定为 {Programmer}，自信地站立，配有与其职业相关的工具或符号。以 3D 卡通风格呈现，采用柔和光照，展现鲜明的个性。添加技能条或属性数值，例如 [技能1 +x]、[技能2 +x]，如 Creativity +10、UI/UX +8。卡片顶部添加标题横幅，底部放置角色名牌。卡片边框应干净利落，如同真实的收藏公仔包装盒。背景需与职业主题相匹配。配色方面使用温暖的高光与符合职业特征的色调。`,
      tags: ["风格", "AI生成"],
      source: "@berryxia_ai",
      previewImage: "https://camo.githubusercontent.com/8ff51afd35ba86f0e12ce304f0c651059f5b8ac1bb549150d1fa15bcef58fbcb/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f34342f6578616d706c655f7270675f636172645f64657369676e65722e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "emoji-5b2041",
      title: "毛茸茸emoji物体",
      titleEn: "emoji",
      description: "毛茸茸emoji物体",
      prompt: `将一个简单平面的矢量图标 [🎃] 转化为柔软、立体、毛茸茸的可爱物体。整体造型被浓密的毛发完全覆盖，毛发质感极其真实，带有柔和的阴影。物体居中悬浮于干净的浅灰色背景中，轻盈漂浮。整体风格超现实，富有触感和现代感，带来舒适和俏皮的视觉感受。采用摄影棚级灯光，高分辨率渲染，比例为1:1。`,
      tags: ["AI生成"],
      source: "@gizakdag",
      previewImage: "https://camo.githubusercontent.com/add591fcb6adacc9f7250f90ab93e04dc7306ee90b82eab91906246856447465/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33352f6578616d706c655f666c756666795f70756d706b696e2e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-651cc2",
      title: "35mm胶片风格飞岛",
      titleEn: "35mm胶片风格飞岛",
      description: "35mm胶片风格飞岛",
      prompt: `35 毫米胶片风格的照片：莫斯科漂浮在天空中的飞行岛屿上。`,
      tags: ["风格", "AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/7d1e1876e70093cc7f306d54d1b034c442975d333584d174a8a5966b9b9673ca/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33302f6578616d706c655f33356d6d5f6d6f73636f775f666c79696e675f69736c616e642e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "crt-6187f6",
      title: "复古CRT电脑启动屏幕",
      titleEn: "复古CRT电脑启动屏幕",
      description: "复古CRT电脑启动屏幕",
      prompt: `复古CRT电脑启动屏幕，最终显示为[形状或标志]的ASCII艺术。`,
      tags: ["复古", "AI生成"],
      source: "@Gdgtify",
      previewImage: "https://camo.githubusercontent.com/adae0abfb4da4e7ab95e1d34e8d2bd2fa8a82bd76da4a7fe1f1db110e31e1886/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d4b425365574a4a4231456574514e755641427367312e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};
