import type { PromptCategory } from "../promptConfig";

// 超现实与概念艺术类提示词
export const creativeSurrealCategory: PromptCategory = {
  id: "creativeSurreal",
  name: "超现实艺术",
  nameEn: "Surreal & Conceptual Art",
  icon: "Sparkle",
  description: "超现实主义、特殊视觉效果、跨维度概念艺术",
  prompts: [
    {
      id: "recursive-image",
      title: "递归视觉效果",
      titleEn: "Recursive Visuals",
      description: "展示模型处理无限循环逻辑的能力(Droste效果)",
      prompt: `recursive image of an orange cat sitting in an office chair holding up an iPad. On the iPad is the same cat in the same scene holding up the same iPad. Repeated on each iPad.`,
      tags: ["递归", "创意", "Droste效果", "猫"],
      source: "@venturetwins",
      previewImage: "https://github.com/user-attachments/assets/f7ef5a84-e2bf-4d4e-a93e-38a23a21b9ef",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "torn-paper-art",
      title: "撕纸艺术效果",
      titleEn: "Torn Paper Art Effect",
      description: "在图片特定区域添加撕纸效果",
      prompt: `task: "edit-image: add widened torn-paper layered effect"

base_image:
  use_reference_image: true
  preserve_everything:
    - character identity
    - facial features and expression
    - hairstyle and anatomy
    - outfit design and colors
    - background, lighting, composition
    - overall art style

rules:
  - Only modify the torn-paper interior areas.
  - Do not change pose, anatomy, proportions, clothing details, shading, or scene elements.

effects:
  - effect: "torn-paper-reveal"
    placement: "across chest height"
    description:
      - Add a wide, natural horizontal tear across the chest area.
      - The torn interior uses the style defined in interior_style.

  - effect: "torn-paper-reveal"
    placement: "lower abdomen height"
    description:
      - Add a wide horizontal tear across the lower abdomen.
      - The torn interior uses the style defined in interior_style.

interior_style:
  mode: "line-art"
  style_settings:
    line-art:
      palette: "monochrome"
      line_quality: "clean, crisp"
      paper: "notebook paper with subtle ruled lines"`,
      tags: ["撕纸", "艺术", "编辑", "创意"],
      source: "@munou_ac",
      previewImage: "https://pbs.twimg.com/media/G7OpzpjbAAArAAS?format=jpg&name=900x900",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "ironing-wrinkles",
      title: "超现实熨斗去皱",
      titleEn: "Ironing Out Wrinkles",
      description: "用微型熨斗熨平皱纹的超现实抗衰老概念图",
      prompt: `{
  "prompt": "An award-winning, hyper-realist macro photograph in the style of high-concept editorial art. The image features an extreme close-up of an elderly woman's eye and cheekbone. A miniature, toy-like white and blue clothes iron is positioned on her skin, actively pressing down and ironing out deep wrinkles and crow's feet, leaving a streak of unnaturally smooth skin in its wake. A thin white cord trails organically across the texture of her face. The image demands microscopic clarity, capturing mascara clumps, skin pores, and vellus hairs. The lighting is an unforgiving, high-contrast hard flash typical of avant-garde fashion photography.",
  "subject_details": {
    "main_subject": "Elderly woman's face (Macro topography of aging skin)",
    "object": "Miniature white and blue iron with realistic plastic textures and a trailing cord",
    "action": "The iron is creating a visible, flattened path through the wrinkles"
  },
  "artistic_style": {
    "genre": ["Contemporary Pop-Surrealism", "Satirical Editorial", "Visual Metaphor"],
    "aesthetic": ["Maurizio Cattelan style", "Vivid Color", "Commercial Kitsch", "Tactile Realism"],
    "lighting": "Studio Ring Flash, High-Key, Hard Shadows, Glossy finish"
  },
  "mood": "Provocative, satirical, disturbingly pristine, humorous yet critical"
}`,
      tags: ["超现实", "抗衰老", "微型", "概念艺术"],
      source: "@egeberkina",
      previewImage: "https://pbs.twimg.com/media/G7b8YyVXQAALtxS?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "4:3" },
    },
    {
      id: "trans-dimensional-pour",
      title: "跨维度液体倾倒",
      titleEn: "Trans-Dimensional Liquid Pour",
      description: "物理世界的液体倾倒进数字屏幕的超现实场景",
      prompt: `{
  "meta": {
    "type": "Creative Brief",
    "genre": "Hyper-realistic Surrealism",
    "composition_style": "Composite Portrait"
  },
  "scene_architecture": {
    "viewpoint": {
      "type": "Photographic",
      "angle": "High-angle / Looking down",
      "framing": "Tight on central subject"
    },
    "dimensional_hierarchy": {
      "rule": "Scale disparity for surreal effect",
      "dominant_element": "iPhone 17 Pro Max (Super-scaled)",
      "subordinate_elements": ["Blue Book (Miniature)", "Pen (Miniature)"]
    }
  },
  "realm_physical": {
    "description": "The real-world environment surrounding the device.",
    "environment": {
      "surface": "Wooden table",
      "texture_attributes": ["rich grain", "tactile", "worn"]
    },
    "active_agent": {
      "identity": "Human Hand (Real)",
      "action": "Pouring"
    },
    "held_object": {
      "item": "Bottle",
      "state": "Chilled (visible condensation)",
      "contents": {
        "substance": "Water",
        "color": "Light Green",
        "state": "Liquid flow"
      }
    }
  },
  "realm_digital": {
    "description": "The content displayed on the screen.",
    "container_device": {
      "model": "iPhone 17 Pro Max",
      "state": "Screen ON"
    },
    "screen_content": {
      "subject_identity": "Person from reference image",
      "expression": "Happy / Smiling",
      "held_object_digital": {
        "item": "Drinking Glass",
        "initial_state": "Empty (waiting for pour)"
      }
    }
  },
  "surreal_bridge_event": {
    "description": "The interaction connecting the physical and digital realms.",
    "action_type": "Trans-dimensional Fluid Dynamics",
    "source": "Physical bottle contents",
    "destination": "Digital glass in screen"
  }
}`,
      tags: ["跨维度", "液体", "超现实", "手机"],
      source: "@YaseenK7212",
      previewImage: "https://pbs.twimg.com/media/G7Uz7jZXoAAGEV0?format=jpg&name=900x900",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "4:5" },
    },
    {
      id: "liquid-gold-dress",
      title: "液体黄金裙摆",
      titleEn: "Liquid Gold Dress",
      description: "高速摄影捕捉液体金色形成的裙摆",
      prompt: `A high-speed photograph of a dancer where her dress is formed entirely by splashing liquid gold. The liquid freezes in mid-air, creating intricate swirls and droplets that mimic fabric. Cinematic lighting, golden hour colors, luxurious and dynamic.`,
      tags: ["舞者", "液体", "黄金", "高速摄影"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6QsE-EacAIEfdJ.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "yin-yang-koi",
      title: "锦鲤太极图",
      titleEn: "Yin Yang Koi Fish",
      description: "两条锦鲤形成的太极图案",
      prompt: `两条锦鲤在水中游动,形成完美的阴阳太极图案。一条鱼由黑色的水墨烟雾组成,另一条由白色的发光光线组成。俯视视角,水面有涟漪。禅意,极简主义。`,
      tags: ["锦鲤", "太极", "水墨", "禅意"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6QuUsWacAArtgo.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "whale-in-clouds",
      title: "云海中的水鲸鱼",
      titleEn: "Water Whale in Clouds",
      description: "半透明水做的蓝鲸在云海中游动",
      prompt: `黄金时刻,一只巨大的、半透明的蓝鲸在洁白蓬松的云海中游动。鲸鱼的身体由海水构成,里面还可以看到游动的鱼群。阳光穿透水做的鲸鱼,折射出彩虹。画面超现实且宏伟壮观。`,
      tags: ["鲸鱼", "云海", "超现实", "彩虹"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6QvTkCacAATNjA.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "watermelon-pool",
      title: "西瓜游泳池",
      titleEn: "Watermelon Swimming Pool",
      description: "巨大西瓜变成游泳池的微缩场景",
      prompt: `一个巨大西瓜的剖面图。红色的果肉实际上是一个装满红色水的游泳池。黑色的西瓜籽是游泳圈。微缩的小人在西瓜皮上游泳和晒太阳。夏日氛围。`,
      tags: ["西瓜", "游泳池", "微缩", "夏日"],
      source: "@songguoxiansen",
      previewImage: "https://pbs.twimg.com/media/G6QxDHEacAIO_xc.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "shop-window-cartoon",
      title: "橱窗卡通倒影",
      titleEn: "Shop Window Cartoon Reflection",
      description: "创建站在橱窗旁边的照片,橱窗内显示卡通版本",
      prompt: `{
  "PROMPT": "Create a bright, high-end street-fashion photograph of the woman from the reference image, keeping her face, hair, body & outfit exactly the same. She stands outside a luxury toy-shop window, gently touching the glass. Inside the window display, place a full-height cartoon-style doll designed to resemble her—same features, hair, and outfit—transformed into a cute, big-eyed, stylized animated character. Crisp lighting, premium street-fashion look, realistic reflections, face unchanged.",
  "settings": {
    "style": "high-end street fashion",
    "lighting": "crisp and bright",
    "environment": "outside luxury toy-shop window",
    "subject": "woman from reference image",
    "focus": ["face", "hair", "body", "outfit"],
    "additional_elements": [
      {
        "type": "doll",
        "style": "cartoon-style, big-eyed, stylized",
        "location": "inside window display",
        "resemblance": "exact features, hair, outfit of woman"
      }
    ],
    "reflections": "realistic",
    "photorealism": true
  }
}`,
      tags: ["橱窗", "卡通", "倒影", "街拍"],
      source: "@xmiiru_",
      previewImage: "https://pbs.twimg.com/media/G7drMCfXkAAN3w0?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "conceptual-visualization",
      title: "概念可视化",
      titleEn: "Conceptual Visualization",
      description: "从特定职业或身份的视角来可视化一个事物",
      prompt: `How engineers see the San Francisco Bridge`,
      tags: ["概念", "可视化", "视角", "创意"],
      source: "Replicate",
      previewImage: "https://github.com/user-attachments/assets/761380fe-0850-49e2-8589-797f10b7cb8d",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
{
      id: "p-dd69a4",
      title: "剪影艺术",
      titleEn: "剪影艺术",
      description: "剪影艺术",
      prompt: `一个 [东方巨龙] 的基础轮廓剪影。背景为亮黄色，剪影为纯黑色实心填充。`,
      tags: ["AI生成"],
      source: "@umesh_ai",
      previewImage: "https://camo.githubusercontent.com/cb6e5f986b2031c8eb3953f29fa01733c18907ef1a2828e72674d9c28bbe5b2f/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d576e46454552544a4a626e4470636a4b64623335552e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-f42556",
      title: "磨砂玻璃后的虚实对比剪影",
      titleEn: "磨砂玻璃后的虚实对比剪影",
      description: "磨砂玻璃后的虚实对比剪影",
      prompt: `一张黑白照片，展示了一个[主体]在磨砂或半透明表面后的模糊剪影。其[部分]轮廓清晰，紧贴表面，与其余朦胧、模糊的身影形成鲜明对比。背景是柔和的灰色渐变色调，增强了神秘和艺术的氛围。`,
      tags: ["AI生成"],
      source: "@umesh_ai",
      previewImage: "https://camo.githubusercontent.com/39b333bbe057c8bfbbec026f843b2cfb9d7a399ae63eef6121839731786ecb0c/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d7044736142346f5f6f694e496a75645f6a357970702e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-19f5c0",
      title: "双重曝光",
      titleEn: "双重曝光",
      description: "双重曝光",
      prompt: `双重曝光，Midjourney 风格，融合、混合、叠加的双重曝光图像，双重曝光风格。一幅由 Yukisakura 创作的杰出杰作，展现了一个奇妙的双重曝光构图，将阿拉贡·阿拉松之子的剪影与生机勃勃春季里中土世界视觉上引人注目、崎岖的地貌和谐地交织在一起。沐浴阳光的松树林、山峰和一匹孤独的马穿过小径的景象从他身形的纹理中向外回响，增添了叙事和孤独的层次感。当简洁分明的单色背景保持着锐利的对比度时，美妙的张力逐渐形成，将所有焦点吸引到层次丰富的双重曝光上。其特点是阿拉贡剪影内部充满活力的全彩色方案，以及用情感的精确性描摹每个轮廓的清晰、刻意的线条。(Detailed:1.45). (Detailed background:1.4).`,
      tags: ["AI生成"],
      source: "rezzycheck",
      previewImage: "https://camo.githubusercontent.com/6e87a6abd6bce57d9e0e9fa763e8172920e3a99769b32314adcbe60f1dccb5a4/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d7557417442794a353434636452356e426a4d4d33482e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-0aa5fa",
      title: "超现实交互场景",
      titleEn: "超现实交互场景",
      description: "超现实交互场景",
      prompt: `一幅铅笔素描画，描绘了 [Subject 1] 与 [Subject 2] 互动的场景，其中 [Subject 2] 以逼真的全彩风格呈现，与 [Subject 1] 及背景的手绘素描风格形成超现实的对比。`,
      tags: ["场景", "AI生成"],
      source: "@umesh_ai",
      previewImage: "https://camo.githubusercontent.com/cd6872f458c49d960a9995a18d66d631fc7ca4c4725ffdde68c1ff3b631ee6b4/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d6e76414571617876736c446e2d703268434b62484e2e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-9af188",
      title: "云彩艺术",
      titleEn: "云彩艺术",
      description: "云彩艺术",
      prompt: `生成一张照片：捕捉了白天的场景，天空中散落的云彩组成了 [主体/物体] 的形状，位于 [地点] 的上方。`,
      tags: ["AI生成"],
      source: "@umesh_ai",
      previewImage: "https://camo.githubusercontent.com/48ab315960b037955aaa2349972ef99a880c791d9bcc1ada88692691e7b85538/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d75664b5152552d307a58586c4143745f415f444e642e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-891511",
      title: "创意丝绸宇宙",
      titleEn: "创意丝绸宇宙",
      description: "创意丝绸宇宙",
      prompt: `将 {❄️} 变成一个柔软的 3D 丝绸质感物体。整个物体表面包裹着顺滑流动的丝绸面料，带有超现实的褶皱细节、柔和的高光与阴影。该物体轻轻漂浮在干净的浅灰色背景中央，营造出轻盈优雅的氛围。整体风格超现实、触感十足且现代，传递出舒适与精致趣味的感觉。工作室灯光，高分辨率渲染。`,
      tags: ["创意", "AI生成"],
      source: "@ZHO_ZHO_ZHO",
      previewImage: "https://github.com/JimmyLv/awesome-nano-banana/blob/main/cases/66/example_silk_creation_universe.png?raw=true",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};
