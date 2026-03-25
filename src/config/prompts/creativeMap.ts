import type { PromptCategory } from "../promptConfig";

// 地图与地理创意类提示词
export const creativeMapCategory: PromptCategory = {
  id: "creativeMap",
  name: "地图创意",
  nameEn: "Map & Geographic Art",
  icon: "Map",
  description: "地图、地理坐标、城市艺术等创意表现",
  prompts: [
    {
      id: "us-food-map",
      title: "美国食物地图",
      titleEn: "US Map Made of Famous Foods",
      description: "用各州著名食物制作的美国地图",
      prompt: `create a map of the US where every state is made out of its most famous food (the states should actually look like they are made of the food, not a picture of the food). Check carefully to make sure each state is right.`,
      tags: ["地图", "食物", "创意", "美国"],
      source: "@emollick",
      previewImage: "https://pbs.twimg.com/media/G7I5dbiWwAAYOox?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "coordinate-visualization",
      title: "坐标可视化",
      titleEn: "Coordinate Visualization",
      description: "根据经纬度坐标生成特定地点和时间的场景",
      prompt: `35.6586° N, 139.7454° E at 19:00`,
      tags: ["坐标", "地点", "创意", "极简"],
      source: "Replicate",
      previewImage: "https://github.com/user-attachments/assets/8629b88a-b872-43e2-a19e-855542702ac2",
      nodeTemplate: { requiresImageInput: false, generatorType: "fast", aspectRatio: "16:9" },
    },
    {
      id: "coordinates-time-visualization",
      title: "时空坐标复现",
      titleEn: "Space-Time Coordinate Recreation",
      description: "根据地理坐标和时间重现特定场景",
      prompt: `创建 {地理坐标},{什么时候} 的图像`,
      tags: ["坐标", "时空", "地点", "极简"],
      source: "@MehdiSharifi",
      previewImage: "https://pbs.twimg.com/media/G6YkWY7WYAAvjeq.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: false, generatorType: "fast", aspectRatio: "16:9" },
    },
    {
      id: "city-art-poster",
      title: "城市海报艺术生成",
      titleEn: "City Art Poster",
      description: "为城市生成微型岛屿风格的艺术海报",
      prompt: `一张针对 [城市名称] 的城市渲染数字艺术海报。画面核心主体是一个漂浮在白云上方、形状像所选城市的并且占据画面大部分内容的微型岛屿。岛屿的形状与城市在地图上的形状相似,无缝融合城市独特的标志性地标、自然景观及文化元素。加入城市特有的鸟类、电影般的光影、鲜艳色彩、航拍视角和阳光反射效果,建筑不宜太多太密集。

岛屿展现历史与现代的无缝融合。一部分是该城市最具代表性的古代历史建筑;另一部分平滑过渡为城市的地标建筑和天际线景观。

岛屿漂浮浩瀚云海之上。云海采用该城市所在文化圈的传统艺术风格进行表现。

立体城市拼音或英文名的 3D 文字漂浮在微型岛屿的上方,这组文字像一个生态与文化共生的微缩生态装置。

在画面四周和主体周围,叠加一层极简、高雅、具有博物馆展板质感的信息排版层。主要检索相关的城市信息,主要信息使用经典的衬线字体,辅助数据可使用极细的极简无衬线体。在画面的角落,以类似古典地图集或高级杂志扉页的方式排版。用衬线体标注城市的地理坐标、别称或建城年份,以及当前的天气,作为装饰性的背景信息,整体排版留白极多,排版克制、干净、平衡,如同在欣赏一件珍贵的艺术品。

风格要求: Octane Render, C4D, Isometric City, Micro World, Living Ecosystem, 8k Resolution. DreamWorks style, 3D modeling, delicate, soft light projection.`,
      tags: ["城市", "海报", "3D", "艺术"],
      source: "@op7418",
      previewImage: "https://cdn.jsdelivr.net/gh/glidea/banana-prompt-quicker@main/images/city_art_poster.jpg",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "3:4" },
    },
    {
      id: "candy-crush-city-map",
      title: "糖果传奇风格城市",
      titleEn: "Candy Crush Style City Map",
      description: "糖果粉碎传奇风格的城市地图",
      prompt: `一张彩色、俏皮的2D地图,描绘[城市名称],风格如Candy Crush Saga,以城市标志性地标作为糖果启发的建筑、可爱gumdrop树木、licorice桥梁、粉彩道路和光泽水元素、浮云、生动卡通风格、俯视视图、儿童友好游戏美学、水平布局`,
      tags: ["糖果", "游戏", "城市", "卡通"],
      source: "@miilesus",
      previewImage: "https://pbs.twimg.com/media/Gusp34MXQAAut05.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "photo-book-magazine",
      title: "写真集风格杂志封面",
      titleEn: "Photo Book Style Magazine Cover",
      description: "创建充分利用9:16比例的写真集风格杂志封面,带精确坐标",
      prompt: `Create a beautiful, photo book style magazine cover that fully utilizes the 9:16 aspect ratio. Place the attached person at the precise coordinates of [latitude/longitude coordinate], seamlessly blending them into the scene as if they are sightseeing. Approach this task with the understanding that this is a critical page that will significantly influence visitor numbers. NEGATIVE: coordinate texts`,
      tags: ["杂志", "写真集", "封面", "旅行"],
      source: "@minchoi",
      previewImage: "https://pbs.twimg.com/media/G70ZJFCXcAAn3F2?format=jpg&name=medium",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "9:16" },
    },
{
      id: "p-58c6f5",
      title: "糖果粉碎传奇风格城市地图",
      titleEn: "糖果粉碎传奇风格城市地图",
      description: "糖果粉碎传奇风格城市地图",
      prompt: `一张彩色、俏皮的2D地图，描绘[城市名称]，风格如Candy Crush Saga，以城市标志性地标作为糖果启发的建筑、可爱gumdrop树木、licorice桥梁、粉彩道路和光泽水元素、浮云、生动卡通风格、俯视视图、儿童友好游戏美学、水平布局`,
      tags: ["风格", "AI生成"],
      source: "@miilesus",
      previewImage: "https://pbs.twimg.com/media/Gusp34MXQAAut05.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-6b9f83",
      title: "谷歌地图变身古代藏宝图",
      titleEn: "谷歌地图变身古代藏宝图",
      description: "谷歌地图变身古代藏宝图",
      prompt: `将图像转换为绘制在古老羊皮纸上的古代藏宝图。地图包含详细的元素，如海洋上的帆船、海岸线上的古老港口或城堡、通向标记宝藏地点的大"X"的虚线路径、山脉、棕榈树和装饰性的罗盘玫瑰。整体风格让人联想到旧时的海盗冒险电影。`,
      tags: ["AI生成"],
      source: "@umesh_ai",
      previewImage: "https://camo.githubusercontent.com/2b53ef31557db7f68efd49a9b95e6cf04e40863e7bfc5878ab654ec7056283fa/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d6a5058363570464c424d54767a56614367536a6c7a2e706e673f763d31",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "p-048343",
      title: "特色城市天气预报",
      titleEn: "特色城市天气预报",
      description: "特色城市天气预报",
      prompt: `以清晰的45°俯视角度，展示一个等距微缩模型场景，内容为[上海东方明珠塔、外滩]等城市特色建筑，天气效果巧妙融入场景中，柔和的多云天气与城市轻柔互动。使用基于物理的真实渲染（PBR）和逼真的光照效果，纯色背景，清晰简洁。画面采用居中构图，凸显出三维模型精准而细腻的美感。在图片上方展示"[上海 多云 20°C]"，并附有多云天气图标。`,
      tags: ["AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/9253d5b1312c7723cb62b2f0e889cb567cbc1175eb82a5d30895e8cb2b30f123/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d786c397a45753772335644584f5f4f5a474d3161372e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "p-df5373",
      title: "乐高城市景观",
      titleEn: "乐高城市景观",
      description: "乐高城市景观",
      prompt: `创建一幅高度精细且色彩鲜艳的乐高版上海外滩景象。前景呈现经典的外滩历史建筑群，用乐高砖块精致还原西式与新古典主义风格的建筑立面，包括钟楼、穹顶、柱廊等细节。乐高小人们正在沿江漫步、拍照、观光，街道两旁停靠着经典样式的乐高汽车。背景是壮观的黄浦江，以蓝色半透明乐高砖拼接，江面上有乐高渡轮和游览船。对岸的浦东陆家嘴高楼林立，包括东方明珠塔、上海中心、金茂大厦和环球金融中心，这些超现代乐高摩天大楼色彩丰富、造型逼真。天空为乐高明亮蓝色，点缀少量白色乐高积木云朵，整体呈现充满活力与现代感的视觉效果。`,
      tags: ["AI生成"],
      source: "@dotey",
      previewImage: "https://camo.githubusercontent.com/f95d2fab4d47abf6501175038b12d57649e46ff0599cb3ed96ae45bedde81eed/68747470733a2f2f626962696770742d617070732e636861747669642e61692f63686174696d672f67656d696e692d72657472792d4e632d7641686149487148697369637a69525551352e706e673f763d31",
      nodeTemplate: { requiresImageInput: false, generatorType: "pro", aspectRatio: "1:1" },
    },
  ],
};
