# 关键词与承接页映射审计

审计日期：2026-04-16

## 审计口径

- 目标 canonical 页来源：`docs/seo-priority-pages-brief.md`
- 站内主题簇来源：`src/data/topicClusters.ts`
- 当前可索引页面来源：`public/sitemap.xml`
- 动态文章页来源：公开 `resources_posts` 元数据（已核对 `slug / title / meta_title / category`）

## 说明

- 下表中的“当前曝光页”是基于当前可索引 URL、`title/meta_title`、slug 精确度和站内主题重合度做的推断，不是 GSC 实际落页。
- 当前仓库里没有 Search Console 导出，所以这份表适合先做“结构级映射审计”；如果后续补 GSC，再把“当前曝光页”列替换成真实曝光落页即可。

## 审计表

| 关键词簇 | 当前曝光页（推断） | 目标 canonical 页 | 是否冲突 | 处理动作 |
| --- | --- | --- | --- | --- |
| `industrial painting systems` / `painting systems` | `/solutions`，但首页 `/` 与文章 `/resources/articles/industrial-coating-system`、`/resources/articles/industrial-coating-automation-guide` 也在抢 | `/solutions` | 是，3-4 页 | 保留 `/solutions`；首页标题更品牌化；两篇 article 改标题，收窄到 `industrial coating system guide` / `coating automation guide`；核心内链统一回指 `/solutions` |
| `robotic paint automation` / `robotic painting systems` | `/resources/articles/robotic-painting-systems-guide`，同时 `/solutions/robotic-painting-system`、`/resources/articles/what-is-robotic-painting`、`/resources/articles/how-robotic-painting-works`、`/resources/knowledge/when-robotic-paint-automation-makes-sense` 分流 | `/solutions/robotic-painting-system` | 是，4-5 页 | 保留 solution 页；`robotic-painting-systems-guide` 优先合并或大改标题；`what-is-robotic-painting`、`how-robotic-painting-works` 改成更上游科普词；`when-robotic-paint-automation-makes-sense` 保留但弱化 head term；强化所有支持页到 solution 页的内链 |
| `paint booth automation` | `/solutions/paint-booth-automation`，但 `/resources/articles/robot-paint-booth`、`/resources/articles/paint-booth-design-guide`、`/resources/articles/what-is-a-spray-booth`、`/resources/knowledge/paint-booth-design-basics` 语义重叠明显 | `/solutions/paint-booth-automation` | 是，4-5 页 | 保留 solution 页；`robot-paint-booth` 改成成本或选型子主题，必要时并入后 301；`paint-booth-design-guide` 保持设计意图，避免写成实施页；支持页内链统一指向 solution 页 |
| `ATEX spray booth` / `ATEX spray painting booth` | `/resources/articles/atex-spray-painting-booth-guide`，与 `/resources/knowledge/atex-spray-painting-booth`、`/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth`、`/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth` 形成强重叠 | `/resources/knowledge/atex-spray-painting-booth` | 是，4 页 | 先合并 article 与 core guide，再对 `/resources/articles/atex-spray-painting-booth-guide` 做 `301`；设计页和 zone 对比页保留，但标题继续往设计/比较意图收窄；ATEX cluster hub 继续做导航，不抢主词 |
| `furniture coating systems` / `furniture coating` | `/industries/furniture-woodwork` 与 `/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic` 分流，另有 `/resources/articles/paint-booth-furniture` 侧向抢词 | `/industries/furniture-woodwork` | 是，3 页 | 保留行业页；比较页改标题，避免把 `Furniture Coating Systems` 放在 title 最前；`paint-booth-furniture` 改成 booth 子题；所有家具相关知识页主内链回行业页，次内链回 panel solution |
| `panel coating systems` / `panel finishing systems` | `/solutions/panel-coating-finishing-systems`，但 `/industries/furniture-woodwork` 与家具比较页会截走一部分面板类查询 | `/solutions/panel-coating-finishing-systems` | 是，2-3 页 | 保留 panel solution；家具行业页保留行业意图，不再承接 panel head term；比较页标题和 H2 增加 `roller/spray/robotic comparison`，减少对 panel 主词覆盖；内部链接从家具页明确导向 panel solution |
| `metal parts finishing` | `/industries/metal-parts-finishing` 与 `/resources/knowledge/metal-parts-finishing-guide` 分流，`/resources/articles/spray-booth-metal-parts` 也在侧面承接 | `/industries/metal-parts-finishing` | 是，3 页 | 保留行业页；guide 改成 `planning` / `automation fit` 取向，避免继续用最宽 head term 做 title；`spray-booth-metal-parts` 只保留 booth 相关词，不再碰 broad cluster；行业页作为所有 metal parts 支持页主回链 |
| 品牌词（`TD Paint` / `TD Painting Systems` / `tdpaint`） | `/` | `/` | 低冲突 | 保留首页；`/about` 与 `/case-studies` 仅做品牌辅助页；首页 title 可再前置品牌，减少首页去抢非品牌 broad commercial 词 |

## 结论

这批页面里最明显的问题不是“内容不够”，而是两类页面在抢同一簇：

1. `resources/articles/*` 动态文章页
2. 支持型 knowledge / comparison 页

其中最危险的 4 个簇是：

- `ATEX spray booth`
- `robotic paint automation`
- `furniture coating systems`
- `metal parts finishing`

它们的共同特征是：辅助页标题里直接用了 head term，导致本来应该承接商业意图的 canonical 页，被 guide / comparison / article 页分流。

## 建议执行顺序

1. 先处理 `ATEX spray booth`
   `/resources/articles/atex-spray-painting-booth-guide` 与 core guide 重合度最高，最适合先合并后 `301`
2. 再处理 `robotic paint automation`
   这是全站商业核心簇，且冲突页最多
3. 然后处理 `furniture coating` 与 `metal parts finishing`
   这两簇的问题主要是比较页和 guide 页标题过宽
4. 最后处理 `industrial painting systems`
   重点是把首页和 broad article 从 solution hub 的主词里退出来

## 下一步

如果继续做第二轮，我建议直接产出一份执行清单，按 URL 列出：

- 新标题
- 新 H1
- 新内链锚文本
- 是否需要 `301`
- 是否需要从 sitemap 暂缓
