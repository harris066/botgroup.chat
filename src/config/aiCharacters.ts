// 首先定义模型配置
export const modelConfigs = [
  {
    model: "qwen-plus",
    apiKey: "DASHSCOPE_API_KEY",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  // 删掉原来用 ARK_API_KEY 的 deepseek-v3-250324 配置
  {
    model: "hunyuan-turbos-latest",
    apiKey: "HUNYUAN_API_KEY",   // 确保环境变量没有数字后缀
    baseURL: "https://api.hunyuan.cloud.tencent.com/v1"
  },
  {
    model: "doubao-1-5-lite-32k-250115", // 豆包
    apiKey: "ARK_API_KEY",
    baseURL: "https://ark.cn-beijing.volces.com/api/v3"
  },
  // 注释掉 ep-20250306223646-szzkw 那个多余的 deepseek 配置
  // {
  //   model: "ep-20250306223646-szzkw",
  //   apiKey: "ARK_API_KEY1",
  //   baseURL: "https://ark.cn-beijing.volces.com/api/v3"
  // },
  // 智谱和 Kimi 暂时注释掉，没有 Key
  // {
  //   model: "glm-4-air",
  //   apiKey: "GLM_API_KEY",
  //   baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  // },
  {
    model: "qwen-turbo",
    apiKey: "DASHSCOPE_API_KEY",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  {
    model: "deepseek-chat",      // 官方 DeepSeek，注意 baseURL
    apiKey: "DEEPSEEK_API_KEY",
    baseURL: "https://api.deepseek.com/v1"
  },
  // {
  //   model: "moonshot-v1-8k",
  //   apiKey: "KIMI_API_KEY",
  //   baseURL: "https://api.moonshot.cn/v1"
  // },
  {
    model: "ernie-3.5-128k",
    apiKey: "BAIDU_API_KEY",
    baseURL: "https://qianfan.baidubce.com/v2"
  }
] as const;
export type ModelType = typeof modelConfigs[number]["model"];

// ... AICharacter 接口保持不变 ...

export function generateAICharacters(groupName: string, allTags: string): AICharacter[] {
  return [
    // 调度器和游戏主持人不变...
    {
      id: 'ai0',
      name: "调度器",
      personality: "sheduler",
      model: modelConfigs[0].model,
      avatar: "",
      custom_prompt: `你是一个群聊总结分析专家，你在一个聊天群里，请分析群用户消息和上文群聊内容
      1、只能从给定的标签列表中选择最相关的标签，可选标签：“${allTags}”。
      2、请只返回标签列表，用逗号分隔，不要有其他解释, 不要有任何前缀。
      3、回复格式示例：文字游戏, 新闻报道, 娱乐`
    },
    {
      id: 'ai1',
      name: "游戏主持人",
      personality: "SpyMaster",
      model: modelConfigs[0].model,
      avatar: "/img/spymaster.jpg",
      custom_prompt: `你是一位谁是卧底游戏主持人，你当前在一个叫"${groupName}" 的聊天群里`,
      stages: [ /* ...保持原样... */ ]
    },
    {
      id: 'ai4',
      name: "元宝",
      personality: "yuanbao",
      model: "hunyuan-turbos-latest" as ModelType, // 直接字符串，避免索引错
      avatar: "/img/yuanbao.png",
      custom_prompt: `你是一个名叫"元宝"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["微信", "聊天", "新闻报道", "文字游戏", "娱乐", "信息总结"]
    },
    {
      id: 'ai5',
      name: "豆包",
      personality: "doubao",
      model: modelConfigs[3].model, // 注意：现在索引3是豆包，因为删掉了 deepseek 旧配置，需要确认索引
      // 更安全的方式：直接写 "doubao-1-5-lite-32k-250115"
      avatar: "/img/doubao_new.png",
      custom_prompt: `你是一个名叫"豆包"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["聊天", "文字游戏", "学生", "娱乐"]
    },
    {
      id: 'ai6',
      name: "千问",
      personality: "qianwen",
      model: modelConfigs[0].model, // qwen-plus
      avatar: "/img/qwen.jpg",
      custom_prompt: `你是一个名叫"千问"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["广告文案","分析数据","文字游戏","信息总结", "聊天"]
    },
    {
      id: 'ai7',
      name: "DeepSeek",
      personality: "deepseek-V3",
      model: "deepseek-chat" as ModelType, // 直接锁定
      avatar: "/img/ds.svg",
      custom_prompt: `你是一个名叫"DeepSeek"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理", "编程", "文字游戏", "数学", "信息总结", "聊天"]
    },
    // 智谱、Kimi 暂时注释
    {
      id: 'ai10',
      name: "文小言",
      personality: "baidu",
      model: "ernie-3.5-128k" as ModelType, // 直接写模型名，不依赖索引
      avatar: "/img/baidu.svg",
      custom_prompt: `你是一个名叫"文心一言"的硅基生命体，你当前在一个叫"${groupName}" 的聊天群里`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天"]
    },
    // 豆包家族的其他角色如果用到豆包模型，最好也改成直接写模型名，避免索引混乱
    { id: 'ai11', name: "豆沙", personality: "doubao", model: "doubao-1-5-lite-32k-250115" as ModelType, avatar: "/img/dousha.jpeg", custom_prompt: `...`, tags: [...] },
    // 其他豆包成员类似，我就不一一列出了，请参考下面说明
  ];
}
