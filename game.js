// 🏰 魔法方块王国 - 塔防游戏
// 专为喜欢 Minecraft 的五年级同学设计！

// ==================== 游戏配置 ====================
const CONFIG = {
    canvasWidth: 1000,
    canvasHeight: 600,
    tileSize: 40,
    fps: 60
};

// ==================== 防御塔类型 ====================
const TOWER_TYPES = {
    arrow: {
        name: '🏹 魔法箭塔',
        cost: 50,
        damage: 20,
        range: 150,
        fireRate: 1000,
        color: '#8B4513',
        emoji: '🏹',
        description: '基础箭塔，性价比高',
        projectileSpeed: 8,
        projectileColor: '#FFD700'
    },
    fire: {
        name: '🔥 火焰法师',
        cost: 100,
        damage: 35,
        range: 120,
        fireRate: 1500,
        color: '#DC143C',
        emoji: '🔥',
        description: '持续火焰伤害',
        projectileSpeed: 6,
        projectileColor: '#FF4500',
        burnDamage: 5,
        burnDuration: 3000
    },
    ice: {
        name: '❄️ 冰冻水晶',
        cost: 120,
        damage: 15,
        range: 130,
        fireRate: 1200,
        color: '#00BFFF',
        emoji: '❄️',
        description: '减速敌人',
        projectileSpeed: 7,
        projectileColor: '#ADD8E6',
        slowFactor: 0.5,
        slowDuration: 2000
    },
    lightning: {
        name: '⚡ 闪电召唤',
        cost: 150,
        damage: 50,
        range: 160,
        fireRate: 2000,
        color: '#9370DB',
        emoji: '⚡',
        description: '连锁闪电伤害',
        projectileSpeed: 10,
        projectileColor: '#FFFF00',
        chainCount: 3,
        chainRange: 100
    },
    summoner: {
        name: '👻 召唤师塔',
        cost: 200,
        damage: 0,
        range: 0,
        fireRate: 5000,
        color: '#8B008B',
        emoji: '👻',
        description: '召唤小幽灵助战',
        summonCount: 1,
        summonDuration: 10000,
        summonDamage: 10
    },
    sniper: {
        name: '🎯 狙击塔',
        cost: 180,
        damage: 100,
        range: 300,
        fireRate: 3000,
        color: '#2F4F4F',
        emoji: '🎯',
        description: '超远射程，高伤害',
        projectileSpeed: 15,
        projectileColor: '#00FF00'
    }
};

// ==================== 敌人类型 ====================
const ENEMY_TYPES = {
    slime: {
        name: '💚 史莱姆',
        emoji: '💚',
        health: 50,
        speed: 1.5,
        reward: 10,
        color: '#32CD32',
        size: 25
    },
    skeleton: {
        name: '💀 骷髅兵',
        emoji: '💀',
        health: 80,
        speed: 1.2,
        reward: 15,
        color: '#F5F5DC',
        size: 28
    },
    creeper: {
        name: '💥 苦力怕',
        emoji: '💥',
        health: 60,
        speed: 2,
        reward: 20,
        color: '#228B22',
        size: 30,
        explodeDamage: 30,
        explodeRange: 50
    },
    enderman: {
        name: '👁️ 末影人',
        emoji: '👁️',
        health: 120,
        speed: 1.8,
        reward: 30,
        color: '#4B0082',
        size: 35,
        teleportChance: 0.1
    },
    zombie: {
        name: '🧟 僵尸',
        emoji: '🧟',
        health: 150,
        speed: 0.8,
        reward: 25,
        color: '#556B2F',
        size: 32
    },
    spider: {
        name: '🕷️ 蜘蛛',
        emoji: '🕷️',
        health: 70,
        speed: 2.5,
        reward: 20,
        color: '#8B0000',
        size: 26
    },
    witch: {
        name: '🧙‍♀️ 女巫',
        emoji: '🧙‍♀️',
        health: 100,
        speed: 1,
        reward: 40,
        color: '#483D8B',
        size: 30,
        healAmount: 30
    },
    dragon: {
        name: '🐉 末影龙',
        emoji: '🐉',
        health: 500,
        speed: 0.6,
        reward: 200,
        color: '#4B0082',
        size: 50,
        boss: true
    }
};

// ==================== 游戏路径 (Minecraft 风格地图) ====================
const GAME_PATH = [
    {x: 0, y: 5}, {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5},
    {x: 4, y: 5}, {x: 4, y: 4}, {x: 4, y: 3}, {x: 4, y: 2},
    {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2},
    {x: 8, y: 3}, {x: 8, y: 4}, {x: 8, y: 5}, {x: 8, y: 6},
    {x: 8, y: 7}, {x: 8, y: 8}, {x: 7, y: 8}, {x: 6, y: 8},
    {x: 5, y: 8}, {x: 4, y: 8}, {x: 3, y: 8}, {x: 2, y: 8},
    {x: 1, y: 8}, {x: 1, y: 7}, {x: 1, y: 6}, {x: 1, y: 5},
    {x: 1, y: 4}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3},
    {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3},
    {x: 8, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 11, y: 3},
    {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 15, y: 3},
    {x: 16, y: 3}, {x: 17, y: 3}, {x: 18, y: 3}, {x: 19, y: 3},
    {x: 20, y: 3}, {x: 21, y: 3}, {x: 22, y: 3}, {x: 23, y: 3},
    {x: 24, y: 3}
];

// ==================== 波次配置 ====================
const WAVES = [
    { enemies: [{type: 'slime', count: 5}], delay: 1000 },
    { enemies: [{type: 'slime', count: 8}, {type: 'skeleton', count: 2}], delay: 900 },
    { enemies: [{type: 'skeleton', count: 6}, {type: 'spider', count: 3}], delay: 850 },
    { enemies: [{type: 'creeper', count: 5}, {type: 'zombie', count: 4}], delay: 800 },
    { enemies: [{type: 'zombie', count: 8}, {type: 'skeleton', count: 5}], delay: 750 },
    { enemies: [{type: 'enderman', count: 4}, {type: 'spider', count: 6}], delay: 700 },
    { enemies: [{type: 'witch', count: 3}, {type: 'zombie', count: 8}], delay: 650 },
    { enemies: [{type: 'creeper', count: 10}, {type: 'enderman', count: 5}], delay: 600 },
    { enemies: [{type: 'skeleton', count: 10}, {type: 'spider', count: 8}, {type: 'witch', count: 4}], delay: 550 },
    { enemies: [{type: 'zombie', count: 15}, {type: 'enderman', count: 6}], delay: 500 },
    { enemies: [{type: 'witch', count: 6}, {type: 'creeper', count: 12}], delay: 450 },
    { enemies: [{type: 'enderman', count: 10}, {type: 'spider', count: 12}], delay: 400 },
    { enemies: [{type: 'zombie', count: 20}, {type: 'skeleton', count: 15}], delay: 350 },
    { enemies: [{type: 'witch', count: 8}, {type: 'enderman', count: 10}, {type: 'creeper', count: 15}], delay: 300 },
    { enemies: [{type: 'dragon', count: 1}, {type: 'enderman', count: 15}, {type: 'witch', count: 10}], delay: 250 }
];

// ==================== 游戏主类 ====================
class TowerDefenseGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 游戏状态
        this.gold = 100;
        this.lives = 20;
        this.wave = 0;
        this.isWaveActive = false;
        this.isGameOver = false;
        this.isPaused = false;
        
        // 游戏对象
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.summons = [];
        
        // 选择状态
        this.selectedTowerType = null;
        this.selectedTower = null;
        
        // 波次相关
        this.waveQueue = [];
        this.spawnTimer = 0;
        this.spawnDelay = 1000;
        
        // 地图相关
        this.mapWidth = Math.ceil(CONFIG.canvasWidth / CONFIG.tileSize);
        this.mapHeight = Math.ceil(CONFIG.canvasHeight / CONFIG.tileSize);
        this.buildableTiles = this.generateBuildableTiles();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化 UI
        this.initUI();
        
        // 开始游戏循环
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }
    
    // 生成可建造区域
    generateBuildableTiles() {
        const buildable = [];
        for (let y = 0; y < this.mapHeight; y++) {
            buildable[y] = [];
            for (let x = 0; x < this.mapWidth; x++) {
                buildable[y][x] = true;
            }
        }
        
        // 标记路径为不可建造
        GAME_PATH.forEach(pos => {
            if (pos.y >= 0 && pos.y < this.mapHeight && pos.x >= 0 && pos.x < this.mapWidth) {
                buildable[pos.y][pos.x] = false;
            }
        });
        
        return buildable;
    }
    
    // 初始化 UI
    initUI() {
        const towerSelection = document.getElementById('towerSelection');
        towerSelection.innerHTML = '';
        
        Object.entries(TOWER_TYPES).forEach(([key, tower]) => {
            const card = document.createElement('div');
            card.className = 'tower-card';
            card.dataset.type = key;
            card.innerHTML = `
                <div class="tower-icon">${tower.emoji}</div>
                <div class="tower-name">${tower.name}</div>
                <div class="tower-cost">💰 ${tower.cost}</div>
                <div class="tower-level">${tower.description}</div>
            `;
            card.onclick = () => this.selectTowerType(key);
            towerSelection.appendChild(card);
        });
        
        // 绑定按钮事件
        document.getElementById('startWaveBtn').onclick = () => this.startWave();
        document.getElementById('saveGameBtn').onclick = () => this.saveGame();
        document.getElementById('loadGameBtn').onclick = () => this.loadGame();
    }
    
    // 绑定事件
    bindEvents() {
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.hoverTile = null);
    }
    
    // 选择防御塔类型
    selectTowerType(type) {
        if (this.selectedTowerType === type) {
            this.selectedTowerType = null;
        } else {
            this.selectedTowerType = type;
            this.selectedTower = null;
            this.hideUpgradePanel();
        }
        this.updateTowerSelectionUI();
    }
    
    // 更新塔选择 UI
    updateTowerSelectionUI() {
        document.querySelectorAll('.tower-card').forEach(card => {
            card.classList.remove('selected', 'disabled');
            const type = card.dataset.type;
            const tower = TOWER_TYPES[type];
            
            if (type === this.selectedTowerType) {
                card.classList.add('selected');
            }
            if (this.gold < tower.cost) {
                card.classList.add('disabled');
            }
        });
    }
    
    // 处理画布点击
    handleCanvasClick(e) {
        if (this.isGameOver || this.isPaused) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const tileX = Math.floor(x / CONFIG.tileSize);
        const tileY = Math.floor(y / CONFIG.tileSize);
        
        // 检查是否点击了已有的塔
        const clickedTower = this.towers.find(t => t.tileX === tileX && t.tileY === tileY);
        
        if (clickedTower) {
            this.selectTower(clickedTower);
            return;
        }
        
        // 建造新塔
        if (this.selectedTowerType) {
            this.tryBuildTower(tileX, tileY);
        }
    }
    
    // 处理鼠标移动
    handleCanvasMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.hoverTile = {
            x: Math.floor(x / CONFIG.tileSize),
            y: Math.floor(y / CONFIG.tileSize)
        };
    }
    
    // 尝试建造塔
    tryBuildTower(tileX, tileY) {
        if (tileX < 0 || tileX >= this.mapWidth || tileY < 0 || tileY >= this.mapHeight) return;
        if (!this.buildableTiles[tileY][tileX]) return;
        
        const towerType = TOWER_TYPES[this.selectedTowerType];
        if (this.gold < towerType.cost) return;
        
        // 检查是否已有塔
        if (this.towers.some(t => t.tileX === tileX && t.tileY === tileY)) return;
        
        // 建造塔
        this.gold -= towerType.cost;
        this.towers.push(new Tower(tileX, tileY, this.selectedTowerType));
        
        // 创建建造特效
        this.createParticles(tileX * CONFIG.tileSize + CONFIG.tileSize/2, 
                           tileY * CONFIG.tileSize + CONFIG.tileSize/2, 
                           towerType.color, 20);
        
        this.updateUI();
        this.selectedTowerType = null;
        this.updateTowerSelectionUI();
    }
    
    // 选择已有塔
    selectTower(tower) {
        this.selectedTower = tower;
        this.selectedTowerType = null;
        this.showUpgradePanel(tower);
        this.updateTowerSelectionUI();
    }
    
    // 显示升级面板
    showUpgradePanel(tower) {
        const panel = document.getElementById('upgradePanel');
        const info = document.getElementById('selectedTowerInfo');
        const options = document.getElementById('upgradeOptions');
        
        if (!panel || !info || !options) {
            console.error('❌ 升级面板元素未找到!');
            return;
        }
        
        const towerType = TOWER_TYPES[tower.type];
        const upgradeCost = Math.floor(towerType.cost * 0.7 * tower.level);
        const sellPrice = Math.floor(towerType.cost * tower.level * 0.5);
        
        console.log('📊 显示升级面板:', tower.type, '等级:', tower.level, '升级花费:', upgradeCost, '当前金币:', Math.floor(this.gold));
        
        info.innerHTML = `
            <div style="font-size: 1.2em; margin-bottom: 5px;">${towerType.emoji} ${towerType.name}</div>
            <div>等级：${'⭐'.repeat(tower.level)}</div>
            <div>伤害：${Math.floor(tower.damage)}</div>
            <div>射程：${Math.round(tower.range)}</div>
            <div style="color: #ffd700; margin-top: 8px;">💰 出售返还：${sellPrice} 金币</div>
        `;
        
        // 创建按钮元素（不直接设置 innerHTML）
        options.innerHTML = '';
        
        // 升级按钮
        const upgradeBtn = document.createElement('button');
        upgradeBtn.className = 'upgrade-btn';
        upgradeBtn.id = 'upgradeBtn';
        upgradeBtn.disabled = this.gold < upgradeCost;
        upgradeBtn.innerHTML = `
            ⬆️ 升级 (💰 ${upgradeCost})
            <br><small>伤害 +${Math.round(towerType.damage * 0.3)}, 射程 +${Math.round(towerType.range * 0.15)}</small>
        `;
        
        // 出售按钮
        const sellBtn = document.createElement('button');
        sellBtn.className = 'upgrade-btn';
        sellBtn.id = 'sellBtn';
        sellBtn.style.background = 'linear-gradient(135deg, #8B0000, #DC143C)';
        sellBtn.style.borderColor = '#FF0000';
        sellBtn.innerHTML = `💰 出售 (💰 ${sellPrice})`;
        
        options.appendChild(upgradeBtn);
        options.appendChild(sellBtn);
        
        // 使用 addEventListener 绑定事件（更可靠）
        const self = this;
        upgradeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 升级按钮被点击！');
            self.upgradeTower();
        });
        
        sellBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 出售按钮被点击！');
            self.sellTower();
        });
        
        panel.classList.add('show');
        console.log('✅ 升级面板已显示，按钮事件已绑定');
    }
    
    // 隐藏升级面板
    hideUpgradePanel() {
        document.getElementById('upgradePanel').classList.remove('show');
    }
    
    // 升级塔
    upgradeTower() {
        console.log('⬆️ upgradeTower 被调用');
        
        if (!this.selectedTower) {
            console.log('❌ 没有选中的塔');
            alert('请先点击地图上的塔！');
            return;
        }
        
        const towerType = TOWER_TYPES[this.selectedTower.type];
        const upgradeCost = Math.floor(towerType.cost * 0.7 * this.selectedTower.level);
        
        console.log('📊 当前状态:', {
            塔类型：this.selectedTower.type,
            当前等级：this.selectedTower.level,
            升级花费：upgradeCost,
            当前金币：Math.floor(this.gold)
        });
        
        if (this.gold >= upgradeCost) {
            // 扣除金币
            this.gold -= upgradeCost;
            console.log('💰 扣除金币后剩余:', Math.floor(this.gold));
            
            // 升级
            this.selectedTower.level++;
            this.selectedTower.damage = towerType.damage * (1 + (this.selectedTower.level - 1) * 0.3);
            this.selectedTower.range = towerType.range * (1 + (this.selectedTower.level - 1) * 0.15);
            
            console.log('✅ 升级成功！新等级:', this.selectedTower.level, '新伤害:', Math.floor(this.selectedTower.damage));
            
            // 升级特效
            this.createParticles(
                this.selectedTower.x + CONFIG.tileSize/2,
                this.selectedTower.y + CONFIG.tileSize/2,
                '#FFD700', 30
            );
            
            // 更新 UI
            this.updateUI();
            this.showUpgradePanel(this.selectedTower);
            
            // 显示提示
            const message = document.createElement('div');
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = 'rgba(0, 255, 0, 0.9)';
            message.style.color = 'white';
            message.style.padding = '20px 40px';
            message.style.borderRadius = '10px';
            message.style.fontSize = '1.5em';
            message.style.zIndex = '2000';
            message.textContent = '✨ 升级成功！';
            document.body.appendChild(message);
            
            setTimeout(() => message.remove(), 1500);
        } else {
            console.log('❌ 金币不足！需要:', upgradeCost, '当前:', Math.floor(this.gold));
            alert('💰 金币不足！\n需要：' + upgradeCost + ' 金币\n当前：' + Math.floor(this.gold) + ' 金币');
        }
    }
    
    // 出售塔
    sellTower() {
        console.log('💰 sellTower 被调用');
        
        if (!this.selectedTower) {
            console.log('❌ 没有选中的塔');
            alert('请先点击地图上的塔！');
            return;
        }
        
        const towerType = TOWER_TYPES[this.selectedTower.type];
        const sellPrice = Math.floor(towerType.cost * this.selectedTower.level * 0.5);
        
        console.log('📊 出售信息:', {
            塔类型：this.selectedTower.type,
            当前等级：this.selectedTower.level,
            出售价格：sellPrice
        });
        
        // 添加金币
        this.gold += sellPrice;
        console.log('💰 获得金币后总计:', Math.floor(this.gold));
        
        // 移除塔
        this.towers = this.towers.filter(t => t !== this.selectedTower);
        console.log('✅ 塔已移除，剩余塔数:', this.towers.length);
        
        // 出售特效
        this.createParticles(
            this.selectedTower.x + CONFIG.tileSize/2,
            this.selectedTower.y + CONFIG.tileSize/2,
            '#FFD700', 20
        );
        
        // 清除选中状态
        this.selectedTower = null;
        this.hideUpgradePanel();
        
        // 更新 UI
        this.updateUI();
        
        // 显示提示
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(255, 165, 0, 0.9)';
        message.style.color = 'white';
        message.style.padding = '20px 40px';
        message.style.borderRadius = '10px';
        message.style.fontSize = '1.5em';
        message.style.zIndex = '2000';
        message.textContent = `💰 出售获得 ${sellPrice} 金币！`;
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 1500);
    }
    
    // 开始波次
    startWave() {
        if (this.isWaveActive || this.wave >= WAVES.length) return;
        
        const waveConfig = WAVES[this.wave];
        this.waveQueue = [];
        
        waveConfig.enemies.forEach(e => {
            for (let i = 0; i < e.count; i++) {
                this.waveQueue.push(e.type);
            }
        });
        
        // 打乱敌人顺序
        this.waveQueue.sort(() => Math.random() - 0.5);
        
        this.spawnDelay = waveConfig.delay;
        this.spawnTimer = 0;
        this.isWaveActive = true;
        
        document.getElementById('startWaveBtn').disabled = true;
        document.getElementById('waveInfo').textContent = `🌊 第 ${this.wave + 1} 波来袭！敌人数量：${this.waveQueue.length}`;
    }
    
    // 生成敌人
    spawnEnemy() {
        if (this.waveQueue.length === 0) return;
        
        const type = this.waveQueue.shift();
        const enemyConfig = ENEMY_TYPES[type];
        const enemy = new Enemy(type, enemyConfig);
        enemy.pathIndex = 0;
        
        // 设置初始位置
        const startPos = GAME_PATH[0];
        enemy.x = startPos.x * CONFIG.tileSize + CONFIG.tileSize/2;
        enemy.y = startPos.y * CONFIG.tileSize + CONFIG.tileSize/2;
        
        this.enemies.push(enemy);
    }
    
    // 游戏主循环
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        if (!this.isPaused && !this.isGameOver) {
            this.update(deltaTime);
        }
        this.render();
        
        requestAnimationFrame(this.gameLoop);
    }
    
    // 更新游戏状态
    update(deltaTime) {
        // 波次生成逻辑
        if (this.isWaveActive) {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer >= this.spawnDelay && this.waveQueue.length > 0) {
                this.spawnEnemy();
                this.spawnTimer = 0;
            }
            
            // 检查波次是否结束
            if (this.waveQueue.length === 0 && this.enemies.length === 0) {
                this.endWave();
            }
        }
        
        // 更新塔
        this.towers.forEach(tower => tower.update(deltaTime, this.enemies, this));
        
        // 更新敌人
        this.enemies = this.enemies.filter(enemy => {
            enemy.update(deltaTime, this);
            return enemy.health > 0 && !enemy.reachedEnd;
        });
        
        // 更新投射物
        this.projectiles = this.projectiles.filter(proj => {
            proj.update(deltaTime, this);
            return proj.active;
        });
        
        // 更新粒子
        this.particles = this.particles.filter(p => {
            p.update(deltaTime);
            return p.life > 0;
        });
        
        // 更新召唤物
        this.summons = this.summons.filter(summon => {
            summon.update(deltaTime, this.enemies, this);
            return summon.health > 0 && summon.lifeTime > 0;
        });
        
        // 检查游戏结束
        if (this.lives <= 0 && !this.isGameOver) {
            this.gameOver(false);
        }
        
        // 检查胜利
        if (this.wave >= WAVES.length && this.enemies.length === 0 && !this.isGameOver) {
            this.gameOver(true);
        }
        
        this.updateUI();
    }
    
    // 结束波次
    endWave() {
        this.isWaveActive = false;
        this.wave++;
        document.getElementById('startWaveBtn').disabled = false;
        
        if (this.wave < WAVES.length) {
            document.getElementById('waveInfo').textContent = `✅ 第 ${this.wave} 波完成！准备迎接第 ${this.wave + 1} 波！`;
        }
    }
    
    // 渲染游戏
    render() {
        // 清空画布
        this.ctx.fillStyle = '#2d4a22';
        this.ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
        
        // 绘制地图网格
        this.renderMap();
        
        // 绘制路径
        this.renderPath();
        
        // 绘制塔
        this.towers.forEach(tower => tower.render(this.ctx));
        
        // 绘制敌人
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        
        // 绘制投射物
        this.projectiles.forEach(proj => proj.render(this.ctx));
        
        // 绘制召唤物
        this.summons.forEach(summon => summon.render(this.ctx));
        
        // 绘制粒子
        this.particles.forEach(p => p.render(this.ctx));
        
        // 绘制悬停效果
        if (this.hoverTile && !this.isGameOver) {
            this.renderHoverEffect();
        }
    }
    
    // 渲染地图
    renderMap() {
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const alpha = (x + y) % 2 === 0 ? 0.3 : 0.25;
                this.ctx.fillStyle = `rgba(34, 139, 34, ${alpha})`;
                this.ctx.fillRect(x * CONFIG.tileSize, y * CONFIG.tileSize, CONFIG.tileSize, CONFIG.tileSize);
            }
        }
    }
    
    // 渲染路径
    renderPath() {
        this.ctx.strokeStyle = '#8B7355';
        this.ctx.lineWidth = CONFIG.tileSize * 0.6;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        GAME_PATH.forEach((pos, index) => {
            const x = pos.x * CONFIG.tileSize + CONFIG.tileSize/2;
            const y = pos.y * CONFIG.tileSize + CONFIG.tileSize/2;
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        this.ctx.stroke();
        
        // 绘制起点和终点
        const start = GAME_PATH[0];
        const end = GAME_PATH[GAME_PATH.length - 1];
        
        this.ctx.fillStyle = '#00FF00';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('🏁', start.x * CONFIG.tileSize + 8, start.y * CONFIG.tileSize + 30);
        
        this.ctx.fillStyle = '#FF0000';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('🏰', end.x * CONFIG.tileSize + 8, end.y * CONFIG.tileSize + 30);
    }
    
    // 渲染悬停效果
    renderHoverEffect() {
        const x = this.hoverTile.x * CONFIG.tileSize;
        const y = this.hoverTile.y * CONFIG.tileSize;
        
        if (this.selectedTowerType) {
            const towerType = TOWER_TYPES[this.selectedTowerType];
            const canBuild = this.gold >= towerType.cost && 
                            this.buildableTiles[this.hoverTile.y][this.hoverTile.x] &&
                            !this.towers.some(t => t.tileX === this.hoverTile.x && t.tileY === this.hoverTile.y);
            
            // 绘制射程范围
            this.ctx.beginPath();
            this.ctx.arc(x + CONFIG.tileSize/2, y + CONFIG.tileSize/2, towerType.range, 0, Math.PI * 2);
            this.ctx.fillStyle = canBuild ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
            this.ctx.fill();
            this.ctx.strokeStyle = canBuild ? '#00FF00' : '#FF0000';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // 绘制塔预览
            this.ctx.globalAlpha = 0.7;
            this.ctx.fillStyle = towerType.color;
            this.ctx.fillRect(x + 5, y + 5, CONFIG.tileSize - 10, CONFIG.tileSize - 10);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(towerType.emoji, x + 10, y + 28);
            this.ctx.globalAlpha = 1;
        }
        
        // 绘制网格高亮
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, CONFIG.tileSize, CONFIG.tileSize);
    }
    
    // 创建粒子效果
    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }
    
    // 更新 UI
    updateUI() {
        document.getElementById('goldDisplay').textContent = Math.floor(this.gold);
        document.getElementById('livesDisplay').textContent = this.lives;
        document.getElementById('waveDisplay').textContent = `${this.wave + 1}/${WAVES.length}`;
        document.getElementById('enemiesDisplay').textContent = this.enemies.length + this.waveQueue.length;
        
        this.updateTowerSelectionUI();
        
        // 更新升级按钮状态
        if (this.selectedTower) {
            this.showUpgradePanel(this.selectedTower);
        }
    }
    
    // 游戏结束
    gameOver(victory) {
        this.isGameOver = true;
        const message = document.getElementById('gameMessage');
        const title = document.getElementById('messageTitle');
        const text = document.getElementById('messageText');
        
        if (victory) {
            title.textContent = '🎉 胜利！🎉';
            title.style.color = '#00FF00';
            text.textContent = `你成功保卫了王国！共抵御了 ${this.wave} 波敌人！`;
        } else {
            title.textContent = '💀 游戏结束 💀';
            title.style.color = '#FF0000';
            text.textContent = `你坚持到了第 ${this.wave + 1} 波。再接再厉！`;
        }
        
        message.classList.add('show');
    }
    
    // 保存游戏
    saveGame() {
        const saveData = {
            gold: this.gold,
            lives: this.lives,
            wave: this.wave,
            towers: this.towers.map(t => ({
                type: t.type,
                tileX: t.tileX,
                tileY: t.tileY,
                level: t.level
            })),
            timestamp: Date.now()
        };
        
        localStorage.setItem('towerDefenseSave', JSON.stringify(saveData));
        alert('✅ 游戏已保存！');
    }
    
    // 加载游戏
    loadGame() {
        const saveData = localStorage.getItem('towerDefenseSave');
        if (!saveData) {
            alert('❌ 没有保存的游戏！');
            return;
        }
        
        const data = JSON.parse(saveData);
        this.gold = data.gold;
        this.lives = data.lives;
        this.wave = data.wave;
        this.isWaveActive = false;
        this.enemies = [];
        this.projectiles = [];
        this.waveQueue = [];
        
        this.towers = data.towers.map(t => {
            const tower = new Tower(t.tileX, t.tileY, t.type);
            tower.level = t.level;
            const towerType = TOWER_TYPES[t.type];
            tower.damage = towerType.damage * (1 + (tower.level - 1) * 0.3);
            tower.range = towerType.range * (1 + (tower.level - 1) * 0.15);
            return tower;
        });
        
        document.getElementById('startWaveBtn').disabled = false;
        document.getElementById('waveInfo').textContent = `📂 已加载存档！从第 ${this.wave + 1} 波继续！`;
        
        this.hideUpgradePanel();
        this.updateUI();
    }
}

// ==================== 防御塔类 ====================
class Tower {
    constructor(tileX, tileY, type) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.x = tileX * CONFIG.tileSize;
        this.y = tileY * CONFIG.tileSize;
        this.type = type;
        this.level = 1;
        
        const config = TOWER_TYPES[type];
        this.damage = config.damage;
        this.range = config.range;
        this.fireRate = config.fireRate;
        this.lastFire = 0;
        this.target = null;
    }
    
    update(deltaTime, enemies, game) {
        const now = Date.now();
        
        // 寻找目标
        this.target = this.findTarget(enemies);
        
        // 攻击
        if (this.target && now - this.lastFire >= this.fireRate) {
            this.fire(game);
            this.lastFire = now;
        }
        
        // 召唤师特殊逻辑
        if (this.type === 'summoner' && now - this.lastFire >= this.fireRate) {
            this.summon(game);
            this.lastFire = now;
        }
    }
    
    findTarget(enemies) {
        let closest = null;
        let closestDist = Infinity;
        
        enemies.forEach(enemy => {
            const dx = enemy.x - (this.x + CONFIG.tileSize/2);
            const dy = enemy.y - (this.y + CONFIG.tileSize/2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist <= this.range && dist < closestDist) {
                closest = enemy;
                closestDist = dist;
            }
        });
        
        return closest;
    }
    
    fire(game) {
        if (!this.target) return;
        
        const config = TOWER_TYPES[this.type];
        const projectile = new Projectile(
            this.x + CONFIG.tileSize/2,
            this.y + CONFIG.tileSize/2,
            this.target,
            this.damage,
            config
        );
        game.projectiles.push(projectile);
    }
    
    summon(game) {
        const config = TOWER_TYPES[this.type];
        for (let i = 0; i < config.summonCount; i++) {
            const summon = new Summon(
                this.x + CONFIG.tileSize/2,
                this.y + CONFIG.tileSize/2,
                config.summonDamage,
                config.summonDuration
            );
            game.summons.push(summon);
        }
    }
    
    render(ctx) {
        const config = TOWER_TYPES[this.type];
        
        // 塔底座
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x + 5, this.y + 5, CONFIG.tileSize - 10, CONFIG.tileSize - 10);
        
        // 塔身
        ctx.fillStyle = config.color;
        ctx.fillRect(this.x + 8, this.y + 8, CONFIG.tileSize - 16, CONFIG.tileSize - 16);
        
        // 塔图标
        ctx.font = '24px Arial';
        ctx.fillText(config.emoji, this.x + 8, this.y + 32);
        
        // 等级星星
        ctx.fillStyle = '#FFD700';
        ctx.font = '10px Arial';
        for (let i = 0; i < this.level; i++) {
            ctx.fillText('⭐', this.x + 5 + i * 12, this.y + 12);
        }
        
        // 射程指示器（如果选中）
        if (game && game.selectedTower === this) {
            ctx.beginPath();
            ctx.arc(this.x + CONFIG.tileSize/2, this.y + CONFIG.tileSize/2, this.range, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
}

// ==================== 敌人类 ====================
class Enemy {
    constructor(type, config) {
        this.type = type;
        this.name = config.name;
        this.emoji = config.emoji;
        this.maxHealth = config.health;
        this.health = config.health;
        this.baseSpeed = config.speed;
        this.speed = config.speed;
        this.reward = config.reward;
        this.color = config.color;
        this.size = config.size;
        this.boss = config.boss || false;
        
        // 特殊能力
        this.explodeDamage = config.explodeDamage || 0;
        this.explodeRange = config.explodeRange || 0;
        this.teleportChance = config.teleportChance || 0;
        this.healAmount = config.healAmount || 0;
        
        // 状态效果
        this.burnDamage = 0;
        this.burnTimer = 0;
        this.slowFactor = 1;
        this.slowTimer = 0;
        
        // 路径
        this.pathIndex = 0;
        this.x = 0;
        this.y = 0;
        this.reachedEnd = false;
        
        // 传送冷却
        this.teleportCooldown = 0;
    }
    
    update(deltaTime, game) {
        // 状态效果更新
        if (this.burnTimer > 0) {
            this.burnTimer -= deltaTime;
            if (this.burnTimer <= 0) {
                this.burnDamage = 0;
            } else {
                this.health -= this.burnDamage * (deltaTime / 1000);
            }
        }
        
        if (this.slowTimer > 0) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.slowFactor = 1;
            }
        }
        
        // 传送逻辑
        if (this.teleportChance > 0 && this.teleportCooldown <= 0) {
            if (Math.random() < this.teleportChance) {
                this.teleport(game);
                this.teleportCooldown = 5000;
            }
        }
        if (this.teleportCooldown > 0) {
            this.teleportCooldown -= deltaTime;
        }
        
        // 移动
        this.move(deltaTime);
        
        // 检查是否到达终点
        if (this.pathIndex >= GAME_PATH.length - 1) {
            this.reachedEnd = true;
            game.lives--;
            
            // 苦力怕到达终点会爆炸
            if (this.explodeDamage > 0) {
                this.explode(game);
            }
        }
    }
    
    move(deltaTime) {
        if (this.pathIndex >= GAME_PATH.length - 1) return;
        
        const currentPos = GAME_PATH[this.pathIndex];
        const nextPos = GAME_PATH[this.pathIndex + 1];
        
        const targetX = nextPos.x * CONFIG.tileSize + CONFIG.tileSize/2;
        const targetY = nextPos.y * CONFIG.tileSize + CONFIG.tileSize/2;
        
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 5) {
            this.pathIndex++;
        } else {
            const moveSpeed = this.baseSpeed * this.slowFactor * (deltaTime / 16);
            this.x += (dx / dist) * moveSpeed;
            this.y += (dy / dist) * moveSpeed;
        }
    }
    
    teleport(game) {
        // 随机传送到路径上的某个位置
        const randomIndex = Math.floor(Math.random() * GAME_PATH.length);
        const pos = GAME_PATH[randomIndex];
        this.x = pos.x * CONFIG.tileSize + CONFIG.tileSize/2;
        this.y = pos.y * CONFIG.tileSize + CONFIG.tileSize/2;
        this.pathIndex = randomIndex;
        
        // 传送特效
        game.createParticles(this.x, this.y, '#4B0082', 15);
    }
    
    explode(game) {
        // 对周围塔造成伤害
        game.towers.forEach(tower => {
            const dx = tower.x + CONFIG.tileSize/2 - this.x;
            const dy = tower.y + CONFIG.tileSize/2 - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist <= this.explodeRange) {
                tower.health = (tower.health || 100) - this.explodeDamage;
            }
        });
        
        game.createParticles(this.x, this.y, '#FF4500', 30);
    }
    
    takeDamage(damage) {
        this.health -= damage;
    }
    
    applyBurn(damage, duration) {
        this.burnDamage = damage;
        this.burnTimer = duration;
    }
    
    applySlow(factor, duration) {
        this.slowFactor = factor;
        this.slowTimer = duration;
    }
    
    render(ctx) {
        // 敌人身体
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // 边框
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 表情
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.emoji, this.x - this.size/2, this.y + this.size/3);
        
        // 血条
        const barWidth = this.size;
        const barHeight = 5;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333333';
        ctx.fillRect(this.x - barWidth/2, this.y - this.size/2 - 10, barWidth, barHeight);
        
        ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
        ctx.fillRect(this.x - barWidth/2, this.y - this.size/2 - 10, barWidth * healthPercent, barHeight);
        
        // Boss 标识
        if (this.boss) {
            ctx.fillStyle = '#FFD700';
            ctx.font = '12px Arial';
            ctx.fillText('👑 BOSS', this.x - 25, this.y - this.size/2 - 15);
        }
        
        // 状态效果图标
        let effectY = this.y + this.size/2 + 15;
        if (this.burnTimer > 0) {
            ctx.fillText('🔥', this.x - 10, effectY);
        }
        if (this.slowTimer > 0) {
            ctx.fillText('❄️', this.x + 10, effectY);
        }
    }
}

// ==================== 投射物类 ====================
class Projectile {
    constructor(x, y, target, damage, config) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.config = config;
        this.speed = config.projectileSpeed;
        this.color = config.projectileColor;
        this.active = true;
        
        // 特殊属性
        this.burnDamage = config.burnDamage || 0;
        this.burnDuration = config.burnDuration || 0;
        this.slowFactor = config.slowFactor || 0;
        this.slowDuration = config.slowDuration || 0;
        this.chainCount = config.chainCount || 0;
        this.chainRange = config.chainRange || 0;
    }
    
    update(deltaTime, game) {
        if (!this.target || this.target.health <= 0) {
            this.active = false;
            return;
        }
        
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 10) {
            // 命中
            this.target.takeDamage(this.damage);
            
            // 特殊效果
            if (this.burnDamage > 0) {
                this.target.applyBurn(this.burnDamage, this.burnDuration);
            }
            if (this.slowFactor > 0) {
                this.target.applySlow(this.slowFactor, this.slowDuration);
            }
            
            // 连锁闪电
            if (this.chainCount > 0) {
                this.chainLightning(game);
            }
            
            // 命中特效
            game.createParticles(this.x, this.y, this.color, 5);
            
            this.active = false;
            
            // 敌人死亡
            if (this.target.health <= 0) {
                game.gold += this.target.reward;
                game.createParticles(this.target.x, this.target.y, this.target.color, 15);
            }
        } else {
            // 移动
            const moveDist = this.speed * (deltaTime / 16);
            this.x += (dx / dist) * moveDist;
            this.y += (dy / dist) * moveDist;
        }
    }
    
    chainLightning(game) {
        let currentTarget = this.target;
        let remainingChains = this.chainCount;
        
        while (remainingChains > 0) {
            // 寻找附近的其他敌人
            let nextTarget = null;
            let closestDist = this.chainRange;
            
            game.enemies.forEach(enemy => {
                if (enemy !== currentTarget && enemy.health > 0) {
                    const dx = enemy.x - currentTarget.x;
                    const dy = enemy.y - currentTarget.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < closestDist) {
                        nextTarget = enemy;
                        closestDist = dist;
                    }
                }
            });
            
            if (nextTarget) {
                nextTarget.takeDamage(this.damage * 0.7);
                currentTarget = nextTarget;
                remainingChains--;
                
                // 闪电链特效
                game.projectiles.push(new ChainLightning(
                    currentTarget.x, currentTarget.y, nextTarget.x, nextTarget.y, this.color
                ));
            } else {
                break;
            }
        }
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // 发光效果
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// 闪电链特效
class ChainLightning {
    constructor(x1, y1, x2, y2, color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.life = 200;
        this.active = true;
    }
    
    update(deltaTime) {
        this.life -= deltaTime;
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    render(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = this.life / 200;
        
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        
        // 锯齿状闪电
        const segments = 5;
        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const x = this.x1 + (this.x2 - this.x1) * t;
            const y = this.y1 + (this.y2 - this.y1) * t;
            const offset = (Math.random() - 0.5) * 20;
            ctx.lineTo(x + offset, y + offset);
        }
        
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

// ==================== 召唤物类 ====================
class Summon {
    constructor(x, y, damage, duration) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.maxLifeTime = duration;
        this.lifeTime = duration;
        this.health = 30;
        this.target = null;
        this.attackCooldown = 0;
        this.attackRate = 1000;
    }
    
    update(deltaTime, enemies, game) {
        this.lifeTime -= deltaTime;
        this.attackCooldown -= deltaTime;
        
        // 寻找目标
        if (!this.target || this.target.health <= 0) {
            this.target = this.findTarget(enemies);
        }
        
        // 攻击
        if (this.target && this.attackCooldown <= 0) {
            this.target.takeDamage(this.damage);
            this.attackCooldown = this.attackRate;
            
            if (this.target.health <= 0) {
                game.gold += this.target.reward;
            }
        }
        
        // 跟随目标移动
        if (this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 50) {
                this.x += (dx / dist) * 2;
                this.y += (dy / dist) * 2;
            }
        }
    }
    
    findTarget(enemies) {
        let closest = null;
        let closestDist = 200;
        
        enemies.forEach(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < closestDist) {
                closest = enemy;
                closestDist = dist;
            }
        });
        
        return closest;
    }
    
    render(ctx) {
        ctx.fillStyle = 'rgba(147, 112, 219, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.font = '16px Arial';
        ctx.fillText('👻', this.x - 8, this.y + 5);
        
        // 剩余时间指示
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Arial';
        const timePercent = this.lifeTime / this.maxLifeTime;
        ctx.fillText(Math.ceil(timePercent * 10) + 's', this.x - 10, this.y - 20);
    }
}

// ==================== 粒子类 ====================
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 1000;
        this.maxLife = 1000;
        this.size = Math.random() * 6 + 2;
    }
    
    update(deltaTime) {
        this.life -= deltaTime;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // 重力
        this.size *= 0.98;
    }
    
    render(ctx) {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// ==================== 启动游戏 ====================
let game;
window.onload = () => {
    console.log('🎮 游戏开始加载...');
    const debugDiv = document.getElementById('debugInfo');
    if (debugDiv) {
        debugDiv.innerHTML = '✅ 游戏已加载<br>Canvas: ' + CONFIG.canvasWidth + 'x' + CONFIG.canvasHeight + '<br>塔类型：' + Object.keys(TOWER_TYPES).length + ' 种<br>敌人类型：' + Object.keys(ENEMY_TYPES).length + ' 种';
    }
    try {
        game = new TowerDefenseGame();
        console.log('✅ 游戏初始化成功！');
    } catch (e) {
        console.error('❌ 游戏初始化失败:', e);
        if (debugDiv) {
            debugDiv.innerHTML = '❌ 错误：' + e.message;
        }
    }
};
