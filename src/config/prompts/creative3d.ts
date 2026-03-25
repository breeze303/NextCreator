import type { PromptCategory } from "../promptConfig";

// 3D立体模型与等距艺术类提示词
export const creative3dCategory: PromptCategory = {
  id: "creative3d",
  name: "3D立体艺术",
  nameEn: "3D & Isometric Art",
  icon: "Box",
  description: "3D立体模型、等距视图、微缩场景等创意效果",
  prompts: [
    {
      id: "split-view-3d",
      title: "3D分割视图渲染",
      titleEn: "Split View 3D Render",
      description: "创建一半真实一半线框的3D渲染图",
      prompt: `Create a high-quality, realistic 3D render of exactly one instance of the object: [Orange iPhone 17 Pro].
The object must float freely in mid-air and be gently tilted and rotated in 3D space (not front-facing).
Use a soft, minimalist dark background in a clean 1080×1080 composition.
Left Half — Full Realism
The left half of the object should appear exactly as it looks in real life
— accurate materials, colors, textures, reflections, and proportions.
This half must be completely opaque with no transparency and no wireframe overlay.
No soft transition, no fading, no blending.
Right Half — Hard Cut Wireframe Interior
The right half must switch cleanly to a wireframe interior diagram.
The boundary between the two halves must be a perfectly vertical, perfectly sharp, crisp cut line, stretching straight from the top edge to the bottom edge of the object.
No diagonal edges, no curved slicing, no gradient.
The wireframe must use only two line colors:
Primary: white (≈80% of all lines)
Secondary: a color sampled from the dominant color of the realistic half (<20% of lines)
The wireframe lines must be thin, precise, aligned, and engineering-style.
Every wireframe component must perfectly match the geometry of the object.`,
      tags: ["3D", "产品", "线框", "设计"],
      source: "@michalmalewicz",
      previewImage: "https://pbs.twimg.com/media/G7LmGCQWYAAfp47?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "usa-3d-diorama",
      title: "美国地标3D立体模型",
      titleEn: "USA 3D Diorama with Landmarks",
      description: "创建美国地标的等距3D立体模型",
      prompt: `Create a high-detail 3D isometric diorama of the entire United States, where each state is represented as its own miniature platform. Inside each state, place a stylized, small-scale 3D model of that state's most iconic landmark. Use the same visual style as a cute, polished 3D city diorama: soft pastel colors, clean materials, smooth rounded forms, gentle shadows, and subtle reflections. Each landmark should look like a miniature model, charming, simplified, but clearly recognizable. Arrange the states in accurate geographical layout, with consistent lighting and perspective. Include state labels and landmark labels in a clean, modern font, floating above or near each model.`,
      tags: ["3D", "地图", "地标", "立体模型"],
      source: "@DataExec",
      previewImage: "https://pbs.twimg.com/media/G7LGpq0XAAAxcIP?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "isometric-home-office",
      title: "3D等距居家办公室",
      titleEn: "3D Isometric Home Office",
      description: "创建居家办公室的3D等距视图",
      prompt: `Generate a 3D isometric colored illustration of me working from home, filled with various interior details. The visual style should be rounded, polished, and playful. --ar 1:1

[Additional details: a bichon frise and 3 monitors]`,
      tags: ["3D", "等距", "居家办公", "插画"],
      source: "@dotey",
      previewImage: "https://pbs.twimg.com/media/G7MEwTWWEAA1DkO?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "city-tallest-buildings",
      title: "城市最高建筑3D视图",
      titleEn: "City's Tallest Buildings 3D View",
      description: "创建城市最高建筑的迷你3D视图",
      prompt: `Present a clear, side miniature 3D cartoon view of [YOUR CITY] tallest buildings. Use minimal textures with realistic materials and soft, lifelike lighting and shadows. Use a clean, minimalistic composition showing exactly the three tallest buildings in Sopot, arranged from LEFT to RIGHT in STRICT descending height order. The tallest must appear visibly tallest, the second must be clearly shorter than the first, and the third must be clearly shorter than the second.
All buildings must follow accurate relative proportions: if a building is taller in real life, it MUST be taller in the image by the same approximate ratio. No building may be visually stretched or compressed.
Each building should stand separately on a thin, simple ceramic base. Below each base, centered text should display:
Height in meters — semibold sans-serif, medium size
Year built — lighter-weight sans-serif, smaller size, directly beneath the height text
Provide consistent padding, spacing, leading, and kerning. Write "YOUR CITY NAME" centered above the buildings, using a medium-sized sans-serif font.
 No building top should overlap or touch the text above.Use accurate architectural proportions based on real-world references.Maintain consistent camera angle and identical scale for each building model.
No forced perspective. Use straight-on orthographic-style rendering. Do not exaggerate or stylize size differences beyond proportional accuracy.

Use a square 1080×1080 composition.Use a clean, neutral background. Ensure no extra objects are present.`,
      tags: ["3D", "建筑", "城市", "信息图"],
      source: "@michalmalewicz",
      previewImage: "https://pbs.twimg.com/media/G7GOJ7WW4AAEsNE?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "miniature-swimming-pool",
      title: "微型游泳池立体模型",
      titleEn: "Miniature Swimming Pool Diorama",
      description: "超现实微型世界拼贴海报,将容器变成游泳池",
      prompt: `Surreal miniature-world collage poster featuring an oversized open blue Nivea-style tin repurposed as a whimsical swimming pool filled with glossy white "cream-water."
Tiny sunbathers float in pastel swim rings, lounge on miniature deck chairs, and slide into the cream pool from a small blue slide.
The background is a soft, warm, lightly textured countertop surface subtle marble or matte stone, evenly lit, no heavy veins or visual noise.
Keep the scene grounded with soft shadows beneath props and figures.
Surrounding the tin, keep the playful diorama elements: a small wooden deck with micro figures, pastel umbrellas, lounge chairs, and compact handcrafted accessories. Maintain the hovering pastel inflatables and plush cloud-like shapes, but ensure they feel like stylised decorative objects staged above the countertop.
Preserve the soft, high-saturation, toy-like aesthetic with plush textures, pastel gradients, glitter accents, playful doodles, magazine cut-out graphics, chaotic yet balanced layout, extremely artistic and visually engaging`,
      tags: ["微型", "游泳池", "立体模型", "超现实"],
      source: "@Salmaaboukarr",
      previewImage: "https://pbs.twimg.com/media/G7u3urdXEAA3R5K?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "christmas-ornament-3d",
      title: "圣诞装饰球3D角色",
      titleEn: "Christmas Ornament 3D Character",
      description: "将自己变成圣诞装饰球内的可爱3D角色",
      prompt: `A transparent Christmas bauble hanging by a red ribbon. Inside, a tiny diorama of the person from the reference reimagined as a cute 3d chibi character. He works at a mini futuristic AI desk with three glowing holo-screens showing neural networks and code. Add tiny plants, a mini coffee cup, soft desk lighting, floating UI icons, and snow-glitter at the base. Warm magical Christmas glow, cinematic reflections on glass, cozy high-end diorama aesthetic.

Cinematic lighting, shallow depth of field, soft reflections on the glass, ultra-polished materials, high detail, festive Christmas atmosphere. Whimsical, premium, and heartwarming.`,
      tags: ["圣诞", "装饰球", "3D", "Q版"],
      source: "@CharaspowerAI",
      previewImage: "https://pbs.twimg.com/media/G7vbusrWUAA8omH?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "urban-3d-led",
      title: "城市3D LED显示屏",
      titleEn: "Urban 3D LED Display",
      description: "在城市环境中创建大型L形3D LED屏幕场景",
      prompt: `An enormous L-shaped glasses-free 3D LED screen situated prominently at a bustling urban intersection, designed in an iconic architectural style reminiscent of Shinjuku in Tokyo or Taikoo Li in Chengdu. The screen displays a captivating glasses-free 3D animation featuring [scene description]. The characters and objects possess striking depth and appear to break through the screen's boundaries, extending outward or floating vividly in mid-air. Under realistic daylight conditions, these elements cast lifelike shadows onto the screen's surface and surrounding buildings. Rich in intricate detail and vibrant colors, the animation seamlessly integrates with the urban setting and the bright sky overhead.

----
scene description:
[An adorable giant kitten playfully paws at passing pedestrians, its fluffy paws and curious face extending realistically into the space around the screen.]`,
      tags: ["3D", "LED", "城市", "裸眼3D"],
      source: "@dotey",
      previewImage: "https://pbs.twimg.com/media/G7jPBxmXwAA7igN?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "floating-country-island",
      title: "漂浮国家岛屿",
      titleEn: "Floating Country Island Diorama",
      description: "创建特定国家形状的漂浮微型岛屿立体模型",
      prompt: `Create an ultra-HD, hyper-realistic digital poster of a floating miniature island shaped like [COUNTRY], resting on white clouds in the sky. Blend iconic landmarks, natural landscapes (like forests, mountains, or beaches), and cultural elements unique to [COUNTRY]. Carve "[COUNTRY]" into the terrain using large white 3D letters. Add artistic details like birds (native to [COUNTRY]), cinematic lighting, vivid colors, aerial perspective, and sun reflections to enhance realism. Ultra-quality, 4K+ resolution. 1080x1080 format.`,
      tags: ["国家", "岛屿", "3D", "立体模型"],
      source: "@TechieBySA",
      previewImage: "https://pbs.twimg.com/media/G75EwP0WkAEpIbm?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "novel-scene-poster",
      title: "小说场景3D海报",
      titleEn: "Novel Scene 3D Poster",
      description: "为小说或电影创建微型立体模型风格的3D海报",
      prompt: `Design a high-quality 3D poster for the movie/novel "[Name to be added]", first retrieving information about the movie/novel and famous scenes.

First, please use your knowledge base to retrieve information about this movie/novel and find a representative famous scene or core location. In the center of the image, construct this scene as a delicate axonometric 3D miniature model. The style should adopt DreamWorks Animation's delicate and soft rendering style. You need to reproduce the architectural details, character dynamics, and environmental atmosphere of that time.

Regarding the background, do not use a simple pure white background. Please create a void environment with faint ink wash diffusion and flowing light mist around the model, with elegant colors, making the image look breathable and have depth.

Finally, for the bottom layout, please generate Chinese text. Center the novel title with a font that matches the original style. Below the title, automatically retrieve and typeset a classic description or quote about this scene from the original work.`,
      tags: ["小说", "电影", "3D海报", "立体模型"],
      source: "@op7418",
      previewImage: "https://pbs.twimg.com/media/G7uUpDraQAAC1ty?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "perfectly-isometric",
      title: "完美等距摄影",
      titleEn: "Perfectly Isometric Photography",
      description: "创建碰巧完美等距的捕捉照片",
      prompt: `Make a photo that is perfectly isometric. It is not a miniature, it is a captured photo that just happened to be perfectly isometric. It is a photo of [subject].`,
      tags: ["等距", "摄影", "几何", "构图"],
      source: "@NanoBanana",
      previewImage: "https://pbs.twimg.com/media/G7qgKDPX0AAEGS9?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "movie-scene-poster",
      title: "影视剧场景3D海报",
      titleEn: "Movie Scene 3D Poster",
      description: "为影视剧或小说创建微型立体模型风格的3D海报",
      prompt: `请为影视剧/小说《需要添加的名称》设计一张高品质的3D海报,需要先检索影视剧/小说信息和著名的片段场景。

首先,请利用你的知识库检索这个影视剧/小说的内容,找出一个最具代表性的名场面或核心地点。在画面中央,将这个场景构建为一个精致的轴侧视角3D微缩模型。风格要采用梦工厂动画那种细腻、柔和的渲染风格。你需要还原当时的建筑细节、人物动态以及环境氛围,无论是暴风雨还是宁静的午后,都要自然地融合在模型的光影里。

关于背景,不要使用简单的纯白底。请在模型周围营造一种带有淡淡水墨晕染和流动光雾的虚空环境,色调雅致,让画面看起来有呼吸感和纵深感,衬托出中央模型的珍贵。

最后是底部的排版,请生成中文文字。居中写上小说名称,字体要有与原著风格匹配的设计感。在书名下方,自动检索并排版一句原著中关于该场景的经典描写或台词,字体使用优雅的衬线体。整体布局要像一个高级的博物馆藏品铭牌那样精致平衡。`,
      tags: ["电影", "小说", "3D海报", "场景"],
      source: "@op7418",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/movie_scene_poster.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "crystal-ball-story",
      title: "水晶球故事场景",
      titleEn: "Crystal Ball Story Scene",
      description: "水晶球内呈现迷你立体世界",
      prompt: `一枚精致的水晶球静静摆放在窗户旁温暖柔和的桌面上,背景虚化而朦胧,暖色调的阳光轻柔地穿透水晶球,折射出点点金光,温暖地照亮了四周的微暗空间。水晶球内部自然地呈现出一个以 {嫦娥奔月} 为主题的迷你立体世界,细腻精美而梦幻的3D景观,人物与物体皆是可爱的Q版造型,精致而美观,彼此之间充满灵动的情感互动。整体氛围充满了东亚奇幻色彩,细节极为丰富,呈现出魔幻现实主义般的奇妙质感。整个场景如诗如梦,华美而典雅,散发着温馨柔和的光芒,仿佛在温暖的光影中被赋予了生命。`,
      tags: ["水晶球", "3D", "场景", "奇幻"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/1a623fc0c48774dd44d9ac8749b5ecc2eb91f3b1911eb47f2bc58e08f0442491/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d7463504a594a71576853694c42742d4b4d6e7579442e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
{
      id: "p-874b20",
      title: "天气应用3D卡通界面",
      titleEn: "天气应用3D卡通界面",
      description: "天气应用3D卡通界面",
      prompt: `呈现一幅清晰、呈45°俯视角的等距迷你3D卡通场景，展现[城市]最具标志性的地标与建筑元素。采用细腻柔和的纹理搭配真实物理渲染(PBR)材质，配合自然柔和的光影效果。将实时天气条件无缝融入城市环境，营造身临其境的氛围。

构图简洁留白，使用纯色柔光背景。

在画面上方居中位置放置粗体大标题"[城市]"，其下方配显眼的天气图标，接着以小号文字显示日期，中号文字标注温度。所有文本需保持居中排版与统一间距，可轻微叠盖建筑顶部。

正方形画布尺寸1080×1080像素。

（关键要素说明：）
等距透视：采用45°斜俯视角呈现立体城市微缩景观
风格处理：卡通化建模配合PBR材质实现细腻质感
动态天气：根据实际数据渲染雨雪/晴空等天气特效
信息层级：标题>天气图标>日期温度的三段式排版
视觉平衡：建筑群与文字形成有机叠加又不喧宾夺主`,
      tags: ["3D", "AI生成"],
      source: "@ttmouse",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/weather_app_ui_3d.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-477d10",
      title: "城市天气蛋糕3D场景",
      titleEn: "城市天气蛋糕3D场景",
      description: "城市天气蛋糕3D场景",
      prompt: `在一个精致的圆形奶油蛋糕顶部，以清晰的 45° 俯视等距视角呈现 [城市名] 的微缩 3D 卡通城市场景，好像这座城市是放在蛋糕上的立体装饰。蛋糕完整可见，包括蛋糕顶部、边缘和部分侧面，底部有金色圆形蛋糕托盘。

将 [核心地标名] 放在画面正中央，体量明显大于其他建筑，成为整个画面的视觉焦点，其余城市地标围绕它环形排布，高度略低，形成从中心向外的层级感。

必须包含 [城市其他代表建筑列表，写 3–5 个即可]，以可爱但细节清晰易辨认的微缩风格绘制。蛋糕表面作为城市地面，周围点缀水果（草莓、蓝莓、橙片等）、巧克力碎和坚果碎。可以在蛋糕一侧切掉一块，露出内部分层结构，强化"好吃感"。

整个场景处于 [天气类型，例如：飘雪的冬日、雨夜、炎热晴天、海边微风天气]。天空和光线清晰表现这种天气，同时让天气以甜品的形式作用在蛋糕上：

[天气效果 1：例如"雪像糖霜覆盖在屋顶和蛋糕表面"]
[天气效果 2：例如"雨像糖浆和糖珠，形成光亮流动的质感"]
[天气效果 3：例如"阳光让奶油微微融化并产生柔和高光"]

使用柔和而精致的纹理、逼真的 PBR 材质，以及柔和、真实的光影效果，3D isometric，细节丰富。

在画面顶部中央，用大号加粗英文标题 "[CityName]"，其下方放置一个清晰的天气图标，再下面是日期（小号文字）和气温（中号文字）。所有文字须居中排列，间距统一，可以轻微与中央地标顶部产生叠加但不遮挡主要轮廓。整体构图干净、极简，背景为柔和纯色或轻微渐变。方图 1080x1080，高分辨率，超细节，soft lighting, global illumination, cinematic.`,
      tags: ["3D", "场景"],
      source: "@lxfater",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/city_weather_cake.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-4741c0",
      title: "3D皮克斯风格渲染",
      titleEn: "3D皮克斯风格渲染",
      description: "3D皮克斯风格渲染",
      prompt: `3D皮克斯风格渲染。一只戴着厚眼镜的橘猫正坐在电脑前疯狂敲代码，表情崩溃。它的电脑屏幕背后贴着一张显眼的便利贴，写着：“需求改了八百遍，甲方说还是第一版好”。桌子上散落的咖啡杯上印着：“代码写得好，头发掉得早”。背景是乱糟糟的服务器机房。`,
      tags: ["3D", "风格"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6NVP_YaUAEBvfA.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-2cfee1",
      title: "3D Q版大学拟人化形象",
      titleEn: "3D Q版大学拟人化形象",
      description: "3D Q版大学拟人化形象",
      prompt: `给 {西北工业大学} 画一个拟人化的3D Q版美少女形象，体现学校 {航空航天航海三航} 特色`,
      tags: ["3D", "Q版"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/a4ec79c77aa9d82a3ac05572963439535987464070ab3a0f18f05b6cf28a1484/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d4a6e687479666157524c4a34387079314673324c382e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-03a529",
      title: "透视3D出屏效果",
      titleEn: "透视3D出屏效果",
      description: "透视3D出屏效果",
      prompt: `超写实，从上往下俯视角拍摄，一个美丽的ins模特【安妮海瑟薇 / 见参考图片】，有着精致美丽的妆容和时尚的造型，站在一部被人托起的智能手机屏幕上，画面营造出强烈的透视错觉。强调女孩从手机中站出来的三维效果。她戴着黑框眼镜，穿着高街风，俏皮地摆着可爱的pose。手机屏幕被处理成深色地板，像是一个小舞台。场景使用强烈的强制透视（forced perspective）表现手掌、手机与女孩之间的比例差异。背景为干净的灰色，使用柔和室内光，浅景深，整体风格为超现实写实合成。透视特别强`,
      tags: ["3D", "AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://camo.githubusercontent.com/ff60c97d59ac8dcf08130db0dc8dc94f22222cee56f80800d4950e53170facd6/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d5a775834584a427a3542714d63764f585963656e302e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-a1212e",
      title: "微型立体场景移轴摄影",
      titleEn: "微型立体场景移轴摄影",
      description: "微型立体场景移轴摄影",
      prompt: `从上方俯瞰的超高细节迷你【Cyberpunk】景观，采用倾斜移轴鏡頭效果。场景中充满如玩具般的元素，全部以高解析度 CG 呈现。光线戏剧化，营造出大片的氛围，色彩鲜明，对比强烈，强调景深效果与拟真微观视角，使观者仿佛俯瞰一个玩具世界般的迷你现实，画面中包含大量视觉笑点与极具重复观看价值的细节设计`,
      tags: ["场景", "AI生成"],
      source: "@terry623",
      previewImage: "https://camo.githubusercontent.com/e10a8da63bb593ebe441a539072aee82de9a2a03dea0420002133fe0a23980eb/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d64346d7443793244755a6b32626b5869444d6f4f532e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-d289ff",
      title: "微型立体场景（孙悟空三打白骨精）",
      titleEn: "微型立体场景（孙悟空三打白骨精）",
      description: "微型立体场景（孙悟空三打白骨精）",
      prompt: `微型立体场景呈现，运用移轴摄影的技法，呈现出Q版【孙悟空三打白骨精】场景`,
      tags: ["场景", "AI生成"],
      source: "@dotey",
      previewImage: "https://github.com/JimmyLv/awesome-nano-banana/raw/main/cases/41/example_miniature_journey_west.png",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-25e13e",
      title: "柔和风格3D广告",
      titleEn: "柔和风格3D广告",
      description: "柔和风格3D广告",
      prompt: `一个柔和的3D卡通风格[品牌产品]雕塑，由光滑的粘土般纹理和鲜艳的柔和色彩制成，放置在简约的等距场景中，该场景与产品特性相得益彰，构图简洁，光线柔和，阴影微妙，产品徽标和三个词的口号清晰显示在下方。`,
      tags: ["3D", "风格"],
      source: "@op7418",
      previewImage: "https://camo.githubusercontent.com/d710da544912283c5f4da3e226e61b8ecd5b639442b98572a8df2593ee1decbb/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33372f70617374656c5f706f7765725f33645f6164732e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-3c6b96",
      title: "极简主义3D插画",
      titleEn: "极简主义3D插画",
      description: "极简主义3D插画",
      prompt: `画一个马桶：## 艺术风格简介：极简主义3D插画（Minimalist 3D Illustration）### 🎨 视觉元素（Visual Elements）#### 🟢 造型语言（Shape Language）- 圆润的边缘、平滑柔和的外形，采用简化几何造型。#### 🎨 色彩（Colors）- **主色调：** 柔和米色、浅灰色、暖橙色。- **强调色：** 暖橙色用于焦点元素。- **明暗处理：** 柔和渐变，平滑过渡，避免强烈的阴影和高光。#### 💡 光照（Lighting）- **类型：** 柔和、漫反射光照。- **光源方向：** 上方稍偏右。- **阴影风格：** 微妙且漫射，无锐利或高对比度的阴影。#### 🧱 材质（Materials）- **表面纹理：** 哑光、平滑的表面，带有微妙的明暗变化。- **反射性：** 低或无，避免明显的光泽。#### 🖼️ 构图（Composition）- **对象呈现：** 单一、居中的物体，周围留出大量负空间。- **视角：** 轻微倾斜视角，呈现适度的三维感，但无明显的景深效果。- **背景：** 纯色、低饱和度，与主体协调且不干扰视线。#### ✒️ 字体排版（Typography）- **字体风格：** 极简、无衬线字体。- **文字位置：** 左下角，尺寸小巧且不突出。- **字体颜色：** 灰色，与背景形成低对比度。#### 🖥️ 渲染风格（Rendering Style）- **技术手法：** 3D渲染，采用简化的低多边形风格。- **细节程度：** 中等细节，以形状和色彩为主，避免复杂纹理和细节。### 🎯 风格目标（Purpose）> 创建干净、美观的视觉效果，强调简洁、亲和和现代感。`,
      tags: ["3D", "插画"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/3652508db41807adb2fb9055856eb874eb67f8e82ad880ea1fbfb005d0e04340/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33362f6578616d706c655f6d696e696d616c6973745f33645f746f696c65745f7478742e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-51d0f3",
      title: "折叠式纸雕立体绘本",
      titleEn: "折叠式纸雕立体绘本",
      description: "折叠式纸雕立体绘本",
      prompt: `多层折叠式纸雕立体绘本，放在一张书桌上，背景纯净突出主题，绘本呈现出立体翻页书般的风格，比例为3:2横版。翻开的书页呈现【魔童版哪吒大战敖丙】的场景，所有元素皆可精细折叠组合，呈现出逼真细腻的纸张折叠质感；构图统一采用正面视角，整体视觉风格梦幻唯美，色彩缤纷绚丽，充满奇幻而生动的故事氛围。`,
      tags: ["AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/8bb13880a0cd25a353c4765d6b8310c5bf348914a9d06634328c8e77a9a69a40/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a616d657a2d626f6e646f732f617765736f6d652d677074346f2d696d616765732f63617365732f33322f33645f706170657263726166745f706f7075705f626f6f6b2e706e67",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-eafc85",
      title: "极简主义3D插画（JSON配置版）",
      titleEn: "JSON",
      description: "极简主义3D插画（JSON配置版）",
      prompt: `使用以下 JSON 配置文件生成一个马桶：
{
  "art_style_profile": {
    "style_name": "Minimalist 3D Illustration",
    "visual_elements": {
      "shape_language": "Rounded edges, smooth and soft forms with simplified geometry",
      "colors": {
        "primary_palette": ["Soft beige, light gray, warm orange"],
        "accent_colors": ["Warm orange for focal elements"],
        "shading": "Soft gradients with smooth transitions, avoiding harsh shadows or highlights"
      },
      "lighting": {
        "type": "Soft, diffused lighting",
        "source_direction": "Above and slightly to the right",
        "shadow_style": "Subtle and diffused, no sharp or high-contrast shadows"
      },
      "materials": {
        "surface_texture": "Matte, smooth surfaces with subtle shading",
        "reflectivity": "Low to none, avoiding glossiness"
      },
      "composition": {
        "object_presentation": "Single, central object displayed in isolation with ample negative space",
        "perspective": "Slightly angled, giving a three-dimensional feel without extreme depth",
        "background": "Solid, muted color that complements the object without distraction"
      },
      "typography": {
        "font_style": "Minimalistic, sans-serif",
        "text_placement": "Bottom-left corner with small, subtle text",
        "color": "Gray, low-contrast against the background"
      },
      "rendering_style": {
        "technique": "3D render with simplified, low-poly aesthetics",
        "detail_level": "Medium detail, focusing on form and color over texture or intricacy"
      }
    },
    "purpose": "To create clean, aesthetically pleasing visuals that emphasize simplicity, approachability, and modernity."
  }
}`,
      tags: ["3D", "插画"],
      source: "@0xdlk",
      previewImage: "https://camo.githubusercontent.com/2f92af00226c047c8a6af7d7fa71b7bffc866f30ae5678134b97fbf9a7bc4f60/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d466d6e58795f4649413374326f324a4d31416377372e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-a91c4c",
      title: "玩具盒中的国家立体模型",
      titleEn: "玩具盒中的国家立体模型",
      description: "玩具盒中的国家立体模型",
      prompt: `一张超写实的俯拍摄影作品，展示了一个米色纸板盒内的3D打印立体模型，盒盖由两只人手撑开。盒子内部展现了[国家名称]的微缩景观，包含标志性地标、地形、建筑、河流、植被以及大量微小精细的人物模型。该立体模型充满了鲜活且符合地理特征的元素，全部采用触感舒适、玩具般的风格，使用哑光3D打印纹理制作，并带有可见的打印层纹。在顶部，盒盖内侧用大号、色彩鲜艳的凸起塑料字母显示"[国家名称]"字样——每个字母颜色各异，均为亮色。光线温暖且具有电影感，突出了纹理和阴影，营造出一种真实感和魅力，仿佛观看者正在打开一个神奇的国家微缩版本。`,
      tags: ["AI生成"],
      source: "@TheRelianceAI",
      previewImage: "https://camo.githubusercontent.com/1215f2453257e121f2bfa0776ac7b3660740a279a05a0f2f117559939ab5ef5c/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d727a4d546f3838353478763348533368565338384d2e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "esc-2f00a6",
      title: "键盘ESC键帽微型立体模型",
      titleEn: "键盘ESC键帽微型立体模型",
      description: "键盘ESC键帽微型立体模型",
      prompt: `一个超写实的等距视角 3D 渲染图，展示了一个微型电脑工作空间，置于一个半透明的机械键盘键帽内，键帽特别放置在一块真实哑光表面的机械键盘的 ESC 键上。键帽内部，一个穿着舒适、有纹理连帽衫的小人坐在现代人体工学椅上，正专注地面对一块发光的超写实电脑屏幕工作。整个空间布满了逼真的微型科技配件：真实材质的台灯、带有反射效果的显示器、微小的扬声器格栅、缠绕的电缆以及陶瓷杯子。场景底部由土壤、岩石和苔藓构成，拥有照片级的材质质感和自然瑕疵。键帽内的光照模拟清晨自然阳光，投下柔和阴影与温暖光调；而键帽外部则受周围键盘环境的冷色调反射影响。"ESC"字样以微弱的磨砂玻璃效果蚀刻在半透明键帽顶部——根据视角不同，仅隐约可见。周围的按键如 F1、Q、Shift 和 CTRL均清晰可见，拥有真实材质纹理与光照。整体画面仿佛由高端手机相机拍摄，具备浅景深、完美白平衡与电影感细节。`,
      tags: ["AI生成"],
      source: "@egeberkina",
      previewImage: "https://camo.githubusercontent.com/9f0c33dd9099b066abdd4c0ac9576849e8e19aeef0abce2d7e7f68b0155d5f7f/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d4f6473416132526b67336555376162616b47664e5a2e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};
