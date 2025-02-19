import type { StereoCardItem } from '@/types/StereoCard'
import type { TimelineTurntableItem } from '@/types/TimelineTurntable'

export const name = 'XCJ'
export const intro = '一个前端'

export const mottos = [
  '那些杀不死我们的，只会让我们更强大。',
  '我们飞得越高，在不会飞的人眼里，我们就显得越渺小。',
  '每个不曾起舞的日子，都是对生命的一种辜负。',
  '白昼之光，岂知夜色之深。',
  '其实人跟树一样，越是往高处走，它的根就越要伸向黑暗的地底。',
]

export const projects: StereoCardItem[] = [
  {
    name: '个人网站',
    logo: '/avatar.png',
    links: [
      { href: 'https://github.com/ixcj/website', content: '_GITHUB_', title: 'GitHub' },
    ],
    description: `这个网站是我展示个人作品和专业技能的数字名片，旨在为访客提供一个全面的了解我的平台。`,
    tags: [
      { content: '积极开发中', type: 'success' },
    ],
  },
  {
    name: '菜鸡音乐',
    logo: 'https://file.xcj.im/website/images/caiji-music-logo.png',
    links: [
      { href: 'https://github.com/ixcj/caiji-music', content: '_GITHUB_', title: 'GitHub' },
      { href: 'https://music.ixcj.cn', content: '_ARROW_UP_RIGHT_', title: '查看演示' },
    ],
    description: `菜鸡音乐是一款在线音乐应用，提供歌曲搜索、免费歌曲在线试听、MV播放等功能。`,
    tags: [
      { content: '不再维护', type: 'warning' },
    ],
  },
]

export const experiences: TimelineTurntableItem[] = [
  {
    date: [
      { year: 2020, month: 7 },
      { year: 2021, month: 12 }
    ],
    children: [
      {
        title: '标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 0.5],
      },
      {
        title: '标题2',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0.5, 1],
      },
    ],
  },
  {
    date: [
      { year: 2022, month: 1 },
      { year: 2022, month: 12 }
    ],
    children: [
      {
        title: '标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 0.5],
      },
      {
        title: '标题2',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0.5, 1],
      },
    ],
  },
  {
    date: [
      { year: 2023, month: 5 }, 
      'now'
    ],
    children: [
      {
        title: '标题',
        describe: `
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0, 0.5],
      },
      {
        title: '标题2',
        describe: `
        <div>描述</div>
        <div>描述</div>
        <div>描述</div>
        `,
        range: [0.5, 1],
      },
    ],
  },
]

export default {
  lang: 'zh-CN',
  language: '中',
  
  name,
  intro,
  mottos,
  title: `${name} · ${intro}`,
  description: `${name}的个人主页`,
  author: name,

  SectionText: {
    home: '首页',
    about: '关于',
    skills: '技能',
    project: '项目',
    experience: '经历',
  },

  SectionTitle: {
    home: '首页',
    about: '关于我',
    skills: '我的技能',
    project: '我的项目',
    experience: '我的经历',
  },

  projects: encodeURIComponent(JSON.stringify(projects)),

  experiences: encodeURIComponent(JSON.stringify(experiences)),

  contributionCalendar: 'GitHub 贡献日历',
}
