# 多语言支持说明 / Locales Guide

## 当前支持语言 / Supported Languages

| 代码 | 语言 | 状态 |
|------|------|------|
| `zh` | 中文 (Chinese) | ✅ 完整 |
| `en` | English | ✅ 完整 |
| `es` | Español (Spanish) | ⚠️ 部分翻译 |
| `ar` | العربية (Arabic) | ⚠️ 部分翻译 |

## 添加新语言 / Adding a New Language

1. 复制 `en.json` 为新文件，如 `fr.json`
   ```
   cp en.json fr.json
   ```

2. 翻译所有文本内容，保持 JSON 结构不变

3. 在 `js/i18n.js` 的 CONFIG 中添加新语言：
   ```js
   supportedLangs: ['zh', 'en', 'es', 'ar', 'fr'],
   langLabels: { ..., fr: 'Français' },
   langFlags: { ..., fr: '🇫🇷' }
   ```

4. 在 `index.html` 的语言下拉菜单中添加：
   ```html
   <li><a href="#" data-lang="fr">🇫🇷 Français</a></li>
   ```

## JSON 结构说明

所有语言包遵循相同的嵌套结构：
- `site` - 网站元信息
- `nav` - 导航栏
- `hero` - 首页横幅
- `about` - 关于我们
- `categories` - 产品分类
- `advantages` - 优势亮点
- `products` - 产品页面通用文本
- `filter` - 筛选标签
- `contact` - 联系我们
- `form` - 表单文本
- `inquiry` - 询价弹窗
- `footer` - 页脚
- `product_data` - 各产品详细数据（名称、描述、规格参数）
