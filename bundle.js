// 金庸武侠MVU系统 - SillyTavern扩展
// 版本: 1.0.0
// 作者: 金庸武侠项目组

(function(window) {
  'use strict';

  console.log('金庸武侠MVU扩展正在加载...');

  // MVU变量定义
  const MVU_VARIABLES = {
    world_time_year: { name: '世界_时间_年', type: 'number', default: 2025, min: 1000, max: 9999 },
    world_time_month: { name: '世界_时间_月', type: 'number', default: 1, min: 1, max: 12 },
    world_time_day: { name: '世界_时间_日', type: 'number', default: 1, min: 1, max: 30 },
    world_time_hour: { name: '世界_时间_时辰', type: 'string', default: '辰时', enum: ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'] },
    world_weather: { name: '世界_天气', type: 'string', default: '晴', enum: ['晴', '阴', '雨', '雪', '雾', '风', '雷', '多云'] },
    world_location_region: { name: '世界_位置_区域', type: 'string', default: '江南' },
    world_location_place: { name: '世界_位置_地点', type: 'string', default: '桃花岛' },
    protagonist_name: { name: '主角_姓名', type: 'string', default: '郭靖' },
    protagonist_gender: { name: '主角_性别', type: 'string', default: '男', enum: ['男', '女'] },
    protagonist_age: { name: '主角_年龄', type: 'number', default: 18, min: 10, max: 100 },
    protagonist_reputation: { name: '主角_名声值', type: 'number', default: 20, min: 0, max: 100 },
    protagonist_reputation_desc: { name: '主角_名声描述', type: 'string', default: '无名小卒', enum: ['无名小卒', '江湖好手', '一方豪侠', '武林泰斗'] },
    protagonist_martial_realm: { name: '主角_武学境界', type: 'string', default: '三流', enum: ['不入流', '三流', '二流', '一流', '绝顶', '宗师', '大宗师', '传说'] },
    protagonist_inner_power: { name: '主角_内力', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_bone_structure: { name: '主角_根骨', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_external_skill: { name: '主角_外功', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_external_defense: { name: '主角_外防', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_internal_skill: { name: '主角_内功', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_internal_defense: { name: '主角_内防', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_comprehension: { name: '主角_悟性', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_luck: { name: '主角_福缘', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_charisma: { name: '主角_魅力', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_current_hp: { name: '主角_当前气血', type: 'number', default: 1000, min: 0, max: 1000 },
    protagonist_max_hp: { name: '主角_最大气血', type: 'number', default: 1000, min: 100, max: 1000 },
    protagonist_current_mp: { name: '主角_当前内力', type: 'number', default: 100, min: 0, max: 1000 },
    protagonist_status: { name: '主角_状态', type: 'string', default: '正常', enum: ['正常', '轻伤', '重伤', '垂危', '死亡', '闭关', '修炼', '中毒', '虚弱', '兴奋'] },
    protagonist_weapon: { name: '主角_武器', type: 'string', default: '无' },
    protagonist_armor: { name: '主角_防具', type: 'string', default: '无' },
    protagonist_accessory: { name: '主角_饰品', type: 'string', default: '无' },
    protagonist_manuals_learned: { name: '主角_武学秘籍_已习得', type: 'array', default: [] },
    protagonist_manual_current: { name: '主角_武学秘籍_当前', type: 'string', default: '无' },
    protagonist_skills_learned: { name: '主角_武功技能_已习得', type: 'array', default: [] },
    protagonist_skill_current: { name: '主角_武功技能_当前', type: 'string', default: '无' },
    protagonist_weapons_owned: { name: '主角_兵器暗器_已拥有', type: 'array', default: [] },
    protagonist_weapon_current: { name: '主角_兵器暗器_当前', type: 'string', default: '无' },
    protagonist_pills_owned: { name: '主角_丹药_已拥有', type: 'array', default: [] },
    protagonist_pill_current: { name: '主角_丹药_当前', type: 'string', default: '无' },
    protagonist_adventures_completed: { name: '主角_奇遇_已完成', type: 'array', default: [] },
    protagonist_adventure_current: { name: '主角_奇遇_当前', type: 'string', default: '无' },
    protagonist_friends: { name: '主角_人际关系_好友', type: 'array', default: [] },
    protagonist_enemies: { name: '主角_人际关系_仇敌', type: 'array', default: [] },
    protagonist_sect: { name: '主角_门派', type: 'string', default: '无门无派' },
    protagonist_sect_position: { name: '主角_门派_职位', type: 'string', default: '无' },
    story_chapter: { name: '剧情_章节', type: 'string', default: '初入江湖' },
    story_main_progress: { name: '剧情_主线进度', type: 'number', default: 0, min: 0, max: 100 },
    story_sidequests_completed: { name: '剧情_支线任务_已完成', type: 'array', default: [] },
    story_sidequest_current: { name: '剧情_支线任务_当前', type: 'string', default: '无' },
    system_last_update: { name: '系统_上次更新时间', type: 'string', default: '' },
    system_update_count: { name: '系统_更新次数', type: 'number', default: 0, min: 0 }
  };

  // 触发规则
  const MVU_TRIGGERS = {
    time_passage: {
      name: '时间流逝',
      keywords: ['过了', '几日', '数日', '半月', '一月', '数月', '一年', '次日', '翌日', '黄昏', '黎明', '夜晚', '白昼'],
      action: 'update_time',
      description: '检测到时间流逝相关关键词时自动更新时间变量'
    },
    combat: {
      name: '战斗发生',
      keywords: ['战斗', '交手', '对决', '比武', '厮杀', '受伤', '重伤', '击败', '击杀'],
      action: 'update_combat',
      description: '检测到战斗相关关键词时更新战斗状态和气血'
    },
    cultivation: {
      name: '修炼提升',
      keywords: ['修炼', '练功', '突破', '精进', '领悟', '习得', '学会'],
      action: 'update_cultivation',
      description: '检测到修炼相关关键词时更新武学数值'
    },
    adventure: {
      name: '奇遇触发',
      keywords: ['奇遇', '机缘', '秘籍', '宝物', '高人', '指点', '传授'],
      action: 'update_adventure',
      description: '检测到奇遇相关关键词时更新奇遇状态'
    },
    location_change: {
      name: '位置移动',
      keywords: ['前往', '来到', '到达', '离开', '赶路', '游历', '闯荡'],
      action: 'update_location',
      description: '检测到位置移动相关关键词时更新位置变量'
    },
    relationship_change: {
      name: '人际变化',
      keywords: ['结识', '结交', '结怨', '结仇', '拜师', '入派', '背叛'],
      action: 'update_relationship',
      description: '检测到人际变化相关关键词时更新人际关系'
    }
  };

  // 更新规则
  const MVU_RULES = {
    max_value_limit: {
      name: '数值上限',
      rule: '所有数值类型变量不得超过1000，超过时自动截断为1000',
      description: '所有数值上限为1000点'
    },
    value_sync: {
      name: '数值同步',
      rule: '当内力、根骨等核心数值变化时，自动更新最大气血、武学境界等相关变量',
      description: '数值变化时同步更新相关变量'
    },
    status_check: {
      name: '状态检查',
      rule: '根据气血值自动更新主角当前状态（正常/轻伤/重伤/垂危）',
      description: '定期检查主角状态'
    },
    reputation_calc: {
      name: '名声计算',
      rule: '名声值0-20：无名小卒；20-50：江湖好手；50-80：一方豪侠；80-100：武林泰斗',
      description: '根据名声值自动生成名声描述'
    },
    realm_judgment: {
      name: '境界判断',
      rule: '综合数值<100：不入流；100-300：三流；300-500：二流；500-700：一流；700-850：绝顶；850-950：宗师；950-990：大宗师；990-1000：传说',
      description: '根据综合数值判断武学境界'
    }
  };

  // 提示词模板
  const MVU_PROMPT = `你是一个专业的金庸武侠世界变量管理系统，负责根据剧情发展自动更新主角状态变量。请严格按照以下规则执行变量更新任务。

【核心原则】

铁律一：完整性原则
- 严禁留空与未知：所有变量必须有明确数值，不得使用"未知"、"未定义"等模糊表述
- 数值必须合理：所有数值必须在定义的范围内（0-1000）
- 状态必须明确：状态变量必须使用预定义的枚举值

铁律二：同步性原则
- 位置与坐标必须同步：区域和具体地点必须保持逻辑一致性
- 数值与状态必须同步：气血值变化必须同步更新主角当前状态
- 境界与数值必须同步：武学境界必须与综合数值相匹配

铁律三：时效性原则
- 主动清理过期变量：定期检查并更新过时的状态和位置信息
- 时间流逝必须合理：时间变化必须有合理的剧情支撑
- 状态变化必须及时：战斗、受伤、修炼等事件必须立即更新相关变量

【变量更新规则】

时间变量更新
触发条件：检测到时间流逝关键词（"过了"、"几日"、"数日"、"半月"、"一月"、"数月"、"一年"、"次日"、"翌日"、"黄昏"、"黎明"、"夜晚"、"白昼"）
更新规则：
- 日变量：每次检测到"次日"、"翌日"时，日变量+1，满30则归1且月变量+1
- 月变量：每次检测到"数月"、"一月"等时，月变量增加相应数值，满12则归1且年变量+1
- 年变量：每次检测到"一年"、"数年"等时，年变量增加相应数值
- 时辰变量：根据剧情描述的时辰更新为对应的时辰值
- 年龄变量：年变量增加时，年龄变量自动+1

战斗变量更新
触发条件：检测到战斗关键词（"战斗"、"交手"、"对决"、"比武"、"厮杀"、"受伤"、"重伤"、"击败"、"击杀"）
更新规则：
- 气血值更新：轻伤-100~300，重伤-300~600，垂危-600~900
- 状态更新：当前气血>700状态="正常"，400~700状态="轻伤"，100~400状态="重伤"，<100状态="垂危"
- 名声值更新：击败高手+3~10，击杀绝顶高手+10，滥杀无辜-5~8
- 外功/内功更新：激烈战斗外功+1~3内功+1~3，轻松取胜外功+0~1内功+0~1

修炼变量更新
触发条件：检测到修炼关键词（"修炼"、"练功"、"突破"、"精进"、"领悟"、"习得"、"学会"）
更新规则：
- 内力更新：普通修炼+1~5，高人指点+5~15，奇遇机缘+15~30
- 根骨更新：修炼内功+0~2，服用丹药+2~10
- 外功/内功更新：修炼招式+1~5，修炼内功+1~5
- 武学境界更新：综合数值<100不入流，100~300三流，300~500二流，500~700一流，700~850绝顶，850~950宗师，950~990大宗师，990~1000传说

奇遇变量更新
触发条件：检测到奇遇关键词（"奇遇"、"机缘"、"秘籍"、"宝物"、"高人"、"指点"、"传授"）
更新规则：
- 福缘检查：福缘值越高，奇遇概率越大（福缘<300概率低，300~700概率中等，>700概率高）
- 奇遇奖励：获得秘籍添加到武学秘籍已拥有列表，获得兵器添加到兵器暗器已拥有列表，获得丹药添加到丹药已拥有列表，高人指点大幅提升相关数值+10~30
- 悟性影响：悟性越高，奇遇收益越大（悟性<300收益减半，300~700收益正常，>700收益加倍）

位置变量更新
触发条件：检测到移动关键词（"前往"、"来到"、"到达"、"离开"、"赶路"、"游历"、"闯荡"）
更新规则：
- 区域更新：根据目的地更新区域变量，保持地理位置的连贯性（符合金庸武侠的地域设定）
- 具体地点更新：每次场景变化时更新具体地点，区域和具体地点必须保持逻辑一致性

人际关系更新
触发条件：检测到人际变化关键词（"结识"、"结交"、"结怨"、"结仇"、"拜师"、"入派"、"背叛"）
更新规则：
- 好友更新：结识新朋友添加到人际关系好友列表，魅力值越高，结识朋友概率越大
- 仇敌更新：结下仇怨添加到人际关系仇敌列表，滥杀无辜、背叛门派会增加仇敌
- 门派更新：拜师入派更新人际关系门派和人际关系门派职位，背叛门派从原门派移除，可能添加到仇敌列表

【数值上限规则】
核心规则：所有数值类型变量的上限为1000点，超过1000时自动截断为1000

【名声计算规则】
自动生成规则：名声值0~20名声描述="无名小卒"，20~50名声描述="江湖好手"，50~80名声描述="一方豪侠"，80~100名声描述="武林泰斗"
更新时机：每次名声值变化后自动更新名声描述

【境界判断规则】
综合数值计算：综合数值=(内力+根骨+外功+外防+内功+内防)/6
境界判断：综合数值<100武学境界="不入流"，100~300武学境界="三流"，300~500武学境界="二流"，500~700武学境界="一流"，700~850武学境界="绝顶"，850~950武学境界="宗师"，950~990武学境界="大宗师"，990~1000武学境界="传说"

【输出格式】
请以JSON格式输出更新的变量，格式如下：
{
  "updated_variables": {
    "变量名": "新值"
  },
  "trigger_type": "触发类型",
  "update_reason": "更新原因"
}

【注意事项】
1. 合理性优先：所有变量更新必须符合金庸武侠世界的逻辑和设定
2. 数值平衡：避免数值增长过快，保持游戏平衡性
3. 剧情连贯：变量更新必须与剧情发展保持一致
4. 及时更新：重要事件发生后必须立即更新相关变量
5. 完整性检查：每次更新后检查所有变量是否完整、合理`;

  // MVU系统类
  class MVUSystem {
    constructor() {
      this.variables = {};
      this.triggers = MVU_TRIGGERS;
      this.rules = MVU_RULES;
      this.prompt = MVU_PROMPT;
      this.initialized = false;
    }

    // 初始化变量
    init() {
      for (const [key, config] of Object.entries(MVU_VARIABLES)) {
        this.variables[key] = config.default;
      }
      this.initialized = true;
      console.log('MVU系统初始化完成，共', Object.keys(this.variables).length, '个变量');
      this.saveToLocalStorage();
    }

    // 从localStorage加载
    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('jinyong_mvu_variables');
        if (saved) {
          const parsed = JSON.parse(saved);
          this.variables = { ...this.variables, ...parsed };
          console.log('从localStorage加载MVU变量成功');
        }
      } catch (e) {
        console.error('加载MVU变量失败:', e);
      }
    }

    // 保存到localStorage
    saveToLocalStorage() {
      try {
        localStorage.setItem('jinyong_mvu_variables', JSON.stringify(this.variables));
      } catch (e) {
        console.error('保存MVU变量失败:', e);
      }
    }

    // 获取变量
    getVariable(name) {
      return this.variables[name];
    }

    // 设置变量
    setVariable(name, value) {
      const config = MVU_VARIABLES[name];
      if (!config) {
        console.warn('未知变量:', name);
        return false;
      }

      // 验证类型
      if (config.type === 'number') {
        value = Number(value);
        if (isNaN(value)) {
          console.warn('数值类型变量必须是数字:', name, value);
          return false;
        }
        // 检查范围
        if (config.min !== undefined && value < config.min) {
          value = config.min;
        }
        if (config.max !== undefined && value > config.max) {
          value = config.max;
        }
      } else if (config.type === 'string' && config.enum) {
        if (!config.enum.includes(value)) {
          console.warn('枚举值不在允许范围内:', name, value);
          return false;
        }
      } else if (config.type === 'array') {
        if (!Array.isArray(value)) {
          value = [value];
        }
      }

      this.variables[name] = value;
      this.saveToLocalStorage();
      return true;
    }

    // 添加到数组变量
    addToArray(name, value) {
      const config = MVU_VARIABLES[name];
      if (!config || config.type !== 'array') {
        console.warn('只能添加到数组类型变量:', name);
        return false;
      }

      if (!Array.isArray(this.variables[name])) {
        this.variables[name] = [];
      }

      if (!this.variables[name].includes(value)) {
        this.variables[name].push(value);
        this.saveToLocalStorage();
        return true;
      }
      return false;
    }

    // 从数组变量删除
    removeFromArray(name, value) {
      const config = MVU_VARIABLES[name];
      if (!config || config.type !== 'array') {
        console.warn('只能从数组类型变量删除:', name);
        return false;
      }

      if (Array.isArray(this.variables[name])) {
        const index = this.variables[name].indexOf(value);
        if (index > -1) {
          this.variables[name].splice(index, 1);
          this.saveToLocalStorage();
          return true;
        }
      }
      return false;
    }

    // 检测触发关键词
    detectTriggers(text) {
      const detected = [];
      for (const [key, trigger] of Object.entries(this.triggers)) {
        for (const keyword of trigger.keywords) {
          if (text.includes(keyword)) {
            detected.push({ key, trigger, keyword });
            break;
          }
        }
      }
      return detected;
    }

    // 计算武学境界
    calculateRealm() {
      const avgValue = (
        this.variables.protagonist_inner_power +
        this.variables.protagonist_bone_structure +
        this.variables.protagonist_external_skill +
        this.variables.protagonist_external_defense +
        this.variables.protagonist_internal_skill +
        this.variables.protagonist_internal_defense
      ) / 6;

      let realm;
      if (avgValue < 100) realm = '不入流';
      else if (avgValue < 300) realm = '三流';
      else if (avgValue < 500) realm = '二流';
      else if (avgValue < 700) realm = '一流';
      else if (avgValue < 850) realm = '绝顶';
      else if (avgValue < 950) realm = '宗师';
      else if (avgValue < 990) realm = '大宗师';
      else realm = '传说';

      this.setVariable('protagonist_martial_realm', realm);
      return realm;
    }

    // 计算名声描述
    calculateReputationDesc() {
      const reputation = this.variables.protagonist_reputation;
      let desc;
      if (reputation < 20) desc = '无名小卒';
      else if (reputation < 50) desc = '江湖好手';
      else if (reputation < 80) desc = '一方豪侠';
      else desc = '武林泰斗';

      this.setVariable('protagonist_reputation_desc', desc);
      return desc;
    }

    // 计算状态
    calculateStatus() {
      const hp = this.variables.protagonist_current_hp;
      const maxHp = this.variables.protagonist_max_hp;
      const ratio = hp / maxHp;

      let status;
      if (ratio > 0.7) status = '正常';
      else if (ratio > 0.4) status = '轻伤';
      else if (ratio > 0.1) status = '重伤';
      else status = '垂危';

      this.setVariable('protagonist_status', status);
      return status;
    }

    // 更新系统时间
    updateSystemTime() {
      const now = new Date();
      this.setVariable('system_last_update', now.toISOString());
      this.setVariable('system_update_count', this.variables.system_update_count + 1);
    }

    // 获取所有变量
    getAllVariables() {
      return { ...this.variables };
    }

    // 获取变量状态字符串
    getStatusString() {
      return `【MVU状态同步】

主角姓名：${this.variables.protagonist_name}
主角年龄：${this.variables.protagonist_age}岁
武学境界：${this.variables.protagonist_martial_realm}
名声值：${this.variables.protagonist_reputation}/100
名声描述：${this.variables.protagonist_reputation_desc}
当前状态：${this.variables.protagonist_status}

【核心数值】
内力：${this.variables.protagonist_inner_power}/1000
根骨：${this.variables.protagonist_bone_structure}/1000
外功：${this.variables.protagonist_external_skill}/1000
外防：${this.variables.protagonist_external_defense}/1000
内功：${this.variables.protagonist_internal_skill}/1000
内防：${this.variables.protagonist_internal_defense}/1000
悟性：${this.variables.protagonist_comprehension}/1000
福缘：${this.variables.protagonist_luck}/1000
魅力：${this.variables.protagonist_charisma}/1000

【状态信息】
当前气血：${this.variables.protagonist_current_hp}/${this.variables.protagonist_max_hp}
当前内力：${this.variables.protagonist_current_mp}/1000

【装备信息】
武器：${this.variables.protagonist_weapon}
防具：${this.variables.protagonist_armor}
饰品：${this.variables.protagonist_accessory}

【当前位置】
区域：${this.variables.world_location_region}
具体地点：${this.variables.world_location_place}

【时间信息】
年份：${this.variables.world_time_year}年
月份：${this.variables.world_time_month}月
日期：${this.variables.world_time_day}日
时辰：${this.variables.world_time_hour}
天气：${this.variables.world_weather}`;
    }
  }

  // 创建全局实例
  const mvuSystem = new MVUSystem();

  // 尝试从localStorage加载，否则初始化
  mvuSystem.loadFromLocalStorage();
  if (!mvuSystem.initialized) {
    mvuSystem.init();
  }

  // 导出到全局
  window.JinyongMVU = {
    system: mvuSystem,
    variables: MVU_VARIABLES,
    triggers: MVU_TRIGGERS,
    rules: MVU_RULES,
    prompt: MVU_PROMPT,
    version: '1.0.0'
  };

  console.log('金庸武侠MVU扩展加载完成！');
  console.log('可用命令:');
  console.log('  - JinyongMVU.system.getVariable("变量名")');
  console.log('  - JinyongMVU.system.setVariable("变量名", 值)');
  console.log('  - JinyongMVU.system.getStatusString()');
  console.log('  - JinyongMVU.system.detectTriggers("文本")');

  // 监听SillyTavern事件（如果可用）
  if (typeof eventOn !== 'undefined') {
    eventOn('mag_variable_initialized', (event, detail) => {
      console.log('MVU变量初始化事件触发');
      if (!mvuSystem.initialized) {
        mvuSystem.init();
      }
    });

    eventOn('mag_command_parsed', (event, detail) => {
      console.log('MVU命令解析事件触发:', detail);
    });
  }

})(typeof window !== 'undefined' ? window : global);