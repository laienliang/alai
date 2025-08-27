/**
 * 梁来养个人网站 - 主JavaScript文件
 * 从放牛娃到技术总监的交互体验
 */

// 全局配置
const CONFIG = {
    typingSpeed: 100,
    typingDelay: 2000,
    scrollOffset: 100,
    animationDelay: 100
};

// DOM元素缓存
const elements = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    progressBar: null,
    backToTop: null,
    loadingScreen: null,
    typingText: null,
    statNumbers: null,
    timelineItems: null,
    skillBars: null,
    portfolioItems: null,
    blogCards: null,
    contactForm: null
};

/**
 * 初始化应用
 */
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initAnimations();
    initSkillBars();
    initPortfolio();
    initBlog();
    initContactForm();
    initParticles();
    // 确保统计数字立即可见
    forceShowStats();
    hideLoadingScreen();
});

/**
 * 初始化DOM元素引用
 */
function initElements() {
    elements.navbar = document.getElementById('navbar');
    elements.navToggle = document.getElementById('nav-toggle');
    elements.navMenu = document.getElementById('nav-menu');
    elements.progressBar = document.getElementById('progress-bar');
    elements.backToTop = document.getElementById('back-to-top');
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.typingText = document.getElementById('typing-text');
    elements.statNumbers = document.querySelectorAll('.stat-number');
    elements.timelineItems = document.querySelectorAll('.timeline-item');
    elements.skillBars = document.querySelectorAll('.skill-progress');
    elements.portfolioItems = document.querySelectorAll('.portfolio-item');
    elements.blogCards = document.querySelectorAll('.blog-card');
    elements.contactForm = document.getElementById('contact-form');
}

/**
 * 导航功能
 */
function initNavigation() {
    // 移动端菜单切换
    if (elements.navToggle) {
        elements.navToggle.addEventListener('click', () => {
            elements.navToggle.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
        });
    }
    
    // 导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 判断是否是页面内锚点链接（以#开头）
            if (href && href.startsWith('#')) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 更新激活状态
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
                
                // 关闭移动端菜单
                if (elements.navMenu && elements.navToggle) {
                    elements.navMenu.classList.remove('active');
                    elements.navToggle.classList.remove('active');
                }
            }
            // 如果是外部链接（包含index.html等），让它正常跳转
            // 不需要preventDefault()
        });
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (elements.navMenu && elements.navToggle && elements.navMenu.classList.contains('active')) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
                elements.navMenu.classList.remove('active');
                elements.navToggle.classList.remove('active');
            }
        }
    });
}

/**
 * 打字机效果
 */
function initTypingEffect() {
    // Default roles, will be updated by i18n
    let roles = [
        "工程师",
        "架构师",
        "技术总监",
        "团队领导者",
        "创业者",
        "AI探索者"
    ];
    
    // Make typing animation globally accessible for i18n updates
    window.typingAnimation = { 
        roles: roles,
        restart: function() {
            currentRole = 0;
            currentChar = 0;
            isDeleting = false;
        }
    };
    
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function type() {
        if (!elements.typingText) return;
        
        // Use updated roles from i18n if available
        const currentRoles = window.typingAnimation.roles || roles;
        const role = currentRoles[currentRole];
        
        if (isDeleting) {
            elements.typingText.textContent = role.substring(0, currentChar - 1);
            currentChar--;
            
            if (currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % currentRoles.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            elements.typingText.textContent = role.substring(0, currentChar + 1);
            currentChar++;
            
            if (currentChar === role.length) {
                isDeleting = true;
                setTimeout(type, CONFIG.typingDelay);
                return;
            }
        }
        
        setTimeout(type, isDeleting ? CONFIG.typingSpeed / 2 : CONFIG.typingSpeed);
    }
    
    type();
}

/**
 * 滚动效果
 */
function initScrollEffects() {
    let lastScrollY = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 导航栏样式
        if (scrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
        
        // 进度条
        const scrollProgress = (scrollY / (documentHeight - windowHeight)) * 100;
        if (elements.progressBar) {
            elements.progressBar.style.width = `${scrollProgress}%`;
        }
        
        // 返回顶部按钮
        if (scrollY > 500) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
        
        // 更新激活的导航项
        updateActiveNavLink();
        
        // 时间轴动画
        animateTimelineItems();
        
        // 统计数字动画
        animateStatNumbers();
        
        lastScrollY = scrollY;
    }, 100));
    
    // 返回顶部
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 更新激活的导航链接
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - CONFIG.scrollOffset - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

/**
 * 初始化动画
 */
function initAnimations() {
    // 使用Intersection Observer API
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * CONFIG.animationDelay);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .portfolio-item, .blog-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 时间轴动画
 */
function animateTimelineItems() {
    if (!elements.timelineItems) return;
    
    elements.timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
        }
    });
}

/**
 * 统计数字动画
 */
function animateStatNumbers() {
    if (!elements.statNumbers) return;
    
    elements.statNumbers.forEach(stat => {
        if (stat.classList.contains('animated')) return;
        
        const statTop = stat.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statTop < windowHeight * 0.8) {
            stat.classList.add('animated');
            const target = parseInt(stat.dataset.target);
            const isPlus = stat.nextSibling && stat.nextSibling.textContent === '+';
            animateNumber(stat, 0, target, 2000, isPlus);
        }
    });
}

/**
 * 数字动画函数
 */
function animateNumber(element, start, end, duration, showPlus = false) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (showPlus) {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * 强制显示统计数字
 */
function forceShowStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statItems = document.querySelectorAll('.stat-item');
    
    // 添加淡入动画到统计项
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
    
    statNumbers.forEach((stat, index) => {
        // 确保元素可见
        stat.style.display = 'block';
        stat.style.opacity = '1';
        stat.style.visibility = 'visible';
        
        // 先显示0，然后启动动画
        stat.textContent = '0';
        
        // 启动数字动画，每个数字延迟一点时间
        const target = parseInt(stat.dataset.target) || 0;
        setTimeout(() => {
            animateNumberWithEffect(stat, 0, target, 2500);
        }, index * 200 + 800);
    });
    
    // 确保标签也可见
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels.forEach((label, index) => {
        label.style.display = 'block';
        label.style.opacity = '0';
        label.style.visibility = 'visible';
        label.style.transition = 'opacity 0.4s ease';
        
        setTimeout(() => {
            label.style.opacity = '1';
        }, index * 200 + 1000);
    });
}

/**
 * 带特效的数字动画
 */
function animateNumberWithEffect(element, start, end, duration) {
    const startTime = performance.now();
    
    // 添加发光效果
    element.style.textShadow = '0 0 20px rgba(52, 152, 219, 0.8)';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用easeOutQuart缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeProgress * (end - start) + start);
        element.textContent = current;
        
        // 动画过程中的闪烁效果
        if (progress < 0.9) {
            const intensity = 0.4 + 0.6 * Math.sin(elapsed * 0.02);
            element.style.textShadow = `0 0 20px rgba(52, 152, 219, ${intensity})`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // 动画完成，恢复正常效果
            element.textContent = end;
            element.style.textShadow = '0 2px 4px rgba(52, 152, 219, 0.3)';
            
            // 完成时的脉冲效果
            element.style.animation = 'statsComplete 0.6s ease';
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * 技能条动画
 */
function initSkillBars() {
    if (!elements.skillBars) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const percent = entry.target.dataset.percent;
                entry.target.style.width = `${percent}%`;
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    elements.skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * 作品集过滤
 */
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 过滤项目
            const filter = button.dataset.filter;
            elements.portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category.includes(filter)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/**
 * 博客分类过滤
 */
function initBlog() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 过滤文章
            const category = button.dataset.category;
            elements.blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 联系表单
 */
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(elements.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // 显示提交状态
        const submitButton = elements.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '发送中...';
        submitButton.disabled = true;
        
        try {
            // 模拟发送请求
            await simulateSendMessage(data);
            
            // 显示成功消息
            showNotification('消息已成功发送！', 'success');
            elements.contactForm.reset();
        } catch (error) {
            // 显示错误消息
            showNotification('发送失败，请稍后重试。', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * 模拟发送消息
 */
function simulateSendMessage(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Message sent:', data);
            resolve();
        }, 1500);
    });
}

/**
 * 显示通知
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * 粒子背景
 */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // 设置画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 152, 219, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 连接粒子
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(52, 152, 219, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * 超级加载屏幕控制 - 快速版本
 */
function hideLoadingScreen() {
    // 立即开始加载动画
    startLoadingAnimation();
    
    // 优化的快速加载步骤
    const loadingSteps = [
        { progress: 30, text: 'Loading resources...', delay: 200 },
        { progress: 60, text: 'Initializing...', delay: 150 },
        { progress: 90, text: 'Ready...', delay: 100 },
        { progress: 100, text: 'Complete!', delay: 100 }
    ];
    
    let currentStep = 0;
    
    function executeLoadingStep() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            setTimeout(() => {
                updateLoadingProgress(step.progress);
                updateLoadingText(step.text);
                currentStep++;
                executeLoadingStep();
            }, step.delay);
        } else {
            // 快速完成加载动画
            setTimeout(() => {
                if (elements.loadingScreen) {
                    elements.loadingScreen.classList.add('hide');
                    setTimeout(() => {
                        elements.loadingScreen.style.display = 'none';
                    }, 600);
                }
            }, 200);
        }
    }
    
    executeLoadingStep();
}

/**
 * 启动加载动画
 */
function startLoadingAnimation() {
    // 更新加载文本的语言
    updateLoadingLanguage();
    
    // 启动打字机效果
    startTypingEffect();
    
    // 启动连接线动画
    startConnectionLines();
}

/**
 * 启动连接线动画
 */
function startConnectionLines() {
    const svg = document.querySelector('.connection-lines');
    const container = svg?.querySelector('.lines-container');
    
    if (!container) return;
    
    const particles = document.querySelectorAll('.energy-particle');
    
    function createConnectionLine(start, end) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', start.x);
        line.setAttribute('y1', start.y);
        line.setAttribute('x2', end.x);
        line.setAttribute('y2', end.y);
        line.setAttribute('stroke', 'url(#lineGradient)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.6');
        
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'opacity');
        animate.setAttribute('values', '0;0.8;0');
        animate.setAttribute('dur', '2s');
        animate.setAttribute('repeatCount', 'indefinite');
        
        line.appendChild(animate);
        return line;
    }
    
    function updateConnections() {
        // 清除现有连接
        container.innerHTML = '';
        
        // 获取粒子位置
        const positions = Array.from(particles).map(particle => {
            const rect = particle.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            return {
                x: rect.left - svgRect.left + rect.width / 2,
                y: rect.top - svgRect.top + rect.height / 2
            };
        });
        
        // 创建连接线（只连接相邻的粒子）
        for (let i = 0; i < positions.length - 1; i++) {
            if (Math.random() > 0.5) { // 50%概率创建连接
                const line = createConnectionLine(positions[i], positions[i + 1]);
                container.appendChild(line);
            }
        }
    }
    
    // 初始化连接
    setTimeout(updateConnections, 500);
    
    // 定期更新连接线
    setInterval(updateConnections, 3000);
}

/**
 * 更新加载进度
 */
function updateLoadingProgress(percentage) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progressGlow = document.querySelector('.progress-glow');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = percentage + '%';
    }
    
    // 启动光效
    if (progressGlow && percentage > 10) {
        progressGlow.style.opacity = '1';
        progressGlow.style.animation = 'progressGlow 1s ease-in-out';
    }
    
    // 触发闪烁效果
    if (percentage >= 100) {
        const sparks = document.querySelectorAll('.spark');
        sparks.forEach((spark, index) => {
            setTimeout(() => {
                spark.style.animation = 'sparkle 0.3s ease-out';
            }, index * 50);
        });
    }
}

/**
 * 更新加载文本
 */
function updateLoadingText(text) {
    const currentLang = localStorage.getItem('language') || 'zh-CN';
    const translations = {
        'Loading resources...': {
            'zh-CN': '加载中...',
            'en': 'Loading...',
            'zh-TW': '載入中...'
        },
        'Initializing...': {
            'zh-CN': '初始化...',
            'en': 'Initializing...',
            'zh-TW': '初始化中...'
        },
        'Ready...': {
            'zh-CN': '准备完成...',
            'en': 'Ready...',
            'zh-TW': '準備完成...'
        },
        'Complete!': {
            'zh-CN': '完成！',
            'en': 'Complete!',
            'zh-TW': '完成！'
        }
    };
    
    // 更新副标题
    const subtitle = document.querySelector('.glitch-main');
    if (subtitle && translations[text]) {
        const translatedText = translations[text][currentLang] || text;
        subtitle.textContent = translatedText;
        // 同时更新glitch复制文本
        document.querySelectorAll('.glitch-copy').forEach(copy => {
            copy.textContent = translatedText;
        });
    }
    
    // 更新状态文本
    const statusElement = document.querySelector('.loading-status');
    if (statusElement) {
        statusElement.textContent = translations[text][currentLang] || text;
    }
}

/**
 * 更新加载界面语言
 */
function updateLoadingLanguage() {
    const currentLang = localStorage.getItem('language') || 'zh-CN';
    
    // 更新主标题
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.getAttribute(`data-${currentLang.replace('-', '').toLowerCase()}`);
        if (text) {
            typingText.textContent = text;
        }
    }
    
    // 更新副标题
    const subtitle = document.querySelector('.loader-subtitle span');
    if (subtitle) {
        const text = subtitle.getAttribute(`data-${currentLang.replace('-', '').toLowerCase()}`);
        if (text) {
            subtitle.textContent = text;
        }
    }
}

/**
 * 启动打字机效果
 */
function startTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.typing-cursor');
    
    if (!typingText) return;
    
    const currentLang = localStorage.getItem('language') || 'zh-CN';
    const langKey = currentLang.replace('-', '').toLowerCase();
    const targetText = typingText.getAttribute(`data-${langKey}`) || typingText.textContent;
    
    let currentText = '';
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < targetText.length) {
            currentText += targetText.charAt(charIndex);
            typingText.textContent = currentText;
            charIndex++;
            setTimeout(typeCharacter, 150);
        }
    }
    
    // 清空文本并开始打字
    typingText.textContent = '';
    setTimeout(typeCharacter, 500);
}

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 添加动画CSS
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes statsComplete {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
        text-shadow: 0 0 25px rgba(52, 152, 219, 0.6);
    }
    100% {
        transform: scale(1);
        text-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
    }
}

@keyframes statsPulse {
    0%, 100% {
        box-shadow: 0 8px 20px rgba(52, 152, 219, 0.1);
    }
    50% {
        box-shadow: 0 15px 35px rgba(52, 152, 219, 0.2);
    }
}

.stat-item {
    animation: statsPulse 4s ease-in-out infinite;
}

.stat-item:hover {
    animation: none;
}
`;
document.head.appendChild(style);