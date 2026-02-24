import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, Trash2, Copy, Image as ImageIcon, Search } from "lucide-react";

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

const BUCKET = "cms-images";

export default function MediaLibrary() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState("");

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      toast({ title: "Error", description: "Failed to load media", variant: "destructive" });
    } else {
      setFiles((data || []).filter(f => f.name !== ".emptyFolderPlaceholder") as StorageFile[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    setUploading(true);
    let uploaded = 0;

    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(name, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast({ title: "上传失败 / Upload Failed", description: file.name, variant: "destructive" });
      } else {
        uploaded++;
      }
    }

    if (uploaded > 0) {
      toast({ title: "上传成功 / Uploaded", description: `${uploaded} file(s)` });
      fetchFiles();
    }
    setUploading(false);
    e.target.value = "";
  };

  const deleteFile = async (name: string) => {
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "已删除 / Deleted" });
      fetchFiles();
    }
  };

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
    return data.publicUrl;
  };

  const copyUrl = (name: string) => {
    const url = getPublicUrl(name);
    navigator.clipboard.writeText(url);
    toast({ title: "已复制 / Copied", description: "URL copied to clipboard" });
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold">媒体库 / Media Library</h1>
          <p className="text-muted-foreground">共 {files.length} 个文件 / {files.length} files</p>
        </div>
        <Button disabled={uploading} asChild>
          <label className="cursor-pointer">
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            上传文件 / Upload
            <input type="file" className="hidden" multiple accept="image/*" onChange={handleUpload} />
          </label>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索文件名... / Search files..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {search ? "未找到匹配文件 / No matching files" : "暂无文件，请上传 / No files yet"}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(file => {
            const url = getPublicUrl(file.name);
            const isImage = file.metadata?.mimetype?.startsWith("image/") ||
              /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);

            return (
              <Card key={file.id} className="overflow-hidden group">
                <div
                  className="aspect-square bg-muted flex items-center justify-center cursor-pointer relative"
                  onClick={() => {
                    if (isImage) {
                      setPreviewUrl(url);
                      setPreviewName(file.name);
                    } else {
                      copyUrl(file.name);
                    }
                  }}
                >
                  {isImage ? (
                    <img src={url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); copyUrl(file.name); }}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteFile(file.name); }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-2">
                  <div className="text-xs truncate" title={file.name}>{file.name}</div>
                  <div className="text-xs text-muted-foreground">{formatSize(file.metadata?.size)}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="truncate">{previewName}</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className="space-y-3">
              <img src={previewUrl} alt={previewName} className="w-full rounded-md" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyUrl(previewName)} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  复制链接 / Copy URL
                </Button>
                <Button variant="destructive" size="sm" onClick={() => { deleteFile(previewName); setPreviewUrl(null); }}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  删除 / Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
