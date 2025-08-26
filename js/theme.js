/**
 * 主题管理系统
 * 支持明暗主题切换
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }
    
    init() {
        // 应用初始主题
        this.applyTheme(this.currentTheme);
        
        // 绑定切换事件
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // 监听系统主题变化
        this.watchSystemTheme();
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon(theme);
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.animateToggle();
    }
    
    updateToggleIcon(theme) {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'light' ? '🌙' : '☀️';
            }
        }
    }
    
    animateToggle() {
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // 只有在没有存储的主题时才跟随系统
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// 初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});