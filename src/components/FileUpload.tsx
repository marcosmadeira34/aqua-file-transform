import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, CheckCircle, Plus, FolderPlus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "completed" | "error";
  progress: number;
}

interface ConversionQueue {
  id: string;
  name: string;
  description: string;
  files: UploadedFile[];
  createdAt: Date;
  status: "draft" | "processing" | "completed";
}

interface FileUploadProps {
  onQueueComplete?: (queue: ConversionQueue) => void;
}

const FileUpload = ({ onQueueComplete }: FileUploadProps) => {
  const [queues, setQueues] = useState<ConversionQueue[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newQueueName, setNewQueueName] = useState("");
  const [newQueueDescription, setNewQueueDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const createNewQueue = () => {
    if (!newQueueName.trim()) return;

    const newQueue: ConversionQueue = {
      id: Math.random().toString(36).substr(2, 9),
      name: newQueueName,
      description: newQueueDescription,
      files: [],
      createdAt: new Date(),
      status: "draft"
    };

    setQueues(prev => [...prev, newQueue]);
    setSelectedQueueId(newQueue.id);
    setNewQueueName("");
    setNewQueueDescription("");
    setIsCreateDialogOpen(false);
  };

  const simulateUpload = (queueId: string, fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setQueues(prev => prev.map(q => 
          q.id === queueId 
            ? {
                ...q,
                files: q.files.map(f => 
                  f.id === fileId 
                    ? { ...f, status: "completed", progress: 100 }
                    : f
                )
              }
            : q
        ));
        clearInterval(interval);
      } else {
        setQueues(prev => prev.map(q => 
          q.id === queueId 
            ? {
                ...q,
                files: q.files.map(f => 
                  f.id === fileId 
                    ? { ...f, progress }
                    : f
                )
              }
            : q
        ));
      }
    }, 200);
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || !selectedQueueId) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0
    }));

    setQueues(prev => prev.map(q => 
      q.id === selectedQueueId 
        ? { ...q, files: [...q.files, ...newFiles] }
        : q
    ));

    newFiles.forEach(file => simulateUpload(selectedQueueId, file.id));
  };

  const removeFile = (queueId: string, fileId: string) => {
    setQueues(prev => prev.map(q => 
      q.id === queueId 
        ? { ...q, files: q.files.filter(f => f.id !== fileId) }
        : q
    ));
  };

  const startConversion = (queueId: string) => {
    const queue = queues.find(q => q.id === queueId);
    if (!queue || queue.files.length === 0) return;

    // Update queue status to processing
    setQueues(prev => prev.map(q => 
      q.id === queueId ? { ...q, status: "processing" } : q
    ));

    // Simulate conversion completion and redirect to conversions page
    setTimeout(() => {
      setQueues(prev => prev.map(q => 
        q.id === queueId ? { ...q, status: "completed" } : q
      ));
      
      if (onQueueComplete) {
        onQueueComplete(queue);
      }
      
      navigate('/conversions');
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const selectedQueue = queues.find(q => q.id === selectedQueueId);

  return (
    <Card className="gradient-card shadow-card animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <FolderPlus className="w-5 h-5" />
          Gerenciamento de Filas de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Queue Management */}
        <div className="flex gap-3">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Fila
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Fila de Conversão</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="queueName">Nome da Fila</Label>
                  <Input
                    id="queueName"
                    placeholder="Ex: Empresa X - Contratos"
                    value={newQueueName}
                    onChange={(e) => setNewQueueName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="queueDescription">Descrição (opcional)</Label>
                  <Input
                    id="queueDescription"
                    placeholder="Descrição da fila..."
                    value={newQueueDescription}
                    onChange={(e) => setNewQueueDescription(e.target.value)}
                  />
                </div>
                <Button onClick={createNewQueue} className="w-full">
                  Criar Fila
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {queues.length > 0 && (
            <Select value={selectedQueueId} onValueChange={setSelectedQueueId}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecionar fila..." />
              </SelectTrigger>
              <SelectContent>
                {queues.map((queue) => (
                  <SelectItem key={queue.id} value={queue.id}>
                    <div className="flex items-center gap-2">
                      <span>{queue.name}</span>
                      <Badge variant={queue.status === "draft" ? "outline" : queue.status === "processing" ? "secondary" : "default"}>
                        {queue.files.length} arquivos
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* File Upload Area */}
        {selectedQueueId && (
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
              isDragOver 
                ? "border-secondary bg-secondary/5 scale-105" 
                : "border-border hover:border-secondary/60 hover:bg-muted/30"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-float">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Adicionar PDFs à fila: {selectedQueue?.name}
                </h3>
                <p className="text-muted-foreground">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
              </div>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="gradient-primary text-primary-foreground hover:scale-105 transition-transform"
                disabled={selectedQueue?.status !== "draft"}
              >
                Selecionar Arquivos
              </Button>
            </div>
          </div>
        )}

        {!selectedQueueId && queues.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FolderPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Crie uma nova fila para começar a adicionar arquivos</p>
          </div>
        )}

        {!selectedQueueId && queues.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Selecione uma fila para adicionar arquivos</p>
          </div>
        )}

        {/* Queue Details */}
        {selectedQueue && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Fila: {selectedQueue.name}</h4>
                {selectedQueue.description && (
                  <p className="text-sm text-muted-foreground">{selectedQueue.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  selectedQueue.status === "draft" ? "outline" : 
                  selectedQueue.status === "processing" ? "secondary" : "default"
                }>
                  {selectedQueue.status === "draft" ? "Rascunho" :
                   selectedQueue.status === "processing" ? "Processando" : "Concluída"}
                </Badge>
                {selectedQueue.files.length > 0 && selectedQueue.status === "draft" && (
                  <Button 
                    onClick={() => startConversion(selectedQueue.id)}
                    className="flex items-center gap-2"
                    variant="success"
                  >
                    <Send className="w-4 h-4" />
                    Iniciar Conversão
                  </Button>
                )}
              </div>
            </div>

            {selectedQueue.files.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {selectedQueue.files.length} arquivo(s) na fila
                </p>
                {selectedQueue.files.map((file, index) => (
                  <div
                    key={file.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border bg-card",
                      "animate-scale-in"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 rounded bg-primary/10">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm truncate text-foreground">
                          {file.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-1" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {file.status === "completed" && (
                        <CheckCircle className="w-4 h-4 text-secondary" />
                      )}
                      
                      {selectedQueue.status === "draft" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(selectedQueue.id, file.id)}
                          className="h-6 w-6 p-0 hover:bg-destructive/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Queues List */}
        {queues.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Filas Criadas</h4>
            <div className="grid gap-3">
              {queues.map((queue) => (
                <div
                  key={queue.id}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-all",
                    selectedQueueId === queue.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedQueueId(queue.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{queue.name}</p>
                      {queue.description && (
                        <p className="text-xs text-muted-foreground">{queue.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {queue.files.length} arquivos
                      </Badge>
                      <Badge variant={
                        queue.status === "draft" ? "outline" : 
                        queue.status === "processing" ? "secondary" : "default"
                      } className="text-xs">
                        {queue.status === "draft" ? "Rascunho" :
                         queue.status === "processing" ? "Processando" : "Concluída"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;