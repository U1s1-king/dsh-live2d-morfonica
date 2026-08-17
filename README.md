# dsh-live2d-morfonica

**Morfonica Live2D 桌宠插件** for [DeepSeek Harness](https://github.com/deepseek-ai)（本地模型同源加载，零外部依赖）。

## 收录

**Morfonica**：倉田真白 MASHIRO（主唱）、桐谷透子 TOUKO（吉他）、広町七深 NANAMI（贝斯）、二葉筑紫 TSUKUSHI（鼓手）、八潮瑠唯 RUI（小提琴），合计 **262 套换装**（Cubism 2）。

> 模型取自 BANDORI 独立版 Live2D 数据（`D:\za\文件\models` 的 zst 包），与 Roselia / RAS / HHW 插件同源；本地模型 + 本地运行时，**完全离线**。

## 功能

- 右下角 Live2D 看板娘（5 角色），支持拖拽
- 角色切换 + 换装面板（262 套换装）
- 桌面宠物（点击 / 抚摸 / 拖拽互动）
- 表情包 + 每日问候 + 节日祝福（按季节 / 时刻 / 操作触发台词）
- 模型位置、显示状态自动记忆（独立 localStorage 键 `mofu-waifu-*`，互不干扰）

## 安装

```bash
dsh plugin --profile web add D:\dsh\dsh-live2d-morfonica
dsh web
```

## 结构

```
src/
  index.ts          # host 半区：cordis 插件入口（inject webServer）
  routes.ts         # 静态资源路由（/mofu-assets）
  client/
    index.ts        # client 半区：__ModuleLoader__ 挂载 + VENDOR 加载
    waifu/
      characters.js # 角色元数据
      config.js     # 通用配置（状态 / 位置 / 面板）
      modelList.js  # 模型列表（由 assets/model 生成）
      tips.js       # 台词包（5 角色人设台词）
      model.js      # Live2D 模型加载（index.json + 动作过滤）
      tools.js      # 工具按钮（换装 / 拍照 / 信息 / 退出）
assets/
  model/            # 模型资源
  vendor/           # live2d.min.js / pixi.min.js / live2d-display.cubism2.min.js
  waifu.css         # 桌宠样式（右上角定位 + z-index 防遮挡）
  character.png     # 角色图
  assets/           # 角色头像（chara_icon_19/42/25/44/33.png）
```

## 说明

- **路由前缀**：`/mofu-assets`（与 Roselia `/ro-assets`、MyGO `/pet-assets`、RAS `/ras-assets`、HHW `/hhw-assets` 互不冲突，可多插件共存）
- **localStorage**：使用 `mofu-waifu-waifu-display` / `mofu-waifu-waifu-pos` 独立键，与其他桌宠插件隔离
- **模型来源**：BANDORI 独立版全量数据（zst 压缩包解压转换），model.json → index.json
- **台词包**：按 5 角色人设撰写（MASHIRO 内向害羞·星空诗人 / TOUKO 元气风云人物 / NANAMI 温柔治愈 / TSUKUSHI 认真努力 / RUI 冷静天才）
