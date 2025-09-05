# 阿来个人网站 - 纯静态HTML

> 从放牛娃到技术总监的励志故事

## ⚡ 快速启动

这是一个**100%纯静态**的HTML网站，无需任何服务器或构建工具。

### 本地预览
```bash
# 方法1：Python
python3 -m http.server 8000

# 方法2：Node.js
npx http-server

# 方法3：直接双击 index.html
```

### 部署到任何地方
- 📁 直接上传所有文件到任何Web服务器
- 🚀 GitHub Pages、Vercel、Netlify等免费托管
- ☁️ 云存储（阿里云OSS、腾讯云COS等）

## 📧 飞书联系表单集成

网站集成了飞书消息推送，当有用户提交联系表单时会自动发送到您的飞书群聊。

### 5分钟设置步骤：

1. **创建飞书群聊机器人**
   - 飞书群聊 → 设置 → 群机器人 → 添加机器人 → 自定义机器人
   - 复制生成的Webhook URL

2. **配置网站代码**
   - 编辑 `js/feishu-webhook.js`
   - 第11行替换：`WEBHOOK_URL: '你的webhook地址'`

3. **测试功能**
   - 打开网站，按F12，在控制台输入：`FeishuWebhook.testConnection()`
   - 如果返回`true`且飞书群收到消息，说明设置成功！

**详细说明**: 参考 `飞书设置指南.md`

## 🛠️ 技术栈

- **纯HTML5** - 无框架依赖
- **原生CSS3** - 响应式设计，主题切换
- **原生JavaScript** - 动画、交互、国际化
- **飞书Webhook** - 联系表单消息推送

## 📱 功能特性

- ✨ **响应式设计** - 完美适配手机、平板、PC
- 🌙 **主题切换** - 支持亮色/暗色模式  
- 🌍 **多语言** - 中文简体/繁体/英文
- 📝 **博客系统** - 客户端渲染，无需数据库
- 💼 **作品展示** - SVG图标，动画效果
- 📧 **联系表单** - 飞书消息推送
- 🎯 **SEO优化** - 结构化数据，语义化标签

## 📂 文件结构

```
/
├── index.html              # 主页面
├── blog-detail.html        # 博客详情页
├── js/
│   ├── main.js             # 核心交互逻辑
│   ├── feishu-webhook.js   # 飞书集成
│   ├── i18n-complete.js    # 国际化翻译
│   ├── theme.js            # 主题切换
│   ├── blog-posts.js       # 博客内容
│   └── blog-loader.js      # 博客加载器
├── css/
│   ├── main.css            # 主样式
│   ├── responsive.css      # 响应式
│   ├── themes.css          # 主题样式
│   ├── animations.css      # 动画效果
│   └── ...                 # 其他样式文件
├── image/                  # 图片资源
└── 飞书设置指南.md         # 集成说明
```

## 🚀 部署建议

### GitHub Pages（推荐）
1. Fork此仓库
2. 启用Pages功能
3. 自动部署，免费域名

### Vercel（最快）
1. 导入项目到Vercel
2. 自动部署，CDN加速
3. 免费自定义域名

### Netlify（简单）
1. 拖拽文件夹到Netlify
2. 瞬间部署，表单处理
3. 免费HTTPS证书

## 🔧 自定义修改

### 修改个人信息
- 编辑 `index.html` 中的个人信息
- 替换 `image/` 文件夹中的头像和二维码
- 更新 `js/i18n-complete.js` 中的翻译内容

### 添加博客文章
- 编辑 `js/blog-posts.js`
- 按现有格式添加新文章

### 修改样式
- 主样式：`css/main.css`
- 响应式：`css/responsive.css`  
- 主题：`css/themes.css`

## 🛡️ 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 60+  
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 许可证

MIT License - 可自由使用、修改、分发

---

**作者**: 阿来（梁来养）  
**邮箱**: lianglaiyang@gmail.com  
**网站**: https://lianglaiyang.com