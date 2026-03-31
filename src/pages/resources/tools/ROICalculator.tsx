"use client";

import { useState, useEffect } from "react";
import { ResourcePageLayout } from "@/components/resources";
import { ContentSection } from "@/components/resources";
import { AnswerBox } from "@/components/resources";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/i18n/context";
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight } from "lucide-react";

export default function ROICalculator() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh-CN";

  // Input states
  const [partsPerYear, setPartsPerYear] = useState(100000);
  const [paintCostPerLiter, setPaintCostPerLiter] = useState(8);
  const [paintConsumptionPerPart, setPaintConsumptionPerPart] = useState(50); // ml
  const [operatorsNeeded, setOperatorsNeeded] = useState(3);
  const [laborCostPerHour, setLaborCostPerHour] = useState(25);
  const [workingHoursPerDay, setWorkingHoursPerDay] = useState(8);
  const [workingDaysPerYear, setWorkingDaysPerYear] = useState(250);
  const [defectRate, setDefectRate] = useState(3); // %
  const [reworkCostPerPart, setReworkCostPerPart] = useState(5);

  // Calculated results
  const [results, setResults] = useState({
    currentAnnualPaintCost: 0,
    currentAnnualLaborCost: 0,
    currentAnnualReworkCost: 0,
    currentTotalAnnualCost: 0,
    robotInvestment: 0,
    robotAnnualPaintCost: 0,
    robotAnnualLaborCost: 0,
    robotAnnualReworkCost: 0,
    robotTotalAnnualCost: 0,
    annualSavings: 0,
    roiMonths: 0,
  });

  // Calculate results
  useEffect(() => {
    // Current costs (manual spray)
    const paintTransferEfficiency = 0.4; // 40% for manual
    const actualPaintNeeded = (partsPerYear * paintConsumptionPerPart) / 1000 / paintTransferEfficiency;
    const currentPaintCost = actualPaintNeeded * paintCostPerLiter;

    const totalLaborHours = operatorsNeeded * workingHoursPerDay * workingDaysPerYear;
    const currentLaborCost = totalLaborHours * laborCostPerHour;

    const defectiveParts = (partsPerYear * defectRate) / 100;
    const currentReworkCost = defectiveParts * reworkCostPerPart;

    const currentTotalCost = currentPaintCost + currentLaborCost + currentReworkCost;

    // Robot costs (assumptions)
    const robotPaintEfficiency = 0.75; // 75% with robot + electrostatic
    const robotPaintNeeded = (partsPerYear * paintConsumptionPerPart) / 1000 / robotPaintEfficiency;
    const robotPaintCost = robotPaintNeeded * paintCostPerLiter;

    const robotOperators = 1; // Only 1 operator needed
    const robotLaborCost = robotOperators * workingHoursPerDay * workingDaysPerYear * laborCostPerHour;

    const robotDefectRate = defectRate * 0.2; // 80% reduction
    const robotDefectiveParts = (partsPerYear * robotDefectRate) / 100;
    const robotReworkCost = robotDefectiveParts * reworkCostPerPart;

    // Investment calculation
    const throughput = partsPerYear / (workingDaysPerYear * 8 * 60); // parts per minute
    let baseInvestment = 150000;
    if (throughput > 1) baseInvestment += (throughput - 1) * 50000;
    if (partsPerYear > 200000) baseInvestment += 100000;

    const robotTotalCost = robotPaintCost + robotLaborCost + robotReworkCost;
    const annualSavings = currentTotalCost - robotTotalCost;
    const roiMonths = annualSavings > 0 ? Math.round((baseInvestment / annualSavings) * 12) : 999;

    setResults({
      currentAnnualPaintCost: currentPaintCost,
      currentAnnualLaborCost: currentLaborCost,
      currentAnnualReworkCost: currentReworkCost,
      currentTotalAnnualCost: currentTotalCost,
      robotInvestment: baseInvestment,
      robotAnnualPaintCost: robotPaintCost,
      robotAnnualLaborCost: robotLaborCost,
      robotAnnualReworkCost: robotReworkCost,
      robotTotalAnnualCost: robotTotalCost,
      annualSavings,
      roiMonths: Math.min(roiMonths, 120), // Cap at 120 months
    });
  }, [partsPerYear, paintCostPerLiter, paintConsumptionPerPart, operatorsNeeded, laborCostPerHour, workingHoursPerDay, workingDaysPerYear, defectRate, reworkCostPerPart]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Tool",
    "name": "Robotic Paint Automation ROI Calculator",
    "description": isZh
      ? "计算机器人喷涂系统的投资回报率和成本节省"
      : "Calculate ROI and cost savings for robotic paint automation systems",
    "inLanguage": locale,
  };

  return (
    <ResourcePageLayout
      title={isZh ? "机器人喷涂 ROI 计算器" : "Robotic Paint Automation ROI Calculator"}
      metaTitle={isZh ? "ROI计算器 | 机器人喷涂投资回报" : "ROI Calculator | Robotic Paint Automation Investment"}
      metaDescription={isZh
        ? "计算机器人喷涂系统相比人工喷涂的年度节省和投资回报时间"
        : "Calculate annual savings and ROI for robotic spray painting systems compared to manual application"}
      breadcrumbs={[
        { label: isZh ? "工程资源库" : "Engineering Library", href: "/resources/engineering-library" },
        { label: isZh ? "工具" : "Tools" },
        { label: isZh ? "ROI计算器" : "ROI Calculator" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {isZh
          ? "这个计算器帮助您估算机器人喷涂系统的投资回报。使用您当前的运营数据，我们计算人工喷涂和机器人喷涂之间的年度成本差异，以及预计的投资回收期。"
          : "This calculator helps estimate the return on investment for robotic spray painting systems. Using your current operational data, we calculate the annual cost difference between manual and robotic spraying, along with the estimated payback period."}
      </AnswerBox>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {isZh ? "您的生产数据" : "Your Production Data"}
              </CardTitle>
              <CardDescription>
                {isZh ? "输入您当前的运营参数" : "Enter your current operational parameters"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Parts per year */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "年产能（件）" : "Parts per Year"}</Label>
                  <span className="text-primary font-medium">{partsPerYear.toLocaleString()}</span>
                </div>
                <Slider
                  value={[partsPerYear]}
                  onValueChange={(v) => setPartsPerYear(v[0])}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10,000</span>
                  <span>1,000,000</span>
                </div>
              </div>

              {/* Paint cost */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "涂料单价（$/升）" : "Paint Cost ($/liter)"}</Label>
                  <span className="text-primary font-medium">${paintCostPerLiter}</span>
                </div>
                <Slider
                  value={[paintCostPerLiter]}
                  onValueChange={(v) => setPaintCostPerLiter(v[0])}
                  min={3}
                  max={30}
                  step={0.5}
                  className="py-2"
                />
              </div>

              {/* Paint consumption per part */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "每件涂料用量（ml）" : "Paint per Part (ml)"}</Label>
                  <span className="text-primary font-medium">{paintConsumptionPerPart} ml</span>
                </div>
                <Slider
                  value={[paintConsumptionPerPart]}
                  onValueChange={(v) => setPaintConsumptionPerPart(v[0])}
                  min={10}
                  max={500}
                  step={5}
                  className="py-2"
                />
              </div>

              {/* Operators */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "操作人员数量" : "Operators Needed"}</Label>
                  <span className="text-primary font-medium">{operatorsNeeded}</span>
                </div>
                <Slider
                  value={[operatorsNeeded]}
                  onValueChange={(v) => setOperatorsNeeded(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="py-2"
                />
              </div>

              {/* Labor cost */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "工时费率（$/小时）" : "Labor Rate ($/hour)"}</Label>
                  <span className="text-primary font-medium">${laborCostPerHour}</span>
                </div>
                <Slider
                  value={[laborCostPerHour]}
                  onValueChange={(v) => setLaborCostPerHour(v[0])}
                  min={5}
                  max={60}
                  step={1}
                  className="py-2"
                />
              </div>

              {/* Working hours */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{isZh ? "每日工作小时" : "Hours/Day"}</Label>
                  <Input
                    type="number"
                    value={workingHoursPerDay}
                    onChange={(e) => setWorkingHoursPerDay(Number(e.target.value))}
                    min={1}
                    max={24}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isZh ? "每年工作日" : "Days/Year"}</Label>
                  <Input
                    type="number"
                    value={workingDaysPerYear}
                    onChange={(e) => setWorkingDaysPerYear(Number(e.target.value))}
                    min={100}
                    max={365}
                  />
                </div>
              </div>

              {/* Defect rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>{isZh ? "当前不良率" : "Current Defect Rate"}</Label>
                  <span className="text-primary font-medium">{defectRate}%</span>
                </div>
                <Slider
                  value={[defectRate]}
                  onValueChange={(v) => setDefectRate(v[0])}
                  min={0}
                  max={20}
                  step={0.5}
                  className="py-2"
                />
              </div>

              {/* Rework cost */}
              <div className="space-y-2">
                <Label>{isZh ? "每件返工成本（$）" : "Rework Cost per Part ($)"}</Label>
                <Input
                  type="number"
                  value={reworkCostPerPart}
                  onChange={(e) => setReworkCostPerPart(Number(e.target.value))}
                  min={0}
                  max={50}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* ROI Summary */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {isZh ? "投资回报分析" : "ROI Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {results.roiMonths === 999 ? '>120' : results.roiMonths}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isZh ? "个月回收期" : "Months to ROI"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">
                    {formatCurrency(results.annualSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isZh ? "年度节省" : "Annual Savings"}
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {isZh ? "建议机器人系统投资" : "Recommended Robot System Investment"}
                  </span>
                  <span className="text-lg font-bold">
                    {formatCurrency(results.robotInvestment)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>{isZh ? "成本对比" : "Cost Comparison"}</CardTitle>
              <CardDescription>
                {isZh ? "年度运营成本对比" : "Annual Operating Cost Comparison"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Paint Cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isZh ? "涂料成本" : "Paint Cost"}</span>
                  <span>{formatCurrency(results.currentAnnualPaintCost)} → {formatCurrency(results.robotAnnualPaintCost)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isZh ? "人工" : "Manual"}</span>
                  <span className="text-green-600 font-medium">
                    -{formatCurrency(results.currentAnnualPaintCost - results.robotAnnualPaintCost)}
                  </span>
                </div>
              </div>

              {/* Labor Cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isZh ? "人工成本" : "Labor Cost"}</span>
                  <span>{formatCurrency(results.currentAnnualLaborCost)} → {formatCurrency(results.robotAnnualLaborCost)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${(results.robotAnnualLaborCost / results.currentAnnualLaborCost) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isZh ? "人工" : "Manual"}</span>
                  <span className="text-green-600 font-medium">
                    -{formatCurrency(results.currentAnnualLaborCost - results.robotAnnualLaborCost)}
                  </span>
                </div>
              </div>

              {/* Rework Cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isZh ? "返工/不良成本" : "Rework/Defect Cost"}</span>
                  <span>{formatCurrency(results.currentAnnualReworkCost)} → {formatCurrency(results.robotAnnualReworkCost)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${(results.robotAnnualReworkCost / Math.max(results.currentAnnualReworkCost, 1)) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isZh ? "人工" : "Manual"}</span>
                  <span className="text-green-600 font-medium">
                    -{formatCurrency(results.currentAnnualReworkCost - results.robotAnnualReworkCost)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{isZh ? "年度总成本" : "Total Annual Cost"}</span>
                  <div className="text-right">
                    <div className="text-muted-foreground line-through">
                      {formatCurrency(results.currentTotalAnnualCost)}
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(results.robotTotalAnnualCost)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>{isZh ? "关键效益" : "Key Benefits"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary/20" />
                  <div>
                    <div className="font-medium">24/7</div>
                    <div className="text-xs text-muted-foreground">{isZh ? "连续生产" : "Production"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-600/20" />
                  <div>
                    <div className="font-medium text-green-600">
                      {Math.round((1 - results.robotAnnualPaintCost / results.currentAnnualPaintCost) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">{isZh ? "涂料节省" : "Paint Savings"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">{isZh ? "想了解详细方案？" : "Want a Detailed Proposal?"}</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              {isZh
                ? "我们的工程师可以根据您的具体需求提供详细的技术方案和预算报价。"
                : "Our engineers can provide detailed technical proposals and budget quotes based on your specific requirements."}
            </p>
            <a
              href="/quote"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              {isZh ? "获取详细方案" : "Request Detailed Proposal"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>{isZh ? "免责声明：" : "Disclaimer: "}</strong>
          {isZh
            ? "此计算器提供的估算仅供参考。实际投资回报取决于多种因素，包括但不限于：具体产品配置、涂料类型、工件几何形状、现有设施条件、市场价格波动等。建议在做出投资决策前进行详细的可行性研究。"
            : "Estimates provided by this calculator are for reference only. Actual ROI depends on many factors including: specific product configuration, coating type, part geometry, existing facility conditions, and market price fluctuations. We recommend conducting a detailed feasibility study before making investment decisions."}
        </p>
      </div>
    </ResourcePageLayout>
  );
}
