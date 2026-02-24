import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, FileText, BookOpen, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  publishedCases: number;
  draftCases: number;
  publishedResources: number;
  draftResources: number;
  recentLeads: Array<{ id: string; name: string | null; source: string; status: string; created_at: string }>;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [leadsRes, casesRes, resourcesRes] = await Promise.all([
      supabase.from("leads").select("id, name, source, status, created_at").order("created_at", { ascending: false }).limit(10),
      supabase.from("case_studies").select("id, status"),
      supabase.from("resources_posts").select("id, status"),
    ]);

    const leads = leadsRes.data || [];
    const cases = casesRes.data || [];
    const resources = resourcesRes.data || [];

    setStats({
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === "new").length,
      publishedCases: cases.filter(c => c.status === "published").length,
      draftCases: cases.filter(c => c.status === "draft").length,
      publishedResources: resources.filter(r => r.status === "published").length,
      draftResources: resources.filter(r => r.status === "draft").length,
      recentLeads: leads.slice(0, 5),
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">控制台概览 / Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-100">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <div className="text-xs text-muted-foreground">总线索 / Total Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.newLeads}</div>
                <div className="text-xs text-muted-foreground">新线索 / New Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-100">
                <FileText className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.publishedCases}</div>
                <div className="text-xs text-muted-foreground">已发布案例 / Published Cases</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.publishedResources}</div>
                <div className="text-xs text-muted-foreground">已发布资源 / Published Resources</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Status + Recent Leads */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Content Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">内容状态 / Content Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/console/case-studies" className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors">
              <span className="font-medium">案例研究 / Case Studies</span>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">{stats.publishedCases} 已发布</Badge>
                <Badge className="bg-muted text-muted-foreground">{stats.draftCases} 草稿</Badge>
              </div>
            </Link>
            <Link to="/console/resources" className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors">
              <span className="font-medium">资源库 / Resources</span>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">{stats.publishedResources} 已发布</Badge>
                <Badge className="bg-muted text-muted-foreground">{stats.draftResources} 草稿</Badge>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">最近线索 / Recent Leads</CardTitle>
            <Link to="/console/leads" className="text-sm text-primary hover:underline">
              查看全部 →
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentLeads.length === 0 ? (
              <p className="text-muted-foreground text-sm">暂无线索 / No leads yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentLeads.map(lead => (
                  <div key={lead.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{lead.name || "未留名 / Anonymous"}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.source} · {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={
                      lead.status === "new" ? "bg-blue-100 text-blue-800" :
                      lead.status === "contacted" ? "bg-amber-100 text-amber-800" :
                      "bg-muted text-muted-foreground"
                    }>
                      {lead.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
