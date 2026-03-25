import type { PromptCategory } from "../promptConfig";

// 生活娱乐类提示词
export const lifestyleCategory: PromptCategory = {
  id: "lifestyle",
  name: "生活娱乐",
  nameEn: "Lifestyle & Entertainment",
  icon: "Heart",
  description: "日常生活、旅行、穿搭、滤镜等生活场景",
  prompts: [
    {
      id: "outfit-change",
      title: "换装",
      titleEn: "Outfit Change",
      description: "将人物服装替换为参考图像中的服装",
      prompt: `将输入图像中人物的服装替换为参考图像中显示的目标服装。保持人物的姿势、面部表情、背景和整体真实感不变。让新服装看起来自然、合身,并与光线和阴影保持一致。不要改变人物的身份或环境——只改变衣服`,
      tags: ["换装", "服装", "穿搭", "编辑"],
      source: "@skirano",
      previewImage: "https://i.mji.rip/2025/09/04/b9c7402974fba6627ab1b0bf3fce065d.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "hairstyle-change",
      title: "换发型",
      titleEn: "Hairstyle Change",
      description: "为照片中的主要人物更换新发型",
      prompt: `请仔细分析我提供的照片。你的任务是为照片中的主要人物更换一个新的发型,同时必须严格遵守以下规则:
1.  **身份保持**:必须完整保留人物的面部特征、五官、皮肤纹理和表情,确保看起来是同一个人。
2.  **背景不变**:人物所处的背景、环境和光线条件必须保持原样,不做任何改动。
3.  **身体姿态不变**:人物的头部姿态、身体姿势和穿着的衣物必须保持不变。
4.  **无缝融合**:新的发型需要根据人物的头型、脸型和现场光照进行智能调整,确保发丝的质感、光泽和阴影都与原始照片完美融合,达到高度逼真、无缝衔接的效果。

---
**女士发型参考:**
*   飘逸的长直发 (Flowing long straight hair)
*   浪漫的大波浪卷发 (Romantic wavy curls)
*   俏皮的短波波头 (Playful short bob)
*   优雅的法式刘海和及肩发 (Elegant French bangs with shoulder-length hair)
*   精致的复古盘发 (Exquisite vintage updo)
*   帅气利落的超短发/精灵短发 (Chic and neat pixie cut)
*   蓬松的羊毛卷 (Fluffy afro curls)
*   高马尾 (High ponytail)
*   脏辫 (Dreadlocks)
*   银灰色渐变长发 (Silver-grey ombre long hair)

**男士发型参考:**
*   经典的商务背头 (Classic business slick-back)
*   时尚的纹理短发/飞机头 (Modern textured short hair / Quiff)
*   清爽的圆寸 (Clean buzz cut)
*   复古中分发型 (Retro middle part hairstyle)
*   蓬松的韩式卷发 (Fluffy Korean-style curly hair)
*   随性的及肩长发 (Casual shoulder-length long hair)
*    undercut发型(两侧剃短,顶部留长)(Undercut)
*   莫霍克发型 (Mohawk)
*   武士发髻/丸子头 (Man bun)
---

请将人物的发型更换为: 俏皮的短波波头`,
      tags: ["发型", "换发型", "造型", "编辑"],
      source: "Official",
      previewImage: "https://i.mji.rip/2025/09/04/c4dffca8a2916cd1fbefa21237751b81.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "photo-upscale-enhance",
      title: "智能扩图和增强",
      titleEn: "Smart Image Enhancement",
      description: "智能扩图到16:9并提高画质",
      prompt: `缩小并扩展此图像至16:9的宽高比(电脑壁纸尺寸)。
情境感知:在左右两侧无缝地扩展场景。完美匹配原始的光线、天气和纹理。
逻辑补全:如果边界上有被切断的物体(如肩膀、树枝或建筑边缘),根据逻辑推理自然地补全它们。不要扭曲原始的中心图像。`,
      tags: ["扩图", "壁纸", "增强", "16:9"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/image_outpainting.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "id-photo",
      title: "证件照制作",
      titleEn: "ID Photo Creation",
      description: "制作标准2寸证件照",
      prompt: `截取图片人像头部,帮我做成 2 寸证件照,要求: 1、白底 2、职业正装 3、正脸 4、完全保持人物面部特征一致,仅改变姿态与构图,面部依旧保留原有神态,只在角度和光线中体现变化,局部捕捉颧骨、眉毛、眼神、鼻子、嘴唇的细节 5、保留面部皮肤轻微瑕疵,不要过度磨皮`,
      tags: ["证件照", "2寸", "正装", "白底"],
      source: "LinuxDO@synbio",
      previewImage: "https://i.mji.rip/2025/09/04/5258e0b792acebf8096aa4da3462a952.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "miniature-version",
      title: "微型人偶版本",
      titleEn: "Miniature Doll Version",
      description: "创建自己的超真实微型版本",
      prompt: `创建一个微型版本的我,手持展示,保持真实面部不变。`,
      tags: ["微型", "人偶", "手办", "创意"],
      source: "@Samann_ai",
      previewImage: "https://pbs.twimg.com/media/G4Q69zjWAAAv0vI.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "car-three-views",
      title: "汽车三视图摆拍",
      titleEn: "Car Three Views Portrait",
      description: "汽车三视图风格的人像摄影",
      prompt: `一个情绪化的、高分辨率编辑肖像,上传照片中的男人(保持他的脸100%准确)。他坐在一个复古电吉他前面,而不是放大器。他的手臂随意靠在吉他的身体和脖子上。吉他具有磨损的经典摇滚外观——深色木纹、金属硬件和微妙的划痕,赋予它个性。
他穿着宽松的彩色针织毛衣,带有混合条纹和拼布纹理。他的头发凌乱且波浪状,有完整的胡须。他的表情严肃,直视镜头。
背景是纯浅灰色工作室墙。柔和的工作室照明在他的脸、吉他和毛衣上创造温和的阴影,赋予平静的电影心情。框架聚焦于他的上身、手和吉他的细节。一切锐利,突出针织纹理和吉他的复古表面。
整体氛围原始、艺术且时尚,像高端杂志的音乐家肖像。`,
      tags: ["汽车", "三视图", "人像", "摄影"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6ajRp1XcAAsjNF.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "fashion-mood-board",
      title: "时尚心情板拼贴",
      titleEn: "Fashion Mood Board Collage",
      description: "创建时尚心情板风格的拼贴",
      prompt: `时尚心情板拼贴。用剪裁的模特所穿的单个物品围绕肖像。添加手写笔记和草图,使用俏皮的马克笔风格字体,并用英语标注每个物品的品牌名称和来源。整体美学应创意且可爱。`,
      tags: ["时尚", "心情板", "拼贴", "穿搭"],
      source: "@tetumemo",
      previewImage: "https://pbs.twimg.com/media/GzwhyfabAAAZpHO.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "subject-transparent-bg",
      title: "提取主体透明背景",
      titleEn: "Subject Extraction Transparent BG",
      description: "提取图片主体并放置透明背景",
      prompt: `提取附件图片主体并放置透明背景`,
      tags: ["抠图", "透明背景", "主体", "提取"],
      source: "@nglprz",
      previewImage: "https://pbs.twimg.com/media/GzihRpAXkAICIRs.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "meal-calorie-annotation",
      title: "餐食热量标注",
      titleEn: "Meal Calorie Annotation",
      description: "为餐食标注食物名称和热量信息",
      prompt: `为这顿餐标注食物名称、热量密度和大致热量`,
      tags: ["热量", "餐食", "标注", "健康"],
      source: "@icreatelife",
      previewImage: "https://pbs.twimg.com/media/G0BGNFsXsAAdCNF.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "fast", aspectRatio: "16:9" },
    },
    {
      id: "old-photo-restore",
      title: "老照片恢复与现代化",
      titleEn: "Old Photo Restoration",
      description: "将旧照片编辑成现代美学风格",
      prompt: `请将我的旧照片编辑成1080 x 1920像素,具有美学和现代摄影外观,使其看起来真实并增强颜色。`,
      tags: ["老照片", "恢复", "现代化", "增强"],
      source: "@marryevan999",
      previewImage: "https://pbs.twimg.com/media/G1wsdR9bYAEdsrJ.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "9:16" },
    },
    {
      id: "pixar-style-avatar",
      title: "照片转皮克斯头像",
      titleEn: "Photo to Pixar Avatar",
      description: "将照片转换为皮克斯风格Q版头像",
      prompt: `使用附件图像中的年轻男性的3D头像,快乐微笑,干净白色背景,像素风格的概念数字艺术,高品质,柔和照明,光滑纹理,鲜艳颜色,现实比例带卡通触感及工作室渲染外观。`,
      tags: ["皮克斯", "头像", "3D", "卡通"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6QBjQHbgAE3Yt_?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "childhood-self-therapy",
      title: "与童年自我疗愈对话",
      titleEn: "Childhood Self Therapy Dialogue",
      description: "创建成人与儿童自己对话的疗愈场景",
      prompt: `使用两张上传照片作为相似度参考:
- 成人参考:[成人照片]
- 儿童参考:[儿童照片]

提示:照片现实主义极简疗愈室;浅色墙壁、灰色沙发、木质咖啡桌带纸巾盒、笔记本和一杯水、简单相框和落地灯、柔和自然日光。同一人两个年龄并排坐:成人左侧用开放手势说话;儿童右侧低头倾听。两者穿相同[服装](相同颜色和风格)。干净工作室氛围,居中构图,浅景深,50mm外观,4K,垂直3:4。无额外人物、无文字、无水印。`,
      tags: ["疗愈", "童年", "对话", "心理"],
      source: "@samann_ai",
      previewImage: "https://pbs.twimg.com/media/G1Xvq7EXgAAAKqO.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "coloring-simulation",
      title: "模拟着色作业过程",
      titleEn: "Coloring Process Simulation",
      description: "模拟数位板上的着色过程",
      prompt: `照片现实主义数位板屏幕。第一人称手持数位板和笔。
原始图像在数位板上以未完成状态重现。从原始图像提取线稿。线稿部分已用与原始图像相同的着色着色。未完成着色。不得为单色。着色完成约70%。
特写。笔尖触碰平板屏幕。`,
      tags: ["着色", "数位板", "过程", "绘画"],
      source: "@AI_Kei75",
      previewImage: "https://pbs.twimg.com/media/G1HlmCbaQAACWR_.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "rpg-character-sheet",
      title: "RPG角色状态屏",
      titleEn: "RPG Character Status Screen",
      description: "生成角色的游戏状态屏",
      prompt: `使用原始图像中的角色创建RPG游戏的角色状态屏。
保持原始图像的角色设计和风格,但将服装更改为幻想RPG中的服装。同时,将姿势更改为适合情况的姿势。
将原始图像中的角色和状态屏并排显示。
状态屏将列出各种参数、技能、图标等。
背景应为与原始图像风格匹配的幻想背景。
状态屏应丰富且时尚,像2025年的游戏一样。`,
      tags: ["RPG", "游戏", "角色", "状态屏"],
      source: "@AI_Kei75",
      previewImage: "https://pbs.twimg.com/media/G1SRC2DbQAksQEA.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "giant-monster-hug",
      title: "巨型怪物拥抱",
      titleEn: "Giant Monster Hug",
      description: "坐在巨型可爱卡通怪物旁被拥抱",
      prompt: `让我坐在一个巨型 fluffy 可爱卡通怪物旁边。我是真实 realistic 的,但怪物是 3d 卡通。它在 hugging 我,很可爱。大眼睛。我们在房子里床上。`,
      tags: ["怪物", "拥抱", "可爱", "3D"],
      source: "@eyishazyer",
      previewImage: "https://pbs.twimg.com/media/G4LhQojWgAAYrFB.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "metal-coin-portrait",
      title: "金属硬币肖像",
      titleEn: "Metal Coin Portrait",
      description: "创建带有人物浮雕的金属硬币",
      prompt: `一个详细的金属硬币,特征是图像中附带的人的面部(不要改变上传照片中人的面部特征。保持人面部 100% 准确于参考图像。保持附带人的原始面部不变且 realistic)浮雕侧面,制作有 realistic 雕刻纹理和精细浮雕细节。硬币表面显示光反射、刮痕和金属光泽。在边框周围包括微妙铭文或符号,以类似于真实铸造。居中于黑暗、简约背景,以强调硬币的纹理和现实主义。`,
      tags: ["硬币", "金属", "浮雕", "肖像"],
      source: "@eyishazyer",
      previewImage: "https://pbs.twimg.com/media/G4LgRI6W4AAHQya.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "rock-casual-portrait",
      title: "岩石上休闲肖像",
      titleEn: "Casual Rock Portrait",
      description: "地中海风格岩石上的休闲肖像",
      prompt: `一个超现实肖像,一个年轻男子坐在大型、光滑白色岩石形成下,在自然阳光下。穿着宽松、略微 crumpled 的米色亚麻衬衫,上部纽扣打开,配以白色裤子。他的服装给人放松、地中海 vibe。他向后倾斜,一臂靠在岩石上,另一只手放在膝盖上,略微侧视。戴着修身黑色矩形太阳镜。他的发型短而略微 messy,阳光投射柔和阴影穿过他的服装和 textured 岩石。整体氛围平静、时尚,受地中海启发。面部应与参考照片完全匹配。`,
      tags: ["岩石", "休闲", "地中海", "肖像"],
      source: "@eyishazyer",
      previewImage: "https://pbs.twimg.com/media/G4LhvLLXIAAbaHi.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "bw-fashion-portrait",
      title: "时尚编辑黑白肖像",
      titleEn: "BW Fashion Editorial Portrait",
      description: "创建黑白高时尚编辑肖像",
      prompt: `创建一个黑白的高时尚编辑肖像,保持参考照片中我的真实面部不变(无编辑,相同特征,无修饰)。穿着宽松的白衬衫。姿势大胆而富有表现力,一臂举起握住头发,部分覆盖面部。目光强烈,直视相机,创造强大而神秘的气场。背景是简约墙壁,尖锐自然日光投射定义阴影,添加深度和对比。照明 harsh 和高对比,突出面部轮廓、尖锐颧骨,以及头发和织物的纹理。风格应感觉 raw、戏剧性和艺术性。整体图像是高时尚编辑的黑白、电影般的和 striking。`,
      tags: ["黑白", "时尚", "编辑", "肖像"],
      source: "@eyishazyer",
      previewImage: "https://pbs.twimg.com/media/G4LgrQYWAAA5ink.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "time-filter",
      title: "时光滤镜",
      titleEn: "Time Period Filter",
      description: "将人物完全符合特定年代的风格",
      prompt: `请重新构想照片中的人物,使其完全符合某个特定年代的风格。这包括人物的服装、发型、照片的整体画质和滤镜和构图,以及该年代所特有的整体美学风格。最终输出必须是高度逼真的图像,并清晰地展现人物。

目标年代为: 1900`,
      tags: ["时代", "滤镜", "复古", "风格"],
      source: "Official",
      previewImage: "https://i.mji.rip/2025/09/04/281360a8257436f6ad0b5e56b0982deb.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "anime-expressions-sheet",
      title: "二次元表情包表",
      titleEn: "Anime Expressions Sheet",
      description: "生成角色多种表情的表情表",
      prompt: `Character emotions sheet, multiple expressions of the provided character, featuring happy, sad, angry, surprised, shy, confused, playful, disgusted, thoughtful, crying, and embarrassed. Full set of emotions, clear and distinct expressions, clean background`,
      tags: ["表情", "二次元", "情绪", "角色"],
      source: "@Gorden_Sun",
      previewImage: "https://i.mji.rip/2025/09/04/efc060e59e2d9c2e4a137db8564fc492.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "batch-hairstyles",
      title: "批量换发型九宫格",
      titleEn: "Batch Hairstyles Grid",
      description: "以九宫格方式生成不同发型",
      prompt: `以九宫格的方式生成这个人不同发型的头像`,
      tags: ["发型", "九宫格", "批量", "造型"],
      source: "@balconychy",
      previewImage: "https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/images/case15/output.jpg?raw=true",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "personalized-room-design",
      title: "个性化房间设计",
      titleEn: "Personalized Room Design",
      description: "为用户生成个性化的房间3D设计",
      prompt: `为我生成我的房间设计(床、书架、沙发、绿植、电脑桌和电脑),墙上挂着绘画,窗外是城市夜景。可爱 3d 风格,c4d 渲染,轴测图。`,
      tags: ["房间", "设计", "3D", "个性化"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/f86750e53827b3ce50daf102593abaa544806ce443edccdc54e759ef06c05977/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d676a6577334e754467686a4364544e34684e6341642e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "character-portal-transition",
      title: "角色穿越传送门",
      titleEn: "Character Portal Transition",
      description: "Q版角色穿过传送门牵观众的手",
      prompt: `照片中的角色的 3D Q 版形象穿过传送门,牵着观众的手,在将观众拉向前时动态地回头一看。传送门外的背景是观众的现实世界,一个典型的程序员的书房,有书桌,显示器和笔记本电脑,传送门内是角色所处的3D Q 版世界,细节可以参考照片,整体呈蓝色调,和现实世界形成鲜明对比。传送门散发着神秘的蓝色和紫色色调,是两个世界之间的完美椭圆形框架处在画面中间。从第三人称视角拍摄的摄像机角度,显示观看者的手被拉入角色世界。2:3 的宽高比。`,
      tags: ["传送门", "Q版", "3D", "穿越"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/7f61e4301bcbc9eb3a7dcbbe569ed2233690a754bf7c704116bee4a79447cf1d/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d784c734937614b347a7956576352774a34366132452e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "2:3" },
    },
    {
      id: "polaroid-breakout",
      title: "拍立得出框效果",
      titleEn: "Polaroid Breakout Effect",
      description: "角色从拍立得照片中走出",
      prompt: `将场景中的角色转化为3D Q版风格,放在一张拍立得照片上,相纸被一只手拿着,照片中的角色正从拍立得照片中走出,呈现出突破二维相片边框、进入二维现实空间的视觉效果。`,
      tags: ["拍立得", "出框", "3D", "Q版"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/7f362f5b4cf2ada98d76ee033f5fa18226c5ab99c5a2188ae8c897039d654bfa/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d5f6372464d6f353774544a317474506b50437465312e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "3d-q-conversion",
      title: "3D Q版风格转换",
      titleEn: "3D Chibi Style Conversion",
      description: "将场景角色转化为3D Q版风格",
      prompt: `将场景中的角色转化为3D Q版风格,同时保持原本的场景布置和服装造型不变。`,
      tags: ["3D", "Q版", "转换", "风格"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/b4bcf766d8e48c5bc7c4182b3139eb084bb7cec7acf2742456f94167dac6170c/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d44543877756b783266484863727858516f7361524c2e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "couple-jewelry-box",
      title: "3D情侣珠宝盒",
      titleEn: "3D Couple Jewelry Box",
      description: "打造情侣主题的3D收藏摆件",
      prompt: `根据照片上的内容打造一款细致精美、萌趣可爱的3D渲染收藏摆件,装置在柔和粉彩色调、温馨浪漫的展示盒中。展示盒为浅奶油色搭配柔和的金色装饰,形似精致的便携珠宝盒。打开盒盖,呈现出一幕温暖浪漫的场景:两位Q版角色正甜蜜相望。盒顶雕刻着"FOREVER TOGETHER"(永远在一起)的字样,周围点缀着小巧精致的星星与爱心图案。盒内站着照片上的女性,手中捧着一束小巧的白色花束。她的身旁是她的伴侣,照片上的男性。两人都拥有大而闪亮、充满表现力的眼睛,以及柔和、温暖的微笑,传递出浓浓的爱意和迷人的气质。他们身后有一扇圆形窗户,透过窗户能看到阳光明媚的中国古典小镇天际线和轻柔飘浮的云朵。盒内以温暖的柔和光线进行照明,背景中漂浮着花瓣点缀气氛。整个展示盒和角色的色调优雅和谐,营造出一个奢华而梦幻的迷你纪念品场景。尺寸:9:16`,
      tags: ["情侣", "珠宝盒", "3D", "收藏"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/df1beca498c52bcfa41327ebeb14c56763c588c716300d8613539074147d8ebf/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d595758586c5344524d3956547a69512d49413257532e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "9:16" },
    },
    {
      id: "vietnamese-ao-dai",
      title: "越南奥黛风艺术照",
      titleEn: "Vietnamese Ao Dai Art Photo",
      description: "创建穿越南奥黛的超写实肖像",
      prompt: `创建一个超写实的人物肖像(保留确切的真实面部和身体特征,不做任何改动),8K高分辨率的超现实肖像画。
画面中是一位年轻、优雅的女性,穿着传统的白色丝绸肚兜和飘逸的深绿色长裙。她身体微微倾斜,右手优雅地弯曲手肘,在右脸颊附近举着一朵新鲜的白莲花。她的左手轻轻地放在大腿上。她的头微微倾向莲花,眼神宁静而梦幻地看着花朵,带着一丝微妙的微笑。她的黑发盘成一个高高的波浪形发髻,几缕发丝勾勒出她白皙、容光焕发的脸庞。
背景是渐变的橄榄绿色,带有柔和、温暖的光晕,突出了丝绸肚兜的质感、娇嫩的莲花花瓣和她光滑的皮肤。旁边一张雕刻精美的木桌上放着一个装满白莲花的大白花瓶。
电影般的构图,背景虚化,超清晰的细节,逼真的阴影,杰作,照片级真实感。`,
      tags: ["越南", "奥黛", "传统", "艺术照"],
      source: "@ShreyaYadav___",
      previewImage: "https://pbs.twimg.com/media/G5YBkPtbYAAVDEr?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "multi-subject-compositing",
      title: "多人搞怪团队合照",
      titleEn: "Multi-Subject Compositing",
      description: "将多张人像合成为一张搞怪团队合照",
      prompt: `an office team photo, everyone making a silly face`,
      tags: ["合照", "团队", "搞怪", "合成"],
      source: "Replicate",
      previewImage: "https://github.com/user-attachments/assets/54e2a2eb-1ab4-4f2b-86a2-7a59856e615f",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
{
      id: "p-c52e48",
      title: "'自己画自己'的自画像",
      titleEn: "'自己画自己'的自画像",
      description: "'自己画自己'的自画像",
      prompt: `一张专业的、电影般的照片（不是数字艺术或绘画），捕捉到一位艺术家，她/他具有与上传的参考照片相同的面部特征，这位艺术家正在画架上画她/他逼真的自画像。她/他手持一支精细的画笔靠近脸颊，站在画架前。`,
      tags: ["想象", "AI生成"],
      source: "@ZaraIrahh",
      previewImage: "https://pbs.twimg.com/media/G5i9ovQa8AAPk3A?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-3b0f80",
      title: "与动漫人物的鱼眼自拍",
      titleEn: "与动漫人物的鱼眼自拍",
      description: "与动漫人物的鱼眼自拍",
      prompt: `9/16 垂直格式鱼眼自拍，上传照片人物与[Doraemon, Naruto, Nobita, Satoru Gojo, Sung Jin, who is Ash from Pokémon]合照自拍。都以傻傻的、夸张的表情微笑。设置在一个小而明亮的客厅中，白调。高相机角度。极端鱼眼扭曲。现实的、电影照明将动漫角色与风格化现实整合。`,
      tags: ["动漫", "自拍"],
      source: "@MehdiSharifi",
      previewImage: "https://pbs.twimg.com/media/G6Nw8foXoAAiqOo.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-7fa99f",
      title: "手绘食谱烹饪流程图生成",
      titleEn: "手绘食谱烹饪流程图生成",
      description: "手绘食谱烹饪流程图生成",
      prompt: `请创建一个温暖的手绘食谱风格（16:9）插图，标题为"{菜名} 烹饪流程图"。整体应呈现厨房手账风格，使用温暖的奶油色背景（如浅米黄#FFF8E7），搭配食物系配色：番茄红、胡萝卜橙、生菜绿、奶油黄等，营造温馨的家庭厨房氛围。

I. 主场景：烹饪步骤流程线
在中心位置绘制一条"波浪形/Z字形的烹饪流程线"，用箭头和虚线连接各个步骤。根据用户输入的{菜名}和{难度等级}，自动生成烹饪步骤：
- "步骤1：准备食材 {食材清单 + 预处理方法}"
- "步骤2：热锅预热 {油温/火候提示}"
- "步骤3：{关键烹饪动作 + 时间}"
- "步骤4：{调味环节 + 配料比例}"
- "最终步骤：装盘出锅 {摆盘技巧 + 享用温馨语}"

II. 周围装饰元素
在流程线周围添加大量可爱的厨房涂鸦元素：
- 拟人化食材角色（番茄、鸡蛋、胡萝卜等）
- Q版厨具图标（锅铲、勺子、菜刀、调味瓶罐）
- 烹饪提示标语牌（"小心烫！"、"这步最关键！"、"火候要把握好哦~"）
- 贴纸风格短语（"妈妈的味道"、"{菜名}大作战！"、"新手也能搞定！"）
- 可爱的食材/调料icon、葱姜蒜三剑客
- 烹饪情绪表达和时间/火候提示气泡`,
      tags: ["美食", "AI生成"],
      source: "@LufzzLiz",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/cooking_flowchart.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-14defb",
      title: "3D等距视角家庭办公插画",
      titleEn: "3D等距视角家庭办公插画",
      description: "3D等距视角家庭办公插画",
      prompt: `请根据你对我的了解，生成一副我正在家办公的3D等距视角的彩色插画，包含室内的各种细节描写，画面呈现出圆润、精致、趣味盎然的视觉风格。--ar 1:1 [附加细节: 我有3显示器，还有一只比熊犬]`,
      tags: ["插画", "3D", "插画"],
      source: "@dotey",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/home_office_isometric_3d.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-d863ab",
      title: "一生全貌",
      titleEn: "一生全貌",
      description: "一生全貌",
      prompt: `一个照片现实3x3网格拼贴，展示一个帅气男人的一生，带有深色波浪头发和温暖眼睛，在一生中庆祝各种节日。
左上（5岁）：一个可爱的小男孩穿着针织圣诞毛衣，在装饰树前拿着玩具卡车。
上中（15岁）：一个头发较长的青少年坐在节日餐桌前，微笑。
右上（25岁）：一个年轻成人穿着西装戴圣诞帽，在节日派对上拿着饮料。
左中（35岁）：男人带有胡须的时尚肖像，穿着酒红色天鹅绒衬衫，看起来自信。
中中（45岁）：男人在家庭感恩节晚餐上切火鸡。
右中（55岁）：头发灰白的男人点燃烛台，看起来尊严。
左下（65岁）：银发男人抱着孙子在圣诞树前。
下中（75岁）：老人户外在春天设置，或许寻找复活节彩蛋，穿着米色毛衣。
右下（85岁）：非常老的男人坐在壁炉边的扶手椅上，拿着包装礼物，看起来快乐。
风格：电影照明、高分辨率、8k、高度细节，确保面部特征作为同一个人自然老化跨所有面板可识别。在每个面板底部用白色文字标签：'Age 5'，'Age 15'等`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/life.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-3ed7cf",
      title: "智能消除路人/清场",
      titleEn: "智能消除路人/清场",
      description: "智能消除路人/清场",
      prompt: `移除主要拍摄对象背景中的所有游客/人物。
智能填充：用符合场景逻辑的真实背景元素替换他们（例如，延伸鹅卵石路面、空的公园长椅或草地纹理）。
一致性：确保没有模糊的瑕疵或污迹残留。填充区域必须具有与照片其余部分相同的颗粒感、焦深和光线。`,
      tags: ["AI生成"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/remove_people.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-306c31",
      title: "漫画/梗图汉化",
      titleEn: "漫画/梗图汉化",
      description: "漫画/梗图汉化",
      prompt: `将对话气泡/标题中的文字从[日语/英语]翻译成[中文]。
无缝清除：擦除原始文本并完美地填充背景（例如，白色的对话气泡或彩色的图像背景）。
风格匹配：使用与原始图像美学相符的休闲手写风格字体（或用于梗图的粗体Impact字体）来渲染翻译后的中文文本。
适配：确保文本在气泡内自然适配，不会过于拥挤。`,
      tags: ["漫画", "AI生成"],
      source: "Wechat@01Founder",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/comic_translation.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-1cf66e",
      title: "各年龄段的样子",
      titleEn: "各年龄段的样子",
      description: "各年龄段的样子",
      prompt: `生成此人从出生到80岁各个年龄段的节日照片`,
      tags: ["AI生成"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6at2Z1akAA1tRN.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-3dc29a",
      title: "虚拟试妆",
      titleEn: "虚拟试妆",
      description: "虚拟试妆",
      prompt: `为图一人物化上图二的妆，还保持图一的姿势`,
      tags: ["AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://pbs.twimg.com/media/Gz0v8V7b0AAr8C3.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-4054d8",
      title: "创建自己的超真实微型版本",
      titleEn: "创建自己的超真实微型版本",
      description: "创建自己的超真实微型版本",
      prompt: `创建一个微型版本的我，手持展示，保持真实面部不变。`,
      tags: ["AI生成"],
      source: "@Samann_ai",
      previewImage: "https://pbs.twimg.com/media/G4Q69zjWAAAv0vI.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-5b3ca5",
      title: "汽车三视图",
      titleEn: "汽车三视图",
      description: "汽车三视图",
      prompt: `一个电影般的汽车摄影棚拍摄我，保持我的真实面部不变。场景由三个视角组成：1. 上方面板：内部特写：我坐在车内，穿着合身的黑色 polo 衫，在侧视镜反射中显示。我的面部严肃而专注，目光坚定向前。角度仅捕捉侧视图轮廓，干净地框在镜子中，强调强度和精确性。2. 中间面板：我自信地站在光滑的黑色福特野马旁边。我的姿势放松但强壮：双臂交叉在胸前，左腿直立，右腿膝盖略弯，脚随意靠在车上。目光略微偏离相机，表情平静而自信。穿着合身的黑色 polo 衫，带有微妙细节，修身灰色牛仔裤，干净剪裁，和棕色皮靴。服装简约却时尚，强调现代男性气质。像专业人士一样姿势，与上传照片相同的面部。3. 下方面板：后车拍摄：相机捕捉野马的后部，展示“YOUR NAME”车牌和汽车的肌肉线条。照片强调车辆的光泽纹理及其侵略性、电影般的存在。设置是现代建筑和混凝土墙的城市环境，赋予 gritty、电影般的氛围。照明自然但略微扩散，突出我和车辆抛光表面。视角多样：镜子反射特写使用肖像焦距（~85mm）紧凑拍摄。外部全身拍摄使用眼平角度，略宽镜头捕捉我和汽车的全貌。后车角度使用低视角强调力量和存在。风格：电影般的汽车编辑，城市设置， moody 和时尚，专业时尚遇见汽车摄影，相同面部。`,
      tags: ["AI生成"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G4aLBCPasAQjEV3.jpg",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-f973f6",
      title: "惊险火车之旅时刻",
      titleEn: "惊险火车之旅时刻",
      description: "惊险火车之旅时刻",
      prompt: `创建一个捕捉火车穿越郁郁葱葱的山区景观的惊险时刻的图像。

主体：上传参考图像中附带的这个人（保持参考图像中人物的面部100%准确）是中心主体，从红色火车车厢中探出身子。他穿着红色芝加哥公牛队球衣、牛仔短裤和乔丹运动鞋。他直视镜头。
设置：火车穿越茂密、绿色且雾蒙蒙的环境。前景被高草和茂密的植被主导。`,
      tags: ["想象", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6bVr_GW0AAJEOx.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-8787f1",
      title: "水边安静下午",
      titleEn: "水边安静下午",
      description: "水边安静下午",
      prompt: `一个令人惊叹的高时尚肖像，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确），穿着完美剪裁的浅奶油色三件套亚麻西装。夹克敞开，露出深V领马甲，没有穿衬衫。他舒适地坐在编织柳条椅上，位于俯瞰美丽湖泊的户外露台上，湖泊嵌在山脉中。他拿着一个优雅的香槟酒杯，里面装满白酒或香槟，将它靠近嘴唇。
照明是明亮的、自然的中午阳光，创造温暖、充满活力的氛围，在他的脸和西装面料上产生强烈的亮点。
构图：浅景深（散景效果）的特写镜头，锐利聚焦于前景中的他。背景，包括湖泊、远处的山坡和露台元素（白色遮阳伞，其他顾客），被柔和模糊，使他突出。
设置和风格：高端、奢华、地中海欧洲风格的户外用餐设置。绿色叶丛（藤蔓、叶子）从上方垂下，部分框住图像顶部。桌布是清脆的白色，摆放着银器，右侧可见第二个酒杯。
相机和效果：用定焦镜头拍摄（例如85mm或105mm），宽光圈（f/1.4或f/2.0），电影质量、超现实、照片现实、高细节、专业摄影、杂志封面质量、体积照明。`,
      tags: ["想象", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6bLciCXcAAgNbC.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-0ddff0",
      title: "掌控迪拜夜晚",
      titleEn: "掌控迪拜夜晚",
      description: "掌控迪拜夜晚",
      prompt: `一个令人惊叹的夜晚照片，上传参考图像中附带的这个人（保持参考图像中人物的面部100%准确），全身镜头，随意靠在玻璃阳台栏杆上，对着迪拜的全景照明天际线。在背景中，标志性的哈利法塔突出地亮起。主体穿着精致的服装：深翠绿色天鹅绒夹克、敞开的黑色衬衫和黑色长裤。照明低调且大气，右侧有温暖、发光的灯笼，在主体和场景上投射戏剧性的、电影般的辉光。姿势放松且自信，手放在栏杆上，看着侧面。中等镜头构图。从高层视角拍摄。专业摄影、锐利焦点、丰富色彩、戏剧性照明、高细节、奢华设置。`,
      tags: ["想象", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6bAkrvXAAAkOol.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-7fa6f5",
      title: "优雅房间举杯",
      titleEn: "优雅房间举杯",
      description: "优雅房间举杯",
      prompt: `一个全身、高质量、编辑肖像，上传参考图像中附带的男人，自信且优雅的男人，前后中心，穿着完美剪裁的黑色燕尾服，配以清脆的白色礼服衬衫和黑色领结，白色口袋方巾整齐地塞在里面。他拿着一个充满气泡、金色香槟的香槟酒杯，温暖地笑着对着镜头，向观众敬酒。
设置与构图：
背景是一个宏伟、奢华且装饰丰富的庄严房间/豪宅内部，古董金壁灯投射温暖的金色光芒，大型经典油画挂在墙上。一群穿着优雅正式服装（礼服和燕尾服）的时尚人士在背景中失焦，拿着饮料庆祝。金色纸屑在空中飘浮并闪耀，创造节日氛围。
风格与摄影：
编辑摄影风格，用高端全画幅数码单反相机和50mm镜头拍摄。浅景深（低光圈/f-stop）保持他锐利，背景柔和模糊（散景效果）。电影照明，在我的脸和西装上有强烈、定义的亮点，以及深沉、丰富的阴影。奢华、充满活力且温暖的色彩分级，带有精致、庆祝的心情。垂直构图突出整个场景。
最终指令：
超现实、超细节、照片现实、优雅、高时尚。`,
      tags: ["想象", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6a251CWQAA8oUw.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-09780e",
      title: "1990年代风格肖像转换",
      titleEn: "1990年代风格肖像转换",
      description: "1990年代风格肖像转换",
      prompt: `不改变她原来的脸，创建一个美丽的年轻女性的肖像，具有瓷白皮肤，用1990s风格的相机捕捉，使用直接前闪光。她凌乱的深棕色头发扎起来，摆出平静却调皮的微笑。她穿着现代的超大奶油色毛衣。背景是深白色的墙壁，覆盖着美学杂志海报和贴纸，唤起昏暗照明下舒适的卧室或个人房间氛围。`,
      tags: ["风格", "肖像"],
      source: "@ZaraIrahh",
      previewImage: "https://pbs.twimg.com/media/G4JuPtGWQAACxHr.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-6f5c38",
      title: "居家光影三联画",
      titleEn: "居家光影三联画",
      description: "居家光影三联画",
      prompt: `基于参考图像人物。三张图垂直排列，呈连续性肖像摄影的视觉叙事。环境是温暖、生活化的宜家风室内空间，背景有厨房、灯饰与家居物件，带有日常感与柔和自然光的氛围。光线从侧前方照射，亮度柔和，使皮肤质感呈现出细腻、自然的光泽。
整体色调偏冷白色，营造出轻快、清新且柔软的情绪。
人物姿态与表情变化
三张图记录了同一个人物在不同瞬间的表情变化，整体呈现：
1.第一张：表情略带可爱与调皮，冲镜头飞吻。肩膀自然放松，呈正面角度。
2.第二张：人物略侧身，头微微倾斜，眼神柔软而带有轻微情绪暗示，像是从静止过渡到微笑之间的瞬间。
3.第三张：人物更加放松，露出温柔的笑容。头发自然散落，姿态轻松，呈现出自信与自在的状态。
这种 “从冷静 → 轻松 → 微笑” 的表情变化，让整组照片呈现出一种动态叙事感。
光影与肤质表现
•光线均匀柔和，无明显强阴影。
•光照角度使脸颊与鼻梁形成非常轻微的立体阴影，突显面部轮廓但不过度锐利。
•肤色自然，有细腻的反光，呈现柔焦般的质感，带一点胶片或日系滤镜效果。
服装与材质表现
人物穿着浅灰蓝色吊带上衣，肩带纤细，布料柔软且贴身，反射柔和的光泽。在光线下呈现轻柔的高光，强调曲线线条。色彩与背景保持低饱和度一致，画面显得干净。
头发自然散落，有轻微的蓬松与空气感，质地柔软，有光线透过发丝的柔和层次。
五官比例与视线表达
•眼睛略大，眼型柔和，眼尾微微延展，眼神富有交流感；
•鼻梁细直且自然；
•唇部丰润，唇色浅粉，随着表情变化在不同图中呈现不同质感；
•面部比例均衡，视觉重心集中在眼神与微笑的变化。
整体呈现一种亲和、明亮、带情绪表达的肖像风格。
情绪与风格总结
这组照片像是在记录一个人在阳光午后、刚睡醒或者刚准备开始一天时的松弛瞬间。
氛围是自然、温暖、轻松、无防备感的美。
画面没有刻意摆拍或华丽修饰，而是以光线和表情捕捉真实与柔软的瞬间。`,
      tags: ["AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://pbs.twimg.com/media/G5OykpNbMAEM9mf.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-6fe098",
      title: "热带海滩放松",
      titleEn: "热带海滩放松",
      description: "热带海滩放松",
      prompt: `创建一个照片现实场景，一个男人在明亮热带海滩上的吊床上放松。使用上传照片替换男人，保持相同的姿势、角度、照明和心情。
主体
创建一个照片现实场景，一个男人在明亮热带海滩上的吊床上放松。使用上传照片替换男人，保持相同的姿势、角度、照明和心情。
主体
一个男人向后躺在由米色绳索编织的吊床上，吊床侧边有长穗。他休息时双手放在头后。他穿着带有绿色和黄色棕榈印花的浅热带衬衫、卡其短裤、深圆太阳镜和浅草帽。他的腿伸出，脚放在吊床内。
构图
从低眼水平角度拍摄的宽镜头。男人坐在中心。吊床对角跨越框架。相机捕捉他的全身，也清晰看到后面的海滩和海洋。框架感觉开放，背景中有大量负空间。
动作
男人放松且不动。他的姿势平静且随意。他的表情中性和和平。
位置
带有细淡沙子的热带海滩。大海显示层层绿松石、蓝绿色和深蓝水。温和波浪到达岸边。在远处，柔和绿色岛屿从水中升起，带有轻雾。几艘船出现在远处，小且模糊。
环境细节
吊床系在木柱上。棕榈叶阴影落在沙子上。小木长椅旁边的背包在框架左下。一个棕色凉鞋躺在背包附近的沙子上。沙子有脚印和自然纹理。
照明
带有柔和、温暖阳光的日光。无苛刻亮点。男人的脸部分被帽子遮挡。海洋以干净、明亮的方式反射阳光。颜色保持自然且温暖。
色彩色调
水中的绿松石和蓝色调。沙子中的浅米色和奶油调。皮肤和服装上的柔和温暖调。阴影中轻微蓝绿色。一切看起来自然且平静。
深度与焦点
男人和吊床在锐利焦点。他周围的沙子也清晰。背景岛屿和船略微模糊以显示深度。水有光滑渐变。
整体心情
平静、缓慢、和平。放松假期氛围。
风格
照片现实。高细节。自然颜色。无重滤镜。柔和对比。
编辑指令
用上传的人替换男人，但保持相同的姿势、照明、角度、服装风格和环境。将皮肤色调匹配到场景照明。保持所有物体、阴影和背景元素相同。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6TZp5bXcAADLXC.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-b77a04",
      title: "维多利亚的秘密华丽拍摄",
      titleEn: "维多利亚的秘密华丽拍摄",
      description: "维多利亚的秘密华丽拍摄",
      prompt: `以维多利亚的秘密风格创建一个华丽拍摄。一个年轻女人上传参考图像中附带的（保持参考图像中人物的面部100%准确）几乎侧身站立，略微前弯，在表演前的最终准备中。化妆师给她涂口红（框架中只可见他们的手）。她穿着装饰珠绣和水晶的紧身胸衣，带有短蓬松裙，以及大型羽毛翅膀。图像具有“后台”效果。
背景是黑暗照明的房间，可能在讲台下。主要强调女孩的脸和她服装的细节。强调目光的表现力和服装的奢华外观。照片由相机闪光照明，强调胸衣上的珠子和水晶的光芒，以及女孩闪亮的皮肤。维多利亚的秘密风格：感性、奢侈、魅力。非常细节。重要：不要改变脸。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6TSEuEWEAAaR7N.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-00d455",
      title: "街头风格肖像",
      titleEn: "街头风格肖像",
      description: "街头风格肖像",
      prompt: `生成一个照片现实街头风格肖像，上传的男人从中跨步捕捉，同时走过安静的城市人行横道在高端住宅区。相机以全身、眼水平镜头框住他，从正面略微角度。他看起来放松，平静的表情，一只手轻轻调整头发。
主体与服装
男人穿着长驼棕色羊毛大衣，带有可见纹理。大衣下，他穿着奶油或米白色针织毛衣和匹配直剪针织裤子，随着行走自然移动。他携带一个棕色皮革斜挎包，放在臀部附近。他的鞋子是干净白色运动鞋。他的头发自然造型，随着行走运动略微移动。
动作与姿势
他从中步捕捉，向前走。他的姿势直立但轻松。一只手臂自然摆动，另一只手轻轻触碰头发。他的目光略向上和侧面，给出放松、自信的心情。
位置与环境
场景在树木成排的住宅街道上，有经典褐石建筑在两侧。汽车有序停在路边。一个单向街道标志和交通灯在背景可见。树木有温暖秋季色调——柔和黄色、褪色绿色、浅棕色。人行横道计数信号显示橙色数字。街道看起来干净且安静。
照明与阴影
照明是柔和自然日光，典型温和秋季下午。阳光通过树枝过滤，在他的大衣、头发和脸上创造温和亮点。阴影柔和落在场景中，无苛刻对比。背景建筑有轻阴影添加深度。
色彩色调与心情
调色板温暖、中性且秋季主题：驼棕色、奶油、米白色、柔和绿色和砖红。心情平静、时尚且轻松。色调自然、略电影且干净。
相机与景深
用中等焦距（约50–85mm）拍摄。景深浅到中等，保持男人锐利焦点，而后面的建筑、树木和汽车温和柔化，带有温和散景。人行横道前景线保持锐利。
匹配细节
– 头发和大衣中微妙运动
– 衣服上的自然纹理
– 皮包上的柔和光泽
– 沿街道有序停放汽车
– 头顶拱形树枝形成松散天篷
– 地面散落轻秋叶
风格
严格照片现实、高分辨率、编辑风格街头时尚摄影。
用户照片指令
用上传的人替换男人的脸和身体，同时保持：
– 服装风格
– 环境
– 照明
– 框架
– 心情
完全相同。`,
      tags: ["风格", "肖像"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6TMmbUWcAA-CiW.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-8797af",
      title: "黄金时段肖像",
      titleEn: "黄金时段肖像",
      description: "黄金时段肖像",
      prompt: `一个照片现实肖像，上传的人在温暖黄金时段阳光下户外站立。主体从胸部向上显示，面向略向上和右侧，带有自然放松微笑。他们的头发轻微风吹，柔和卷曲捕捉温暖光。他们有短、整洁胡须，戴着圆形、透明框眼镜，反射太阳的微弱亮点。
场景由低、温暖日落光从框架左侧照明。光在下巴下、领子周围和夹克褶皱上创造柔和阴影。照明带有金色色调，给皮肤和服装温暖色调。眼镜显示天空的微妙反射，无扭曲。
主体穿着浅黄色毛衣下略微褪色蓝色牛仔夹克。夹克显示清晰缝线、金属纽扣和自然面料纹理。毛衣有简单针织图案，看起来柔软，在上表面捕捉温暖光。
背景是宽阔、开放景观，田野伸向远处。地平线低坐，保持天空主导。天空清晰、亮蓝，靠近地平线渐变变浅。背景用浅景深模糊，给肖像风格散景效果。背景中无强物体，保持干净、最小外观。
相机角度眼水平但略低，给温和向上视角。镜头是中等特写肖像，居中构图，主体占据大部分框架。心情平静、温暖且自然，捕捉户外黄金时段时刻。
包括以下结构：
主体：上传人的脸和上身，轻轻微笑，戴着透明框眼镜、黄色毛衣和牛仔夹克。
构图：中等特写肖像，略低角度，居中框架，浅景深。
动作：主体带着柔和微笑向上看，静止站在温暖光中。
位置：黄金时段开阔户外田野，清晰蓝天。
风格：照片现实、温暖自然色调、柔和日落照明、干净背景。
编辑指令：精确匹配照明方向、温暖色调、浅景深、夹克纹理、眼镜反射和黄金时段色彩心情。`,
      tags: ["肖像", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6TCOVBXIAAivSs.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-5076e2",
      title: "冬季锐利肖像",
      titleEn: "冬季锐利肖像",
      description: "冬季锐利肖像",
      prompt: `一个坦率的街头肖像，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）穿着复杂、彩色拼布夹克，图案黄色、红色、蓝色和橙色，上面是深色绗缝背心和灰色羊毛高领毛衣。他直视镜头，带有严肃表情。背景有雪覆盖地面和远处山脉在晴朗天空下。照明明亮且自然，暗示日光。颜色丰富且温暖。`,
      tags: ["肖像", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6S9DzjWQAAP7tN.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-8ee09a",
      title: "调皮猫街头时刻",
      titleEn: "调皮猫街头时刻",
      description: "调皮猫街头时刻",
      prompt: `一只可爱的橙色猫在前景中拍摄戏剧性超广角自拍，巨大透视效果，玩耍且动态角度。在背景中，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）以潮流嘻哈时尚摆姿势，带有能量爪姿势，街头风格态度。时尚细节：超大夹克、图形T恤、宽松裤子、链子、现代运动鞋。城市户外设置，带有工业建筑、蓝天、略微扭曲镜头外观、鲜艳色彩、高时尚编辑氛围、电影照明`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6R2McdWAAAoI7g.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-17bfbc",
      title: "电影森林时刻",
      titleEn: "电影森林时刻",
      description: "电影森林时刻",
      prompt: `一个肖像照片，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确），保持他的自然面部特征、面部形状、胡须风格、眉毛、眼睛、鼻子，以及参考中的确切拍摄角度。他不戴手套。
场景与动作：
男人半蹲并向下倾斜在高耸松树森林中间。他的右手向下扫，开着，并指向镜头。镜头从极端低角度（虫眼视图）拍摄，强调男人的身形和树木的巨大高度。稠密松树树冠形成戏剧性垂直线图案向上引导，从这个视角似乎包围男人，树木之间可见明亮蓝天补丁。
服装：
他穿着军绿色夹克，上面是纯浅灰T恤，和橄榄绿色工装短裤。他直视镜头，带有平静但自信的表情。
氛围与照明：
后面天空明亮，充满厚白云，创造明亮且戏剧氛围，明亮自然日光。
构图与质量：
从下面拍摄的低角度视角，向上看，展示通往山顶的长登山路径。高分辨率摄影。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6Ro1TcWMAAm8BR.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-029a87",
      title: "里约站立",
      titleEn: "里约站立",
      description: "里约站立",
      prompt: `上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）在巴西里约热内卢的救世主基督雕像前微笑摆姿势。他靠在石头栏杆上，双臂轻轻交叉，表情宁静。他穿着带有热带叶印花的黄色衬衫。左腕有一个银色智能手表，脖子上一个精致银项链，带有圆形吊坠。设置阳光明媚且明亮，充满活力、无云蓝天。在背景中，突出的救世主基督张开手臂，在科科瓦多山顶。下面，糖面包山和里约热内卢的山区城市景观部分可见，略微失焦。游客在背景中行走，添加现实且自然触感。照明是自然中午光，温暖且柔和色调增强他的皮肤和头发光泽。框架是中等镜头，在前景中居中男人，背景中救世主基督，创造和谐且平衡构图。氛围轻松、欢乐且旅游性，传达和平和对地方的钦佩略微模糊、彩色美学。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6QlbLRWEAA9IFx.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-c861df",
      title: "沙漠战士",
      titleEn: "沙漠战士",
      description: "沙漠战士",
      prompt: `一个超现实电影肖像，参考图像中的人（保持脸100%准确，相同表情、皮肤色调和比例）。人在晴朗蓝天下跪在严酷沙漠环境中。他们的身体覆盖干尘和沙子，穿着磨损部落风格服装，由撕裂织物、绳子和粗糙层组成，看起来阳光暴晒且风化。编织头发带有松散缕落在脸周围，大胆深蓝战争颜料条纹跨眼睛和额头。
两个人身后坐着两只狮子——一只成年雄狮带有厚金色鬃毛，一只年轻狮子幼崽。两只狮子平静但警惕表情直视镜头。它们的毛有温暖沙色调匹配沙漠光。柔和阴影在干燥裂缝地面上形成在它们身体下。
一个大型漂白动物头骨躺在前景，略微失焦，创造强景深效果。头骨有粗糙纹理、裂缝和沙子收集在空腔中。阳光在边缘创造清晰亮点，柔和扩散阴影在空腔内。
照明明亮且自然，从高中午太阳来，投射短阴影。整体色彩色调温暖、土质且尘土飞扬。相机角度低，靠近头骨，焦点在人和狮子上，前景保持模糊。背景是简单晴朗天空无云，给出 stark 开阔沙漠感觉。
图像风格：超现实、高细节、纪录风格、锐利纹理、自然阴影、电影深度、8k质量。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6QSLVIWMAAODs7.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-8077fa",
      title: "沙漠骑行",
      titleEn: "沙漠骑行",
      description: "沙漠骑行",
      prompt: `一个时尚和生活方式照片，带有粗犷、冒险美学，捕捉一个男性人物随意坐在定制摩托车旁边。主体坐在粗糙地面上，重重靠在自行车后轮和框架上，双腿伸展，手臂放松。他的目光指向侧面，走出框架，传达沉思且疲惫但满足冒险的表情。他的手显示污垢和油渍，略微紧握，摆弄他的戒指。
他穿着单色、实用服装在深色调：合身黑色罗纹背心，敞开黑色帆布无袖夹克（背心），肩部有褪色补丁，深色、粗糙工装裤膝部尘土飞扬。一副复古飞行员太阳镜挂在脖子上皮绳。
添加他的外观：脖子周围，部分塞在背心下，是磨损银圣克里斯托弗奖章在重链上。他的手腕堆叠多个粗银戒指、多样皮革手铐，以及左腕上划痕、战术风格田野表带有帆布带。一个磨损皮革腰带带有陈旧黄铜扣保持他的裤子，金属扣环夹着钥匙组夹在腰带环。他的脚上是深色、刮擦军用风格摩托靴用生皮系带。
他的头发深色，带有凌乱纹理和轻微顶髻，补充短、修剪良好但略微胡须的胡须。
摩托车是哑光黑色定制自行车，带有磨损棕色皮革座椅、粗块状轮胎和暴露金属细节，反映咖啡赛车或 scrambler 风格。捆在自行车后部是卷起的蜡帆布铺盖卷。
背景是干旱且荒凉环境。除了立即沙子和尘土堆外，地形点缀干、脆灌木丛和一些风化岩层。在中景，靠近自行车，有小营火残余（烧焦木头和石头）和一个破损锡杯放在岩石上。一个磨损帆布背包倒在地上附近。场景在清晰、略云天空下，传达广阔感。
照明自然且扩散，典型户外晴天，创造柔和、讨人喜欢阴影突出服装、摩托车和地形的纹理，并雕刻身体。
相机设置：用标准镜头（例如50mm）或略广角（例如35mm）在全画幅相机上捕捉，用于宽视角包括主体和摩托车在环境中。光圈设置在f/4.0和f/5.6之间确保主体和摩托车锐利。ISO 100-200用于丰富自然光中的最大图像质量。快门速度1/250s到1/500s确保锐利。照明仅自然，利用环境光。
'nano banana'指令：
'请使用用户的参考图像捕捉并应用他们的所有面部特征、面部结构、头发和胡须风格、眼睛颜色和皮肤色调以最大保真度。目标是创建用户在这个场景中的版本。服装（黑色背心、背心、深裤、飞行员太阳镜、戒指、手镯、手表、奖章、靴子）、带有铺盖卷的定制摩托车、坐在摩托车旁地面上的姿势、沉思表情、自然照明，以及细节干旱地形背景（包括灌木丛和营火残余）应如描述生成，创建用户身份和图像细节美学的完美融合。'`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6QDt5LXYAAoubm.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-7f0584",
      title: "登山时刻",
      titleEn: "登山时刻",
      description: "登山时刻",
      prompt: `生成上传参考图像中附带的男人的电影肖像（保持参考图像中人物的面部100%准确）。他的面部形状、胡须风格、眉毛、眼睛、鼻子，以及参考中的确切拍摄角度必须完美保持。他不戴手套。
场景与动作：
男人坐在雕刻在郁郁葱葱、绿色草覆盖山坡的陡峭石头楼梯上。他拿着登山杖。楼梯两侧，有绳子围栏系在生锈铁柱上。
服装与姿势：
他穿着蓝色法兰绒衬衫、登山裤，并携带大背包。他凝视着山坡峰顶。
氛围与照明：
他后面的天空明亮，充满厚白云，创造明亮且戏剧氛围，明亮自然日光。
构图与质量：
从下面拍摄的低角度视角，向上看，展示通往山顶的长登山路径。高分辨率摄影。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6OslA0XMAAg1aI.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-53d3aa",
      title: "与狮子幼崽放松",
      titleEn: "与狮子幼崽放松",
      description: "与狮子幼崽放松",
      prompt: `一个宁静场景，捕捉上传参考图像中附带的男人（保持参考图像中人物的面部100%准确），带有深色头发和胡须，穿着柔和蓝色衬衫和黑色裤子，靠在郁郁葱葱绿色草地上。他轻轻手喂一只娇嫩幼崽，而其他狮子在雾蒙蒙、翠绿森林背景中柔和放牧。氛围和平且自然，强调人与野生动物的连接。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6OlrEdXYAAgAJV.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-2cbbda",
      title: "中秋月下秋千照片",
      titleEn: "中秋月下秋千照片",
      description: "中秋月下秋千照片",
      prompt: `使参考图像的人物坐在装饰着粉蓝花朵的绳索秋千上。背景是一轮巨大且发光的圆月，衬着深色背景；下方水面朦胧，倒映出她的身影，营造出梦幻、空灵的氛围；电影级光影强化了画面的仙气感。`,
      tags: ["AI生成"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G2lQajpasAAzXNY.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-cc287f",
      title: "云上放松",
      titleEn: "云上放松",
      description: "云上放松",
      prompt: `参考照片中的人（保持参考图像中人物的面部100%准确）在高空蓬松、发光云上放松，周围柔和金色阳光和广阔云层伸向地平线。这个人舒适地向后躺着，带有枕头，穿着深色长袖衬衫、橄榄绿色裤子和眼镜，一只手拿着书，另一只手拿着咖啡杯。照明电影且温暖，捕捉黄金时段氛围，在云层上辐射亮点和温和阴影。用广角镜头在中景深捕捉，平衡主体和周围梦幻天空的焦点。整体氛围超现实且宁静，将现实与幻想混合在和平、富有想象力的设置中。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6OYkPWXsAAYLNB.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-022490",
      title: "北极光下孤独女子三联画",
      titleEn: "北极光下孤独女子三联画",
      description: "北极光下孤独女子三联画",
      prompt: `2160x3840像素（4K）超现实数字照片杰作三联画。图像为垂直画布，分为三个相等的水平面板。主体人物的脸部必须与参考照片100%相同，她是一位年轻女性，长发飘逸，表情平淡而怀旧，拥有深邃聪慧的眼睛。她的服装是宽松的冬季黑色羽绒套装，宽腿裤和黑色围巾。整体氛围是忧郁与孤独，设定在雪覆盖的白色景观中，使用柔和的色调。
面板1（肖像镜头）：人物手持透明雨伞，回头凝视温暖的火光，背景模糊（散景），包括松树、强烈的北极光和深白雪。
面板2（全身镜头）：从高角度俯视的全身镜头，人物独自站在广阔的雪地中，散布松树和几棵光秃秃的树。她手持雨伞，走路时抬头凝视北极光天空，一手举起仿佛捕捉远处的落雪。场景传达出渺小与隔离感。
面板3（特写镜头）：人物脸部的紧凑特写，平淡而遥远的凝视，唤起孤独与渴望。背景包括松树、柔和的北极光辉光和可见的降雪。
技术规格：使用Hasselblad X2D 100C相机和Fujifilm GF 45mm f/2.8 R WR镜头捕捉（保持所有视角的质量）。柔和的昏暗夜间照明，面板1中火光的温暖对比。关注羽绒材质的纹理、柔软的雪和北极光的发光质量。电影级着色，强调冷色调和忧郁氛围。
面部约束：关键：使用附件的照片作为主体参考。保持100%相同的面部特征：眼睛、头发、鼻子、嘴唇、前刘海和脸型。身份必须在所有三个面板中完美保留。`,
      tags: ["AI生成"],
      source: "@YaseenK7212",
      previewImage: "https://pbs.twimg.com/media/G5JYEF7WEAAFY_5.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-e3ff4f",
      title: "生成可爱K-pop风格女友照片",
      titleEn: "生成可爱K-pop风格女友照片",
      description: "生成可爱K-pop风格女友照片",
      prompt: `参考图1的面部特征，生成全身工作室肖像：一位甜美的年轻东亚女性坐在浅紫色背景前的地板上，穿着舒适的超大号薰衣草色粗针织毛衣、白色裙子和白色袜子，深情地抱着一个大型三丽鸥库洛米毛绒玩具，温柔地看着镜头。背景装饰有俏皮的手绘紫色涂鸦和文字，包括"A"、“ANNISA”、纸飞机和花朵，风格类似K-pop照片卡或粉丝杂志封面。光线明亮柔和，营造可爱温馨的氛围。`,
      tags: ["风格", "AI生成"],
      source: "@bozhou_ai",
      previewImage: "https://pbs.twimg.com/media/G6R3aVhacAEJsTv?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-685d31",
      title: "连环画",
      titleEn: "连环画",
      description: "连环画",
      prompt: `帮我生成一个8页的连环画，给2岁半的小朋友讲故事用，用中英文标出简短对话，主角是一只斑马和一只大象的故事，需要多角度展现主角，保持主角的一致性`,
      tags: ["AI生成"],
      source: "@canghecode",
      previewImage: "https://pbs.twimg.com/media/G6OkukAaUAAGmiU.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-f523d3",
      title: "在车后备箱吸烟",
      titleEn: "在车后备箱吸烟",
      description: "在车后备箱吸烟",
      prompt: `{
  "prompt_breakdown": {
    "subject_parameters": {
       "identity_constraint": "保留参考图像的面部特征",
      "hair": "长、灰棕色、纹理狼剪",
      "expression": "放松、梦幻、看向侧面"
    },
    "apparel": {
      "top": "无袖裁剪黑色连帽衫，高领",
      "bottom": "褪色黑色牛仔短裤，复古磨损风格，毛边粗糙纤维",
      "footwear": "Onitsuka Tiger Mexico 66 运动鞋 (黄色和黑色)"
    },
    "pose_and_action": {
      "body_position": "躺在打开的车后备箱内放松，双腿弯曲交叉",
      "arms": "右臂向上伸展，左手拿着点燃的香烟靠近嘴巴",
      "action": "吸烟"
    },
    "environment_and_props": {
      "primary_container": "亮黄色跑车的后备箱",
      "trunk_contents": "透明盒子，黄色瓶子或黑色管子附在侧面",
      "background": "黑暗户外夜间设置，模糊建筑物轮廓，左侧另一辆车的部分车轮"
    },
    "technical_specs": {
      "angle": "高角度拍摄 (向下看)",
      "lighting": "硬直闪光 (35mm 模拟风格)，黑暗环境背景",
      "medium": "闪光摄影，颗粒胶片纹理",
      "atmosphere": "前卫、神秘、坦率"
    }
  }
}`,
      tags: ["AI生成"],
      source: "@xmliisu",
      previewImage: "https://pbs.twimg.com/media/G6R2NHvW4AAIa-u.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-197465",
      title: "新古典高时尚女性肖像",
      titleEn: "新古典高时尚女性肖像",
      description: "新古典高时尚女性肖像",
      prompt: `{
  "prompt_structure": {
    "subject_preservation": {
      "face_and_body": "严格遵守参考图像的面部特征和身体比例",
      "hair_modification": "保留原发型但精炼，增强柔软体积、定义和光泽光泽"
    },
    "fashion_aesthetic": {
      "style": "新古典高时尚",
      "garment_details": "及地长袍，带有结构化建筑褶皱混合飘逸流动悬垂",
      "accessories": "华丽金属臂铐，结构化胸衣元素"
    },
    "composition_and_pose": {
      "stance": "反向对位排列，站立略微向右倾斜",
      "upper_body": "躯干轻轻向相机扭转，双手低处腹部紧握",
      "head_position": "略向左倾斜，下巴定义",
      "framing": "全身肖像"
    },
    "environment": {
      "setting": "极简工作室空间",
      "props": "古典白色大理石雕像定位以创建深度和建筑线条"
    },
    "lighting_and_mood": {
      "lighting_setup": "雕塑工作室照明以定义骨骼结构和织物褶皱",
      "mood": "飘逸却威严、安详、无声"
    }
  }
}`,
      tags: ["肖像", "AI生成"],
      source: "@xmliisu",
      previewImage: "https://pbs.twimg.com/media/G6RDuoOX0AA0cZG.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-bfc219",
      title: "颜值打分",
      titleEn: "颜值打分",
      description: "颜值打分",
      prompt: `以提供的肖像照片为基础。 不要改变人物的面部、表情、年龄、肤色或性别。只需在上方叠加一个干净、极简的信息图表。
创建一个高分辨率的垂直“面部美学报告”海报，影棚灯光，柔和的米色背景，高端美容诊所风格。
主题可以是男性或女性——保持与原始照片完全一致。
添加细白线和标签指向真实面部的每个区域，并根据全球美学比例、对称性和比例给出百分比评分（不改变面部）：
1. 眼睛： 用线指向眼睛的标签： “眼睛美丽度 – 0–100%”
2. 颧骨： 颧骨附近的标签： “颧骨和谐度 – 0–100%”
3. 嘴唇： 靠近嘴部的标签： “嘴唇形状 – 0–100%”
4. 眉毛： 眉毛上方或旁边的标签： “眉毛设计 – 0–100%”
5. 下颌与下巴： 靠近下颌线和下巴的标签： “下颌与下巴轮廓清晰度 – 0–100%”
6. 整体面部对称性： 面部中心附近的标签： “面部对称性 – 0–100%”
在海报底部中央，添加一个圆形或矩形内的巨大、粗体数字： “综合评分：XX%” 这是从 1 到 100%的面部美学总分。
设计风格：
– 干净、医疗级、美容诊所信息图表
– 现代细体无衬线字体
– 白色文字和线条，微妙的阴影
– 无标志，无额外图形，除标签和分数外无其他文字。`,
      tags: ["AI生成"],
      source: "@Samann_ai",
      previewImage: "https://pbs.twimg.com/media/G6WdE9OWYAASxko?format=jpg&name=4096x4096",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-338457",
      title: "换装越南奥黛风艺术照",
      titleEn: "换装越南奥黛风艺术照",
      description: "换装越南奥黛风艺术照",
      prompt: `创建一个超写实的人物肖像（保留确切的真实面部和身体特征，不做任何改动），8K高分辨率的超现实肖像画。
画面中是一位年轻、优雅的女性，穿着传统的白色丝绸肚兜和飘逸的深绿色长裙。她身体微微倾斜，右手优雅地弯曲手肘，在右脸颊附近举着一朵新鲜的白莲花。她的左手轻轻地放在大腿上。她的头微微倾向莲花，眼神宁静而梦幻地看着花朵，带着一丝微妙的微笑。她的黑发盘成一个高高的波浪形发髻，几缕发丝勾勒出她白皙、容光焕发的脸庞。
背景是渐变的橄榄绿色，带有柔和、温暖的光晕，突出了丝绸肚兜的质感、娇嫩的莲花花瓣和她光滑的皮肤。旁边一张雕刻精美的木桌上放着一个装满白莲花的大白花瓶。
电影般的构图，背景虚化，超清晰的细节，逼真的阴影，杰作，照片级真实感。`,
      tags: ["AI生成"],
      source: "@ShreyaYadav___",
      previewImage: "https://pbs.twimg.com/media/G5YBkPtbYAAVDEr?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-192559",
      title: "一键智能修图",
      titleEn: "一键智能修图",
      description: "一键智能修图",
      prompt: `这张照片很无聊很平淡。增强它！增加对比度，提升色彩，改善光线使其更丰富，你可以裁剪和删除影响构图的细节`,
      tags: ["AI生成"],
      source: "@op7418",
      previewImage: "https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/images/case7/output.jpg?raw=true",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-253e5b",
      title: "黑白装逼肖像",
      titleEn: "黑白装逼肖像",
      description: "黑白装逼肖像",
      prompt: `高分辨率的黑白肖像摄影作品，采用编辑类与艺术摄影风格。保持人物面部特征一致，仅改变姿态与构图。背景为柔和渐变，从中灰过渡到近乎纯白，配合细腻的胶片颗粒质感，营造经典黑白影像的氛围。
主体穿着 黑色 T 恤，以不同随机姿态出现：抬手触脸、手指交叠于胸前、用手部分遮挡面容、轻触下颌等，强调自然、优雅的手部动作。面部依旧保留原有神态，只在角度和光线中体现变化，局部捕捉眼神、颧骨或唇角的细节。
光线为温柔的定向光，柔和地勾勒出脸部、手部与 T 恤的纹理；画面简洁，留有大面积负空间。没有文字或标志，只有光影、姿态与情绪交织。
整体氛围亲密、永恒，像呼吸或思索间的停顿，被捕捉为诗意的瞬间。`,
      tags: ["肖像", "AI生成"],
      source: "LinuxDO@Bensong",
      previewImage: "https://i.mji.rip/2025/09/04/f03851e1fbea897dee75a109d497e2c7.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-d0a56f",
      title: "3D模型手办 (复杂背景)",
      titleEn: "3D模型手办 (复杂背景)",
      description: "3D模型手办 (复杂背景)",
      prompt: `将用户提供的2D图片生成一张高品质、照片级的3D模型手办图片。手办应制作精良，细致入微地捕捉2D角色插画中的精髓和设计。
 
**手办细节：**
 
-   **姿势：** 手办的姿势应动态化，反映2D图片中原始角色的动作或标志性姿态。
-   **服饰与配件：** 忠实地以三维形式再现2D角色的所有服饰、盔甲、配饰（如武器、首饰、头饰）以及复杂的图案，并赋予其逼真的纹理（如布料的褶皱、金属的光泽、皮革的纹理）。
-   **头发：** 头发应塑造成具有流动感和真实感的造型，与角色的发型和长度相匹配。
-   **面部特征：** 手办的面部应准确呈现角色的表情和五官。
-   **材质外观：** 手办应呈现出制作精良的塑料或树脂模型的质感，带有微妙的反光和适当的材质光泽。
 
**场景与展示：**
 
-   **环境：** 手办摆放在一个整洁有序的桌面上，使用圆形透明丙烯酸基座，类似一个模型爱好者的工作室。
-   **背景屏幕：** 在手办后方的背景中，有一个电脑显示器，上面显示着该角色的3D模型Blender建模过程，展示其数字模型。屏幕应散发出柔和的光芒，照亮桌面的一部分。
-   **包装盒：** 在手办旁边，稍微面向观察者倾斜放置着手办的零售包装盒。包装盒的艺术设计应以与手办姿态相似的同一角色为特色，并带有风格化的品牌名称（例如：“Good Smile Company”或类似的虚构品牌），可能还有角色名称。包装盒应看起来专业设计。
-   **桌面物品：** 桌面上手办和包装盒周围，散落着各种模型工具和用品，可以包括：
    -   小罐颜料或油漆瓶
    -   精细的画笔
    -   模型工具（如镊子、小型切割刀、雕刻工具）
    -   带有网格线的切割垫
    -   参考书或画册
    -   其他一些暗示创意工作区的小型艺术相关杂物。
-   **灯光：** 场景应采用柔和的自然光或类似工作室的灯光照明，突出手办的细节，并产生柔和的阴影，营造出深度和真实感。
 
**整体美感：** 图像应传达出一种已完成的、专业制作的收藏级手办的感觉，并将其置于其创作和开发背景中进行展示。焦点是手办本身，但周围的元素增强了其创作和展示的故事性。
`,
      tags: ["3D", "AI生成"],
      source: "LinuxDO@DT2025",
      previewImage: "https://i.mji.rip/2025/09/04/a5fb782fded5b3778e2b39a455aa1fad.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-ef7aee",
      title: "定制动漫手办",
      titleEn: "定制动漫手办",
      description: "定制动漫手办",
      prompt: `生成一张摆放于桌面上的动漫风格手办照片，以日常随手用手机拍摄的轻松休闲视角呈现。手办模型以附件中人物照片为基础，精确还原照片中人物的全身姿势、面部表情以及服装造型，确保手办全身完整呈现。整体设计精致细腻，头发与服饰采用自然柔和的渐变色彩与细腻质感，风格偏向日系动漫风，细节丰富，质感真实，观感精美。`,
      tags: ["动漫", "AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/db8e5dc52a7c7d814c573877ee03225c4d4e761d0d987fbec05f1c8f3be8ebe2/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d71564b36666d2d66503861342d4c7870614e374a692e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-78c982",
      title: "定制Q版钥匙串",
      titleEn: "定制Q版钥匙串",
      description: "定制Q版钥匙串",
      prompt: `一张特写照片，展示一个被人手握住的可爱多彩钥匙串。钥匙串的造型为 [参考图片] 的 Q 版风格。钥匙串由柔软橡胶材质制成，带有粗黑描边，连接在一个小巧的银色钥匙圈上，背景为中性色调。`,
      tags: ["Q版", "AI生成"],
      source: "@azed_ai",
      previewImage: "https://camo.githubusercontent.com/0749f414a01d6b6e053e86e0edd1877d1c7a5666683b04071da0115cf7830653/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d424f4877686d6b2d482d4c785133393865706b50702e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-2d71a6",
      title: "自拍生成摇头娃娃",
      titleEn: "自拍生成摇头娃娃",
      description: "自拍生成摇头娃娃",
      prompt: `将这张照片变成一个摇头娃娃：头部稍微放大，保持面部准确，身体卡通化。[把它放在书架上]。`,
      tags: ["自拍", "AI生成"],
      source: "@thisdudelikesAI",
      previewImage: "https://camo.githubusercontent.com/65210cc20d1ddd967e05e0cc20805dccceda04f3d30991e2e1925a8f86b54b1c/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d654a7a7761703765374b7353774a6f665933696a382e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-49632d",
      title: "欧洲花店工作",
      titleEn: "欧洲花店工作",
      description: "欧洲花店工作",
      prompt: `创建一个照片现实肖像，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）站在鹅卵石街道上的花店外面。将男人的脸和身体匹配到上传的照片。他温暖地笑着，同时双手拿着混合野花的花束。他穿着蓝色牛仔围裙，上面是一件浅色衬衫和合身的夹克。
将他放在装满桶和玻璃罐中彩色花朵的木架前面。花店前面环绕着装满玫瑰、郁金香、雏菊和混合花束的板条箱和花盆。街道狭窄，有旧砖建筑、小店招牌和他上方的遮阳篷。
照明是柔和的日光，带有温和的阴影。色彩色调温暖且自然。景深保持男人和花朵锐利，而街道略微淡入背景。心情友好、平静且迷人。风格是干净的、照片现实的生活方式摄影。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6atod6WIAAI5su.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-5db5e2",
      title: "金字塔前站立",
      titleEn: "金字塔前站立",
      description: "金字塔前站立",
      prompt: `上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）穿着纯棕色圆领毛衣和白色工装裤，自信地摆姿势，一只手塞进口袋，另一只手臂向下，在明亮的、晴朗的沙漠天空下，靠着吉萨大金字塔的背景。几只鸽子围绕着他飞行。自然、明亮的中午光。用佳能EOS R拍摄，85mm镜头，f/2.0，ISO 100。眼水平中等全身镜头，电影、黄金时段美学、超细节、编辑质量。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6aXjJpW4AA7imN.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-c256de",
      title: "卡帕多西亚醒来",
      titleEn: "卡帕多西亚醒来",
      description: "卡帕多西亚醒来",
      prompt: `土耳其卡帕多西亚日出时的梦幻肖像。背景中数十个热气球充斥天空。上传参考图像中的模特站在屋顶露台上，穿着棕色麂皮夹克和米色围巾，在风中飘扬。光线金色且柔和。用佳能EOS R5拍摄，佳能RF 70-200mm f/2.8L IS USM镜头在85mm，光圈f/2.8，ISO 400，快门速度1/320s。神奇氛围，温暖日出色调，旅行目标。从附带图像保持面部特征相同。
负面提示：卡通、插图、3D、素描、低分辨率、模糊、扭曲的脸、坏眼睛、不对称眼睛、多余肢体、缺失手指、变异手、坏解剖、丑陋、文字、水印、颗粒、噪音、过度饱和、年龄改变、面部修改、化妆、面具、米色高领毛衣。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6aNLOQWIAAKCwU.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-f4e530",
      title: "狗狗耳语秘密",
      titleEn: "狗狗耳语秘密",
      description: "狗狗耳语秘密",
      prompt: `超现实的电影低调中等肖像，一只狗将它的吻部压在主体的耳朵上，仿佛在低语秘密；狗抬起一只前爪覆盖自己的嘴，强调秘密。主体保持静止，直视镜头，眼睛睁大，眉毛轻轻抬起，给出自然、现实的震惊或惊讶的表情，同时完全保留他们的确切面部结构。两者都框在纯黑色背景上。主体从胸部向上可见，穿着纯黑色短袖衬衫。
使用提供的自拍确切的脸——无编辑、无修饰、无平滑。狗必须复制附带于提示的那个，匹配它的标记、比例和现实毛纹理。照明装置：相机左侧45°的柔和主光，带有大型扩散器，对侧柔和填充–1.5档，后方微妙轮廓光用于边缘分离，所有平衡在5200K。相机：全画幅机身，85 mm镜头在~1.5 m距离，f/2，1/125 s，ISO 200，白平衡5200K，Rec.709配置文件，眼-AF锁定在最近的人眼上。框架：中等肖像（胸部向上），垂直方向，主体略微偏中。后期：高动态范围、自然皮肤纹理和现实毛细节，无美容滤镜`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6aErM8XgAAjeeU.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-497a2d",
      title: "激流漂流",
      titleEn: "激流漂流",
      description: "激流漂流",
      prompt: `一个超现实的广角自拍照片，上传参考图像中附带的男人（附带照片中，100%保留脸部）在快速流动的白水激流中漂流。这个人穿着亮红色救生衣和安全头盔，用双手拿着桨。他的头发从头盔下流出，她脸上有欢乐和冒险的表情。救生衣和安全装备的带子清晰可见在她周围。下面和后面，可充气船在泡沫激流中弹跳，周围是岩石河岸和郁郁葱葱的绿色树木，在晴朗的蓝天下`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6YnKxvXQAAlklt.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-75d551",
      title: "自信坐姿",
      titleEn: "自信坐姿",
      description: "自信坐姿",
      prompt: `使用上传的脸部图像作为严格锁定的身份参考，保留确切的面部特征、比例、皮肤纹理、自然头发和面部表情从上传的脸部图像。将样式、服装、配饰、姿势、道具、背景元素、照明、相机设置和氛围精确应用如参考照片所示。坐在天鹅绒复古沙发上，在装饰丰富的沙龙中，他穿着极繁主义服装：生动图案的西装夹克，宽翻领，匹配宽裤，对比领巾，和宝石乐福鞋；彩色戒指和声明胸针完成外观。用mamiya rz67胶片相机和127 mm镜头在f/4，1/200 s在iso 400胶片上拍摄，确保深、饱和的颜色和精炼颗粒。从大型窗户和吊灯的柔和、扩散照明添加温暖，唤起gucci的华丽复古美学。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6Ye02qXAAA49sN.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-98231a",
      title: "科洛塞姆开始一天",
      titleEn: "科洛塞姆开始一天",
      description: "科洛塞姆开始一天",
      prompt: `一个高度电影化的旅行照片，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）在日出时平静地在罗马行走。他穿着锐利但放松的服装——浅亚麻衬衫、米色斜纹棉布裤和干净的白色运动鞋。他的衬衫在微风中轻轻移动。温暖的晨空中飞着数十只白鸽，一些还在鹅卵石地面上，添加自由感。前景中的一个大水洼反射男人、科洛塞姆和鸟类，创造清晰且平衡的构图。柔和的金色时段照明，温暖、梦幻的色调。广角视图、超细节、高清晰度、编辑旅行摄影风格。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6YQNFlWsAAMKQk.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-a5a7c1",
      title: "一级方程式赛车手",
      titleEn: "一级方程式赛车手",
      description: "一级方程式赛车手",
      prompt: `创建一个附带人的肖像，作为一级方程式赛车手在赛道上摆姿势，坐在经典法拉利赛车的侧面。
他穿着红色法拉利赛车服，肩部和手臂有黑色细节，覆盖着赞助商如红牛、壳牌、本田、甲骨文和BYBT。他拿着一个红色和白色头盔，带有法拉利标志和镜面护目镜，将它放在右膝上。汽车是历史一级方程式模型，红色，侧面和前端涂有数字16，RayBan和Santander标志，宽赛车轮胎，和带有IBM名称的黄色后翼。
设置是阳光明媚的赛道，浅蓝色天空和少量云彩。沥青平滑且红棕色，周围有绿色草地。在背景中，有低矮建筑、树木和稀疏植被，暗示经典欧洲赛道。他有宁静且自信的表情，身体略微向前倾，左臂放在膝上，右臂拿着头盔。
他穿着带有白色细节的黑色赛车靴和薄底。
自然照明突出汽车和赛车服的鲜艳红色，在表面上创造金属反射。图像风格现实且锐利，聚焦于司机和汽车，传达怀旧、速度和法拉利传统。
建议视觉风格（可选）：
现实摄影、超细节、8K分辨率、自然照明、浅景深、赛车氛围、法拉利遗产、编辑赛车肖像。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6Vx8qgXoAAuI_3.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-696c0a",
      title: "冬季工作室拍摄",
      titleEn: "冬季工作室拍摄",
      description: "冬季工作室拍摄",
      prompt: `一个电影冬季美容编辑肖像，一个女人戴着蓬松白色人造毛乌纱卡帽、露肩蓬松白色毛大衣、白色手套，以及层层叠叠的珍珠项链。柔和发光皮肤、光滑裸唇、轻微玫瑰色脸颊。框架中大雪——空中锐利雪花，一些前景/背景散景。深炭灰工作室背景。照明：相机左侧45°温暖主光，右侧柔和填充，微妙凉轮廓/背光使毛发光环和雪闪耀。手臂轻轻折叠，优雅姿势，自信目光略微偏离镜头。超现实、高端杂志外观，毛和珍珠的清晰微细节，8k照片现实，浅景深、光滑渐变、无苛刻阴影。垂直4:5构图，主体居中。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6VkCvmXAAAKEmd.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-4e5fb6",
      title: "领导哈士奇队伍",
      titleEn: "领导哈士奇队伍",
      description: "领导哈士奇队伍",
      prompt: `一个高角度、动作镜头，一支狗拉雪橇队在覆盖雪的路径上奔跑，通过光秃秃的森林。上传参考图像中附带的男人（保持参考图像中人物的面部100%准确），戴着黑色针织帽、黑色滑雪夹克、黑色裤子和白色手套，站在雪橇后部。他略微向前倾，带有强烈的、嘴巴张开的努力或兴奋表情。他戴着带有数字的比赛围兜，似乎是'20'。雪橇上有一个红色和黑色袋子或防水布。队伍由四只西伯利亚哈士奇组成，成对奔跑。两个领头狗，左侧一只黑白毛和醒目的浅蓝眼睛，右侧一只黑、白和灰毛，拉向前方，舌头伸出。第二对狗有灰白毛。所有四只狗都套着挽具并系在雪橇上，热情奔跑。路径被白色雪覆盖，周围树林充满高瘦、无叶树木。场景被自然光明亮照明，暗示晴天。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6Vb3XwW0AEtqvZ.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "vip-2daf57",
      title: "迪拜VIP俱乐部放松",
      titleEn: "迪拜VIP俱乐部放松",
      description: "迪拜VIP俱乐部放松",
      prompt: `一个超现实的16K肖像，上传参考中的男人，在迪拜VIP俱乐部中，保持参考照片中他的确切面部特征（无改变）。服装：三层潮流街头服饰外观：黑色羽绒夹克，带有白色全覆盖印花图形Supreme盒子标志连帽衫（黑色带红/白标志）军用迷彩工装裤，带有Off-White风格工业带 米色/奶油高帮运动鞋 场景：坐在天鹅绒沙发上，右手金色水烟管，左手酒杯，自信表情，金色/紫色霓虹照明，全景迪拜夜晚景观。风格：巅峰2010s潮流街头美学，混合奢侈街头品牌（Supreme、Off-White、Fear of God）与军用战术元素。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6VDQWZWYAA9q7W.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-b90626",
      title: "与海豚自拍",
      titleEn: "与海豚自拍",
      description: "与海豚自拍",
      prompt: `创建一个照片现实自拍，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）在开阔的海中。将男人的脸和身体匹配到上传的照片。他用一只手拿着手机，手臂伸出，对着镜头微笑。他戴着草帽、黑色太阳镜、明亮花卉夏威夷衬衫和白色T恤。
他在深蓝色水中漂浮，带有柔和波浪。一只海豚从他旁边的水中探出头，靠近镜头，仿佛在抢镜。海豚的皮肤光滑且反射，阳光下有明亮亮点。
在背景中，短距离后放置一艘白色豪华游艇。天空晴朗蓝色，明亮阳光。水反射闪耀。心情有趣且自然。风格是照片现实海洋旅行摄影。`,
      tags: ["自拍", "AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6UhuXvXYAA2Pqg.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-f8ab66",
      title: "捕蟹船上",
      titleEn: "捕蟹船上",
      description: "捕蟹船上",
      prompt: `一个肖像大小的高度细节照片图像，一个快乐的、上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）他戴着海军蓝针织帽、橙色连帽夹克和匹配橙色围兜裤子站在捕鱼船甲板上。他用双手握住一个巨大的、新鲜捕获的帝王蟹（Paralithodes camtschaticus）的身体。蟹巨大，带有粗糙、尖刺`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6UNwIUW0AAojzd.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-c44236",
      title: "欧洲晨间例行",
      titleEn: "欧洲晨间例行",
      description: "欧洲晨间例行",
      prompt: `一个超现实编辑街头时尚照片，上传参考图像中附带的男人（保持参考图像中人物的面部100%准确）拿着一个超大报纸在他面前，随意靠在宏伟且雄伟的新哥特式欧洲建筑前的黑色灯柱上，建筑有华丽尖塔和拱形窗户。
从戏剧性极端低角度地面广角视角拍摄，相机向上看强调。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6UBvSzWcAA7dQA.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-b31462",
      title: "遛六只斑点狗",
      titleEn: "遛六只斑点狗",
      description: "遛六只斑点狗",
      prompt: `创建一个照片现实奢侈时尚活动场景，上传参考图像中附带的男人遛六只斑点狗在高端城市公园中。男人的脸和身体应匹配上传的照片。
主体
一个自信、时尚的男人上传参考图像中附带的（保持参考图像中人物的面部100%准确）站在框架中心，用一只手放松握着六根狗绳。他穿着光滑米色调的奢侈设计师风衣，完美剪裁，带有锐利肩部和长直剪裁。风衣略微敞开。下面，他穿着精纺黑色高领毛衣。他的裤子是修身黑色正装裤，带有干净折痕。他的鞋子是光滑黑色皮靴。他的头发整洁且现代，匹配用户的上传照片。
六只斑点狗围绕他形成控制集群。他们的毛亮白带有锐利黑斑。他们的姿势优雅，几乎摆姿势，仿佛高端时尚编辑拍摄的一部分。
构图与相机角度
从中宽镜头从略低角度拍摄，给男人更高且更强大的外观。他站在路径中央。斑点狗围绕他以对称、杂志风格排列。走道直通远处，创造强透视线。路径两侧有修剪篱笆框住镜头。图像具有电影深度，背景柔和模糊。
动作
男人站着不动，略微低头，带有柔和微笑或微妙表情。他不像原始图像中大笑——这个版本保持平静、自信的奢侈色调。狗平静站立，一些转头，其他面向前方，像它们是风格化照片拍摄的一部分。
位置/环境
一个高级欧洲风格公园。干净铺设走道。修剪篱笆。保养良好的草地。背景中高树带有柔和雾蒙看。优雅黑色街灯排列路径。长椅出现在侧面但模糊。环境看起来精选且高端。
照明
柔和、扩散自然日光，像高端时尚编辑。微妙阴影落在狗后面。风衣具有光滑亮点。高领柔和吸收光。靴子反射控制、光滑光泽。无苛刻光——一切平衡且优雅。
色彩色调
柔和奢侈调色板：米色、黑色、白色、柔和绿色、灰雾。无强饱和。整体色彩色调精炼且极简主义。
深度/模糊
男人和斑点狗清晰且锐利。背景树木、灯和长椅淡入柔和模糊。水有光滑渐变。
心情
优雅、平静、自信、优质。感觉像奢侈品牌广告——优雅、干净且永恒。
风格
高端时尚编辑摄影。照片现实。光滑色调、抛光纹理、柔和电影深度。看起来像Burberry、Dior或Saint Laurent的活动。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6T4gnKWgAAVxSq.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-d21c6a",
      title: "掌控整个派对",
      titleEn: "掌控整个派对",
      description: "掌控整个派对",
      prompt: `创建一个照片现实场景，上传参考图像中的男人（保持脸100%准确）在拥挤的家庭派对上跳舞。将身体形状和基本外观匹配到上传的照片。
主体
一个年轻人带着强大能量跳舞。一只手臂高举，另一只手臂松散在侧面。他穿着酷升级服装：合身的黑色飞行员夹克，带有微妙光泽，干净黑色背心或敞开夹克显示胸部基于上传照片，修身黑色货运风格裤子带有金属拉链，以及厚底重型战斗靴。他还戴着反射霓虹光的深色太阳镜。头发保持整洁或扎回取决于上传图像。他的姿势略微前倾，弯腿，仿佛在节拍下降中。他的嘴巴张开宽笑。
人群与额外
在他周围添加许多人。靠近他的朋友群跳舞，其他人站在他们后面。一些人拿着饮料，一些大笑，一些用手机录制，一些欢呼。保持他们的脸自然但不分散。背景脸轻模糊以保持焦点在主要主体。
构图与相机角度
从直视角度的全身镜头。相机坐在腰高左右，真实派对地板感觉。他站在中心右侧。人填充背景和前景边缘。温暖木地板捕捉霓虹光的反射。
动作
他跳舞，手臂高举。围绕他的人移动、说话和跳舞。无排练。感觉像真实捕捉时刻。
环境
拥挤家庭派对在一个小房间。墙上有霓虹灯。蓝色和粉色LED条沿架子运行。左侧墙上发光霓虹标志。墙上有海报和框架。后方有一个饮料柜台，带有瓶子、冰桶和反射。
照明
混合照明：
左侧凉蓝和紫霓虹。
右侧温暖品红和柔和粉色。
低顶灯给出柔和亮点。
夹克有清晰反射。太阳镜捕捉霓虹辉光。靴子投射柔和阴影。皮肤色调保持自然但略微被彩色光染色。
色彩色调
粉色、蓝色、紫色和黑色色调混合。衣服保持深黑带有纹理。霓虹灯在场景中创造柔和辉光。
深度与模糊
主要主体保持锐利。更远的人有温和模糊。近脸有温和深度柔和。背景灯有柔和辉光和光绽放。
心情
能量、忙碌、有趣、响亮的家庭派对氛围。捕捉中运动。
风格
高端照片现实电影外观。轻颗粒。自然阴影。霓虹反射。看起来像用35mm相机拍摄的真实派对照片。`,
      tags: ["AI生成"],
      source: "@NanoBanana_labs",
      previewImage: "https://pbs.twimg.com/media/G6TtNQnXUAAlfsw.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-79db0a",
      title: "儿童涂色页插画",
      titleEn: "儿童涂色页插画",
      description: "儿童涂色页插画",
      prompt: `一张黑白线描涂色插画，适合直接打印在标准尺寸（8.5x11英寸）的纸张上，无纸张边框。整体插画风格清新简洁，使用清晰流畅的黑色轮廓线条，无阴影、无灰阶、无颜色填充，背景纯白，便于涂色。
【同时为了方便不会涂色的用户，请在右下角用小图生成一个完整的彩色版本供参考】
适合人群：【6-9岁小朋友】
画面描述：
【一只独角兽在森林的草地上漫步，阳光明媚，蓝天白云】`,
      tags: ["插画", "AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/77d141c0b20a88c50ae0f517d829f92e0743f32220e023b795eba354669d6167/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d76566f56516b367256514246326247554d47664f722e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-7ccb6f",
      title: "Q版可爱俄罗斯套娃",
      titleEn: "Q版可爱俄罗斯套娃",
      description: "Q版可爱俄罗斯套娃",
      prompt: `把图片人物生成变成 Q 版可爱俄罗斯套娃🪆，大到小一共五个，放在精致的木桌上，横幅3:2比例`,
      tags: ["Q版", "AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/0a83915cad66e1b1f35aed3e0e0a65addaa92c82be9373b4df115ed458114b11/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f34332f6578616d706c655f6d617472796f73686b615f706561726c5f65617272696e672e706e67",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-78eb7d",
      title: "3D 全家福婚纱照",
      titleEn: "3D 全家福婚纱照",
      description: "3D 全家福婚纱照",
      prompt: `将照片里的转换成Q版 3D人物，父母婚礼服饰，孩子是美丽的花童。 父母，西式婚礼服饰，父亲礼服，母亲婚纱。孩子手捧鲜花。 背景是五彩鲜花做的拱门。 除了人物是3D Q版，环境其他都是写实。整体放在一个相框里。`,
      tags: ["3D", "AI生成"],
      source: "@balconychy",
      previewImage: "https://camo.githubusercontent.com/1f0fae059d027f42d34cf2832eb804d73431e1e98ec118a01395e4ba6f8817a8/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d5a6848674b6b727951655f653632674a794d706a382e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-7374c1",
      title: "3D Q版情侣水晶球",
      titleEn: "3D Q版情侣水晶球",
      description: "3D Q版情侣水晶球",
      prompt: `将附图中的人物转换成水晶球场景。整体环境：水晶球放在窗户旁桌面上，背景模糊，暖色调。阳光透过球体，洒下点点金光，照亮了周围的黑暗。水晶球内部：人物是可爱Q版3D造型，相互之间满眼的爱意。`,
      tags: ["3D", "Q版"],
      source: "@balconychy",
      previewImage: "https://camo.githubusercontent.com/e99ef2df7acf4c797fadaba52718b901e2634460ac545482fe91b27f9fa62fec/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f34322f6578616d706c655f33645f715f736e6f77676c6f62655f636f75706c652e706e67",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-798715",
      title: "全家福婚纱照Q版转换",
      titleEn: "全家福婚纱照Q版转换",
      description: "全家福婚纱照Q版转换",
      prompt: `将照片里的转换成Q版 3D人物，父母婚礼服饰，孩子是美丽的花童。父母，西式婚礼服饰，父亲礼服，母亲婚纱。孩子手捧鲜花。背景是五彩鲜花做的拱门。除了人物是3D Q版，环境其他都是写实。整体放在一个相框里。`,
      tags: ["Q版", "AI生成"],
      source: "@balconychy",
      previewImage: "https://camo.githubusercontent.com/3fb5da55ac7d69ecaeb5ffb1c2faba189479a5f43b06dea7e42f0cdb16e8ed42/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33332f6578616d706c655f66616d696c795f77656464696e675f70686f746f5f712e706e67",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-b11a3f",
      title: "《泰坦尼克号》模仿",
      titleEn: "《泰坦尼克号》模仿",
      description: "《泰坦尼克号》模仿",
      prompt: `将附图中的人物转换成可爱Q版3D造型
场景：在豪华游轮最顶尖的船头，船头是尖的。
男士带着女士站在泰坦尼克号船头，男士双手搂着女士的腰，女士双臂伸展穿着连衣裙，迎着风，脸上洋溢着自由与畅快。
此时天色呈现出黄昏的暖色调，大海在船下延展。
除了人物用Q版3D造型以外，其他环境都是实物。`,
      tags: ["AI生成"],
      source: "@balconychy",
      previewImage: "https://camo.githubusercontent.com/5d29d42b32f595ff9ae827149d4fc057e99488ec9e777dc2f78eefa761a04167/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d70564470535231634c61366b376d6649626d6d4f352e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "ootd-1d0620",
      title: "名画人物OOTD",
      titleEn: "OOTD",
      description: "名画人物OOTD",
      prompt: `为图片人物生成不同职业风的OOTD，时尚穿搭和配饰，和人物色系一致的纯色背景，Q版 3d，c4d渲染，保持人脸特征，姿势都要保持一致，人物的比例腿很修长。构图：9:16。顶部文字：OOTD，左侧为人物ootd q版形象，右侧为穿搭的单件展示。先来第一个职业：时尚设计师`,
      tags: ["AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/d6a72c9c6f8ef4b074b05edf851d91a6d3a6ee654fd7091305ab1d9e565cf4b5/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f32392f6578616d706c655f706561726c5f65617272696e675f6f6f74642e706e67",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "p-2ce901",
      title: "扁平贴纸设计",
      titleEn: "扁平贴纸设计",
      description: "扁平贴纸设计",
      prompt: `把这张照片设计成一个极简扁平插画风格的Q版贴纸，厚白边，保留人物特征，风格要可爱一些，人物要超出圆形区域边框，圆形区域要为纯色不要3d感，透明背景。`,
      tags: ["设计", "AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/34be2f188d2d9b0d1f406d790ec7ad9fa1db2e095bb43cc3d34bd5886f25536e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f32382f6578616d706c655f666c61745f737469636b65725f706561726c5f65617272696e672e706e67",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-c1381d",
      title: "Q版表情包制作",
      titleEn: "Q版表情包制作",
      description: "Q版表情包制作",
      prompt: `创作一套全新的 chibi sticker，共六个独特姿势，以用户形象为主角：
1. 双手比出剪刀手，俏皮地眨眼；
2. 泪眼汪汪、嘴唇微微颤动，呈现可爱哭泣的表情；
3. 张开双臂，做出热情的大大拥抱姿势；
4. 侧卧入睡，靠着迷你枕头，带着甜甜的微笑；
5. 自信满满地向前方伸手指，周围点缀闪亮特效；
6. 手势飞吻，周围飘散出爱心表情。
保留 chibi 美学风格：夸张有神的大眼睛、柔和的面部线条、活泼俏皮的短款黑色发型、配以大胆领口设计的白色服饰，背景使用充满活力的红色，并搭配星星或彩色纸屑元素进行装饰。周边适当留白。
Aspect ratio: 9:16`,
      tags: ["Q版", "AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/7ac18e599a35eba0e9691633130e689c83ae6623d38baff293521fc4a85d2cc1/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d7a3156305a55566f386f6d626b2d4f443134496e4e2e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "funko-pop-501095",
      title: "Funko Pop公仔制作",
      titleEn: "Funko Pop",
      description: "Funko Pop公仔制作",
      prompt: `把照片中的人物变成 Funko Pop 公仔包装盒的风格，以等距视角（isometric）呈现，并在包装盒上标注标题为"JAMES BOND"。包装盒内展示的是照片中人物形象，旁边搭配有人物的必备物品（手枪、手表、西装、其他）同时，在包装盒旁边还应呈现该公仔本体的实物效果，采用逼真的、具有真实感的渲染风格。`,
      tags: ["AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/da84e6bb2aa563892aaf37d5c824abd5325d4224231f530dc78c025fb1f0ce02/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d6a437534756d4b5f66356e586d49624a43586838552e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-1a7d39",
      title: "Q版角色表情包制作",
      titleEn: "Q版角色表情包制作",
      description: "Q版角色表情包制作",
      prompt: `请创作一套以 [参考图片中的角色] 为主角的Q版表情包，共9个，排列成3x3网格。
设计要求：
- 透明背景。
- 1:1正方形构图。
- 统一的Q版吉卜力卡通风格，色彩鲜艳。
- 每个表情的动作、神态、内容各不相同，需要体现"骚、贱、萌、抓狂"等多样情绪，例如：翻白眼、捶地狂笑、灵魂出窍、原地石化、撒钱、干饭状态、社交恐惧发作等。可融入打工人和网络热梗元素。
- 每个表情形象完整，无残缺。
- 每个表情均带有统一的白色描边，呈现贴纸效果。
- 画面中无多余、分离的元素。
- 严格禁止出现任何文字，或确保文字内容准确无误（优先选择无文字）。`,
      tags: ["Q版", "AI生成"],
      source: "@leon_yuan2001",
      previewImage: "https://camo.githubusercontent.com/22abf72726920d35002e4036762f2202ca332d2055564e76dade4d2e6eebc8b5/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d624f39614531575976686f397843385845466954582e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-40afed",
      title: "二次元风格徽章",
      titleEn: "二次元风格徽章",
      description: "二次元风格徽章",
      prompt: `基于附件中的人物，生成一个二次元风格的徽章的照片，要求：
材质：流苏
形状：圆形
画面主体：一只手手持徽章`,
      tags: ["风格", "AI生成"],
      source: "@Alittlefatwhale",
      previewImage: "https://camo.githubusercontent.com/09dc9c6a5bc182d9a4f1d38668afd09cb1fb100436a1e9d2c476b2ea163b34fb/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d43612d35594a3436793461397373634e61785945752e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-1c7858",
      title: "3D Q版中式婚礼图",
      titleEn: "3D Q版中式婚礼图",
      description: "3D Q版中式婚礼图",
      prompt: `将照片里的两个人转换成Q版 3D人物，中式古装婚礼，大红颜色，背景“囍”字剪纸风格图案。 服饰要求：写实，男士身着长袍马褂，主体为红色，上面以金色绣龙纹图案，彰显尊贵大气 ，胸前系着大红花，寓意喜庆吉祥。女士所穿是秀禾服，同样以红色为基调，饰有精美的金色花纹与凤凰刺绣，展现出典雅华丽之感 ，头上搭配花朵发饰，增添柔美温婉气质。二者皆为中式婚礼中经典着装，蕴含着对新人婚姻美满的祝福。 头饰要求： 男士：中式状元帽，主体红色，饰有金色纹样，帽顶有精致金饰，尽显传统儒雅庄重。 女士：凤冠造型，以红色花朵为中心，搭配金色立体装饰与垂坠流苏，华丽富贵，古典韵味十足。`,
      tags: ["3D", "Q版"],
      source: "@balconychy",
      previewImage: "https://camo.githubusercontent.com/7f61e4301bcbc9eb3a7dcbbe569ed2233690a754bf7c704116bee4a79447cf1d/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d784c734937614b347a7956576352774a34366132452e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-e7a995",
      title: "乐高人偶收藏展示",
      titleEn: "乐高人偶收藏展示",
      description: "乐高人偶收藏展示",
      prompt: `根据我上传的照片，生成一张纵向比例的照片，使用以下提示词：经典乐高人偶风格，一个微缩场景 —— 一只动物站在我身旁。这只动物的配色与我相匹配。请根据你对我的理解来创造这只动物（你可以选择任何你认为适合我的动物，不论是真实存在的，还是超现实的、幻想的，只要你觉得符合我的气质即可）。整个场景设定在一个透明玻璃立方体内，布景极简。微缩场景的底座是哑光黑色，配以银色装饰，风格简约且时尚。底座上有一块优雅雕刻的标签牌，字体为精致的衬线体，上面写着该动物的名称。底部设计中还巧妙融入了类似自然历史博物馆展示的生物学分类信息，以精细蚀刻的方式呈现。整体构图像是一件高端收藏艺术品：精心打造、策展般呈现、灯光细致。构图重在平衡。背景为渐变色，从深色到浅色过渡（颜色基于主色调进行选择）。`,
      tags: ["AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/cc9df32f0e08a8453b0b6868196e4ff16b75452235dadc8447b1a6b74b127ddf/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d2d4766547a64575162454d4c44694a69524c5a30542e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-bc7beb",
      title: "证件照",
      titleEn: "证件照",
      description: "证件照",
      prompt: `截取图片人像头部，帮我做成 2 寸证件照，要求： 1、白底 2、职业正装 3、正脸 4、完全保持人物面部特征一致，仅改变姿态与构图，面部依旧保留原有神态，只在角度和光线中体现变化，局部捕捉颧骨、眉毛、眼神、鼻子、嘴唇的细节 5、保留面部皮肤轻微瑕疵，不要过度磨皮`,
      tags: ["AI生成"],
      source: "LinuxDO@synbio",
      previewImage: "https://i.mji.rip/2025/09/04/5258e0b792acebf8096aa4da3462a952.png",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
  ],
};
