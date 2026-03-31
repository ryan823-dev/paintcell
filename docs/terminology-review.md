# 术语修改清单 - 待确认项目

> 生成日期: 2026-03-18
> 更新日期: 2026-03-18
> 状态: 部分已执行，部分待确认

---

## 一、已完成修改的项目

以下项目已修改完成：

| 原术语 | 修改为 | 文件位置 | 状态 |
|--------|--------|------|------|
| spray path | paint path | wizardSteps.ts | ✅ 已完成 |
| Existing Spray Booth | Existing Paint Booth | wizardSteps.ts | ✅ 已完成 |
| liquid paint will be sprayed | paint / coating will be applied | wizardSteps.ts | ✅ 已完成 |
| robotic spray painting | robotic painting | Industries.tsx, About.tsx, ThankYou.tsx, Applications.tsx, PaintCells.tsx, RoboticPaintingSystem.tsx | ✅ 已完成 |
| spray painting automation | painting automation | Industries.tsx | ✅ 已完成 |
| spray equipment | paint equipment | PaintCells.tsx | ✅ 已完成 |
| spray parameter tuning | paint parameter tuning | PaintCells.tsx | ✅ 已完成 |
| enclosed spray environment | enclosed paint environment | PaintCells.tsx | ✅ 已完成 |
| robot handles spraying | robot handles painting | PaintCells.tsx | ✅ 已完成 |
| HVLP spray technology | HVLP technology | About.tsx | ✅ 已完成 |
| spray process configuration | paint process configuration | RoboticPaintingSystem.tsx | ✅ 已完成 |

---

## 二、需要确认的项目

### 2.1 产品类别名称

| 当前 | 建议 | 文件位置 | 备注 |
|------|------|----------|------|
| **Spray Guns** | Paint Guns? | Header.tsx, ProductsIndex.tsx, ProductCategory.tsx | 行业内是否习惯叫 "spray gun"？ |
| **Spray Equipment** | Paint Equipment? | Header.tsx, ProductsIndex.tsx, TrustLogos.tsx | 同上 |

**问题**: 在涂装行业，"spray gun" 是否是标准专业术语？还是 "paint gun" 也可以接受？

---

### 2.2 技术文档/知识库页面

| 当前 | 问题 | URL | 文件 |
|------|------|-----|------|
| **Spray Technology Guide** | 是否改为 "Paint Technology Guide"？ | /resources/knowledge/spray-technology-guide | SprayTechnologyGuide.tsx |
| **spray-technology-guide** | URL 是否需要改？ | 路由 | App.tsx |

**影响**: 如果改 URL，需要设置重定向，避免 SEO 损失

---

### 2.3 专业术语

| 术语 | 使用场景 | 问题 |
|------|----------|------|
| **electrostatic spray** | 静电喷涂 | 行业内是叫 "electrostatic painting" 还是保留 "electrostatic spray"？ |
| **air spray** | 空气喷涂 | "air spray gun" 是产品类型，是否需要改？ |
| **HVLP spray** | 高容量低压力喷涂 | HVLP = High Volume Low Pressure，说 "HVLP painting" 还是保留？ |
| **rotary spray** | 旋杯 | 应该叫 "rotary atomizer" 或 "rotary bell"？ |

**建议**: 您提到过旋杯应该叫 rotary atomizer/bell，不叫 spray bell

---

### 2.4 其他需要确认的 "spray" 场景

| 文件 | 当前内容 | 行号 | 问题 |
|------|----------|------|------|
| Solutions.tsx | "Spray Equipment Brands" | 314 | 改为 "Paint Equipment Brands"？ |
| Solutions.tsx | "spray robot" | 103 | 改为 "paint robot"？ |
| Solutions.tsx | "2 robots primer spray" 等 | 427-429 | 改为 "primer painting" 等？ |
| MetalPartsFinishing.tsx | "spray painters" | 192 | 改为 "paint operators"？ |
| AutomotivePainting.tsx | spray 列 | 433-438 | 表格列标题，是否保留？ |

---

### 2.5 "Coating" 相关

"Coating" 在以下场景可能需要保留：

| 场景 | 是否保留 "coating" | 理由 |
|------|-------------------|------|
| **powder coating** | ✅ 保留 | 粉末涂料是标准术语，不叫 "powder paint" |
| **E-coat** | ✅ 保留 | 电泳涂装的标准缩写 |
| **thermal barrier coating** | ✅ 保留 | 热障涂层是功能性涂层 |
| **coating line** | ❓ 待确认 | 是否改为 "paint line"？ |
| **coating specification** | ❓ 待确认 | 是否改为 "paint specification"？ |
| **industrial coating** | ❓ 待确认 | 是否改为 "industrial painting"？ |

---

## 三、建议分类

### A. 已完成修改

1. ✅ **"spray painting" → "painting"** - 冗余表达
2. ✅ **"spray path" → "paint path"**
3. ✅ **"robotic spray painting" → "robotic painting"**

### B. 建议保留（待确认）

1. **powder coating** - 行业标准术语
2. **E-coat** - 行业标准术语
3. **Spray Guns** - 如果是行业习惯用语，建议保留
4. **electrostatic spray** - 可能是行业习惯用语

### C. 需要进一步指导

1. **"coating" vs "paint"** 在一般描述中的使用边界
2. **"electrostatic spray"** 的正确表述
3. **知识库页面标题和 URL** 是否需要统一修改
4. **行业页面中的 "spray" 相关表述** - 如 spray painters, spray robot

---

## 四、确认方式

请针对以上问题，标注以下决策：

- ✅ 同意修改
- ❌ 保留原术语
- ⚠️ 需要讨论

---

## 五、涉及文件清单

```
src/components/layout/Header.tsx
src/pages/products/ProductsIndex.tsx
src/pages/products/ProductCategory.tsx
src/pages/resources/knowledge/SprayTechnologyGuide.tsx
src/pages/industries/*.tsx (多个行业页面)
src/pages/solutions/*.tsx (多个解决方案页面)
src/App.tsx (路由)
```

---

## 六、已修改文件汇总

以下文件已完成术语修改：

1. `src/data/wizardSteps.ts` - 向导问题术语
2. `src/types/quote.ts` - 类型定义和标签
3. `src/components/quote/ContactForm.tsx` - 联系表单描述
4. `src/pages/Industries.tsx` - 行业页面 meta 描述
5. `src/pages/About.tsx` - 关于页面 meta 和 schema
6. `src/pages/ThankYou.tsx` - 感谢页面文字
7. `src/pages/Applications.tsx` - 应用页面 FAQ 和 alt 文字
8. `src/pages/PaintCells.tsx` - 喷涂单元页面 FAQ 和文字
9. `src/pages/solutions/RoboticPaintingSystem.tsx` - 解决方案页面 schema

---

*此文档由 Qoder 生成，用于术语统一确认*