# 金庸武侠MVU系统 - SillyTavern扩展

基于金庸大乱炖世界观的MVU（多变量更新）系统，支持中文剧情触发状态变更。

## 快速开始

### 在SillyTavern中使用

1. 打开SillyTavern酒馆助手
2. 点击顶部菜单中的"扩展"（Extensions）
3. 点击"安装扩展"（Install Extension）
4. 在输入框中粘贴以下地址：
   ```
   https://testingcf.jsdelivr.net/gh/dengyanyu1994-art/jinyong-mvu@main/bundle.js
   ```
5. 点击"为所有用户安装"（Install for all users）
6. 等待安装完成

### 验证安装

在聊天框输入：
```javascript
JinyongMVU.system.getStatusString()
```

如果系统显示所有MVU变量的当前值，说明安装成功！

## 功能特性

- ✅ 49个MVU变量（世界、主角、状态、装备、武学、物品、奇遇、人际关系、剧情、系统）
- ✅ 6种触发规则（时间流逝、战斗发生、修炼提升、奇遇触发、位置移动、人际变化）
- ✅ 5大更新规则（数值上限、数值同步、状态检查、名声计算、境界判断）
- ✅ 完整的提示词模板
- ✅ 事件驱动的变量更新机制
- ✅ localStorage持久化存储
- ✅ 自动同步到世界书

## 使用方法

### 基础使用

1. 在聊天框输入剧情文本，例如：
   ```
   郭靖来到桃花岛，见到了黄蓉
   ```

2. 系统会自动：
   - 检测触发关键词
   - 更新相关MVU变量
   - 同步到世界书

### 查看变量状态

在聊天中输入：
```javascript
JinyongMVU.system.getStatusString()
```

### 手动修改变量

```javascript
// 设置变量
JinyongMVU.system.setVariable('protagonist_inner_power', 500)

// 添加到数组
JinyongMVU.system.addToArray('protagonist_friends', '黄蓉')

// 从数组删除
JinyongMVU.system.removeFromArray('protagonist_enemies', '欧阳锋')

// 获取变量
JinyongMVU.system.getVariable('protagonist_name')
```

### 检测触发关键词

```javascript
const triggers = JinyongMVU.system.detectTriggers('郭靖与欧阳锋激战，身受重伤')
console.log(triggers)
// 输出: [{ key: 'combat', trigger: {...}, keyword: '激战' }]
```

## 变量列表

### 世界变量（7个）
- `world_time_year` - 当前年份
- `world_time_month` - 当前月份（1-12）
- `world_time_day` - 当前日期（1-30）
- `world_time_hour` - 当前时辰
- `world_weather` - 当前天气
- `world_location_region` - 当前区域
- `world_location_place` - 当前具体地点

### 主角信息变量（15个）
- `protagonist_name` - 主角姓名
- `protagonist_gender` - 主角性别
- `protagonist_age` - 主角当前年龄
- `protagonist_reputation` - 主角名声值（0-100）
- `protagonist_reputation_desc` - 主角名声描述
- `protagonist_martial_realm` - 主角武学境界
- `protagonist_inner_power` - 主角内力（0-1000）
- `protagonist_bone_structure` - 主角根骨（0-1000）
- `protagonist_external_skill` - 主角外功（0-1000）
- `protagonist_external_defense` - 主角外防（0-1000）
- `protagonist_internal_skill` - 主角内功（0-1000）
- `protagonist_internal_defense` - 主角内防（0-1000）
- `protagonist_comprehension` - 主角悟性（0-1000）
- `protagonist_luck` - 主角福缘（0-1000）
- `protagonist_charisma` - 主角魅力（0-1000）

### 状态变量（4个）
- `protagonist_current_hp` - 主角当前气血（0-1000）
- `protagonist_max_hp` - 主角最大气血（0-1000）
- `protagonist_current_mp` - 主角当前内力（0-1000）
- `protagonist_status` - 主角当前状态

### 装备变量（3个）
- `protagonist_weapon` - 主角当前装备的武器
- `protagonist_armor` - 主角当前装备的防具
- `protagonist_accessory` - 主角当前装备的饰品

### 武学变量（4个）
- `protagonist_manuals_learned` - 主角已习得的武学秘籍列表
- `protagonist_manual_current` - 主角当前正在修炼的武学秘籍
- `protagonist_skills_learned` - 主角已习得的武功技能列表
- `protagonist_skill_current` - 主角当前正在修炼的武功技能

### 物品变量（4个）
- `protagonist_weapons_owned` - 主角已拥有的兵器暗器列表
- `protagonist_weapon_current` - 主角当前使用的兵器暗器
- `protagonist_pills_owned` - 主角已拥有的丹药列表
- `protagonist_pill_current` - 主角当前使用的丹药

### 奇遇变量（2个）
- `protagonist_adventures_completed` - 主角已完成的奇遇列表
- `protagonist_adventure_current` - 主角当前进行的奇遇

### 人际关系变量（4个）
- `protagonist_friends` - 主角的好友列表
- `protagonist_enemies` - 主角的仇敌列表
- `protagonist_sect` - 主角所属门派
- `protagonist_sect_position` - 主角在门派中的职位

### 剧情变量（4个）
- `story_chapter` - 当前剧情章节
- `story_main_progress` - 主线剧情进度百分比（0-100）
- `story_sidequests_completed` - 已完成的支线任务列表
- `story_sidequest_current` - 当前进行的支线任务

### 系统变量（2个）
- `system_last_update` - 上次变量更新时间
- `system_update_count` - 变量更新总次数

## 触发规则

系统定义了6种触发规则，当检测到相关关键词时自动更新变量：

1. **时间流逝**：过了、几日、数日、半月、一月、数月、一年、次日、翌日、黄昏、黎明、夜晚、白昼
2. **战斗发生**：战斗、交手、对决、比武、厮杀、受伤、重伤、击败、击杀
3. **修炼提升**：修炼、练功、突破、精进、领悟、习得、学会
4. **奇遇触发**：奇遇、机缘、秘籍、宝物、高人、指点、传授
5. **位置移动**：前往、来到、到达、离开、赶路、游历、闯荡
6. **人际变化**：结识、结交、结怨、结仇、拜师、入派、背叛

## 更新规则

系统遵循5大更新规则：

1. **数值上限规则**：所有数值类型变量的上限为1000点
2. **数值同步规则**：数值变化时同步更新相关变量
3. **状态检查规则**：根据气血值自动更新主角当前状态
4. **名声计算规则**：根据名声值自动生成名声描述
5. **境界判断规则**：根据综合数值判断武学境界

## 部署到GitHub

### 1. 创建GitHub仓库

1. 访问 https://github.com/new
2. 创建新仓库，命名为 `jinyong-mvu`
3. 设置为公开仓库（Public）
4. 点击"Create repository"

### 2. 上传文件

将以下文件上传到仓库根目录：
- `bundle.js` - 扩展主文件
- `README.md` - 说明文档

### 3. 获取CDN链接

使用jsDelivr CDN访问文件：

```
https://testingcf.jsdelivr.net/gh/dengyanyu1994-art/jinyong-mvu@main/bundle.js
```

例如，如果你的GitHub用户名是 `username`，链接就是：

```
https://testingcf.jsdelivr.net/gh/dengyanyu1994-art/jinyong-mvu@main/bundle.js
```

### 4. 在SillyTavern中导入

1. 打开SillyTavern酒馆助手
2. 点击顶部菜单中的"扩展"（Extensions）
3. 点击"安装扩展"（Install Extension）
4. 在输入框中粘贴CDN链接
5. 点击"为所有用户安装"（Install for all users）

## 开发

### 本地开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/dengyanyu1994-art/jinyong-mvu.git
   cd jinyong-mvu
   ```

2. 修改 `bundle.js` 文件

3. 测试修改：
   - 在浏览器中打开SillyTavern
   - 在控制台中测试扩展功能

4. 提交更改：
   ```bash
   git add .
   git commit -m "更新描述"
   git push origin main
   ```

### 版本管理

使用Git标签管理版本：

```bash
git tag v1.0.0
git push origin v1.0.0
```

使用特定版本的CDN链接：

```
https://testingcf.jsdelivr.net/gh/dengyanyu1994-art/jinyong-mvu@v1.0.0/bundle.js
```

## 技术支持

- GitHub Issues: https://github.com/dengyanyu1994-art/jinyong-mvu/issues
- SillyTavern GitHub: https://github.com/SillyTavern/SillyTavern
- SillyTavern Discord: https://discord.gg/sillytavern
- SillyTavern文档: https://docs.sillytavern.app/

## 许可证

MIT License

## 更新日志

### v1.0.0 (2026-02-21)
- 初始版本发布
- 实现49个MVU变量
- 实现6种触发规则
- 实现5大更新规则
- 完整的提示词模板
- localStorage持久化存储
- 支持CDN部署

## 贡献

欢迎提交Issue和Pull Request！

## 致谢

- 感谢SillyTavern项目提供的扩展系统
- 感谢jsDelivr提供的CDN服务

- 感谢金庸先生创造的武侠世界
