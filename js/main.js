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
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // 关闭移动端菜单
            elements.navMenu.classList.remove('active');
            elements.navToggle.classList.remove('active');
            
            // 更新激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
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
 * 隐藏加载屏幕
 */
function hideLoadingScreen() {
    setTimeout(() => {
        if (elements.loadingScreen) {
            elements.loadingScreen.classList.add('hide');
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);
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
`;
document.head.appendChild(style);