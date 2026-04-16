import { AnswerBox, ContentSection, ResourcePageLayout } from "@/components/resources";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RobotvsManualSpray() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Robotic Spray Painting vs Manual Spray Comparison",
    description:
      "Comprehensive comparison of robotic spray painting systems versus manual spray application across efficiency, quality, cost, and ROI.",
    inLanguage: "en",
    proficiencyLevel: "Advanced",
  };

  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the advantages of robotic painting over manual spraying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Robotic painting delivers consistent coating quality, higher transfer efficiency, 24/7 production capability, lower VOC exposure risk, and less dependence on individual operator skill.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to recoup the robotic painting investment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical ROI ranges from 12 to 24 months depending on throughput, paint cost, labor cost, and defect rate. Medium-scale lines often reach payback in about 18 months.",
        },
      },
      {
        "@type": "Question",
        name: "When should I still choose manual spraying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Manual spraying still fits very small batches, highly variable part geometries, temporary projects, very large workpieces, or cases where capital budgets are extremely limited.",
        },
      },
    ],
  };

  return (
    <ResourcePageLayout
      title="Robotic Spray Painting vs Manual Spray"
      metaTitle="Robot vs Manual Spray Painting | ROI Comparison Guide"
      metaDescription="Compare robotic spray painting systems with manual spray application. Review efficiency, quality, cost breakdowns, and ROI for paint automation."
      breadcrumbs={[
        { label: "Engineering Library", href: "/resources/engineering-library" },
        { label: "Technology Comparisons" },
        { label: "Robot vs Manual" },
      ]}
      structuredData={structuredData}
    >
      <AnswerBox>
        {
          "The choice between robotic and manual spray painting comes down to automation level, production scale, and long-term cost structure. Robot systems provide stronger consistency and efficiency but require higher capital investment. Manual spraying offers flexibility and lower startup cost, but labor variability and rising operating cost can limit growth."
        }
      </AnswerBox>

      <ContentSection title="Quick ROI Assessment">
        <div className="rounded-lg bg-primary/5 p-6">
          <p className="mb-4 text-sm text-muted-foreground">
            {"Use the following formula to estimate robotic painting payback:"}
          </p>
          <div className="rounded bg-white p-4 text-center font-mono text-lg">
            {"ROI (months) = Robot system investment / Monthly savings"}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {
              "Typical values: a single robot spray cell may require $150,000 to $300,000 in investment and generate $8,000 to $25,000 in monthly savings, leading to ROI of roughly 12 to 24 months."
            }
          </p>
        </div>
      </ContentSection>

      <ContentSection title="Quick Comparison">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Parameter"}</TableHead>
              <TableHead>{"Manual Spray"}</TableHead>
              <TableHead>{"Robot Painting"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Transfer Efficiency"}</TableCell>
              <TableCell>{"30-50%"}</TableCell>
              <TableCell className="font-medium text-green-600">{"60-85%"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Coating Consistency"}</TableCell>
              <TableCell className="text-amber-600">{"Varies by operator"}</TableCell>
              <TableCell className="font-medium text-green-600">{"Within +/-2% DFT"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Daily Output (8 hr)"}</TableCell>
              <TableCell>{"200-400 parts"}</TableCell>
              <TableCell className="font-medium text-green-600">{"400-800 parts"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Operators"}</TableCell>
              <TableCell>{"2-4 per shift"}</TableCell>
              <TableCell className="font-medium text-green-600">{"1 per shift"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"VOC Exposure"}</TableCell>
              <TableCell className="text-red-600">{"High"}</TableCell>
              <TableCell className="font-medium text-green-600">{"Low (isolated)"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Production Hours"}</TableCell>
              <TableCell>{"8 hours/day"}</TableCell>
              <TableCell className="font-medium text-green-600">{"24 hours/day"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Initial Investment"}</TableCell>
              <TableCell className="font-medium text-green-600">{"$5,000-$20,000"}</TableCell>
              <TableCell>{"$150,000-$500,000"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Typical ROI"}</TableCell>
              <TableCell>{"N/A"}</TableCell>
              <TableCell className="font-medium text-green-600">{"12-24 months"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title="Manual Spray Characteristics">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold">{"Advantages"}</h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{"Low initial investment and simple startup"}</li>
              <li>{"High flexibility for mixed-product production"}</li>
              <li>{"Good fit for small batches and short programs"}</li>
              <li>{"Fast and simple color change"}</li>
              <li>{"Straightforward equipment maintenance"}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-red-600">{"Challenges"}</h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{"Difficult to hire and retain skilled painters"}</li>
              <li>{"Quality varies with operator condition and technique"}</li>
              <li>{"Lower transfer efficiency and more paint waste"}</li>
              <li>{"Higher health and VOC exposure risk"}</li>
              <li>{"Limited throughput and poor scalability"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Robotic Spray Painting Characteristics">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold text-green-600">{"Advantages"}</h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{"Highly consistent coating quality"}</li>
              <li>{"20-40% improvement in transfer efficiency"}</li>
              <li>{"Continuous 24/7 production capability"}</li>
              <li>{"Reduced VOC exposure and improved work environment"}</li>
              <li>{"Traceability through data logging and recipe control"}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">{"Considerations"}</h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{"Higher upfront investment"}</li>
              <li>{"Requires programming and maintenance capability"}</li>
              <li>{"Color changes need purge cycle time"}</li>
              <li>{"Very large parts may need special layouts"}</li>
              <li>{"Stable part presentation and fixturing are important"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Cost Comparison Analysis">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{"Cost Item"}</TableHead>
              <TableHead>{"Manual Spray / Year"}</TableHead>
              <TableHead>{"Robot Painting / Year"}</TableHead>
              <TableHead>{"Annual Savings"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{"Labor Cost (2 operators/shift)"}</TableCell>
              <TableCell>{"$120,000"}</TableCell>
              <TableCell>{"$40,000"}</TableCell>
              <TableCell className="font-medium text-green-600">{"$80,000"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Paint Cost (50,000 L/year)"}</TableCell>
              <TableCell>{"$250,000"}</TableCell>
              <TableCell>{"$175,000"}</TableCell>
              <TableCell className="font-medium text-green-600">{"$75,000"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Defects / Rework"}</TableCell>
              <TableCell>{"$30,000"}</TableCell>
              <TableCell>{"$5,000"}</TableCell>
              <TableCell className="font-medium text-green-600">{"$25,000"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">{"Equipment Maintenance"}</TableCell>
              <TableCell>{"$10,000"}</TableCell>
              <TableCell>{"$20,000"}</TableCell>
              <TableCell>{"-$10,000"}</TableCell>
            </TableRow>
            <TableRow className="font-bold">
              <TableCell>{"Total Annual Operating Cost"}</TableCell>
              <TableCell>{"$410,000"}</TableCell>
              <TableCell>{"$240,000"}</TableCell>
              <TableCell className="font-medium text-green-600">{"$170,000"}</TableCell>
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableCell colSpan={4} className="text-sm text-muted-foreground">
                {
                  "Assumptions: throughput of 400 parts/day, 250 working days/year, paint price of $5/L, labor rate of $30/hour, and robot system investment of $300,000 depreciated over 10 years."
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ContentSection>

      <ContentSection title="Selection Decision Tree">
        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <h4 className="mb-3 font-semibold text-blue-800">{"Choose Manual Spray When"}</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-blue-900">
              <li>{"Annual throughput is below 50,000 parts"}</li>
              <li>{"Part variation is very high"}</li>
              <li>{"Order size is below 200 parts per batch"}</li>
              <li>{"Budget for automation is below $50,000"}</li>
              <li>{"Part size exceeds the robot reach envelope"}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-5">
            <h4 className="mb-3 font-semibold text-green-800">{"Choose Robot Painting When"}</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-green-900">
              <li>{"Annual throughput exceeds 100,000 parts"}</li>
              <li>{"Tight coating consistency is required"}</li>
              <li>{"Paint spend exceeds $100,000 per year"}</li>
              <li>{"Skilled painter hiring is difficult"}</li>
              <li>{"Capacity must increase within limited floor space"}</li>
              <li>{"Customer or regulatory traceability is required"}</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="ROI Calculation Examples">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-5">
            <Badge variant="outline" className="mb-3">
              {"Low Volume Scenario"}
            </Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Throughput:"}</span>
                <span>{"50,000 parts/year"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Paint savings:"}</span>
                <span className="text-green-600">{"$25,000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Labor savings:"}</span>
                <span className="text-green-600">{"$30,000"}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>{"ROI period:"}</span>
                <span>{"36 months"}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-5">
            <Badge variant="outline" className="mb-3">
              {"Medium Volume Scenario"}
            </Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Throughput:"}</span>
                <span>{"150,000 parts/year"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Paint savings:"}</span>
                <span className="text-green-600">{"$60,000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Labor savings:"}</span>
                <span className="text-green-600">{"$80,000"}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>{"ROI period:"}</span>
                <span className="text-green-600">{"18 months"}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-5">
            <Badge variant="outline" className="mb-3">
              {"High Volume Scenario"}
            </Badge>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Throughput:"}</span>
                <span>{"500,000 parts/year"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Paint savings:"}</span>
                <span className="text-green-600">{"$150,000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{"Labor savings:"}</span>
                <span className="text-green-600">{"$120,000"}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>{"ROI period:"}</span>
                <span className="text-green-600">{"12 months"}</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Related Resources">
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            to="/resources/knowledge/robotic-painting-cost-guide"
            className="block rounded-lg border p-4 transition-colors hover:border-primary/50"
          >
            <Badge variant="outline" className="mb-2">
              {"Cost Guide"}
            </Badge>
            <h4 className="font-medium">{"Robotic Painting Cost Guide"}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{"System costs and ROI breakdown"}</p>
          </Link>
          <Link
            to="/resources/knowledge/how-to-choose-paint-robot"
            className="block rounded-lg border p-4 transition-colors hover:border-primary/50"
          >
            <Badge variant="outline" className="mb-2">
              {"Selection"}
            </Badge>
            <h4 className="font-medium">{"How to Choose a Paint Robot"}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{"Key selection parameters and tradeoffs"}</p>
          </Link>
          <Link
            to="/resources/knowledge/robot-path-optimization"
            className="block rounded-lg border p-4 transition-colors hover:border-primary/50"
          >
            <Badge variant="outline" className="mb-2">
              {"Technical"}
            </Badge>
            <h4 className="font-medium">{"Robot Path Optimization"}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{"How to maximize efficiency and finish quality"}</p>
          </Link>
        </div>
      </ContentSection>

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </ResourcePageLayout>
  );
}
