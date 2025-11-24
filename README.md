# ✍️ 四季汉字笔画学习器

<div align="center">

**基于 Gemini AI 和 Hanzi Writer 的现代化交互式汉字练字应用**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 📖 项目简介

四季汉字笔画学习器是一款现代化的汉字学习工具，结合了动态笔画演示与 AI 智能释义功能。无论是中文学习者还是想要练习规范书写的用户，都能通过本应用掌握汉字的正确笔顺和深入了解汉字文化。

### ✨ 核心功能

- 🎨 **动态笔画演示** - 基于 Hanzi Writer，流畅展示汉字书写笔顺
- ✏️ **交互式描红练习** - 跟随笔画顺序进行实时描红，巩固记忆
- 🤖 **AI 智能释义** - 由 Google Gemini AI 提供详细的汉字解释、词源和用法
- 🎯 **即时反馈** - 实时加载和渲染，提供流畅的学习体验
- 📱 **响应式设计** - 适配多种屏幕尺寸，随时随地练习

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.0 | 前端框架 |
| TypeScript | 5.2 | 类型安全 |
| Vite | 5.1 | 构建工具 |
| Hanzi Writer | 3.5 | 汉字笔画动画库 |
| Google Gemini AI | 1.30 | AI 智能释义 |
| TailwindCSS | - | 样式设计 |

---

## 🚀 快速开始

### 前置要求

- Node.js (推荐 v18 或更高版本)
- npm 或 yarn
- Google Gemini API Key ([获取地址](https://ai.google.dev/))

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/luyidi-alt/四季汉字笔画学习器.git
cd 四季汉字笔画学习器
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

在项目根目录创建 `.env.local` 文件:

```env
GEMINI_API_KEY=你的_Gemini_API_密钥
```

4. **启动开发服务器**

```bash
npm run dev
```

5. **访问应用**

打开浏览器访问 `http://localhost:5173`

---

## 📂 项目结构

```
四季汉字笔画学习器/
├── components/                 # React 组件
│   ├── CharacterInfo.tsx       # 汉字信息展示组件
│   └── HanziWriterDisplay.tsx  # Hanzi Writer 画板组件
├── services/                   # 服务层
│   └── geminiService.ts        # Gemini AI 服务
├── App.tsx                     # 主应用组件
├── index.tsx                   # 入口文件
├── types.ts                    # TypeScript 类型定义
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

---

## 🎯 使用说明

1. **输入汉字**: 在输入框中输入任意单个汉字
2. **生成笔画**: 点击"生成笔画"按钮，系统将加载该汉字的笔画数据和 AI 释义
3. **演示笔画**: 点击"演示笔画"按钮，观看动态笔画顺序演示
4. **开始描红**: 点击"开始描红"按钮，进入交互式练习模式，跟随提示书写

---

## 🔧 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行代码检查 |

---

## 🌟 特性亮点

- **零配置启动**: 基于 Vite 的极速开发体验
- **类型安全**: 全面的 TypeScript 支持
- **AI 驱动**: 利用 Gemini AI 提供深度汉字文化解释
- **视觉优雅**: 现代化 UI 设计，专注学习体验
- **性能优化**: React 19 最新特性，流畅的动画渲染

---

## 📝 开发计划

- [ ] 支持多字词语的笔画学习
- [ ] 添加学习进度跟踪
- [ ] 支持自定义笔画速度和颜色
- [ ] 添加汉字笔画练习测验模式
- [ ] 支持语音朗读功能

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👤 作者

**四季 (Luyi)**

如有问题或建议，欢迎提交 Issue 或 Pull Request！

---

## 🙏 致谢

- [Hanzi Writer](https://hanziwriter.org/) - 提供优秀的汉字笔画动画库
- [Google Gemini](https://ai.google.dev/) - 提供强大的 AI 能力
- 所有为中文学习工具做出贡献的开发者们

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个 Star！**

Made with ❤️ by 四季

</div>
