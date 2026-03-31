# TD Paintcell 项目检查清单

> **重要**：每次开始工作或发布前，请先阅读此文件，确保不遗漏关键检查项。

---

## 发布前必须检查 (Pre-Release Checklist)

### SEO & AEO 技术检查

- [ ] **Sitemap更新** - 新增页面是否已添加到 `public/sitemap.xml`
- [ ] **Schema结构化数据** - 页面是否包含必要的Schema：
  - [ ] Organization / WebSite（首页已有）
  - [ ] BreadcrumbList（导航层级）
  - [ ] TechArticle（技术文章）
  - [ ] FAQPage（常见问题）
  - [ ] VideoObject（视频内容）
  - [ ] SpeakableSpecification（语音搜索优化）
- [ ] **Meta标签完整** - title, description, keywords
- [ ] **Canonical URL** - 避免重复内容
- [ ] **hreflang标签** - 多语言页面关联
- [ ] **构建成功** - `npm run build` 无错误

### 内容质量检查

- [ ] **术语准确性** - 参见下方"术语使用规范"
- [ ] **中英双语** - 确保页面支持双语
- [ ] **链接有效** - 内部链接可访问
- [ ] **图片优化** - 压缩、alt标签、懒加载

### 功能检查

- [ ] **路由配置** - 新页面已添加到 `App.tsx`
- [ ] **导航菜单** - 新页面在导航中可见或有入口
- [ ] **表单提交** - RFQ等表单功能正常

---

## 术语使用规范

### 核心业务定位

**我们做的是：喷涂机器人自动化（Spray Painting Automation）**
**我们不做：涂胶工艺（Coating Application / Adhesive Application）**

### 必须区分的术语

| ❌ 错误用法 | ✅ 正确用法 | 原因 |
|-----------|-----------|------|
| coating application | **paint application** | coating application = 涂胶 |
| industrial coating applications | **industrial paint applications** | 统一用paint表述喷漆 |
| apply coatings | **apply paint** | 保持业务定位一致 |
| coating system | **paint system / finishing system** | 避免歧义 |

### 可接受的用法

- **"coating" 作为名词** - 指油漆材料本身，如：
  - "liquid coatings" ✅
  - "coating types" ✅
  - "powder coating" ✅ (粉末涂料是专业术语)
  - "coating particles" ✅ (漆粒)

### US/EU 术语对照（GEO SEO）

| 中文 | 美式英语 (US) | 欧式英语 (UK/EU) |
|-----|-------------|----------------|
| 喷漆室 | Paint booth | Spray cabin / Spray booth |
| 喷枪 | Spray gun | Applicator / Spray applicator |
| 涂层 | Coating | Lacquer / Finish |
| 烘干炉 | Cure oven | Stoving oven |
| 粉末涂装 | Powder coating | Powder lacquering |
| 往复机 | Reciprocator | Oscillator |

---

## 历史问题记录

### 2026年3月 问题记录

**问题1：FAQ Schema 语法错误**
- 症状：构建失败，TypeScript报错
- 原因：`"acceptedAnswer: {` 缺少引号，应为 `"acceptedAnswer": {`
- 解决：批量修复6个文件

**问题2：Schema组件导入错误**
- 症状：构建失败，组件不存在
- 原因：`ArticleSchema`、`FAQSchema` 组件未创建，使用不存在的导入
- 解决：改用 Helmet 内联 JSON-LD

**问题3：撇号导致字符串解析错误**
- 症状：构建失败
- 原因：FAQ内容中的 `shouldn't`、`doesn't` 等缩写
- 解决：改为 `should not`、`does not`

**问题4：术语用词错误**
- 症状：内容偏离核心业务
- 原因：使用 "coating application" 指代喷漆
- 解决：批量修正为 "paint application"，涉及6个文件

**问题5：Sitemap缺失新页面**
- 症状：新文章未被搜索引擎收录
- 原因：sitemap.xml 未更新
- 解决：添加11篇新文章到sitemap

---

## 项目文件结构

```
paintcell/
├── public/
│   ├── sitemap.xml          # 站点地图（新增页面必须更新）
│   └── robots.txt           # 爬虫配置
├── src/
│   ├── components/
│   │   └── seo/             # SEO组件目录
│   │       ├── BreadcrumbSchema.tsx
│   │       ├── Hreflang.tsx
│   │       ├── SpeakableSchema.tsx
│   │       └── ServiceSchema.tsx
│   ├── pages/
│   │   └── resources/       # 技术文章目录
│   │       ├── knowledge/   # 知识库文章
│   │       ├── equipment/   # 设备相关
│   │       └── glossary/    # 术语词条
│   ├── data/
│   │   ├── glossary.ts      # 术语数据库
│   │   ├── faq.ts           # FAQ数据
│   │   └── videoLibrary.ts  # 视频库
│   └── App.tsx              # 路由配置
├── index.html               # 入口HTML（含全局Schema）
└── PROJECT_CHECKLIST.md     # 本文件
```

---

## 最近更新日志

### 2026-03-20

**内容更新：**
- 新增11篇技术文章（三批内容）
- 上传15个视频到阿里云OSS

**SEO优化：**
- 创建 SEO 组件目录 `src/components/seo/`
- 新增 BreadcrumbSchema、SpeakableSchema、ServiceSchema
- 更新 ResourcePageLayout 自动生成面包屑和语音搜索Schema
- 更新 sitemap.xml 添加11篇新文章

**术语修正：**
- 批量修正 "coating application" → "paint application"
- 涉及文件：ElectrostaticBellAtomizers, ReciprocatorSpraySystems, BallTrackSystems, BoothControlSystems, RobotBrandComparison, SprayGunTechnology

### 2026-03-19

- 完成第一批内容（3篇技术文章）
- 完成第二批内容（3篇技术文章含US/EU术语表）
- 上传4个初始视频 + 11个额外视频

---

## 常用命令

```bash
# 本地开发
npm run dev

# 构建检查
npm run build

# 部署到Vercel
vercel --prod --yes

# 检查sitemap
curl https://tdpaint.com/sitemap.xml

# 检查线上状态
curl -s -o /dev/null -w "%{http_code}" https://tdpaint.com/
```

---

## 联系与资源

- **线上地址**: https://tdpaint.com
- **Sitemap**: https://tdpaint.com/sitemap.xml
- **视频存储**: 阿里云OSS
- **部署平台**: Vercel

---

*此清单最后更新：2026-03-20*