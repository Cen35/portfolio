# Cen 的个人作品集

清新自然、纸张拼贴风格的 React + TypeScript + Vite 个人作品集。包含关于我、技能、四个项目卡片、开发方式和联系区域，并加入轻量滚动出现、云层漂移、纸片悬浮与项目卡片动效。

## 本地运行

```bash
npm install
npm run dev
```

## 更新个人信息与项目链接

打开 `src/data/portfolio.ts`：

- 修改 `profile` 中的名字、介绍、GitHub 和邮箱。
- 把部署后的项目网址粘贴进对应项目的 `liveUrl`。
- 把 GitHub 仓库网址粘贴进 `repoUrl`。
- 修改 `public/projects` 中的图片可以更新项目截图。

## 部署

项目已经同时适配 Vercel 和 GitHub Pages。上传到一个独立 GitHub 仓库后：

- Vercel：导入仓库，Framework 选择 Vite，直接 Deploy。
- GitHub Pages：Settings → Pages → Source 选择 GitHub Actions。
