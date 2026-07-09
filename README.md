# AccTrims - 服装辅料外贸展示网站

专业服装辅料外贸展示网站，支持中/英/西/阿多语言切换，展示六大产品系列。

## 产品分类

- 🏷️ 吊牌 (Hang Tags)
- 🧵 织唛 (Woven Labels)
- 🎗️ 织带 (Woven Tape)
- 🔘 纽扣 (Buttons)
- 📦 飞机盒 (Mailer Boxes)
- 🛍️ 服装袋 (Garment Bags)

## 技术栈

纯静态 HTML/CSS/JS，无需服务器和数据库，可直接部署到任何静态托管服务。

## 快速开始

直接用浏览器打开 `index.html` 即可预览：

```bash
# Windows
start index.html

# macOS
open index.html

# 或使用任意本地服务器
npx serve .
```

## 部署

### GitHub Pages
1. Push 到 GitHub 仓库
2. Settings → Pages → 选择分支 → Save

### Cloudflare Pages
1. 连接 GitHub 仓库
2. 设置构建输出目录为根目录
3. 自动部署

### 虚拟主机
上传所有文件到 FTP 根目录即可。

## 表单配置

联系表单默认使用模拟提交。接入真实后端：

1. 注册 [Formspree](https://formspree.io)（免费）
2. 获取表单端点 ID
3. 修改 `js/form.js` 中的 `CONFIG.endpoint`：
   ```js
   endpoint: 'https://formspree.io/f/your-form-id',
   ```

## 自定义内容

### 替换产品图片
将实际产品图片放入 `images/products/` 目录，然后在 `js/main.js` 中修改产品卡片的图片引用。

### 修改联系方式
编辑 `index.html` 中的联系信息和 `locales/` 中的对应翻译。

### 添加新语言
参见 `locales/README.md`。

## 文件结构

```
accessories-website/
├── index.html              # 入口页面
├── css/
│   └── style.css           # 全局样式（响应式）
├── js/
│   ├── i18n.js             # 多语言系统
│   ├── router.js           # 路由系统
│   ├── form.js             # 表单处理
│   └── main.js             # 主逻辑 + 数据
├── locales/
│   ├── zh.json             # 中文翻译
│   ├── en.json             # 英文翻译
│   ├── es.json             # 西班牙语翻译
│   ├── ar.json             # 阿拉伯语翻译
│   └── README.md           # 多语言说明
├── images/
│   ├── favicon.svg
│   └── products/           # 产品图片（待添加）
└── README.md
```
