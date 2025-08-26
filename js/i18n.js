/**
 * 国际化(i18n)系统
 * 支持简体中文、英文、繁体中文
 */

class I18nManager {
    constructor() {
        this.currentLang = this.getStoredLang() || this.getDefaultLang();
        this.translations = {};
        this.langSelect = document.getElementById('lang-select');
        this.init();
    }
    
    async init() {
        // 加载当前语言
        await this.loadTranslation(this.currentLang);
        
        // 应用翻译
        this.applyTranslations();
        
        // 绑定语言切换事件
        if (this.langSelect) {
            this.langSelect.value = this.currentLang;
            this.langSelect.addEventListener('change', async (e) => {
                await this.switchLanguage(e.target.value);
            });
        }
    }
    
    getStoredLang() {
        return localStorage.getItem('language');
    }
    
    getDefaultLang() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
        }
        return 'zh-CN'; // 默认简体中文
    }
    
    async loadTranslation(lang) {
        try {
            const response = await fetch(`/lang/${lang}.json`);
            if (!response.ok) {
                // 如果文件不存在，使用内置翻译
                this.translations[lang] = this.getBuiltInTranslations(lang);
            } else {
                this.translations[lang] = await response.json();
            }
        } catch (error) {
            console.warn(`Failed to load translation for ${lang}, using built-in`);
            this.translations[lang] = this.getBuiltInTranslations(lang);
        }
    }
    
    getBuiltInTranslations(lang) {
        const translations = {
            'zh-CN': {
                nav: {
                    home: '首页',
                    journey: '我的故事',
                    about: '关于我',
                    skills: '技能',
                    portfolio: '作品集',
                    blog: '博客',
                    contact: '联系'
                },
                hero: {
                    tagline: '从大山深处的放牛娃，到引领AI时代的技术总监',
                    learnMore: '了解我的故事',
                    contactMe: '联系我',
                    yearsExp: '年经验',
                    projects: '项目',
                    techStack: '技术栈'
                },
                journey: {
                    title: '我的故事',
                    subtitle: '从放牛娃到技术总监的人生历程'
                },
                about: {
                    title: '关于我',
                    subtitle: '一个用代码改变命运的人',
                    idols: '人生偶像',
                    achievements: '荣誉成就'
                },
                skills: {
                    title: '技术栈',
                    subtitle: '15年技术积累，全栈开发能力'
                },
                portfolio: {
                    title: '项目作品',
                    subtitle: '从0到30万QPS的技术进化',
                    all: '全部',
                    ai: 'AI项目',
                    architecture: '架构',
                    enterprise: '企业级'
                },
                blog: {
                    title: '知识分享',
                    subtitle: '技术心得、管理经验、人生感悟',
                    all: '全部',
                    tech: '技术文章',
                    management: '管理心得',
                    life: '人生感悟',
                    philosophy: '玄学探讨',
                    readMore: '阅读更多',
                    minRead: '分钟阅读'
                },
                contact: {
                    title: '联系我',
                    subtitle: '让我们一起创造价值，赢得未来',
                    name: '您的姓名',
                    email: '邮箱地址',
                    subject: '主题',
                    message: '留言内容',
                    send: '发送消息',
                    wechat: '扫码添加微信'
                }
            },
            'en': {
                nav: {
                    home: 'Home',
                    journey: 'My Story',
                    about: 'About',
                    skills: 'Skills',
                    portfolio: 'Portfolio',
                    blog: 'Blog',
                    contact: 'Contact'
                },
                hero: {
                    tagline: 'From a cowboy in the mountains to a tech leader in the AI era',
                    learnMore: 'Learn My Story',
                    contactMe: 'Contact Me',
                    yearsExp: 'Years Experience',
                    projects: 'Projects',
                    techStack: 'Tech Stack'
                },
                journey: {
                    title: 'My Story',
                    subtitle: 'The journey from cowboy to tech director'
                },
                about: {
                    title: 'About Me',
                    subtitle: 'A person who changed destiny with code',
                    idols: 'Life Idols',
                    achievements: 'Achievements'
                },
                skills: {
                    title: 'Tech Stack',
                    subtitle: '15 years of technical accumulation, full-stack development'
                },
                portfolio: {
                    title: 'Portfolio',
                    subtitle: 'Technical evolution from 0 to 300K QPS',
                    all: 'All',
                    ai: 'AI Projects',
                    architecture: 'Architecture',
                    enterprise: 'Enterprise'
                },
                blog: {
                    title: 'Knowledge Sharing',
                    subtitle: 'Technical insights, management experience, life insights',
                    all: 'All',
                    tech: 'Technical',
                    management: 'Management',
                    life: 'Life',
                    philosophy: 'Philosophy',
                    readMore: 'Read More',
                    minRead: 'min read'
                },
                contact: {
                    title: 'Contact Me',
                    subtitle: "Let's create value and win the future together",
                    name: 'Your Name',
                    email: 'Email Address',
                    subject: 'Subject',
                    message: 'Message',
                    send: 'Send Message',
                    wechat: 'Scan to add WeChat'
                }
            },
            'zh-TW': {
                nav: {
                    home: '首頁',
                    journey: '我的故事',
                    about: '關於我',
                    skills: '技能',
                    portfolio: '作品集',
                    blog: '部落格',
                    contact: '聯繫'
                },
                hero: {
                    tagline: '從大山深處的放牛娃，到引領AI時代的技術總監',
                    learnMore: '瞭解我的故事',
                    contactMe: '聯繫我',
                    yearsExp: '年經驗',
                    projects: '項目',
                    techStack: '技術棧'
                },
                journey: {
                    title: '我的故事',
                    subtitle: '從放牛娃到技術總監的人生歷程'
                },
                about: {
                    title: '關於我',
                    subtitle: '一個用代碼改變命運的人',
                    idols: '人生偶像',
                    achievements: '榮譽成就'
                },
                skills: {
                    title: '技術棧',
                    subtitle: '15年技術積累，全棧開發能力'
                },
                portfolio: {
                    title: '項目作品',
                    subtitle: '從0到30萬QPS的技術進化',
                    all: '全部',
                    ai: 'AI項目',
                    architecture: '架構',
                    enterprise: '企業級'
                },
                blog: {
                    title: '知識分享',
                    subtitle: '技術心得、管理經驗、人生感悟',
                    all: '全部',
                    tech: '技術文章',
                    management: '管理心得',
                    life: '人生感悟',
                    philosophy: '玄學探討',
                    readMore: '閱讀更多',
                    minRead: '分鐘閱讀'
                },
                contact: {
                    title: '聯繫我',
                    subtitle: '讓我們一起創造價值，贏得未來',
                    name: '您的姓名',
                    email: '郵箱地址',
                    subject: '主題',
                    message: '留言內容',
                    send: '發送消息',
                    wechat: '掃碼添加微信'
                }
            }
        };
        
        return translations[lang] || translations['zh-CN'];
    }
    
    async switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        if (!this.translations[lang]) {
            await this.loadTranslation(lang);
        }
        
        this.applyTranslations();
        
        // 更新HTML lang属性
        document.documentElement.lang = lang;
    }
    
    applyTranslations() {
        const t = this.translations[this.currentLang];
        if (!t) return;
        
        // 更新所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedProperty(t, key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // 特殊处理：更新导航链接
        this.updateNavigation(t);
        
        // 特殊处理：更新按钮文本
        this.updateButtons(t);
    }
    
    updateNavigation(t) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const navItem = link.getAttribute('data-nav');
            if (navItem && t.nav && t.nav[navItem]) {
                link.textContent = t.nav[navItem];
            }
        });
    }
    
    updateButtons(t) {
        // Hero按钮
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons[0] && t.hero) {
            heroButtons[0].textContent = t.hero.learnMore;
        }
        if (heroButtons[1] && t.hero) {
            heroButtons[1].textContent = t.hero.contactMe;
        }
        
        // 联系表单提交按钮
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        if (submitBtn && t.contact) {
            submitBtn.textContent = t.contact.send;
        }
    }
    
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    translate(key) {
        const translation = this.getNestedProperty(this.translations[this.currentLang], key);
        return translation || key;
    }
}

// 初始化国际化管理器
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});