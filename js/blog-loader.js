/**
 * 博客加载器 - 在主页动态加载博客列表
 */

document.addEventListener('DOMContentLoaded', function() {
    loadBlogList();
});

function loadBlogList() {
    // 获取当前语言
    const lang = localStorage.getItem('language') || 'zh-CN';
    
    // 如果博客数据存在
    if (typeof blogPosts !== 'undefined') {
        const posts = blogPosts[lang] || blogPosts['zh-CN'];
        updateBlogCards(posts.slice(0, 3)); // 只显示前3篇
    }
}

function updateBlogCards(posts) {
    const blogCards = document.querySelectorAll('.blog-card');
    
    posts.forEach((post, index) => {
        if (blogCards[index]) {
            const card = blogCards[index];
            
            // 更新分类 - 显示中文文本，但保持英文key作为data-category
            const categorySpan = card.querySelector('.blog-category');
            if (categorySpan) {
                // 将英文key映射为中文显示文本
                const categoryMap = {
                    'ai': 'AI前沿',
                    'philosophy': '哲学思辨', 
                    'life': '人生感悟',
                    'management': '管理心得',
                    'tech': '技术文章'
                };
                categorySpan.textContent = categoryMap[post.category] || post.category;
            }
            
            // 更新日期
            const dateSpan = card.querySelector('.blog-date');
            if (dateSpan) {
                dateSpan.textContent = post.date.replace(/-/g, '.');
            }
            
            // 更新标题
            const titleElement = card.querySelector('.blog-title');
            if (titleElement) {
                titleElement.textContent = post.title;
            }
            
            // 更新摘要
            const excerptElement = card.querySelector('.blog-excerpt');
            if (excerptElement) {
                excerptElement.textContent = post.excerpt;
            }
            
            // 更新阅读时间
            const readTimeSpan = card.querySelector('.read-time');
            if (readTimeSpan) {
                const lang = localStorage.getItem('language') || 'zh-CN';
                const minText = lang === 'en' ? 'min read' : '分钟阅读';
                readTimeSpan.textContent = `${post.readTime}${minText}`;
            }
            
            // 更新阅读更多链接
            const readMoreLink = card.querySelector('.read-more');
            if (readMoreLink) {
                readMoreLink.href = `blog-detail.html?id=${post.id}`;
                readMoreLink.onclick = function(e) {
                    e.preventDefault();
                    window.location.href = this.href;
                };
            }
            
            // 更新data-category属性 - 使用英文key
            card.setAttribute('data-category', post.category);
        }
    });
}

// 监听语言切换事件
window.addEventListener('languageChanged', function() {
    loadBlogList();
});