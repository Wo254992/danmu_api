// language=JavaScript
export const pushDanmuJsContent = /* javascript */ `
/* ========================================
   推送状态管理
   ======================================== */
let selectedAnime = null;
let currentEpisodes = [];
let pushHistory = [];

/* ========================================
   获取默认推送地址
   ======================================== */
function getDefaultPushUrl(config) {
    const pushUrl = config.originalEnvVars?.DANMU_PUSH_URL || '';
    return pushUrl.trim();
}

/* ========================================
   设置默认推送地址
   ======================================== */
function setDefaultPushUrl(config) {
    const defaultPushUrl = getDefaultPushUrl(config);
    if (defaultPushUrl) {
        const pushUrlInput = document.getElementById('push-url');
        if (pushUrlInput && !pushUrlInput.value) {
            pushUrlInput.value = defaultPushUrl;
            
            // 添加设置成功动画
            pushUrlInput.style.animation = 'fadeInUp 0.4s ease-out';
            addLog('✅ 已加载默认推送地址', 'success');
        }
    }
}

/* ========================================
   搜索动漫用于推送
   ======================================== */
function searchAnimeForPush() {
    const keyword = document.getElementById('push-search-keyword').value.trim();
    const searchBtn = event.target;
    
    if (!keyword) {
        customAlert('请输入搜索关键字', '🔍 搜索提示');
        document.getElementById('push-search-keyword').focus();
        return;
    }
    
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<span class="loading-spinner-small"></span> <span>搜索中...</span>';
    searchBtn.disabled = true;
    
    // 添加搜索动画
    const animeList = document.getElementById('push-anime-list');
    const episodeList = document.getElementById('push-episode-list');
    animeList.style.opacity = '0.5';
    episodeList.style.display = 'none';
    
    const searchUrl = buildApiUrl('/api/v2/search/anime?keyword=' + encodeURIComponent(keyword));
    
    addLog(\`🔍 开始搜索动漫: \${keyword}\`, 'info');
    
    fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.animes.length > 0) {
                displayAnimeListForPush(data.animes);
                addLog(\`✅ 找到 \${data.animes.length} 个动漫结果\`, 'success');
            } else {
                document.getElementById('push-anime-list').innerHTML = \`
                    <div class="search-empty">
                        <div class="empty-icon">🔍</div>
                        <h3>未找到相关动漫</h3>
                        <p>试试其他关键词吧</p>
                    </div>
                \`;
                document.getElementById('push-anime-list').style.display = 'block';
                document.getElementById('push-episode-list').style.display = 'none';
                addLog('⚠️ 未找到相关动漫', 'warn');
            }
        })
        .catch(error => {
            console.error('搜索动漫失败:', error);
            document.getElementById('push-anime-list').innerHTML = \`
                <div class="search-error">
                    <div class="error-icon">❌</div>
                    <h3>搜索失败</h3>
                    <p>\${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="searchAnimeForPush()">重试</button>
                </div>
            \`;
            document.getElementById('push-anime-list').style.display = 'block';
            addLog(\`❌ 搜索动漫失败: \${error.message}\`, 'error');
        })
        .finally(() => {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            animeList.style.transition = 'opacity 0.3s ease';
            animeList.style.opacity = '1';
        });
}

/* ========================================
   展示动漫列表用于推送
   ======================================== */
function displayAnimeListForPush(animes) {
    const container = document.getElementById('push-anime-list');
    
    let html = \`
        <div class="search-results-header">
            <h3 class="results-title">
                <span class="title-icon">🎬</span>
                搜索结果
                <span class="results-count">\${animes.length} 个</span>
            </h3>
            <p class="results-hint">点击动漫卡片查看剧集列表</p>
        </div>
        <div class="anime-grid-container">
    \`;

    animes.forEach((anime, index) => {
        const imageUrl = anime.imageUrl || 'https://placehold.co/150x200?text=No+Image';
        html += \`
            <div class="anime-card" onclick="getBangumiForPush(\${anime.animeId})" 
                 style="animation: fadeInUp 0.4s ease-out \${index * 0.05}s backwards;">
                <div class="anime-card-image-wrapper">
                    <img src="\${imageUrl}" 
                         alt="\${escapeHtml(anime.animeTitle)}" 
                         referrerpolicy="no-referrer" 
                         class="anime-image"
                         loading="lazy">
                    <div class="anime-card-overlay">
                        <span class="view-icon">👁️</span>
                        <span class="view-text">查看剧集</span>
                    </div>
                </div>
                <div class="anime-info">
                    <h4 class="anime-title" title="\${escapeHtml(anime.animeTitle)}">
                        \${escapeHtml(anime.animeTitle)}
                    </h4>
                    <div class="anime-meta">
                        <span class="episode-count">
                            <span class="meta-icon">📺</span>
                            共 \${anime.episodeCount} 集
                        </span>
                    </div>
                </div>
            </div>
        \`;
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // 添加推送样式
    addPushStyles();
    
    // 滚动到结果区域
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/* ========================================
   添加推送相关样式
   ======================================== */
function addPushStyles() {
    if (document.getElementById('push-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'push-styles';
    style.textContent = \`
        .search-results-header {
            margin-bottom: var(--spacing-xl);
            padding: var(--spacing-lg);
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            border: 2px solid var(--border-color);
            box-shadow: var(--shadow-md);
        }
        
        .results-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-sm) 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            flex-wrap: wrap;
        }
        
        .title-icon {
            font-size: 1.75rem;
        }
        
        .results-count {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            color: white;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 700;
            box-shadow: var(--shadow-sm);
        }
        
        .results-hint {
            color: var(--text-secondary);
            margin: 0;
            font-size: 0.9375rem;
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
        }
        
        .results-hint::before {
            content: '💡';
            font-size: 1rem;
        }
        
        .anime-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .anime-card-image-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            aspect-ratio: 3/4;
        }
        
        .anime-card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-xs);
            opacity: 0;
            transition: opacity var(--transition-base);
        }
        
        .anime-card:hover .anime-card-overlay {
            opacity: 1;
        }
        
        .view-icon {
            font-size: 2rem;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .view-text {
            color: white;
            font-weight: 700;
            font-size: 0.9375rem;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .anime-meta {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-xs);
        }
        
        .episode-count {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            font-size: 0.8125rem;
            color: var(--text-tertiary);
            font-weight: 600;
        }
        
        .meta-icon {
            font-size: 0.875rem;
        }
        
        .search-empty,
        .search-error {
            text-align: center;
            padding: var(--spacing-3xl);
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-xl);
            border: 2px dashed var(--border-color);
            box-shadow: var(--shadow-md);
            grid-column: 1 / -1;
        }
        
        .empty-icon,
        .error-icon {
            font-size: 5rem;
            margin-bottom: var(--spacing-lg);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .search-empty h3,
        .search-error h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-sm) 0;
        }
        
        .search-empty p,
        .search-error p {
            color: var(--text-secondary);
            margin: 0 0 var(--spacing-lg) 0;
            font-size: 1rem;
        }
        
        .episode-list-header {
            position: sticky;
            top: 0;
            z-index: 10;
            background: var(--bg-card);
            backdrop-filter: var(--blur-lg);
            padding: var(--spacing-xl);
            border-radius: var(--border-radius-lg);
            margin-bottom: var(--spacing-lg);
            box-shadow: var(--shadow-lg);
            border: 2px solid var(--primary-color);
        }
        
        .episode-anime-title {
            font-size: 1.375rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .episode-anime-icon {
            font-size: 1.75rem;
        }
        
        .episode-stats {
            display: flex;
            gap: var(--spacing-lg);
            margin-top: var(--spacing-md);
            flex-wrap: wrap;
        }
        
        .episode-stat-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            color: var(--text-secondary);
            font-size: 0.9375rem;
            font-weight: 600;
        }
        
        .episode-stat-icon {
            font-size: 1.125rem;
        }
        
        .push-success-badge {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-xs);
            padding: 4px 10px;
            background: var(--success-light);
            color: var(--success-color);
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-left: var(--spacing-sm);
            border: 1px solid var(--success-color);
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .push-history {
            margin-top: var(--spacing-xl);
            padding: var(--spacing-lg);
            background: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
        }
        
        .push-history-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-md) 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .push-history-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        }
        
        .push-history-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--bg-primary);
            border-radius: var(--border-radius-sm);
            font-size: 0.875rem;
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
        }
        
        .push-history-time {
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 0.75rem;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .anime-grid-container {
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: var(--spacing-lg);
            }
            
            .results-title {
                font-size: 1.25rem;
            }
            
            .episode-list-header {
                padding: var(--spacing-lg);
            }
            
            .episode-anime-title {
                font-size: 1.125rem;
            }
            
            .episode-stats {
                flex-direction: column;
                gap: var(--spacing-sm);
            }
        }
    \`;
    document.head.appendChild(style);
}

/* ========================================
   获取番剧详情用于推送
   ======================================== */
function getBangumiForPush(animeId) {
    const bangumiUrl = buildApiUrl('/api/v2/bangumi/' + animeId);
    
    addLog(\`📡 获取番剧详情: \${animeId}\`, 'info');
    
    // 显示加载提示
    const episodeContainer = document.getElementById('push-episode-list');
    episodeContainer.innerHTML = \`
        <div class="loading-state">
            <div class="loading-spinner" style="margin: 0 auto;"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary); font-weight: 600;">加载剧集列表中...</p>
        </div>
    \`;
    episodeContainer.style.display = 'block';
    
    // 滚动到剧集区域
    setTimeout(() => {
        episodeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    fetch(bangumiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.bangumi && data.bangumi.episodes) {
                selectedAnime = data.bangumi;
                currentEpisodes = data.bangumi.episodes;
                displayEpisodeListForPush(data.bangumi.animeTitle, data.bangumi.episodes);
                addLog(\`✅ 成功加载 \${data.bangumi.episodes.length} 个剧集\`, 'success');
            } else {
                episodeContainer.innerHTML = \`
                    <div class="search-empty">
                        <div class="empty-icon">📺</div>
                        <h3>该动漫暂无剧集信息</h3>
                        <p>试试搜索其他动漫吧</p>
                    </div>
                \`;
                addLog('⚠️ 该动漫暂无剧集信息', 'warn');
            }
        })
        .catch(error => {
            console.error('获取番剧详情失败:', error);
            episodeContainer.innerHTML = \`
                <div class="search-error">
                    <div class="error-icon">❌</div>
                    <h3>获取剧集失败</h3>
                    <p>\${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="getBangumiForPush(\${animeId})">重试</button>
                </div>
            \`;
            addLog(\`❌ 获取番剧详情失败: \${error.message}\`, 'error');
        });
}

/* ========================================
   展示剧集列表用于推送
   ======================================== */
function displayEpisodeListForPush(animeTitle, episodes) {
    const container = document.getElementById('push-episode-list');
    
    let html = \`
        <div class="episode-list-header">
            <h3 class="episode-anime-title">
                <span class="episode-anime-icon">🎬</span>
                \${escapeHtml(animeTitle)}
            </h3>
            <div class="episode-stats">
                <span class="episode-stat-item">
                    <span class="episode-stat-icon">📺</span>
                    <span>共 \${episodes.length} 集</span>
                </span>
                <span class="episode-stat-item">
                    <span class="episode-stat-icon">💬</span>
                    <span>弹幕推送</span>
                </span>
            </div>
        </div>
        <div class="episode-grid">
    \`;

    episodes.forEach((episode, index) => {
        const commentUrl = window.location.origin + buildApiUrl('/api/v2/comment/' + episode.episodeId + '?format=xml');
        html += \`
            <div class="episode-item" style="animation: fadeInUp 0.3s ease-out \${index * 0.03}s backwards;">
                <div class="episode-info">
                    <div class="episode-number">
                        <span class="episode-icon">📺</span>
                        第 \${episode.episodeNumber} 集
                    </div>
                    <div class="episode-title">\${escapeHtml(episode.episodeTitle || '无标题')}</div>
                </div>
                <button class="btn btn-success btn-sm episode-push-btn" 
                        data-comment-url="\${commentUrl}"
                        data-episode-title="\${escapeHtml(episode.episodeTitle || '第' + episode.episodeNumber + '集')}"
                        onclick="pushDanmu('\${commentUrl}', '\${escapeHtml(episode.episodeTitle || '第' + episode.episodeNumber + '集').replace(/'/g, "\\\\'")}', this)">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    <span>推送</span>
                </button>
            </div>
        \`;
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    // 添加剧集样式
    addEpisodeStyles();
}

/* ========================================
   添加剧集相关样式
   ======================================== */
function addEpisodeStyles() {
    if (document.getElementById('episode-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'episode-styles';
    style.textContent = \`
        .loading-state {
            text-align: center;
            padding: var(--spacing-3xl);
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-xl);
            border: 2px solid var(--border-color);
            box-shadow: var(--shadow-md);
        }
        
        .episode-icon {
            font-size: 0.875rem;
            margin-right: var(--spacing-xs);
        }
        
        .episode-push-btn {
            flex-shrink: 0;
            min-width: 100px;
        }
        
        .episode-push-btn.pushed {
            background: var(--gray-300) !important;
            color: var(--text-secondary) !important;
            cursor: default;
        }
        
        .episode-push-btn.pushed:hover {
            transform: none !important;
        }
        
        @media (max-width: 768px) {
            .episode-push-btn {
                min-width: 80px;
                padding: 0.625rem 0.75rem;
            }
        }
    \`;
    document.head.appendChild(style);
}

/* ========================================
   推送弹幕
   ======================================== */
async function pushDanmu(commentUrl, episodeTitle, button) {
    const pushUrlInput = document.getElementById('push-url');
    const pushUrl = pushUrlInput.value.trim();

    if (!pushUrl || pushUrl.trim() === '') {
        customAlert('请输入推送地址', '⚠️ 推送提示');
        pushUrlInput.focus();
        return;
    }

    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="loading-spinner-small"></span>';
    button.disabled = true;

    addLog(\`🚀 开始推送弹幕: \${episodeTitle}\`, 'info');

    try {
        await fetch(pushUrl + encodeURIComponent(commentUrl), {
            method: 'GET',
            mode: 'no-cors',
        });

        // 推送成功
        button.innerHTML = \`
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>已推送</span>
        \`;
        button.classList.add('pushed');
        button.disabled = true;
        
        // 添加成功徽章到剧集标题
        const episodeItem = button.closest('.episode-item');
        const episodeInfo = episodeItem.querySelector('.episode-info');
        const successBadge = document.createElement('span');
        successBadge.className = 'push-success-badge';
        successBadge.innerHTML = '<span>✅</span><span>已推送</span>';
        episodeInfo.appendChild(successBadge);
        
        // 记录推送历史
        pushHistory.unshift({
            title: episodeTitle,
            time: new Date().toLocaleTimeString('zh-CN', { hour12: false })
        });
        
        if (pushHistory.length > 10) {
            pushHistory.pop();
        }
        
        customAlert('✅ 弹幕推送成功！\\n\\n' + episodeTitle, '🎉 推送成功');
        addLog(\`✅ 弹幕推送成功 - \${episodeTitle}\`, 'success');
    } catch (error) {
        console.error('推送弹幕失败:', error);
        button.innerHTML = originalHTML;
        button.disabled = false;
        customAlert('推送弹幕失败: ' + error.message, '❌ 推送失败');
        addLog(\`❌ 推送弹幕失败: \${error.message}\`, 'error');
    }
}
`;