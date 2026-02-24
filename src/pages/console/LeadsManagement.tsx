import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Eye, Download, Mail, Phone, Building2, User, Calendar, MessageSquare } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-green-100 text-green-800",
  closed: "bg-muted text-muted-foreground",
};

export default function LeadsManagement() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load leads", variant: "destructive" });
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      fetchLeads();
      toast({ title: "已更新 / Updated", description: `Status changed to ${newStatus}` });
    }
  };

  const exportCSV = () => {
    const filtered = getFilteredLeads();
    const headers = ["Name", "Company", "Email", "Phone", "Source", "Status", "Requirements", "Created At"];
    const rows = filtered.map(l => [
      l.name || "", l.company || "", l.email || "", l.phone || "",
      l.source, l.status, l.requirements_summary || "",
      new Date(l.created_at).toLocaleString(),
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredLeads = () => {
    return leads.filter(l => {
      if (filterStatus !== "all" && l.status !== filterStatus) return false;
      if (filterSource !== "all" && l.source !== filterSource) return false;
      return true;
    });
  };

  const sources = [...new Set(leads.map(l => l.source))];
  const filtered = getFilteredLeads();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">询盘管理 / Leads</h1>
          <p className="text-muted-foreground">共 {leads.length} 条线索 / {leads.length} total leads</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          导出CSV / Export
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态 / All</SelectItem>
            <SelectItem value="new">新线索 / New</SelectItem>
            <SelectItem value="contacted">已联系 / Contacted</SelectItem>
            <SelectItem value="qualified">已确认 / Qualified</SelectItem>
            <SelectItem value="closed">已关闭 / Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterSource} onValueChange={setFilterSource}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="来源筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部来源 / All</SelectItem>
            {sources.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["new", "contacted", "qualified", "closed"].map(status => (
          <Card key={status}>
            <CardContent className="py-3 text-center">
              <div className="text-2xl font-bold">{leads.filter(l => l.status === status).length}</div>
              <div className="text-xs text-muted-foreground capitalize">{status}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            暂无线索数据 / No leads found
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>联系人 / Contact</TableHead>
                <TableHead>公司 / Company</TableHead>
                <TableHead>来源 / Source</TableHead>
                <TableHead>状态 / Status</TableHead>
                <TableHead>时间 / Date</TableHead>
                <TableHead>操作 / Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(lead => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{lead.email || "—"}</div>
                  </TableCell>
                  <TableCell>{lead.company || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(v) => updateStatus(lead.id, v)}
                    >
                      <SelectTrigger className="h-7 w-28">
                        <Badge className={statusColors[lead.status] || "bg-muted"}>
                          {lead.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>线索详情 / Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">姓名 / Name</div>
                    <div className="font-medium">{selectedLead.name || "—"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">公司 / Company</div>
                    <div className="font-medium">{selectedLead.company || "—"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">邮箱 / Email</div>
                    <div className="font-medium">{selectedLead.email || "—"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">电话 / Phone</div>
                    <div className="font-medium">{selectedLead.phone || "—"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">来源 / Source</div>
                    <Badge variant="outline">{selectedLead.source}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">创建时间 / Created</div>
                    <div className="text-sm">{new Date(selectedLead.created_at).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              {selectedLead.requirements_summary && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">需求摘要 / Requirements</div>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedLead.requirements_summary}</p>
                </div>
              )}
              {selectedLead.raw_payload && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">原始数据 / Raw Data</div>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-48">
                    {JSON.stringify(selectedLead.raw_payload, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
