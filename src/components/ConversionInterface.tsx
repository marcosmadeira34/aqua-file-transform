import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Play, 
  Download, 
  FileCheck, 
  Loader2,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversionJob {
  id: string;
  fileName: string;
  outputFormat: string;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  downloadUrl?: string;
}

interface ConversionInterfaceProps {
  onConversionComplete?: () => void;
}

const ConversionInterface = ({ onConversionComplete }: ConversionInterfaceProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const outputFormats = [
    { value: "docx", label: "Word Document (.docx)" },
    { value: "xlsx", label: "Excel Spreadsheet (.xlsx)" },
    { value: "txt", label: "Text File (.txt)" },
    { value: "html", label: "HTML Document (.html)" },
    { value: "xml", label: "XML Document (.xml)" },
  ];

  const mockFiles = [
    "documento_contrato.pdf",
    "relatorio_vendas.pdf", 
    "manual_usuario.pdf"
  ];

  const startConversion = async () => {
    if (!selectedFormat) return;

    setIsProcessing(true);
    
    const newJobs: ConversionJob[] = mockFiles.map((fileName, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName,
      outputFormat: selectedFormat,
      status: "pending",
      progress: 0
    }));

    setJobs(newJobs);

    // Simulate API call and processing
    for (let i = 0; i < newJobs.length; i++) {
      const job = newJobs[i];
      
      // Update job status to processing
      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, status: "processing" } : j
      ));

      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          setJobs(prev => prev.map(j => 
            j.id === job.id 
              ? { 
                  ...j, 
                  status: "completed", 
                  progress: 100,
                  downloadUrl: `#download-${j.id}`
                }
              : j
          ));
          clearInterval(progressInterval);
        } else {
          setJobs(prev => prev.map(j => 
            j.id === job.id ? { ...j, progress } : j
          ));
        }
      }, 300);

      // Delay between jobs
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsProcessing(false);
    
    // Call onConversionComplete callback
    if (onConversionComplete) {
      onConversionComplete();
    }
  };

  const getStatusIcon = (status: ConversionJob["status"]) => {
    switch (status) {
      case "pending":
        return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
      case "processing":
        return <Loader2 className="w-4 h-4 text-secondary animate-spin" />;
      case "completed":
        return <FileCheck className="w-4 h-4 text-secondary" />;
      case "error":
        return <RefreshCw className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: ConversionJob["status"]) => {
    const variants = {
      pending: "secondary",
      processing: "default",
      completed: "default",
      error: "destructive"
    } as const;

    const labels = {
      pending: "Pendente",
      processing: "Processando",
      completed: "Concluído",
      error: "Erro"
    };

    return (
      <Badge 
        variant={variants[status]}
        className={cn(
          status === "completed" && "bg-secondary/10 text-secondary border-secondary/20",
          status === "processing" && "bg-primary/10 text-primary border-primary/20"
        )}
      >
        {labels[status]}
      </Badge>
    );
  };

  return (
    <Card className="gradient-card shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Settings className="w-5 h-5" />
          Interface de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Formato de Saída
            </label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o formato de conversão" />
              </SelectTrigger>
              <SelectContent>
                {outputFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={startConversion}
            disabled={!selectedFormat || isProcessing}
            className="w-full gradient-primary text-primary-foreground hover:scale-105 transition-transform"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar Conversão
              </>
            )}
          </Button>
        </div>

        {jobs.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Status das Conversões</h4>
            <div className="space-y-3">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border bg-card",
                    "animate-scale-in"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(job.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-foreground">
                        {job.fileName}
                      </p>
                      {getStatusBadge(job.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>→ {selectedFormat.toUpperCase()}</span>
                    </div>
                    
                    {job.status === "processing" && (
                      <Progress value={job.progress} className="h-1" />
                    )}
                  </div>
                  
                  {job.status === "completed" && job.downloadUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-secondary/10 hover:border-secondary/40"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversionInterface;