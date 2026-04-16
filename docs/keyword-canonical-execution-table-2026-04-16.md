# 关键词映射执行表（第二张表）

关联审计：`docs/keyword-canonical-mapping-audit-2026-04-16.md`

审计日期：2026-04-16

## 使用说明

- `新标题` 指页面新的 `title / meta title` 方向
- `新 H1` 指页面主标题方向
- `主回链锚文本` 指该冲突页正文内至少 1 次应使用的主锚文本，并链接到 `目标 canonical 页`
- `是否 301` 为 `是` 时，源页应并入目标页，并从 sitemap 移除

## 执行表

### 1. `industrial painting systems` / `painting systems`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | `/solutions` | `TD Painting Systems | Robotic Painting and Paint Booth Automation` | `TD Painting Systems` | `industrial painting systems` | 否 | 首页退回品牌页，不再承接 broad commercial head term |
| `/resources/articles/industrial-coating-system` | `/solutions` | `Industrial Coating System Guide | Types, Layouts and Selection Questions` | `Industrial Coating System Guide` | `industrial painting systems` | 否 | 保留为上游 guide，避免与 solutions hub 同词同意图 |
| `/resources/articles/industrial-coating-automation-guide` | `/solutions` | `Industrial Coating Automation Guide | Where Automation Fits in Manufacturing` | `Industrial Coating Automation Guide` | `industrial painting systems` | 否 | 收窄到 automation strategy，不再争夺 broad system query |

### 2. `robotic paint automation` / `robotic painting systems`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/articles/robotic-painting-systems-guide` | `/solutions/robotic-painting-system` | `不保留，合并进目标页` | `不保留` | `robotic paint automation system` | 是 | 与目标页 head term 高度重合，优先并入 |
| `/resources/articles/robotic-painting-system-design` | `/solutions/robotic-painting-system` | `Robotic Painting System Design Guide | Cell Layout, Airflow and Integration` | `Robotic Painting System Design Guide` | `robotic paint automation system` | 否 | 保留设计意图，避免再抢 broad transaction term |
| `/resources/articles/what-is-robotic-painting` | `/solutions/robotic-painting-system` | `What Is Robotic Painting? Process Basics and Typical Applications` | `What Is Robotic Painting?` | `robotic paint automation system` | 否 | 明确做定义型科普页 |
| `/resources/articles/how-robotic-painting-works` | `/solutions/robotic-painting-system` | `How Robotic Painting Works in a Production Cell` | `How Robotic Painting Works in a Production Cell` | `robotic paint automation system` | 否 | 从 broad guide 改成 process explainer |
| `/resources/knowledge/when-robotic-paint-automation-makes-sense` | `/solutions/robotic-painting-system` | `When Does Robotic Painting Make Sense? ROI and Fit Signals` | `When Does Robotic Painting Make Sense?` | `robotic paint automation system` | 否 | 保留决策页角色，弱化 exact-match head term |
| `/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems` | `/solutions/robotic-painting-system` | `Manual vs Semi-Automatic vs Robotic Painting | Selection Framework` | `Manual vs Semi-Automatic vs Robotic Painting` | `robotic paint automation system` | 否 | 比较页保留，但不再用最宽 `...systems` 结构抢词 |
| `/resources/articles/manual-vs-robotic-painting` | `/solutions/robotic-painting-system` | `Manual vs Robotic Painting | Quality, Throughput and Process Fit` | `Manual vs Robotic Painting` | `robotic paint automation system` | 否 | 继续承接 comparison intent，不碰主承接词 |

### 3. `paint booth automation`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/articles/robot-paint-booth` | `/solutions/paint-booth-automation` | `不保留，合并进目标页` | `不保留` | `paint booth automation` | 是 | broad exact-match 词，优先并入 solution 页 |
| `/resources/articles/paint-booth-design-guide` | `/solutions/paint-booth-automation` | `Industrial Paint Booth Design Guide | Layout, Airflow and Retrofit Checks` | `Industrial Paint Booth Design Guide` | `paint booth automation` | 否 | 保留设计意图，不再写成 implementation 页 |
| `/resources/knowledge/paint-booth-design-basics` | `/solutions/paint-booth-automation` | `Paint Booth Design Basics | Layout, Airflow and Retrofit Planning` | `Paint Booth Design Basics for Layout and Retrofit Planning` | `paint booth automation` | 否 | 与 design-guide 做差异化：更偏 planning basics |
| `/resources/articles/what-is-a-spray-booth` | `/solutions/paint-booth-automation` | `What Is a Spray Booth? Airflow, Use Cases and Process Basics` | `What Is a Spray Booth?` | `paint booth automation` | 否 | 定义页保留，但从正文显式回链到 solution 页 |
| `/resources/articles/how-to-choose-a-spray-booth` | `/solutions/paint-booth-automation` | `How to Choose a Spray Booth | Layout, Airflow and Compliance Fit` | `How to Choose a Spray Booth` | `paint booth automation` | 否 | 选择页保留 buyer intent，但避免抢 implementation head term |

### 4. `ATEX spray booth` / `ATEX spray painting booth`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/articles/atex-spray-painting-booth-guide` | `/resources/knowledge/atex-spray-painting-booth` | `不保留，合并进目标页` | `不保留` | `ATEX spray booth zone classification` | 是 | 与 core guide 几乎同意图，优先合并 |
| `/resources/knowledge/how-to-design-atex-compliant-spray-painting-booth` | `/resources/knowledge/atex-spray-painting-booth` | `ATEX-Compliant Spray Booth Design Guide | Layout, Zoning and Airflow` | `ATEX-Compliant Spray Booth Design Guide` | `ATEX spray booth zone classification` | 否 | 收窄到 design guide，不再与 core page 同位竞争 |
| `/resources/knowledge/zone-1-vs-zone-2-spray-painting-booth` | `/resources/knowledge/atex-spray-painting-booth` | `Zone 1 vs Zone 2 for Spray Booths | ATEX Scope Comparison` | `Zone 1 vs Zone 2 for Spray Booths` | `ATEX spray booth zone classification` | 否 | 强化 comparison intent，减少 broad head term 覆盖 |

### 5. `furniture coating systems` / `furniture coating`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic` | `/industries/furniture-woodwork` | `Roller vs Spray vs Robotic for Furniture Finishing` | `Roller vs Spray vs Robotic for Furniture Finishing` | `furniture coating systems` | 否 | 不再把 head term 放在 title 最前，明确是比较页 |
| `/resources/articles/paint-booth-furniture` | `/industries/furniture-woodwork` | `Paint Booth Requirements for Furniture Finishing Lines` | `Paint Booth Requirements for Furniture Finishing` | `furniture coating systems` | 否 | 保留 booth 子主题，不再争夺 broad industry term |

### 6. `panel coating systems` / `panel finishing systems`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/industries/furniture-woodwork` | `/solutions/panel-coating-finishing-systems` | `Furniture Coating Systems | Automated Finishing for Wood Products | TD` | `Furniture Coating Systems` | `panel coating and finishing systems` | 否 | 从 title 中拿掉 `and panels`，把 panel 主词让回给 solution 页 |
| `/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic` | `/solutions/panel-coating-finishing-systems` | `Roller vs Spray vs Robotic for Furniture Finishing` | `Roller vs Spray vs Robotic for Furniture Finishing` | `panel coating and finishing systems` | 否 | 同一页同时承担 furniture/panel 过渡页，必须强回链到 panel solution |

### 7. `metal parts finishing`

| 冲突 URL | 目标 canonical 页 | 新标题 | 新 H1 | 主回链锚文本 | 是否 301 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/knowledge/metal-parts-finishing-guide` | `/industries/metal-parts-finishing` | `Metal Parts Finishing Automation Guide | Fit, Quality and Scope` | `Metal Parts Finishing Automation Guide` | `metal parts finishing` | 否 | 从 broad industry head term 改成 automation guide |
| `/resources/articles/spray-booth-metal-parts` | `/industries/metal-parts-finishing` | `Spray Booth Setup for Metal Parts Finishing` | `Spray Booth Setup for Metal Parts Finishing` | `metal parts finishing` | 否 | 明确 booth 子主题，避免与行业主承接页争词 |

## 最高优先级动作

### 立即执行 `301`

| 源 URL | 目标 URL | 原因 |
| --- | --- | --- |
| `/resources/articles/robotic-painting-systems-guide` | `/solutions/robotic-painting-system` | 与目标页 broad head term 和商业意图高度重合 |
| `/resources/articles/robot-paint-booth` | `/solutions/paint-booth-automation` | broad commercial exact-match，最容易抢主承接页 |
| `/resources/articles/atex-spray-painting-booth-guide` | `/resources/knowledge/atex-spray-painting-booth` | 与 ATEX core guide 同意图重复度最高 |

### 应优先改 title / H1 的页面

1. `/industries/furniture-woodwork`
2. `/resources/knowledge/furniture-coating-systems-roller-vs-spray-vs-robotic`
3. `/resources/knowledge/metal-parts-finishing-guide`
4. `/resources/knowledge/when-robotic-paint-automation-makes-sense`
5. `/resources/knowledge/manual-vs-semi-auto-vs-robotic-painting-systems`

## 内链执行规则

1. 每个冲突页正文前 40% 区域至少出现 1 次主回链锚文本
2. 每个冲突页的 `Read next / Related pages / Decision support` 模块里，目标 canonical 页应排在第 1 位
3. 同簇支持页之间可以互链，但不能替代对 canonical 页的主回链
4. 若页面将执行 `301`，则不再单独优化其 title / H1，直接并入目标页并移出 sitemap

## 建议的执行顺序

1. 先做 3 个 `301`
2. 再统一改 7 个高冲突 support page 的 `title + H1`
3. 然后补每页的主回链锚文本
4. 最后重跑 sitemap，确认被合并页已移除
