import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, FileText, X, Play, Trash2, Download, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: string;
}

const FileComparison = () => {
  const [fileA, setFileA] = useState<UploadedFile | null>(null);
  const [fileB, setFileB] = useState<UploadedFile | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonProgress, setComparisonProgress] = useState(0);
  const [comparisonComplete, setComparisonComplete] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>, target: 'A' | 'B') => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile, target);
    }
  }, []);

  const handleFileSelect = useCallback((file: File, target: 'A' | 'B') => {
    const uploadedFile: UploadedFile = {
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || 'Desconhecido'
    };

    if (target === 'A') {
      setFileA(uploadedFile);
      addLog('info', `Arquivo A carregado: ${file.name}`);
    } else {
      setFileB(uploadedFile);
      addLog('info', `Arquivo B carregado: ${file.name}`);
    }
  }, [addLog]);

  const removeFile = useCallback((target: 'A' | 'B') => {
    if (target === 'A') {
      setFileA(null);
      addLog('info', 'Arquivo A removido');
    } else {
      setFileB(null);
      addLog('info', 'Arquivo B removido');
    }
  }, [addLog]);

  const simulateComparison = useCallback(async () => {
    if (!fileA || !fileB) {
      toast({
        title: "Arquivos necessários",
        description: "Selecione ambos os arquivos antes de iniciar a comparação.",
        variant: "destructive"
      });
      return;
    }

    setIsComparing(true);
    setComparisonProgress(0);
    setComparisonComplete(false);
    
    addLog('info', 'Iniciando comparação entre arquivos...');
    addLog('info', `Arquivo A: ${fileA.name} (${fileA.size})`);
    addLog('info', `Arquivo B: ${fileB.name} (${fileB.size})`);

    const steps = [
      { progress: 10, message: 'Verificando integridade dos arquivos...' },
      { progress: 25, message: 'Analisando estrutura do Arquivo A...' },
      { progress: 45, message: 'Analisando estrutura do Arquivo B...' },
      { progress: 60, message: 'Comparando conteúdo linha por linha...' },
      { progress: 75, message: 'Identificando diferenças...' },
      { progress: 90, message: 'Gerando relatório de comparação...' },
      { progress: 100, message: 'Comparação concluída com sucesso!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setComparisonProgress(step.progress);
      addLog('info', step.message);
    }

    // Simular resultados da comparação
    const similarities = Math.floor(Math.random() * 30) + 70; // 70-100%
    const differences = 100 - similarities;
    
    addLog('success', `Similaridade encontrada: ${similarities}%`);
    addLog('warning', `Diferenças encontradas: ${differences}%`);
    
    if (differences > 20) {
      addLog('error', 'Diferenças significativas detectadas nos arquivos');
    } else {
      addLog('success', 'Arquivos são majoritariamente similares');
    }

    addLog('info', `Total de linhas comparadas: ${Math.floor(Math.random() * 1000) + 500}`);
    addLog('info', `Tempo de processamento: ${(Math.random() * 5 + 2).toFixed(1)}s`);

    setIsComparing(false);
    setComparisonComplete(true);

    toast({
      title: "Comparação concluída",
      description: `Arquivos comparados com ${similarities}% de similaridade.`,
    });
  }, [fileA, fileB, addLog, toast]);

  const clearAll = useCallback(() => {
    setFileA(null);
    setFileB(null);
    setLogs([]);
    setComparisonProgress(0);
    setComparisonComplete(false);
    addLog('info', 'Interface resetada');
  }, [addLog]);

  const exportResult = useCallback(() => {
    if (!comparisonComplete) {
      toast({
        title: "Comparação não concluída",
        description: "Execute uma comparação antes de exportar os resultados.",
        variant: "destructive"
      });
      return;
    }

    const logText = logs.map(log => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparacao_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addLog('success', 'Relatório exportado com sucesso');
    toast({
      title: "Relatório exportado",
      description: "O arquivo de resultados foi baixado com sucesso.",
    });
  }, [comparisonComplete, logs, addLog, toast]);

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const FileUploadArea = ({ target, file }: { target: 'A' | 'B', file: UploadedFile | null }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Arquivo {target}</h3>
        {file && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFile(target)}
            className="text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {file ? (
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">{file.size}</Badge>
                <Badge variant="outline">{file.type}</Badge>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={(e) => handleFileDrop(e, target)}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById(`file-input-${target}`)?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            Clique ou arraste o arquivo {target} aqui
          </p>
          <p className="text-xs text-muted-foreground">
            Suporta PDF, XML, TXT e outros formatos
          </p>
          <input
            id={`file-input-${target}`}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file, target);
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comparação de Arquivos</h1>
          <p className="text-muted-foreground mt-2">
            Compare dois arquivos e identifique diferenças e similaridades
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Areas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seleção de Arquivos</CardTitle>
              <CardDescription>
                Carregue os dois arquivos que deseja comparar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUploadArea target="A" file={fileA} />
              <FileUploadArea target="B" file={fileB} />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>
                Controle o processo de comparação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={simulateComparison}
                  disabled={!fileA || !fileB || isComparing}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isComparing ? 'Comparando...' : 'Iniciar Comparação'}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearAll}
                  disabled={isComparing}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
                <Button
                  variant="secondary"
                  onClick={exportResult}
                  disabled={!comparisonComplete}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              {isComparing && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso da comparação</span>
                    <span>{comparisonProgress}%</span>
                  </div>
                  <Progress value={comparisonProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Logs Area */}
        <Card className="lg:h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Logs da Comparação</CardTitle>
                <CardDescription>
                  Acompanhe o progresso em tempo real
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLogs([])}
                disabled={logs.length === 0}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              {logs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Os logs aparecerão aqui durante a comparação
                </p>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2 text-sm">
                      {getLogIcon(log.type)}
                      <span className="text-muted-foreground text-xs shrink-0 mt-0.5">
                        {log.timestamp}
                      </span>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileComparison;