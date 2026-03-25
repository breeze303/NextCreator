import type { PromptCategory } from "../promptConfig";

// 照片编辑类提示词
export const photoEditingCategory: PromptCategory = {
  id: "photo-editing",
  name: "照片编辑",
  nameEn: "Photo Editing & Restoration",
  icon: "ImagePlus",
  description: "智能扩图、人物移除和照片修复",
  prompts: [
    {
      id: "smart-outpainting",
      title: "智能扩图",
      titleEn: "Composition Rescue (Smart Outpainting)",
      description: "通过智能生成匹配的场景来扩展图片比例",
      prompt: `Zoom out and expand this image to a 16:9 aspect ratio (computer wallpaper size). Context Awareness: Seamlessly extend the scenery on both left and right sides. Match the original lighting, weather, and texture perfectly. Logical Completion: If there are cut-off objects (like a shoulder, a tree branch, or a building edge) on the borders, complete them naturally based on logical inference. Do not distort the original center image.`,
      tags: ["扩图", "壁纸", "编辑", "16:9"],
      source: "WeChat Article",
      previewImage: "https://github.com/user-attachments/assets/cc8c4e87-fe0f-4b8a-a610-a6d55ed0294c",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "crowd-removal",
      title: "智能人物移除",
      titleEn: "Smart Crowd Removal",
      description: "移除背景中不需要的人物并用合理的纹理填充",
      prompt: `Remove all the tourists/people in the background behind the main subject. Intelligent Fill: Replace them with realistic background elements that logically fit the scene (e.g., extend the cobblestone pavement, empty park benches, or grass textures). Consistency: Ensure no blurry artifacts or 'smudges' remain. The filled area must have the same grain, focus depth, and lighting as the rest of the photo.`,
      tags: ["移除", "背景", "编辑", "旅游照片"],
      source: "WeChat Article",
      previewImage: "https://github.com/user-attachments/assets/bade2fb0-f7d8-4435-91d4-ad0b41819c9b",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "cctv-simulation",
      title: "CCTV监控风格模拟",
      titleEn: "Face Detection CCTV Simulation",
      description: "创建带有人脸检测的高角度CCTV监控画面",
      prompt: `Create a high angle CCTV surveillance shot using the uploaded image as the source. Detect every visible person in the image and automatically draw a white rectangular bounding box around each face. For the most prominent person, add a large zoom in inset: a sharp, enhanced close-up of their face displayed in a floating rectangular frame connected with a thin white line. Keep the main image slightly noisy and security camera like (soft grain, slight distortion, muted colors), while the zoom in face box should be clearer, brighter, and more detailed. No text, no timestamps, no overlays except the boxes and connecting line. Maintain the original scene layout, angle, and environment of the uploaded image.`,
      tags: ["CCTV", "监控", "人脸检测", "创意"],
      source: "@egeberkina",
      previewImage: "https://pbs.twimg.com/media/G673aBCWUAAFUGn?format=jpg&name=900x900",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "16:9" },
    },
    {
      id: "upscale-4k",
      title: "提高分辨率",
      titleEn: "Upscale to 4K",
      description: "将图片升级到4K分辨率",
      prompt: `将此图片升级到4K分辨率。`,
      tags: ["提高分辨率", "4K", "画质", "增强"],
      source: "@MehdiSharifi",
      previewImage: "https://pbs.twimg.com/media/G6WypOCW4AANo7H.jpg?format=jpg&name=large",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "1:1" },
    },
    {
      id: "extreme-wide-angle-phone-edit",
      title: "超广角鱼眼+手机屏幕替换",
      titleEn: "Extreme Wide Angle Phone Screen Replacement",
      description: "超广角/鱼眼镜头编辑并替换手机屏幕内容",
      prompt: `{
  "edit_type": "extreme_wide_angle_phone_edit",
  "source": {
    "_hint": "Base for editing the person, clothing, and atmosphere of the original image. No new characters allowed.",
    "mode": "EDIT",
    "preserve_elements": ["Person", "Face", "Hairstyle", "Clothing", "Environment style"],
    "change_rules": {
      "camera_angle": "Ultra-wide or fisheye lens (equivalent to 12-18mm)",
      "angle_options": [
        "Looking up from directly in front",
        "Looking down from directly in front",
        "Extreme low angle",
        "High angle",
        "Tilted composition"
      ],
      "perspective_effect": "Nearby objects are exaggerated, distant objects become smaller",
      "body_parts_close_to_camera": "Bring 1-3 body parts extremely close to the camera",
      "body_part_options": [
        "Hands",
        "Feet/shoes",
        "Knees/thighs",
        "Face",
        "Shoulders/chest"
      ],
      "pose_variety": [
        "Extending one hand/leg toward the camera",
        "Squatting or lying on stomach halfway",
        "Sitting on the ground or an object",
        "Lying on the ground with legs pointed at camera",
        "Leaning body sharply toward the camera",
        "Twisting body for dynamic pose"
      ]
    },
    "phone_handling": {
      "allowed": true,
      "grip_options": [
        "One-handed",
        "Two-handed",
        "Low angle",
        "High angle",
        "Tilted",
        "Sideways",
        "Close to chest",
        "Close to waist",
        "Casual grip"
      ],
      "screen_replacement": {
        "target": "Only the smartphone screen portion displayed in the image",
        "source": "Second reference image",
        "fitting_rules": "Strictly match the screen shape, no stretching or compression",
        "interface_rules": "No icons, status bars, or app borders; only display content from original image"
      }
    },
    "environment_consistency": {
      "location": "Maintain the same location as the original image",
      "lighting": "Maintain direction and intensity",
      "extension_rules": "Maintain the same buildings, walls, road markings, colors, materials, and lighting style"
    },
    "global_restrictions": [
      "No new characters allowed",
      "No changes to age or gender expression of person",
      "No clothing changes",
      "No changes to location type",
      "No text, logos, or watermarks added to image",
      "No illustration or anime style"
    ]
  }
}`,
      tags: ["鱼眼", "广角", "手机屏幕", "编辑"],
      source: "@qisi_ai",
      previewImage: "https://pbs.twimg.com/media/G7gEwj8bIAAcFM2?format=jpg&name=small",
      nodeTemplate: { requiresImageInput: true, generatorType: "pro", aspectRatio: "3:4" },
    },
  ],
};
