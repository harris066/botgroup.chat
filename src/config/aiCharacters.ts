export const modelConfigs = [
  {
    model: "qwen-plus",
    apiKey: "DASHSCOPE_API_KEY",
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  {
    model: "doubao-1-5-lite-32k-250115",
    apiKey: "ARK_API_KEY",
    baseURL: "https://ark.cn-beijing.volces.com/api/v3"
  },
  {
    model: "deepseek-chat",
    apiKey: "DEEPSEEK_API_KEY",
    baseURL: "https://api.deepseek.com/v1"
  },
  {
    model: "ernie-3.5-128k",
    apiKey: "BAIDU_API_KEY",
    baseURL: "https://qianfan.baidubce.com/v2"
  }
] as const;

export type ModelType = typeof modelConfigs[number]["model"];

export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  model: ModelType;
  avatar?: string;
  custom_prompt?: string;
  tags?: string[];
}

export function generateAICharacters(groupName: string, allTags: string): AICharacter[] {
  return [
    {
      id: 'ai6',
      name: "千问",
      personality: "qianwen",
      model: "qwen-plus",
      avatar: "/img/qwen.jpg",
      custom_prompt: `你是千问，在群聊"${groupName}"中，请简短发言。`,
      tags: ["聊天"]
    },
    {
      id: 'ai5',
      name: "豆包",
      personality: "doubao",
      model: "doubao-1-5-lite-32k-250115",
      avatar: "/img/doubao_new.png",
      custom_prompt: `你是豆包，在群聊"${groupName}"中，请简短发言。`,
      tags: ["聊天"]
    },
    {
      id: 'ai7',
      name: "DeepSeek",
      personality: "deepseek",
      model: "deepseek-chat",
      avatar: "/img/ds.svg",
      custom_prompt: `你是DeepSeek，在群聊"${groupName}"中，请简短发言。`,
      tags: ["聊天"]
    },
    {
      id: 'ai10',
      name: "文小言",
      personality: "wenxin",
      model: "ernie-3.5-128k",
      avatar: "/img/baidu.svg",
      custom_prompt: `你是文小言，在群聊"${groupName}"中，请简短发言。`,
      tags: ["聊天"]
    }
  ];
}
