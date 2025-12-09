// language=JavaScript
export const pushDanmuJsContent = /* javascript */ `
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
        customAlert('请输入搜索关键字');
        return;
    }
    
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<span class="loading-spinner-small"></span> 搜索中...';
    searchBtn.disabled = true;
    
    const searchUrl = buildApiUrl('/api/v2/search/anime?keyword=' + encodeURIComponent(keyword));
    
    addLog(\`开始搜索动漫: \${keyword}\`, 'info');
    
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
            } else {
                document.getElementById('push-anime-list').style.display = 'none';
                document.getElementById('push-episode-list').style.display = 'none';
                customAlert('未找到相关动漫');
                addLog('未找到相关动漫', 'warn');
            }
        })
        .catch(error => {
            console.error('搜索动漫失败:', error);
            customAlert('搜索动漫失败: ' + error.message);
            addLog('搜索动漫失败: ' + error.message, 'error');
        })
        .finally(() => {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
        });
}

/* ========================================
   展示动漫列表用于推送
   ======================================== */
function displayAnimeListForPush(animes) {
    const container = document.getElementById('push-anime-list');
    let html = '<h3 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">搜索结果 (点击选择)</h3>';

    animes.forEach(anime => {
        const imageUrl = anime.imageUrl || 'https://placehold.co/150x200?text=No+Image';
        html += \`
            <div class="anime-card" onclick="getBangumiForPush(\${anime.animeId})">
                <img src="\${imageUrl}" alt="\${escapeHtml(anime.animeTitle)}" referrerpolicy="no-referrer" class="anime-image">
                <div class="anime-info">
                    <h4 class="anime-title">\${escapeHtml(anime.animeTitle)}</h4>
                    <p class="anime-count">共 \${anime.episodeCount} 集</p>
                </div>
            </div>
        \`;
    });
    
    container.innerHTML = html;
    container.style.display = 'grid';
    
    addLog(\`显示 \${animes.length} 个动漫结果\`, 'info');
    
    // 滚动到结果区域
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/* ========================================
   获取番剧详情用于推送
   ======================================== */
function getBangumiForPush(animeId) {
    const bangumiUrl = buildApiUrl('/api/v2/bangumi/' + animeId);
    
    addLog(\`获取番剧详情: \${animeId}\`, 'info');
    
    // 显示加载提示
    const episodeContainer = document.getElementById('push-episode-list');
    episodeContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="loading-spinner" style="margin: 0 auto;"></div><p style="margin-top: 1rem; color: var(--text-secondary);">加载中...</p></div>';
    episodeContainer.style.display = 'block';
    
    fetch(bangumiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.bangumi && data.bangumi.episodes) {
                displayEpisodeListForPush(data.bangumi.animeTitle, data.bangumi.episodes);
            } else {
                episodeContainer.style.display = 'none';
                customAlert('该动漫暂无剧集信息');
                addLog('该动漫暂无剧集信息', 'warn');
            }
        })
        .catch(error => {
            console.error('获取番剧详情失败:', error);
            episodeContainer.style.display = 'none';
            customAlert('获取番剧详情失败: ' + error.message);
            addLog('获取番剧详情失败: ' + error.message, 'error');
        });
}

/* ========================================
   展示剧集列表用于推送
   ======================================== */
function displayEpisodeListForPush(animeTitle, episodes) {
    const container = document.getElementById('push-episode-list');
    let html = \`
        <div style="background: var(--bg-primary); padding: var(--spacing-lg); border-radius: var(--border-radius); margin-bottom: var(--spacing-md); box-shadow: var(--shadow);">
            <h3 style="margin: 0 0 var(--spacing-sm) 0; color: var(--text-primary);">剧集列表</h3>
            <h4 style="margin: 0; color: var(--primary-color); font-size: 1.125rem;">\${escapeHtml(animeTitle)}</h4>
        </div>
    \`;

    episodes.forEach(episode => {
        const commentUrl = window.location.origin + buildApiUrl('/api/v2/comment/' + episode.episodeId + '?format=xml');
        html += \`
            <div class="episode-item">
                <div class="episode-info">
                    <div class="episode-number">第 \${episode.episodeNumber} 集</div>
                    <div class="episode-title">\${escapeHtml(episode.episodeTitle || '无标题')}</div>
                </div>
                <button class="btn btn-success btn-sm" onclick="pushDanmu('\${commentUrl}', '\${escapeHtml(episode.episodeTitle || '第' + episode.episodeNumber + '集')}')">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    推送
                </button>
            </div>
        \`;
    });
    
    container.innerHTML = html;
    container.style.display = 'grid';
    
    addLog(\`显示 \${episodes.length} 个剧集\`, 'info');
    
    // 滚动到剧集列表
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/* ========================================
   推送弹幕
   ======================================== */
async function pushDanmu(commentUrl, episodeTitle) {
    const pushUrlInput = document.getElementById('push-url');
    const pushUrl = pushUrlInput.value.trim();
    const pushButton = event.target.closest('.btn');

    if (!pushUrl || pushUrl.trim() === '') {
        customAlert('请输入推送地址');
        return;
    }

    const originalText = pushButton.innerHTML;
    pushButton.innerHTML = '<span class="loading-spinner-small"></span>';
    pushButton.disabled = true;

    try {
        await fetch(pushUrl + encodeURIComponent(commentUrl), {
            method: 'GET',
            mode: 'no-cors',
        });

        customAlert('✓ 弹幕推送成功！\\n\\n' + episodeTitle);
        addLog('弹幕推送成功 - ' + episodeTitle, 'success');
    } catch (error) {
        console.error('推送弹幕失败:', error);
        customAlert('推送弹幕失败: ' + error.message);
        addLog('推送弹幕失败: ' + error.message, 'error');
    } finally {
        pushButton.innerHTML = originalText;
        pushButton.disabled = false;
    }
}
`;