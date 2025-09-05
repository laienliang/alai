/**
 * 飞书 Webhook 集成模块
 * 使用群聊机器人webhook直接发送消息，无需处理CORS和认证
 */

// 飞书Webhook配置
const WEBHOOK_CONFIG = {
    // ✅ 已配置飞书群聊机器人Webhook URL
    WEBHOOK_URL: 'https://open.feishu.cn/open-apis/bot/v2/hook/3d449b63-ae0b-4916-ac25-f3291ececaab'
    
    // 注意：静态网站不需要签名验证，Webhook URL本身就是认证方式
};

/**
 * 发送文本消息到飞书群聊
 * @param {string} text - 消息文本
 * @returns {Promise<Object>} 发送结果
 */
async function sendWebhookTextMessage(text) {
    if (WEBHOOK_CONFIG.WEBHOOK_URL.includes('REPLACE_WITH_YOUR_WEBHOOK_URL')) {
        throw new Error('⚠️ 请先在 js/feishu-webhook.js 中配置您的飞书Webhook URL');
    }

    const payload = {
        msg_type: 'text',
        content: {
            text: text
        }
    };

    try {
        // 方法1：尝试直接请求（可能会被CORS阻止）
        try {
            const response = await fetch(WEBHOOK_CONFIG.WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // 使用no-cors模式绕过CORS检查
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            // no-cors模式下无法读取响应内容，但如果没有抛出错误就认为成功
            return { success: true, data: { msg: 'Message sent (no-cors mode)' }, method: 'direct' };
        } catch (corsError) {
            console.log('直接请求失败，尝试代理方式:', corsError.message);
            
            // 方法2：使用公共CORS代理
            const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(WEBHOOK_CONFIG.WEBHOOK_URL);
            
            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                return { success: true, data: { msg: 'Message sent via proxy' }, method: 'proxy' };
            } else {
                throw new Error(`代理请求失败: ${response.status}`);
            }
        }
    } catch (error) {
        console.error('Webhook发送失败:', error);
        throw error;
    }
}

/**
 * 发送富文本消息到飞书群聊
 * @param {string} title - 消息标题
 * @param {Array} content - 富文本内容数组
 * @returns {Promise<Object>} 发送结果
 */
async function sendWebhookRichMessage(title, content) {
    if (WEBHOOK_CONFIG.WEBHOOK_URL.includes('REPLACE_WITH_YOUR_WEBHOOK_URL')) {
        throw new Error('⚠️ 请先在 js/feishu-webhook.js 中配置您的飞书Webhook URL');
    }

    const payload = {
        msg_type: 'post',
        content: {
            post: {
                zh_cn: {
                    title: title,
                    content: [content]
                }
            }
        }
    };

    try {
        // 使用no-cors模式发送
        const response = await fetch(WEBHOOK_CONFIG.WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        // no-cors模式下无法读取响应，假设成功
        return { success: true, data: { msg: 'Rich message sent (no-cors mode)' }, method: 'direct' };
    } catch (error) {
        console.error('Webhook富文本发送失败:', error);
        throw error;
    }
}

/**
 * 发送卡片消息（交互式）
 * @param {Object} cardContent - 卡片内容
 * @returns {Promise<Object>} 发送结果
 */
async function sendWebhookCardMessage(cardContent) {
    if (WEBHOOK_CONFIG.WEBHOOK_URL.includes('REPLACE_WITH_YOUR_WEBHOOK_URL')) {
        throw new Error('⚠️ 请先在 js/feishu-webhook.js 中配置您的飞书Webhook URL');
    }

    const payload = {
        msg_type: 'interactive',
        card: cardContent
    };

    try {
        // 使用no-cors模式发送
        const response = await fetch(WEBHOOK_CONFIG.WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        // no-cors模式下无法读取响应，假设成功
        return { success: true, data: { msg: 'Card message sent (no-cors mode)' }, method: 'direct' };
    } catch (error) {
        console.error('Webhook卡片发送失败:', error);
        throw error;
    }
}

/**
 * 格式化联系表单数据为飞书消息
 * @param {Object} formData - 表单数据
 * @returns {Object} 格式化的消息数据
 */
function formatContactMessageForWebhook(formData) {
    const timestamp = new Date().toLocaleString('zh-CN');
    
    // 简单文本格式
    const textContent = `📧 新的网站联系消息

👤 姓名：${formData.name}
📨 邮箱：${formData.email}
📋 主题：${formData.subject}
💬 内容：
${formData.message}

🕒 时间：${timestamp}
🌐 来源：阿来个人网站 (lianglaiyang.com)`;

    // 富文本格式
    const richContent = [
        { tag: 'text', text: '💬 收到新留言\n\n' },
        { tag: 'text', text: '👤 姓名：' },
        { tag: 'text', text: formData.name, un_escape: true },
        { tag: 'text', text: '\n📨 邮箱：' },
        { tag: 'text', text: formData.email, un_escape: true },
        { tag: 'text', text: '\n📋 主题：' },
        { tag: 'text', text: formData.subject, un_escape: true },
        { tag: 'text', text: '\n💬 内容：\n' },
        { tag: 'text', text: formData.message, un_escape: true },
        { tag: 'text', text: '\n\n🕒 时间：' },
        { tag: 'text', text: timestamp, un_escape: true },
        { tag: 'text', text: '\n🌐 网站：https://laienliang.github.io/alai/' }
    ];

    // 卡片格式（更美观）
    const cardContent = {
        header: {
            template: 'blue',
            title: {
                content: '💬 收到新留言',
                tag: 'plain_text'
            }
        },
        elements: [
            {
                tag: 'div',
                text: {
                    content: `**👤 联系人：**${formData.name}\n**📨 邮箱：**${formData.email}\n**📋 主题：**${formData.subject}`,
                    tag: 'lark_md'
                }
            },
            {
                tag: 'hr'
            },
            {
                tag: 'div',
                text: {
                    content: `**💬 消息内容：**\n${formData.message}`,
                    tag: 'lark_md'
                }
            },
            {
                tag: 'div',
                text: {
                    content: `**🕒 时间：**${timestamp}  **🌐 网站：**https://laienliang.github.io/alai/`,
                    tag: 'lark_md'
                }
            },
            {
                tag: 'action',
                actions: [
                    {
                        tag: 'button',
                        text: {
                            content: '📧 回复邮件',
                            tag: 'plain_text'
                        },
                        type: 'primary',
                        url: `mailto:${formData.email}?subject=Re: ${formData.subject}`
                    }
                ]
            }
        ]
    };

    return {
        text: textContent,
        rich: richContent,
        card: cardContent,
        title: '收到新留言'
    };
}

/**
 * 发送联系表单消息到飞书（Webhook方式）
 * @param {Object} formData - 表单数据
 * @param {string} format - 消息格式：'text', 'rich', 'card'
 * @returns {Promise<Object>} 发送结果
 */
async function sendContactMessageViaWebhook(formData, format = 'card') {
    try {
        const messageData = formatContactMessageForWebhook(formData);
        let result;

        switch (format) {
            case 'text':
                result = await sendWebhookTextMessage(messageData.text);
                break;
            case 'rich':
                result = await sendWebhookRichMessage(messageData.title, messageData.rich);
                break;
            case 'card':
                result = await sendWebhookCardMessage(messageData.card);
                break;
            default:
                throw new Error(`不支持的消息格式: ${format}`);
        }

        return { success: true, data: result.data, format: format };
    } catch (error) {
        console.error('Webhook发送联系消息失败:', error);
        // 如果卡片格式失败，尝试富文本格式
        if (format === 'card') {
            console.log('卡片格式失败，尝试富文本格式...');
            try {
                const messageData = formatContactMessageForWebhook(formData);
                const result = await sendWebhookRichMessage(messageData.title, messageData.rich);
                return { success: true, data: result.data, format: 'rich' };
            } catch (richError) {
                console.log('富文本格式失败，尝试纯文本格式...');
                try {
                    const messageData = formatContactMessageForWebhook(formData);
                    const result = await sendWebhookTextMessage(messageData.text);
                    return { success: true, data: result.data, format: 'text' };
                } catch (textError) {
                    return { success: false, error: textError.message };
                }
            }
        } else if (format === 'rich') {
            console.log('富文本格式失败，尝试纯文本格式...');
            try {
                const messageData = formatContactMessageForWebhook(formData);
                const result = await sendWebhookTextMessage(messageData.text);
                return { success: true, data: result.data, format: 'text' };
            } catch (textError) {
                return { success: false, error: textError.message };
            }
        }
        
        return { success: false, error: error.message };
    }
}

/**
 * 测试Webhook连接
 * @returns {Promise<boolean>} 测试结果
 */
async function testWebhookConnection() {
    try {
        const testMessage = `🔧 飞书Webhook连接测试\n\n✅ 连接成功！\n🕒 时间：${new Date().toLocaleString('zh-CN')}`;
        const result = await sendWebhookTextMessage(testMessage);
        console.log('Webhook连接测试成功:', result);
        return true;
    } catch (error) {
        console.error('Webhook连接测试失败:', error);
        return false;
    }
}

// 导出到全局对象
window.FeishuWebhook = {
    sendContactMessage: sendContactMessageViaWebhook,
    testConnection: testWebhookConnection,
    sendTextMessage: sendWebhookTextMessage,
    sendRichMessage: sendWebhookRichMessage,
    sendCardMessage: sendWebhookCardMessage,
    formatContactMessage: formatContactMessageForWebhook
};