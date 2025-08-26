/**
 * 完整的国际化(i18n)系统
 * 支持简体中文、英文、繁体中文
 */

class I18nManager {
    constructor() {
        this.currentLang = this.getStoredLang() || this.getDefaultLang();
        this.translations = this.getAllTranslations();
        this.init();
    }
    
    init() {
        this.applyTranslations();
        this.bindLanguageSwitch();
    }
    
    getStoredLang() {
        return localStorage.getItem('language');
    }
    
    getDefaultLang() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
        }
        return 'zh-CN';
    }
    
    getAllTranslations() {
        return {
            'zh-CN': {
                // 导航
                nav: {
                    home: '首页',
                    journey: '我的故事',
                    about: '关于我',
                    skills: '技能',
                    portfolio: '作品集',
                    blog: '博客',
                    contact: '联系'
                },
                // Hero部分
                hero: {
                    name: '梁来养',
                    prefix: '我是',
                    tagline: '从大山深处的放牛娃，到引领AI时代的技术总监',
                    roles: ['工程师', '架构师', '技术总监', '团队领导者', '创业者', 'AI探索者'],
                    learnStory: '了解我的故事',
                    contactMe: '联系我',
                    yearsExp: '年经验',
                    projects: '项目',
                    techStack: '技术栈',
                    loading: '正在加载...'
                },
                // 人生历程
                journey: {
                    title: '人生历程',
                    subtitle: '每一步都是成长的印记',
                    periods: [
                        { year: '1980s', title: '山村童年', desc: '在广东山区，赤脚放牛的少年，贫困但充满梦想' },
                        { year: '1990s', title: '求学之路', desc: '翻山越岭上学，知识改变命运的信念在心中扎根' },
                        { year: '2000', title: '大学时光', desc: '广东工业大学，第一次接触计算机，开启技术人生' },
                        { year: '2004', title: '职业起点', desc: '加入广东电信，从基层做起，扎实技术功底' },
                        { year: '2015', title: '技术突破', desc: '加入唯品会，负责核心架构，支撑30万QPS' },
                        { year: '2017', title: '团队管理', desc: '带领团队攻坚，从技术到管理的转型' },
                        { year: '2020', title: '创新探索', desc: '深耕AI领域，探索技术边界' },
                        { year: '2023', title: 'AI创赢', desc: '创立AI创赢，让AI成为企业的超级员工' }
                    ]
                },
                // 关于我
                about: {
                    title: '关于我',
                    subtitle: '一个用代码改变命运的人',
                    subheading: '一个用代码改变命运的人',
                    description: '我是梁来养，一个从广东山区走出来的技术人。20多年的技术生涯，让我从一个赤脚放牛的山村少年，成长为今天的技术总监。我相信技术的力量，更相信坚持的价值。',
                    intro: '我是梁来养，一个从广东大山深处走出来的技术人。从赤脚放牛的少年，到如今的技术总监，这一路走来，靠的是对知识的渴望和永不放弃的精神。',
                    university: '在广东工业大学，我通过助学贷款和勤工俭学完成学业，获得国家励志奖学金和数学建模竞赛二等奖。毕业后，我与名校精英竞争，成功进入广东电信，后来在唯品会深耕技术，支撑起30万QPS的高并发系统。',
                    current: '现在，作为广州为伊科技的技术总监，我主导研发了AI创赢系统，致力于让AI成为企业的超级员工。同时，我也是一名大学老师，希望把知识和经验传递给更多人。',
                    timelineDates: {
                        highschool: '高中时代',
                        university: '大学时代',
                        present: '2023-至今'
                    },
                    idols: '人生偶像',
                    idolsList: [
                        { name: '王阳明', title: '心学大师', quote: '知行合一' },
                        { name: '曾国藩', title: '晚清名臣', quote: '修身治国，持之以恒' },
                        { name: '毛泽东', title: '伟大领袖', quote: '实事求是' },
                        { name: '稻盛和夫', title: '经营之圣', quote: '敬天爱人' }
                    ],
                    interests: '兴趣爱好',
                    interestsList: ['技术研究', '哲学思考', '文学阅读', '数学探索', '团队培养', '产品创新'],
                    achievements: '荣誉成就',
                    achievementsList: [
                        '🏆 国家励志奖学金',
                        '🥈 大学生数学建模竞赛二等奖',
                        '📜 高级项目管理师',
                        '💻 高级程序员',
                        '🤖 人工智能训练师'
                    ],
                    details: {
                        name: '姓名：',
                        nameValue: '梁来养',
                        age: '年龄：',
                        ageValue: '80后',
                        education: '学历：',
                        educationValue: '广东工业大学',
                        position: '职位：',
                        positionValue: '技术总监',
                        company: '公司：',
                        companyValue: '广州为伊科技有限公司',
                        interests: '兴趣：',
                        interestsValue: '文学、数学、玄学'
                    }
                },
                // 技能
                skills: {
                    title: '技术栈',
                    subtitle: '20+年技术积累，全栈开发能力',
                    expert: '专家级',
                    proficient: '精通',
                    skilled: '熟练',
                    backend: '后端开发',
                    frontend: '前端开发',
                    items: {
                        'Java': 'Java',
                        'Python': 'Python',
                        'Go': 'Go',
                        'React/Vue': 'React/Vue',
                        'AI/ML': 'AI/ML',
                        '架构设计': '架构设计',
                        '微服务': '微服务',
                        '数据库': '数据库',
                        'Redis': 'Redis',
                        '消息队列': '消息队列',
                        'DevOps': 'DevOps',
                        '团队管理': '团队管理',
                        '项目管理': '项目管理',
                        '产品思维': '产品思维'
                    }
                },
                // 作品集
                portfolio: {
                    title: '项目作品',
                    subtitle: '从0到30万QPS的技术进化',
                    filters: {
                        all: '全部',
                        ai: 'AI项目',
                        architecture: '架构',
                        enterprise: '企业级',
                        government: '政府项目'
                    },
                    projects: {
                        aichuangying: {
                            title: 'AI创赢 - 企业AI员工',
                            desc: '100%自主研发的AI智能体平台，让AI成为企业的超级员工与销冠团队。',
                            stats: ['🔥 原创自研', '📈 1000+企业客户']
                        },
                        vipshop: {
                            title: '唯品会开放平台',
                            desc: '支撑30万QPS高并发的开放平台，连接供应商、ISV服务商及开发者。',
                            stats: ['⚡ 30万QPS', '🌐 亿级用户']
                        },
                        telecom: {
                            title: '广东电信财务系统',
                            desc: '省级核心财务结算系统，承载千万用户的计费与结算，年处理资金超千亿。',
                            stats: ['💰 千亿级资金', '👥 千万用户']
                        },
                        osp: {
                            title: 'OSP分布式服务框架',
                            desc: '基于RPC实现的分布式服务框架，类似淘宝Dubbo，高可用高并发。',
                            stats: ['🔧 核心框架', '📊 高可用']
                        },
                        retail: {
                            title: '新零售数字中台',
                            desc: '打通线上线下全渠道，构建SBbCc网络生态。通过供应链数字化和私域运营，赋能品牌商、经销商和终端门店。',
                            stats: ['🏪 500+ 门店接入', '📊 全链路数字化']
                        },
                        yunnan: {
                            title: '一部手机云品荟',
                            desc: '云南省委、省政府指导下的重点项目。面向各类销售渠道提供名特优产品直供及供应链服务。',
                            stats: ['🏛️ 省级重点项目', '🌾 覆盖全省农产品']
                        }
                    },
                    learnMore: '了解更多',
                    tags: {
                        microservices: '微服务',
                        highConcurrency: '高并发',
                        workflow: '工作流',
                        govCooperation: '政企合作',
                        supplyChain: '供应链',
                        agriculture: '农产品',
                        circulationSystem: '流通体系',
                        microserviceArch: '微服务架构',
                        privateTraffic: '私域运营',
                        omniChannel: '全渠道',
                        storeAccess: '门店接入'
                    }
                },
                // 博客
                blog: {
                    title: '知识分享',
                    subtitle: '技术心得、管理经验、人生感悟',
                    categories: {
                        all: '全部',
                        tech: '技术文章',
                        management: '管理心得',
                        life: '人生感悟',
                        philosophy: '玄学探讨'
                    },
                    readMore: '阅读更多 →',
                    minRead: '分钟阅读',
                    posts: [
                        {
                            category: '人生感悟',
                            title: '从放牛娃到技术总监：我的20年技术成长之路',
                            excerpt: '分享我从零基础到技术专家的成长经历，以及路上的坎坷与收获...'
                        },
                        {
                            category: '管理心得',
                            title: '王阳明心学在技术管理中的应用',
                            excerpt: '知行合一的理念如何指导技术团队管理，打造高效能团队...'
                        },
                        {
                            category: '技术文章',
                            title: '从0到30万QPS：高并发架构演进实战',
                            excerpt: '从唯品会的实践经验出发，详解高并发系统的架构设计要点...'
                        }
                    ]
                },
                // 联系
                contact: {
                    title: '联系我',
                    subtitle: '让我们一起创造价值，赢得未来',
                    infoTitle: '联系方式',
                    infoSubtitle: '欢迎通过以下方式与我联系',
                    form: {
                        name: '您的姓名',
                        email: '邮箱地址',
                        subject: '主题',
                        message: '留言内容',
                        send: '发送消息'
                    },
                    info: {
                        email: '邮箱',
                        wechat: '微信',
                        wechatTip: '扫码添加微信',
                        clickToEnlarge: '点击查看大图',
                        clickToClose: '点击任意位置关闭'
                    }
                },
                // 页脚
                footer: {
                    about: '关于我',
                    aboutDesc: '从放牛娃到技术总监\n用代码改变命运，用知识创造未来',
                    quickLinks: '快速链接',
                    contact: '联系方式',
                    wechatScan: '微信扫码添加：',
                    copyright: '© 2024 梁来养. All rights reserved.'
                }
            },
            'en': {
                // Navigation
                nav: {
                    home: 'Home',
                    journey: 'My Story',
                    about: 'About',
                    skills: 'Skills',
                    portfolio: 'Portfolio',
                    blog: 'Blog',
                    contact: 'Contact'
                },
                // Hero Section
                hero: {
                    name: 'Liang Laiyang',
                    prefix: 'I am',
                    tagline: 'From a cowboy in the mountains to a tech leader in the AI era',
                    roles: ['Engineer', 'Architect', 'Tech Director', 'Team Leader', 'Entrepreneur', 'AI Explorer'],
                    learnStory: 'Learn My Story',
                    contactMe: 'Contact Me',
                    yearsExp: 'Years Exp',
                    projects: 'Projects',
                    techStack: 'Tech Stack',
                    loading: 'Loading...'
                },
                // Journey
                journey: {
                    title: 'Life Journey',
                    subtitle: 'Every step is a mark of growth',
                    periods: [
                        { year: '1980s', title: 'Rural Childhood', desc: 'A barefoot cowboy in Guangdong mountains, poor but full of dreams' },
                        { year: '1990s', title: 'Path to Education', desc: 'Walking miles to school, belief in knowledge changing destiny' },
                        { year: '2000', title: 'University Years', desc: 'GDUT, first encounter with computers, beginning of tech life' },
                        { year: '2004', title: 'Career Start', desc: 'Joined Guangdong Telecom, building solid technical foundation' },
                        { year: '2015', title: 'Tech Breakthrough', desc: 'Joined VIPShop, responsible for core architecture, supporting 300K QPS' },
                        { year: '2017', title: 'Team Management', desc: 'Leading teams, transformation from tech to management' },
                        { year: '2020', title: 'Innovation', desc: 'Deep dive into AI, exploring technology boundaries' },
                        { year: '2023', title: 'AI Chuangying', desc: 'Founded AI Chuangying, making AI the super employee for enterprises' }
                    ]
                },
                // About
                about: {
                    title: 'About Me',
                    subtitle: 'A person who changed destiny with code',
                    subheading: 'A person who changed destiny with code',
                    description: "I'm Liang Laiyang, a tech professional from Guangdong's mountainous region. Over 20 years in tech has transformed me from a barefoot cowboy to today's tech director. I believe in the power of technology and the value of persistence.",
                    intro: "I'm Liang Laiyang, a tech professional from deep in the Guangdong mountains. From a barefoot cowboy to today's tech director, this journey has been driven by a thirst for knowledge and a never-give-up spirit.",
                    university: "At Guangdong University of Technology, I completed my studies through student loans and work-study programs, earning the National Inspirational Scholarship and second prize in the Mathematical Modeling Competition. After graduation, competing with elite graduates, I successfully joined Guangdong Telecom, later deepening my technical expertise at VIPShop, supporting 300K QPS high-concurrency systems.",
                    current: "Now, as Tech Director at Guangzhou Weiyi Technology, I lead the development of the AI Chuangying system, dedicated to making AI the super employee for enterprises. I'm also a university lecturer, hoping to pass on knowledge and experience to more people.",
                    timelineDates: {
                        highschool: 'High School',
                        university: 'University',
                        present: '2023-Present'
                    },
                    idols: 'Life Idols',
                    idolsList: [
                        { name: 'Wang Yangming', title: 'Philosophy Master', quote: 'Unity of knowledge and action' },
                        { name: 'Zeng Guofan', title: 'Qing Dynasty Statesman', quote: 'Self-cultivation and perseverance' },
                        { name: 'Mao Zedong', title: 'Great Leader', quote: 'Seek truth from facts' },
                        { name: 'Kazuo Inamori', title: 'Management Sage', quote: 'Respect heaven and love people' }
                    ],
                    interests: 'Interests',
                    interestsList: ['Tech Research', 'Philosophy', 'Literature', 'Mathematics', 'Team Building', 'Product Innovation'],
                    achievements: 'Achievements',
                    achievementsList: [
                        '🏆 National Inspirational Scholarship',
                        '🥈 2nd Prize Mathematical Modeling Competition',
                        '📜 Senior Project Manager',
                        '💻 Senior Programmer',
                        '🤖 AI Training Specialist'
                    ],
                    details: {
                        name: 'Name:',
                        nameValue: 'Liang Laiyang',
                        age: 'Age:',
                        ageValue: 'Post-80s',
                        education: 'Education:',
                        educationValue: 'GDUT',
                        position: 'Position:',
                        positionValue: 'Tech Director',
                        company: 'Company:',
                        companyValue: 'Guangzhou Weiyi Technology Co., Ltd.',
                        interests: 'Interests:',
                        interestsValue: 'Literature, Mathematics, Metaphysics'
                    }
                },
                // Skills
                skills: {
                    title: 'Tech Stack',
                    subtitle: '20+ years of technical accumulation, full-stack capabilities',
                    expert: 'Expert',
                    proficient: 'Proficient',
                    skilled: 'Skilled',
                    backend: 'Backend Development',
                    frontend: 'Frontend Development',
                    items: {
                        'Java': 'Java',
                        'Python': 'Python',
                        'Go': 'Go',
                        'React/Vue': 'React/Vue',
                        'AI/ML': 'AI/ML',
                        '架构设计': 'Architecture Design',
                        '微服务': 'Microservices',
                        '数据库': 'Database',
                        'Redis': 'Redis',
                        '消息队列': 'Message Queue',
                        'DevOps': 'DevOps',
                        '团队管理': 'Team Management',
                        '项目管理': 'Project Management',
                        '产品思维': 'Product Thinking'
                    }
                },
                // Portfolio
                portfolio: {
                    title: 'Portfolio',
                    subtitle: 'Technical evolution from 0 to 300K QPS',
                    filters: {
                        all: 'All',
                        ai: 'AI Projects',
                        architecture: 'Architecture',
                        enterprise: 'Enterprise',
                        government: 'Government'
                    },
                    projects: {
                        aichuangying: {
                            title: 'AI Chuangying - Enterprise AI Employee',
                            desc: '100% self-developed AI agent platform, making AI the super employee and sales champion team for enterprises.',
                            stats: ['🔥 Original R&D', '📈 1000+ Enterprise Clients']
                        },
                        vipshop: {
                            title: 'VIPShop Open Platform',
                            desc: 'Supporting 300K QPS high-concurrency platform, connecting suppliers, ISV service providers and developers.',
                            stats: ['⚡ 300K QPS', '🌐 Billion Users']
                        },
                        telecom: {
                            title: 'Guangdong Telecom Financial System',
                            desc: 'Provincial core financial settlement system, handling billing and settlement for millions of users, processing trillions annually.',
                            stats: ['💰 Trillion-level Funds', '👥 10M+ Users']
                        },
                        osp: {
                            title: 'OSP Distributed Service Framework',
                            desc: 'RPC-based distributed service framework, similar to Taobao Dubbo, high availability and concurrency.',
                            stats: ['🔧 Core Framework', '📊 High Availability']
                        },
                        retail: {
                            title: 'New Retail Digital Platform',
                            desc: 'Connecting online and offline channels, building SBbCc ecosystem. Empowering brands, dealers and stores through digital supply chain.',
                            stats: ['🏪 500+ Stores', '📊 Full Chain Digital']
                        },
                        yunnan: {
                            title: 'One Phone Yunnan Products',
                            desc: 'Key project guided by Yunnan Provincial Government. Providing specialty product supply and supply chain services.',
                            stats: ['🏛️ Provincial Key Project', '🌾 Province-wide Coverage']
                        }
                    },
                    learnMore: 'Learn More',
                    tags: {
                        microservices: 'Microservices',
                        highConcurrency: 'High Concurrency',
                        workflow: 'Workflow',
                        govCooperation: 'Gov Cooperation',
                        supplyChain: 'Supply Chain',
                        agriculture: 'Agriculture',
                        circulationSystem: 'Circulation System',
                        microserviceArch: 'Microservice Architecture',
                        privateTraffic: 'Private Traffic',
                        omniChannel: 'Omni-channel',
                        storeAccess: 'Store Access'
                    }
                },
                // Blog
                blog: {
                    title: 'Knowledge Sharing',
                    subtitle: 'Technical insights, management experience, life wisdom',
                    categories: {
                        all: 'All',
                        tech: 'Technical',
                        management: 'Management',
                        life: 'Life',
                        philosophy: 'Philosophy'
                    },
                    readMore: 'Read More →',
                    minRead: 'min read',
                    posts: [
                        {
                            category: 'Life',
                            title: 'From Cowboy to Tech Director: My 20-Year Journey',
                            excerpt: 'Sharing my growth journey from zero foundation to tech expert, with all the challenges and rewards along the way...'
                        },
                        {
                            category: 'Management',
                            title: 'Applying Wang Yangming Philosophy in Tech Management',
                            excerpt: 'How the concept of unity of knowledge and action guides tech team management to build high-performance teams...'
                        },
                        {
                            category: 'Technical',
                            title: 'From 0 to 300K QPS: High Concurrency Architecture Evolution',
                            excerpt: 'Drawing from VIPShop practical experience, detailing key points of high-concurrency system architecture design...'
                        }
                    ]
                },
                // Contact
                contact: {
                    title: 'Contact Me',
                    subtitle: "Let's create value and win the future together",
                    infoTitle: 'Contact Information',
                    infoSubtitle: 'Feel free to reach out through the following channels',
                    form: {
                        name: 'Your Name',
                        email: 'Email Address',
                        subject: 'Subject',
                        message: 'Message',
                        send: 'Send Message'
                    },
                    info: {
                        email: 'Email',
                        wechat: 'WeChat',
                        wechatTip: 'Scan to add WeChat',
                        clickToEnlarge: 'Click to enlarge',
                        clickToClose: 'Click anywhere to close'
                    }
                },
                // Footer
                footer: {
                    about: 'About',
                    aboutDesc: 'From cowboy to tech director\nChanging destiny with code, creating future with knowledge',
                    quickLinks: 'Quick Links',
                    contact: 'Contact',
                    wechatScan: 'Scan WeChat:',
                    copyright: '© 2024 Liang Laiyang. All rights reserved.'
                }
            },
            'zh-TW': {
                // 導航
                nav: {
                    home: '首頁',
                    journey: '我的故事',
                    about: '關於我',
                    skills: '技能',
                    portfolio: '作品集',
                    blog: '部落格',
                    contact: '聯繫'
                },
                // Hero部分
                hero: {
                    name: '梁來養',
                    prefix: '我是',
                    tagline: '從大山深處的放牛娃，到引領AI時代的技術總監',
                    roles: ['工程師', '架構師', '技術總監', '團隊領導者', '創業者', 'AI探索者'],
                    learnStory: '瞭解我的故事',
                    contactMe: '聯繫我',
                    yearsExp: '年經驗',
                    projects: '項目',
                    techStack: '技術棧',
                    loading: '正在載入...'
                },
                // 人生歷程
                journey: {
                    title: '人生歷程',
                    subtitle: '每一步都是成長的印記',
                    periods: [
                        { year: '1980s', title: '山村童年', desc: '在廣東山區，赤腳放牛的少年，貧困但充滿夢想' },
                        { year: '1990s', title: '求學之路', desc: '翻山越嶺上學，知識改變命運的信念在心中紮根' },
                        { year: '2000', title: '大學時光', desc: '廣東工業大學，第一次接觸計算機，開啟技術人生' },
                        { year: '2004', title: '職業起點', desc: '加入廣東電信，從基層做起，紮實技術功底' },
                        { year: '2015', title: '技術突破', desc: '加入唯品會，負責核心架構，支撐30萬QPS' },
                        { year: '2017', title: '團隊管理', desc: '帶領團隊攻堅，從技術到管理的轉型' },
                        { year: '2020', title: '創新探索', desc: '深耕AI領域，探索技術邊界' },
                        { year: '2023', title: 'AI創贏', desc: '創立AI創贏，讓AI成為企業的超級員工' }
                    ]
                },
                // 關於我
                about: {
                    title: '關於我',
                    subtitle: '一個用代碼改變命運的人',
                    subheading: '一個用代碼改變命運的人',
                    description: '我是梁來養，一個從廣東山區走出來的技術人。20多年的技術生涯，讓我從一個赤腳放牛的山村少年，成長為今天的技術總監。我相信技術的力量，更相信堅持的價值。',
                    intro: '我是梁來養，一個從廣東大山深處走出來的技術人。從赤腳放牛的少年，到如今的技術總監，這一路走來，靠的是對知識的渴望和永不放棄的精神。',
                    university: '在廣東工業大學，我通過助學貸款和勤工儉學完成學業，獲得國家勵志獎學金和數學建模競賽二等獎。畢業後，我與名校精英競爭，成功進入廣東電信，後來在唯品會深耕技術，支撐起30萬QPS的高並發系統。',
                    current: '現在，作為廣州為伊科技的技術總監，我主導研發了AI創贏系統，致力於讓AI成為企業的超級員工。同時，我也是一名大學老師，希望把知識和經驗傳遞給更多人。',
                    timelineDates: {
                        highschool: '高中時代',
                        university: '大學時代',
                        present: '2023-至今'
                    },
                    idols: '人生偶像',
                    idolsList: [
                        { name: '王陽明', title: '心學大師', quote: '知行合一' },
                        { name: '曾國藩', title: '晚清名臣', quote: '修身治國，持之以恆' },
                        { name: '毛澤東', title: '偉大領袖', quote: '實事求是' },
                        { name: '稻盛和夫', title: '經營之聖', quote: '敬天愛人' }
                    ],
                    interests: '興趣愛好',
                    interestsList: ['技術研究', '哲學思考', '文學閱讀', '數學探索', '團隊培養', '產品創新'],
                    achievements: '榮譽成就',
                    achievementsList: [
                        '🏆 國家勵志獎學金',
                        '🥈 大學生數學建模競賽二等獎',
                        '📜 高級項目管理師',
                        '💻 高級程序員',
                        '🤖 人工智能訓練師'
                    ],
                    details: {
                        name: '姓名：',
                        nameValue: '梁來養',
                        age: '年齡：',
                        ageValue: '80後',
                        education: '學歷：',
                        educationValue: '廣東工業大學',
                        position: '職位：',
                        positionValue: '技術總監',
                        company: '公司：',
                        companyValue: '廣州為伊科技有限公司',
                        interests: '興趣：',
                        interestsValue: '文學、數學、玄學'
                    }
                },
                // 技能
                skills: {
                    title: '技術棧',
                    subtitle: '20+年技術積累，全棧開發能力',
                    expert: '專家級',
                    proficient: '精通',
                    skilled: '熟練',
                    backend: '後端開發',
                    frontend: '前端開發',
                    items: {
                        'Java': 'Java',
                        'Python': 'Python',
                        'Go': 'Go',
                        'React/Vue': 'React/Vue',
                        'AI/ML': 'AI/ML',
                        '架构设计': '架構設計',
                        '微服务': '微服務',
                        '数据库': '資料庫',
                        'Redis': 'Redis',
                        '消息队列': '消息佇列',
                        'DevOps': 'DevOps',
                        '团队管理': '團隊管理',
                        '项目管理': '項目管理',
                        '产品思维': '產品思維'
                    }
                },
                // 作品集
                portfolio: {
                    title: '項目作品',
                    subtitle: '從0到30萬QPS的技術進化',
                    filters: {
                        all: '全部',
                        ai: 'AI項目',
                        architecture: '架構',
                        enterprise: '企業級',
                        government: '政府項目'
                    },
                    projects: {
                        aichuangying: {
                            title: 'AI創贏 - 企業AI員工',
                            desc: '100%自主研發的AI智能體平台，讓AI成為企業的超級員工與銷冠團隊。',
                            stats: ['🔥 原創自研', '📈 1000+企業客戶']
                        },
                        vipshop: {
                            title: '唯品會開放平台',
                            desc: '支撐30萬QPS高並發的開放平台，連接供應商、ISV服務商及開發者。',
                            stats: ['⚡ 30萬QPS', '🌐 億級用戶']
                        },
                        telecom: {
                            title: '廣東電信財務系統',
                            desc: '省級核心財務結算系統，承載千萬用戶的計費與結算，年處理資金超千億。',
                            stats: ['💰 千億級資金', '👥 千萬用戶']
                        },
                        osp: {
                            title: 'OSP分佈式服務框架',
                            desc: '基於RPC實現的分佈式服務框架，類似淘寶Dubbo，高可用高並發。',
                            stats: ['🔧 核心框架', '📊 高可用']
                        },
                        retail: {
                            title: '新零售數字中台',
                            desc: '打通線上線下全渠道，構建SBbCc網絡生態。通過供應鏈數字化和私域運營，賦能品牌商、經銷商和終端門店。',
                            stats: ['🏪 500+ 門店接入', '📊 全鏈路數字化']
                        },
                        yunnan: {
                            title: '一部手機雲品薈',
                            desc: '雲南省委、省政府指導下的重點項目。面向各類銷售渠道提供名特優產品直供及供應鏈服務。',
                            stats: ['🏛️ 省級重點項目', '🌾  覆蓋全省農產品']
                        }
                    },
                    learnMore: '瞭解更多',
                    tags: {
                        microservices: '微服務',
                        highConcurrency: '高並發',
                        workflow: '工作流',
                        govCooperation: '政企合作',
                        supplyChain: '供應鏈',
                        agriculture: '農產品',
                        circulationSystem: '流通體系',
                        microserviceArch: '微服務架構',
                        privateTraffic: '私域運營',
                        omniChannel: '全渠道',
                        storeAccess: '門店接入'
                    }
                },
                // 部落格
                blog: {
                    title: '知識分享',
                    subtitle: '技術心得、管理經驗、人生感悟',
                    categories: {
                        all: '全部',
                        tech: '技術文章',
                        management: '管理心得',
                        life: '人生感悟',
                        philosophy: '玄學探討'
                    },
                    readMore: '閱讀更多 →',
                    minRead: '分鐘閱讀',
                    posts: [
                        {
                            category: '人生感悟',
                            title: '從放牛娃到技術總監：我的20年技術成長之路',
                            excerpt: '分享我從零基礎到技術專家的成長經歷，以及路上的坎坷與收獲...'
                        },
                        {
                            category: '管理心得',
                            title: '王陽明心學在技術管理中的應用',
                            excerpt: '知行合一的理念如何指導技術團隊管理，打造高效能團隊...'
                        },
                        {
                            category: '技術文章',
                            title: '從0到30萬QPS：高並發架構演進實戰',
                            excerpt: '從唯品會的實踐經驗出發，詳解高並發系統的架構設計要點...'
                        }
                    ]
                },
                // 聯繫
                contact: {
                    title: '聯繫我',
                    subtitle: '讓我們一起創造價值，贏得未來',
                    infoTitle: '聯繫方式',
                    infoSubtitle: '歡迎通過以下方式與我聯繫',
                    form: {
                        name: '您的姓名',
                        email: '郵箱地址',
                        subject: '主題',
                        message: '留言內容',
                        send: '發送消息'
                    },
                    info: {
                        email: '郵箱',
                        wechat: '微信',
                        wechatTip: '掃碼添加微信',
                        clickToEnlarge: '點擊查看大圖',
                        clickToClose: '點擊任意位置關閉'
                    }
                },
                // 頁腳
                footer: {
                    about: '關於我',
                    aboutDesc: '從放牛娃到技術總監\n用代碼改變命運，用知識創造未來',
                    quickLinks: '快速連結',
                    contact: '聯繫方式',
                    wechatScan: '微信掃碼添加：',
                    copyright: '© 2024 梁來養. 版權所有。'
                }
            }
        };
    }
    
    bindLanguageSwitch() {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.value = this.currentLang;
            langSelect.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }
    
    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.applyTranslations();
    }
    
    applyTranslations() {
        const t = this.translations[this.currentLang];
        if (!t) return;
        
        // Update all elements with data-i18n
        this.updateElementsWithI18n(t);
        
        // Update special elements
        this.updateSpecialElements(t);
        
        // Update typing animation roles
        this.updateTypingRoles(t);
    }
    
    updateElementsWithI18n(t) {
        // Loading text
        const loaderText = document.querySelector('.loader-text');
        if (loaderText) loaderText.textContent = t.hero.loading;
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('href')?.substring(1);
            if (key && t.nav[key]) {
                link.textContent = t.nav[key];
            }
        });
        
        // Hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = t.hero.name;
        
        // Typing prefix
        const typingPrefix = document.querySelector('.typing-prefix');
        if (typingPrefix) typingPrefix.textContent = t.hero.prefix;
        
        const heroTagline = document.querySelector('.hero-tagline');
        if (heroTagline) heroTagline.textContent = t.hero.tagline;
        
        // Hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons[0]) heroButtons[0].textContent = t.hero.learnStory;
        if (heroButtons[1]) heroButtons[1].textContent = t.hero.contactMe;
        
        // Hero stats
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].textContent = t.hero.yearsExp;
        if (statLabels[1]) statLabels[1].textContent = t.hero.projects;
        if (statLabels[2]) statLabels[2].textContent = t.hero.techStack;
        
        // Section titles and subtitles
        this.updateSectionTitles(t);
        
        // Portfolio projects
        this.updatePortfolioProjects(t);
        
        // Contact form
        this.updateContactForm(t);
        
        // Footer
        this.updateFooter(t);
    }
    
    updateSectionTitles(t) {
        // Journey
        const journeyTitle = document.querySelector('#journey .section-title');
        if (journeyTitle) journeyTitle.textContent = t.journey.title;
        const journeySubtitle = document.querySelector('#journey .section-subtitle');
        if (journeySubtitle) journeySubtitle.textContent = t.journey.subtitle;
        
        // About
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.textContent = t.about.title;
        const aboutSubtitle = document.querySelector('#about .section-subtitle');
        if (aboutSubtitle) aboutSubtitle.textContent = t.about.subtitle;
        
        // About - Idols section
        const idolsSectionTitle = document.querySelector('.idols-section h4');
        if (idolsSectionTitle) {
            idolsSectionTitle.textContent = t.about.idols;
        }
        
        // About - Achievements section
        const achievementsSectionTitle = document.querySelector('.achievements-section h4');
        if (achievementsSectionTitle) {
            achievementsSectionTitle.textContent = t.about.achievements;
        }
        
        // Skills
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle) skillsTitle.textContent = t.skills.title;
        const skillsSubtitle = document.querySelector('#skills .section-subtitle');
        if (skillsSubtitle) skillsSubtitle.textContent = t.skills.subtitle;
        
        // Portfolio
        const portfolioTitle = document.querySelector('#portfolio .section-title');
        if (portfolioTitle) portfolioTitle.textContent = t.portfolio.title;
        const portfolioSubtitle = document.querySelector('#portfolio .section-subtitle');
        if (portfolioSubtitle) portfolioSubtitle.textContent = t.portfolio.subtitle;
        
        // Update skill levels
        document.querySelectorAll('.skill-level').forEach(level => {
            const text = level.textContent.trim();
            if (text === '专家级' || text === 'Expert' || text === '專家級') {
                level.textContent = t.skills.expert;
            } else if (text === '精通' || text === 'Proficient' || text === '精通') {
                level.textContent = t.skills.proficient;
            } else if (text === '熟练' || text === 'Skilled' || text === '熟練') {
                level.textContent = t.skills.skilled;
            }
        });
        
        // Blog
        const blogTitle = document.querySelector('#blog .section-title');
        if (blogTitle) blogTitle.textContent = t.blog.title;
        const blogSubtitle = document.querySelector('#blog .section-subtitle');
        if (blogSubtitle) blogSubtitle.textContent = t.blog.subtitle;
        
        // Blog category buttons
        const blogCategoryBtns = document.querySelectorAll('.blog-categories button');
        blogCategoryBtns.forEach(btn => {
            const category = btn.getAttribute('data-category');
            if (category && t.blog.categories[category]) {
                btn.textContent = t.blog.categories[category];
            }
        });
        
        // Blog posts categories, titles, and excerpts
        const blogCategories = document.querySelectorAll('.blog-category');
        const blogTitles = document.querySelectorAll('.blog-title');
        const blogExcerpts = document.querySelectorAll('.blog-excerpt');
        const readMoreBtns = document.querySelectorAll('.read-more');
        const readTimes = document.querySelectorAll('.read-time');
        
        blogCategories.forEach((cat, index) => {
            if (t.blog.posts && t.blog.posts[index]) {
                cat.textContent = t.blog.posts[index].category;
            }
        });
        
        blogTitles.forEach((title, index) => {
            if (t.blog.posts && t.blog.posts[index]) {
                title.textContent = t.blog.posts[index].title;
            }
        });
        
        blogExcerpts.forEach((excerpt, index) => {
            if (t.blog.posts && t.blog.posts[index]) {
                excerpt.textContent = t.blog.posts[index].excerpt;
            }
        });
        
        readMoreBtns.forEach(btn => {
            btn.textContent = t.blog.readMore;
        });
        
        readTimes.forEach(time => {
            const match = time.textContent.match(/\d+/);
            if (match) {
                time.textContent = `${match[0]}${t.blog.minRead}`;
            }
        });
        
        // Contact
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle) contactTitle.textContent = t.contact.title;
        const contactSubtitle = document.querySelector('#contact .section-subtitle');
        if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;
    }
    
    updatePortfolioProjects(t) {
        // Portfolio filter buttons (corrected selector)
        const filterBtns = document.querySelectorAll('.portfolio-filters button, .filter-btn');
        filterBtns.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            if (filter && t.portfolio.filters[filter]) {
                btn.textContent = t.portfolio.filters[filter];
            }
        });
        
        // Update project titles and descriptions
        const projects = document.querySelectorAll('.portfolio-item');
        projects.forEach(project => {
            const title = project.querySelector('h3');
            const desc = project.querySelector('.portfolio-content p');
            
            if (title) {
                const titleText = title.textContent.trim();
                // Match project by title content - including Traditional Chinese
                if (titleText.includes('AI创赢') || titleText.includes('AI創贏') || titleText.includes('AI Chuangying')) {
                    title.textContent = t.portfolio.projects.aichuangying.title;
                    if (desc) desc.textContent = t.portfolio.projects.aichuangying.desc;
                } else if (titleText.includes('唯品会') || titleText.includes('唯品會') || titleText.includes('VIPShop')) {
                    title.textContent = t.portfolio.projects.vipshop.title;
                    if (desc) desc.textContent = t.portfolio.projects.vipshop.desc;
                } else if (titleText.includes('电信') || titleText.includes('電信') || titleText.includes('Telecom')) {
                    title.textContent = t.portfolio.projects.telecom.title;
                    if (desc) desc.textContent = t.portfolio.projects.telecom.desc;
                } else if (titleText.includes('OSP')) {
                    title.textContent = t.portfolio.projects.osp.title;
                    if (desc) desc.textContent = t.portfolio.projects.osp.desc;
                } else if (titleText.includes('新零售') || titleText.includes('新零售') || titleText.includes('Retail')) {
                    title.textContent = t.portfolio.projects.retail.title;
                    if (desc) desc.textContent = t.portfolio.projects.retail.desc;
                } else if (titleText.includes('云品荟') || titleText.includes('雲品薈') || titleText.includes('Yunnan')) {
                    title.textContent = t.portfolio.projects.yunnan.title;
                    if (desc) desc.textContent = t.portfolio.projects.yunnan.desc;
                }
            }
            
            // Update project tech tags
            const techTags = project.querySelectorAll('.tech-tags span');
            techTags.forEach(tag => {
                const tagText = tag.textContent.trim();
                // Check each possible tag translation
                Object.keys(t.portfolio.tags || {}).forEach(key => {
                    const cnTag = this.translations['zh-CN'].portfolio.tags[key];
                    const enTag = this.translations['en'].portfolio.tags[key];
                    const twTag = this.translations['zh-TW'].portfolio.tags[key];
                    if (tagText === cnTag || tagText === enTag || tagText === twTag) {
                        tag.textContent = t.portfolio.tags[key];
                    }
                });
            });
            
            // Update portfolio stats
            const statsItems = project.querySelectorAll('.portfolio-stats span');
            statsItems.forEach(stat => {
                const statText = stat.textContent.trim();
                // Match specific stats patterns - including Traditional Chinese
                if (statText.includes('原创自研') || statText.includes('原創自研') || statText.includes('Original R&D')) {
                    stat.textContent = this.currentLang === 'en' ? '🔥 Original R&D' : 
                                      this.currentLang === 'zh-TW' ? '🔥 原創自研' : '🔥 原创自研';
                } else if (statText.includes('1000+企业客户') || statText.includes('1000+企業客戶') || statText.includes('1000+ Enterprise Clients')) {
                    stat.textContent = this.currentLang === 'en' ? '📈 1000+ Enterprise Clients' : 
                                      this.currentLang === 'zh-TW' ? '📈 1000+企業客戶' : '📈 1000+企业客户';
                } else if (statText.includes('500+ 门店接入') || statText.includes('500+ 門店接入') || statText.includes('500+ Stores')) {
                    stat.textContent = this.currentLang === 'en' ? '🏪 500+ Stores' : 
                                      this.currentLang === 'zh-TW' ? '🏪 500+ 門店接入' : '🏪 500+ 门店接入';
                } else if (statText.includes('全链路数字化') || statText.includes('全鏈路數字化') || statText.includes('Full Chain Digital')) {
                    stat.textContent = this.currentLang === 'en' ? '📊 Full Chain Digital' : 
                                      this.currentLang === 'zh-TW' ? '📊 全鏈路數字化' : '📊 全链路数字化';
                } else if (statText.includes('省级重点项目') || statText.includes('省級重點項目') || statText.includes('Provincial Key Project')) {
                    stat.textContent = this.currentLang === 'en' ? '🏛️ Provincial Key Project' : 
                                      this.currentLang === 'zh-TW' ? '🏛️ 省級重點項目' : '🏛️ 省级重点项目';
                } else if (statText.includes('覆盖全省农产品') || statText.includes('覆蓋全省農產品') || statText.includes('Province-wide Coverage')) {
                    stat.textContent = this.currentLang === 'en' ? '🌾 Province-wide Coverage' : 
                                      this.currentLang === 'zh-TW' ? '🌾 覆蓋全省農產品' : '🌾 覆盖全省农产品';
                } else if (statText.includes('核心框架') || statText.includes('核心框架') || statText.includes('Core Framework')) {
                    stat.textContent = this.currentLang === 'en' ? '🔧 Core Framework' : 
                                      this.currentLang === 'zh-TW' ? '🔧 核心框架' : '🔧 核心框架';
                } else if (statText.includes('高可用') || statText.includes('高可用') || statText.includes('High Availability')) {
                    stat.textContent = this.currentLang === 'en' ? '📊 High Availability' : 
                                      this.currentLang === 'zh-TW' ? '📊 高可用' : '📊 高可用';
                } else if (statText.includes('上亿投资') || statText.includes('上億投資') || statText.includes('Hundreds of Millions')) {
                    stat.textContent = this.currentLang === 'en' ? '💰 Hundreds of Millions Investment' : 
                                      this.currentLang === 'zh-TW' ? '💰 上億投資' : '💰 上亿投资';
                } else if (statText.includes('带领6人团队') || statText.includes('帶領6人團隊') || statText.includes('Leading Team of 6')) {
                    stat.textContent = this.currentLang === 'en' ? '👥 Leading Team of 6' : 
                                      this.currentLang === 'zh-TW' ? '👥 帶領6人團隊' : '👥 带领6人团队';
                } else if (statText.includes('头部电商') || statText.includes('頭部電商') || statText.includes('Leading E-commerce')) {
                    stat.textContent = this.currentLang === 'en' ? '🏢 Leading E-commerce' : 
                                      this.currentLang === 'zh-TW' ? '🏢 頭部電商' : '🏢 头部电商';
                } else if (statText.includes('30万QPS') || statText.includes('30萬QPS') || statText.includes('300K QPS')) {
                    stat.textContent = this.currentLang === 'en' ? '⚡ 300K QPS' : 
                                      this.currentLang === 'zh-TW' ? '⚡ 30萬QPS' : '⚡ 30万QPS';
                }
            });
        });
    }
    
    updateContactForm(t) {
        // Form labels
        const nameLabel = document.querySelector('label[for="name"]');
        if (nameLabel) nameLabel.textContent = t.contact.form.name;
        
        const emailLabel = document.querySelector('label[for="email"]');
        if (emailLabel) emailLabel.textContent = t.contact.form.email;
        
        const subjectLabel = document.querySelector('label[for="subject"]');
        if (subjectLabel) subjectLabel.textContent = t.contact.form.subject;
        
        const messageLabel = document.querySelector('label[for="message"]');
        if (messageLabel) messageLabel.textContent = t.contact.form.message;
        
        // Submit button
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        if (submitBtn) submitBtn.textContent = t.contact.form.send;
        
        // Contact info title and subtitle
        const infoTitle = document.querySelector('.contact-info .info-item h3');
        if (infoTitle) infoTitle.textContent = t.contact.infoTitle;
        
        const infoSubtitle = document.querySelector('.contact-info .info-item p');
        if (infoSubtitle) {
            infoSubtitle.textContent = t.contact.infoSubtitle;
        }
        
        // Contact items (email and wechat) - using correct selector
        const contactInfoItems = document.querySelectorAll('.contact-info .info-item');
        contactInfoItems.forEach(item => {
            const h4 = item.querySelector('h4');
            const p = item.querySelector('p');
            if (h4) {
                const text = h4.textContent.trim();
                // Check for Email in all languages
                if (text === '邮箱' || text === '郵箱' || text === 'Email') {
                    h4.textContent = t.contact.info.email;
                } 
                // Check for WeChat in all languages (note: Traditional Chinese for WeChat is the same)
                else if (text === '微信' || text === 'WeChat') {
                    h4.textContent = t.contact.info.wechat;
                    // Update "Scan to add WeChat" text
                    if (p && (p.textContent.includes('扫码') || p.textContent.includes('掃碼') || p.textContent.includes('Scan'))) {
                        p.textContent = t.contact.info.wechatTip;
                    }
                }
            }
        });
        
        // QR code title attributes
        const qrImages = document.querySelectorAll('.qr-code, .footer-qr');
        qrImages.forEach(img => {
            img.title = t.contact.info.clickToEnlarge;
        });
        
        // Modal close text
        const modalText = document.querySelector('#qr-modal p');
        if (modalText) modalText.textContent = t.contact.info.clickToClose || '点击任意位置关闭';
    }
    
    updateFooter(t) {
        // Footer section titles
        const footerSections = document.querySelectorAll('.footer-section h4, .footer-section h3');
        footerSections.forEach(section => {
            const text = section.textContent.trim();
            if (text.includes('梁来养') || text.includes('梁來養') || text.includes('Liang')) {
                section.textContent = t.hero.name;
            } else if (text.includes('快速') || text.includes('Quick')) {
                section.textContent = t.footer.quickLinks;
            } else if (text.includes('联系') || text.includes('聯繫') || text.includes('Contact')) {
                section.textContent = t.footer.contact;
            }
        });
        
        // Footer about description
        const footerAboutP = document.querySelector('.footer-section:first-child p');
        if (footerAboutP) {
            // Replace \n with <br> for proper line breaks in footer
            footerAboutP.innerHTML = t.footer.aboutDesc.replace(/\\n/g, '<br>');
        }
        
        // Footer Quick Links
        const footerLinks = document.querySelectorAll('.footer-section ul li a');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const key = href.substring(1); // Remove #
                if (t.nav[key]) {
                    link.textContent = t.nav[key];
                }
            }
        });
        
        // Footer contact title specifically
        const footerContactSection = document.querySelectorAll('.footer-section')[2];
        if (footerContactSection) {
            const h4 = footerContactSection.querySelector('h4');
            if (h4) h4.textContent = t.footer.contact;
        }
        
        // Footer WeChat scan text
        const footerWechat = document.querySelectorAll('.footer-section p');
        footerWechat.forEach(p => {
            if (p.textContent.includes('微信扫码') || p.textContent.includes('微信掃碼') || p.textContent.includes('Scan')) {
                p.textContent = t.footer.wechatScan;
            }
        });
        
        // Footer copyright
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright) copyright.textContent = t.footer.copyright;
    }
    
    updateSpecialElements(t) {
        // Timeline dates
        const timelineDates = document.querySelectorAll('.timeline-date');
        timelineDates.forEach(date => {
            const text = date.textContent.trim();
            if (text === '高中时代' || text === 'High School' || text === '高中時代') {
                date.textContent = t.about.timelineDates.highschool;
            } else if (text === '大学时代' || text === 'University' || text === '大學時代') {
                date.textContent = t.about.timelineDates.university;
            } else if (text.includes('2023') || text.includes('Present') || text.includes('至今')) {
                date.textContent = t.about.timelineDates.present;
            }
        });
        
        // Timeline events
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            if (t.journey.periods[index]) {
                const year = item.querySelector('.timeline-year');
                const title = item.querySelector('.timeline-content h3');
                const desc = item.querySelector('.timeline-content p');
                
                if (year) year.textContent = t.journey.periods[index].year;
                if (title) title.textContent = t.journey.periods[index].title;
                if (desc) desc.textContent = t.journey.periods[index].desc;
            }
        });
        
        // About section - Idols
        const idolsTitle = document.querySelector('.about-idols h4');
        if (idolsTitle) idolsTitle.textContent = t.about.idols;
        
        const idolCards = document.querySelectorAll('.idol-card');
        idolCards.forEach((card, index) => {
            if (t.about.idolsList[index]) {
                const name = card.querySelector('h5');
                const title = card.querySelector('.idol-title');
                const quote = card.querySelector('.idol-quote');
                
                if (name) name.textContent = t.about.idolsList[index].name;
                if (title) title.textContent = t.about.idolsList[index].title;
                if (quote) quote.textContent = `"${t.about.idolsList[index].quote}"`;
            }
        });
        
        // About section - Subheading and paragraphs
        const aboutSubheading = document.querySelector('.about-content h3');
        if (aboutSubheading) aboutSubheading.textContent = t.about.subheading;
        
        // Update about paragraphs - they are inside .about-text div
        const aboutParagraphs = document.querySelectorAll('.about-text > p');
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = t.about.intro;
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = t.about.university;
        if (aboutParagraphs[2]) aboutParagraphs[2].textContent = t.about.current;
        
        // Achievements
        const achievementsTitle = document.querySelector('.about-achievements h4');
        if (achievementsTitle) achievementsTitle.textContent = t.about.achievements;
        
        const achievementsList = document.querySelectorAll('.achievements-list li');
        achievementsList.forEach((item, index) => {
            if (t.about.achievementsList && t.about.achievementsList[index]) {
                item.textContent = t.about.achievementsList[index];
            }
        });
        
        // About details (Name, Age, Education, etc.)
        const detailLabels = document.querySelectorAll('.detail-label');
        const detailValues = document.querySelectorAll('.detail-value');
        
        if (detailLabels[0]) detailLabels[0].textContent = t.about.details.name;
        if (detailValues[0]) detailValues[0].textContent = t.about.details.nameValue;
        if (detailLabels[1]) detailLabels[1].textContent = t.about.details.age;
        if (detailValues[1]) detailValues[1].textContent = t.about.details.ageValue;
        if (detailLabels[2]) detailLabels[2].textContent = t.about.details.education;
        if (detailValues[2]) detailValues[2].textContent = t.about.details.educationValue;
        if (detailLabels[3]) detailLabels[3].textContent = t.about.details.position;
        if (detailValues[3]) detailValues[3].textContent = t.about.details.positionValue;
        if (detailLabels[4]) detailLabels[4].textContent = t.about.details.company;
        if (detailValues[4]) detailValues[4].textContent = t.about.details.companyValue;
        if (detailLabels[5]) detailLabels[5].textContent = t.about.details.interests;
        if (detailValues[5]) detailValues[5].textContent = t.about.details.interestsValue;
        
        // Skill card names
        const skillCards = document.querySelectorAll('.skill-card h4');
        skillCards.forEach(card => {
            const skillName = card.textContent.trim();
            if (t.skills.items && t.skills.items[skillName]) {
                card.textContent = t.skills.items[skillName];
            }
        });
        
        // Skill section headings (Backend/Frontend)
        const skillSectionHeadings = document.querySelectorAll('.skill-section h3');
        skillSectionHeadings.forEach(heading => {
            const text = heading.textContent.trim();
            if (text === '后端开发' || text === 'Backend Development' || text === '後端開發') {
                heading.textContent = t.skills.backend;
            } else if (text === '前端开发' || text === 'Frontend Development' || text === '前端開發') {
                heading.textContent = t.skills.frontend;
            }
        });
    }
    
    updateTypingRoles(t) {
        // Update roles for typing animation
        if (window.typingAnimation && t.hero.roles) {
            window.typingAnimation.roles = t.hero.roles;
        }
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            translation = translation?.[k];
        }
        
        return translation || key;
    }
}

// Initialize i18n on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}