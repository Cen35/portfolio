export type Project = {
  number: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  repoUrl: string
  accent: 'green' | 'blue' | 'rose' | 'gold'
}

export const profile = {
  name: 'Cen',
  role: '前端学习者 / Creative Developer',
  intro: '我在学习如何把想法变成清晰、好用，也有一点温度的网页。这里收集了我一路完成的小工具与实践。',
  github: 'https://github.com/Cen35',
  email: '',
}

// 每部署好一个项目，把网址粘贴进对应的 liveUrl 引号中即可。
// repoUrl 是 GitHub 仓库地址；暂时没有时可以先留空。
export const projects: Project[] = [
  {
    number: '01',
    title: '轻舟待办',
    subtitle: 'Advanced Todo',
    description: '让复杂任务变得轻一点。支持分类、优先级、截止日期、组合筛选、搜索与完成率统计。',
    image: './projects/todo.png',
    tags: ['React', 'TypeScript', 'LocalStorage'],
    liveUrl: 'https://advanced-todo-steel.vercel.app',
    repoUrl: 'https://github.com/Cen35/advanced-todo',
    accent: 'green',
  },
  {
    number: '02',
    title: '墨记',
    subtitle: 'Markdown Notes',
    description: '在安静的左右分栏中书写与预览，支持笔记管理、搜索、自动保存和代码高亮。',
    image: './projects/markdown.png',
    tags: ['React Markdown', 'GFM', 'Highlight.js'],
    liveUrl: '',
    repoUrl: '',
    accent: 'gold',
  },
  {
    number: '03',
    title: '专注一刻',
    subtitle: 'Pomodoro Focus',
    description: '一次只做一件事。包含准确倒计时、自定义时长、提示音、通知与专注统计。',
    image: './projects/pomodoro.png',
    tags: ['Timer', 'Notification API', 'Responsive'],
    liveUrl: 'https://cen35.github.io/pomodoro-focus/',
    repoUrl: 'https://github.com/Cen35/pomodoro-focus',
    accent: 'rose',
  },
  {
    number: '04',
    title: '晴屿天气',
    subtitle: 'Weather Query',
    description: '一眼看懂今天和未来六天的天气，支持城市搜索、定位、收藏与友好错误提示。',
    image: './projects/weather.png',
    tags: ['Open-Meteo', 'Geolocation', 'Fetch API'],
    liveUrl: 'https://cen35.github.io/weather-query/',
    repoUrl: 'https://github.com/Cen35/weather-query',
    accent: 'blue',
  },
]
