import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Shield, ShieldCheck } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type UserRole = Tables<"user_roles">;

interface UserWithRole extends UserRole {
  email?: string;
}

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "editor">("editor");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load users", variant: "destructive" });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!newEmail.trim() || !newPassword.trim()) {
      toast({ title: "请填写完整 / Required", description: "Email and password are required", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "密码太短 / Too short", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setAdding(true);
    try {
      // Create user via edge function or direct signup
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newEmail.trim(),
        password: newPassword,
      });

      if (signUpError) {
        toast({ title: "创建失败 / Failed", description: signUpError.message, variant: "destructive" });
        return;
      }

      if (signUpData.user) {
        // Assign role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({ user_id: signUpData.user.id, role: newRole });

        if (roleError) {
          toast({ title: "角色分配失败 / Role Error", description: roleError.message, variant: "destructive" });
        } else {
          toast({ title: "成功 / Success", description: `User created with ${newRole} role` });
          setShowAdd(false);
          setNewEmail("");
          setNewPassword("");
          fetchUsers();
        }
      }
    } catch {
      toast({ title: "Error", description: "Unexpected error", variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const updateRole = async (userId: string, role: "admin" | "editor") => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role })
      .eq("user_id", userId);

    if (error) {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" });
    } else {
      toast({ title: "已更新 / Updated" });
      fetchUsers();
    }
  };

  const removeUser = async (id: string) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to remove user", variant: "destructive" });
    } else {
      toast({ title: "已移除 / Removed" });
      fetchUsers();
    }
  };

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
          <h1 className="text-2xl font-bold">用户管理 / User Management</h1>
          <p className="text-muted-foreground">管理后台用户及其权限角色</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="mr-2 h-4 w-4" />
          添加用户 / Add User
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户ID / User ID</TableHead>
              <TableHead>角色 / Role</TableHead>
              <TableHead>添加时间 / Added</TableHead>
              <TableHead>操作 / Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  暂无用户 / No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{user.user_id.slice(0, 8)}...</code>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(v) => updateRole(user.user_id, v as "admin" | "editor")}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <Badge className={user.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                          {user.role === "admin" ? (
                            <><ShieldCheck className="h-3 w-3 mr-1" /> Admin</>
                          ) : (
                            <><Shield className="h-3 w-3 mr-1" /> Editor</>
                          )}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUser(user.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新用户 / Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>邮箱 / Email</Label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>密码 / Password</Label>
              <Input
                type="password"
                placeholder="至少6位 / Min 6 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>角色 / Role</Label>
              <Select value={newRole} onValueChange={v => setNewRole(v as "admin" | "editor")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor - 可编辑内容</SelectItem>
                  <SelectItem value="admin">Admin - 完全管理权限</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>取消 / Cancel</Button>
            <Button onClick={handleAddUser} disabled={adding}>
              {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              创建 / Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
