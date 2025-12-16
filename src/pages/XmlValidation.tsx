import { useState, useRef } from "react";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  Eye,
  X,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Building2,
  Trash2,
  Clock,
  FileUp,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ExtractedData {
  numero: string;
  serie: string;
  dataEmissao: string;
  valorTotal: string;
  prestador: {
    cnpj: string;
    razaoSocial: string;
  };
  tomador: {
    cnpj: string;
    razaoSocial: string;
  };
  descricao: string;
}

interface PdfFile {
  id: string;
  fileName: string;
  size: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  extractedData?: ExtractedData;
  uploadedAt: string;
}

interface Client {
  id: string;
  name: string;
  cnpj: string;
  files: PdfFile[];
  status: 'idle' | 'uploading' | 'processing' | 'ready';
  createdAt: string;
}

interface XmlData {
  id: string;
  fileName: string;
  clientName: string;
  xmlContent: any;
  validationStatus: 'pendente' | 'validado' | 'erro' | 'corrigido';
  anomalies: Anomaly[];
  createdAt: string;
}

interface Anomaly {
  id: string;
  type: 'warning' | 'error';
  field: string;
  message: string;
  suggestion?: string;
  value: any;
  correctedValue?: any;
}

const XmlValidation = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [xmlFiles, setXmlFiles] = useState<XmlData[]>([]);
  const [selectedFile, setSelectedFile] = useState<XmlData | null>(null);
  const [sending, setSending] = useState(false);
  const [newClientDialog, setNewClientDialog] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCnpj, setNewClientCnpj] = useState('');
  const [activeTab, setActiveTab] = useState<'clients' | 'validation'>('clients');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Simular extração de dados do PDF
  const simulateDataExtraction = (): ExtractedData => {
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return {
      numero: randomNum,
      serie: '1',
      dataEmissao: new Date().toISOString().split('T')[0],
      valorTotal: `R$ ${(Math.random() * 10000 + 500).toFixed(2).replace('.', ',')}`,
      prestador: {
        cnpj: `${Math.floor(Math.random() * 99)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}/0001-${Math.floor(Math.random() * 99).toString().padStart(2, '0')}`,
        razaoSocial: `Empresa Prestadora ${randomNum} LTDA`
      },
      tomador: {
        cnpj: selectedClient?.cnpj || '00.000.000/0001-00',
        razaoSocial: selectedClient?.name || 'Cliente'
      },
      descricao: 'Serviços de consultoria técnica especializada'
    };
  };

  const handleCreateClient = () => {
    if (!newClientName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite o nome do cliente.",
        variant: "destructive"
      });
      return;
    }

    const newClient: Client = {
      id: Date.now().toString(),
      name: newClientName,
      cnpj: newClientCnpj || 'Não informado',
      files: [],
      status: 'idle',
      createdAt: new Date().toISOString()
    };

    setClients(prev => [...prev, newClient]);
    setNewClientName('');
    setNewClientCnpj('');
    setNewClientDialog(false);
    
    toast({
      title: "Cliente criado",
      description: `${newClientName} foi adicionado com sucesso.`
    });
  };

  const handleFileUpload = async (clientId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const newFiles: PdfFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      size: formatFileSize(file.size),
      status: 'uploading' as const,
      progress: 0,
      uploadedAt: new Date().toISOString()
    }));

    // Adicionar arquivos ao cliente
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, files: [...c.files, ...newFiles], status: 'uploading' }
        : c
    ));

    // Simular upload e processamento para cada arquivo
    for (const newFile of newFiles) {
      await simulateFileProcessing(clientId, newFile.id);
    }
  };

  const simulateFileProcessing = async (clientId: string, fileId: string) => {
    // Simular progresso de upload
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setClients(prev => prev.map(c => 
        c.id === clientId 
          ? {
              ...c,
              files: c.files.map(f => 
                f.id === fileId ? { ...f, progress, status: progress < 100 ? 'uploading' : 'processing' } : f
              )
            }
          : c
      ));
    }

    // Simular processamento e extração de dados
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const extractedData = simulateDataExtraction();
    
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? {
            ...c,
            files: c.files.map(f => 
              f.id === fileId 
                ? { ...f, status: 'ready', extractedData }
                : f
            ),
            status: 'ready'
          }
        : c
    ));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso."
    });
  };

  const handleRemoveFile = (clientId: string, fileId: string) => {
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, files: c.files.filter(f => f.id !== fileId) }
        : c
    ));
  };

  const handleRequestConversion = async (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const readyFiles = client.files.filter(f => f.status === 'ready');
    if (readyFiles.length === 0) {
      toast({
        title: "Nenhum arquivo pronto",
        description: "Aguarde o processamento dos arquivos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Conversão solicitada",
      description: `${readyFiles.length} arquivo(s) de ${client.name} enviados para conversão.`
    });

    // Criar XMLs a partir dos PDFs processados
    const newXmlFiles: XmlData[] = readyFiles.map(file => ({
      id: file.id,
      fileName: file.fileName.replace('.pdf', '.xml'),
      clientName: client.name,
      xmlContent: file.extractedData,
      validationStatus: 'pendente' as const,
      anomalies: generateRandomAnomalies(),
      createdAt: new Date().toISOString()
    }));

    setXmlFiles(prev => [...prev, ...newXmlFiles]);
    
    // Limpar arquivos do cliente após conversão
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, files: [], status: 'idle' }
        : c
    ));

    setActiveTab('validation');
  };

  const generateRandomAnomalies = (): Anomaly[] => {
    const anomalies: Anomaly[] = [];
    if (Math.random() > 0.5) {
      anomalies.push({
        id: Date.now().toString(),
        type: 'warning',
        field: 'valorTotal',
        message: 'Formato de moeda inconsistente',
        suggestion: 'Use formato numérico padrão',
        value: 'R$ 1.500,00'
      });
    }
    if (Math.random() > 0.7) {
      anomalies.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        field: 'prestador.cnpj',
        message: 'CNPJ precisa de verificação',
        suggestion: 'Verificar dígitos',
        value: '12.345.678/0001-90'
      });
    }
    return anomalies;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validado':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Validado</Badge>;
      case 'pendente':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      case 'corrigido':
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Corrigido</Badge>;
      default:
        return null;
    }
  };

  const getClientStatusBadge = (status: Client['status']) => {
    switch (status) {
      case 'ready':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Pronto</Badge>;
      case 'uploading':
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Enviando</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Processando</Badge>;
      default:
        return <Badge variant="outline">Aguardando</Badge>;
    }
  };

  const [editingAnomaly, setEditingAnomaly] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleCorrectAnomaly = (fileId: string, anomalyId: string, correctedValue: any) => {
    setXmlFiles(files => 
      files.map(file => {
        if (file.id === fileId) {
          const updatedAnomalies = file.anomalies.map(anomaly => 
            anomaly.id === anomalyId 
              ? { ...anomaly, correctedValue }
              : anomaly
          );
          return {
            ...file,
            anomalies: updatedAnomalies,
            validationStatus: updatedAnomalies.every(a => a.correctedValue) ? 'corrigido' : file.validationStatus
          };
        }
        return file;
      })
    );
    setEditingAnomaly(null);
    setEditValue('');
  };

  const handleStartEdit = (anomalyId: string, currentValue: any) => {
    setEditingAnomaly(anomalyId);
    setEditValue(String(currentValue));
  };

  const handleValidateFile = (fileId: string) => {
    setXmlFiles(files => 
      files.map(file => 
        file.id === fileId 
          ? { ...file, validationStatus: 'validado' }
          : file
      )
    );
    toast({
      title: "Arquivo validado",
      description: "O arquivo foi marcado como validado com sucesso."
    });
  };

  const handleSendToApi = async () => {
    setSending(true);
    const validatedFiles = xmlFiles.filter(f => f.validationStatus === 'validado' || f.validationStatus === 'corrigido');
    
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < validatedFiles.length; i += batchSize) {
      batches.push(validatedFiles.slice(i, i + batchSize));
    }
    
    for (let i = 0; i < batches.length; i++) {
      toast({
        title: `Enviando lote ${i + 1}/${batches.length}`,
        description: `Processando ${batches[i].length} arquivo(s)...`
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    toast({
      title: "Enviado com sucesso",
      description: `${validatedFiles.length} arquivo(s) enviado(s) em ${batches.length} lote(s).`
    });
    setSending(false);
  };

  const validatedFilesCount = xmlFiles.filter(f => f.validationStatus === 'validado' || f.validationStatus === 'corrigido').length;
  const pendingFilesCount = xmlFiles.filter(f => f.validationStatus === 'pendente').length;
  const totalReadyFiles = clients.reduce((acc, c) => acc + c.files.filter(f => f.status === 'ready').length, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
            Conversão e Validação
          </h1>
          <p className="text-muted-foreground mt-1">
            Importe PDFs, converta para XML e valide os dados extraídos
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-border pb-2">
        <Button
          variant={activeTab === 'clients' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('clients')}
          className="gap-2"
        >
          <Building2 className="w-4 h-4" />
          Clientes e Upload
          {totalReadyFiles > 0 && (
            <Badge variant="secondary" className="ml-1 bg-success/20 text-success">
              {totalReadyFiles}
            </Badge>
          )}
        </Button>
        <Button
          variant={activeTab === 'validation' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('validation')}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Validação XML
          {pendingFilesCount > 0 && (
            <Badge variant="secondary" className="ml-1 bg-warning/20 text-warning">
              {pendingFilesCount}
            </Badge>
          )}
        </Button>
      </div>

      {activeTab === 'clients' && (
        <div className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Clientes</p>
                    <p className="text-2xl font-bold">{clients.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-highlight/5 to-highlight/10 border-highlight/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">PDFs Carregados</p>
                    <p className="text-2xl font-bold">{clients.reduce((acc, c) => acc + c.files.length, 0)}</p>
                  </div>
                  <FileUp className="w-8 h-8 text-highlight" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Prontos p/ Conversão</p>
                    <p className="text-2xl font-bold text-success">{totalReadyFiles}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Aguardando Validação</p>
                    <p className="text-2xl font-bold text-warning">{pendingFilesCount}</p>
                  </div>
                  <Clock className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Client Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cards de Clientes</h2>
            <Dialog open={newClientDialog} onOpenChange={setNewClientDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-highlight hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Card de Cliente</DialogTitle>
                  <DialogDescription>
                    Crie um card para organizar os PDFs de cada cliente separadamente.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome do Cliente *</Label>
                    <Input
                      id="clientName"
                      placeholder="Ex: Empresa ABC LTDA"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientCnpj">CNPJ (opcional)</Label>
                    <Input
                      id="clientCnpj"
                      placeholder="00.000.000/0001-00"
                      value={newClientCnpj}
                      onChange={(e) => setNewClientCnpj(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewClientDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateClient}>
                    Criar Cliente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Client Cards Grid */}
          {clients.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="p-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Nenhum cliente cadastrado</h3>
                <p className="text-muted-foreground mb-6">
                  Crie cards de clientes para organizar seus PDFs e trabalhar com múltiplos clientes simultaneamente.
                </p>
                <Button onClick={() => setNewClientDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Cliente
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-highlight/5 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-highlight flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{client.cnpj}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getClientStatusBadge(client.status)}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {/* Upload Area */}
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedClient(client);
                        fileInputRef.current?.click();
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-primary', 'bg-primary/10');
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
                        handleFileUpload(client.id, e.dataTransfer.files);
                      }}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arraste PDFs ou clique para selecionar
                      </p>
                    </div>

                    {/* Files List with Data Preview */}
                    {client.files.length > 0 && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        <p className="text-sm font-medium text-muted-foreground">
                          {client.files.length} arquivo(s) importado(s)
                        </p>
                        {client.files.map((file) => (
                          <div key={file.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium truncate">{file.fileName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleRemoveFile(client.id, file.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {file.status === 'uploading' && (
                              <Progress value={file.progress} className="h-1" />
                            )}
                            
                            {file.status === 'processing' && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Extraindo dados...
                              </div>
                            )}
                            
                            {/* Data Preview */}
                            {file.status === 'ready' && file.extractedData && (
                              <div className="bg-muted/50 rounded-md p-2 space-y-1 text-xs">
                                <div className="grid grid-cols-2 gap-1">
                                  <span className="text-muted-foreground">Nº Nota:</span>
                                  <span className="font-medium">{file.extractedData.numero}</span>
                                  <span className="text-muted-foreground">Valor:</span>
                                  <span className="font-medium text-success">{file.extractedData.valorTotal}</span>
                                  <span className="text-muted-foreground">Data:</span>
                                  <span className="font-medium">{file.extractedData.dataEmissao}</span>
                                  <span className="text-muted-foreground">Prestador:</span>
                                  <span className="font-medium truncate" title={file.extractedData.prestador.razaoSocial}>
                                    {file.extractedData.prestador.razaoSocial.substring(0, 20)}...
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        disabled={client.files.filter(f => f.status === 'ready').length === 0}
                        onClick={() => handleRequestConversion(client.id)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Converter ({client.files.filter(f => f.status === 'ready').length})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              if (selectedClient) {
                handleFileUpload(selectedClient.id, e.target.files);
              }
              e.target.value = '';
            }}
          />
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button 
              onClick={handleSendToApi}
              disabled={validatedFilesCount === 0 || sending}
              className="bg-gradient-to-r from-primary to-highlight"
            >
              {sending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Enviar para API ({validatedFilesCount})
            </Button>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de XMLs</p>
                    <p className="text-2xl font-bold">{xmlFiles.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Validados</p>
                    <p className="text-2xl font-bold text-success">{validatedFilesCount}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                    <p className="text-2xl font-bold text-warning">{pendingFilesCount}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Com Erro</p>
                    <p className="text-2xl font-bold text-destructive">
                      {xmlFiles.filter(f => f.validationStatus === 'erro').length}
                    </p>
                  </div>
                  <X className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          {xmlFiles.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progresso de Validação</span>
                  <span className="text-sm text-muted-foreground">
                    {validatedFilesCount} de {xmlFiles.length} validados
                  </span>
                </div>
                <Progress value={(validatedFilesCount / xmlFiles.length) * 100} className="h-2" />
              </CardContent>
            </Card>
          )}

          {xmlFiles.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Nenhum XML para validar</h3>
                <p className="text-muted-foreground mb-6">
                  Importe PDFs na aba "Clientes e Upload" e solicite a conversão para gerar XMLs.
                </p>
                <Button onClick={() => setActiveTab('clients')}>
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Ir para Upload
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
            {/* XML Data Table */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Visão Geral dos XMLs Convertidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Cliente</TableHead>
                        <TableHead className="font-semibold">Nº Nota</TableHead>
                        <TableHead className="font-semibold">Data Emissão</TableHead>
                        <TableHead className="font-semibold">Prestador</TableHead>
                        <TableHead className="font-semibold">CNPJ Prestador</TableHead>
                        <TableHead className="font-semibold text-right">Valor Total</TableHead>
                        <TableHead className="font-semibold text-center">Status</TableHead>
                        <TableHead className="font-semibold text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {xmlFiles.map((file) => (
                        <TableRow 
                          key={file.id} 
                          className={`cursor-pointer hover:bg-muted/50 ${selectedFile?.id === file.id ? 'bg-primary/10' : ''}`}
                          onClick={() => setSelectedFile(file)}
                        >
                          <TableCell className="font-medium">{file.clientName}</TableCell>
                          <TableCell>{file.xmlContent?.numero || '-'}</TableCell>
                          <TableCell>{file.xmlContent?.dataEmissao || '-'}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={file.xmlContent?.prestador?.razaoSocial}>
                            {file.xmlContent?.prestador?.razaoSocial || '-'}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {file.xmlContent?.prestador?.cnpj || '-'}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-success">
                            {file.xmlContent?.valorTotal || '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(file.validationStatus)}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedFile(file);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {file.validationStatus === 'pendente' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-success hover:text-success"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleValidateFile(file.id);
                                  }}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Files List */}
              <Card>
                <CardHeader>
                  <CardTitle>Arquivos XML</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {xmlFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedFile?.id === file.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{file.fileName}</p>
                            <p className="text-sm text-muted-foreground">{file.clientName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.anomalies.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {file.anomalies.length} anomalia(s)
                            </Badge>
                          )}
                          {getStatusBadge(file.validationStatus)}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* File Details */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedFile ? `Detalhes: ${selectedFile.fileName}` : 'Selecione um arquivo'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <Tabs defaultValue="anomalies" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="anomalies">
                          Anomalias ({selectedFile.anomalies.length})
                        </TabsTrigger>
                        <TabsTrigger value="preview">Preview XML</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="anomalies" className="space-y-4">
                        {selectedFile.anomalies.length === 0 ? (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              Nenhuma anomalia detectada neste arquivo.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <div className="space-y-3">
                            {selectedFile.anomalies.map((anomaly) => (
                              <Alert key={anomaly.id} variant={anomaly.type === 'error' ? 'destructive' : 'default'}>
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className={`w-4 h-4 ${anomaly.type === 'error' ? 'text-destructive' : 'text-warning'}`} />
                                  <div className="flex-1">
                                    <p className="font-medium">{anomaly.field}</p>
                                    <p className="text-sm">{anomaly.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Valor atual: {JSON.stringify(anomaly.value)}
                                    </p>
                                    {anomaly.suggestion && (
                                      <p className="text-xs text-primary mt-1">
                                        Sugestão: {anomaly.suggestion}
                                      </p>
                                    )}
                                    {editingAnomaly === anomaly.id ? (
                                      <div className="flex gap-2 mt-2">
                                        <Input
                                          value={editValue}
                                          onChange={(e) => setEditValue(e.target.value)}
                                          placeholder="Digite o valor corrigido"
                                          className="flex-1"
                                        />
                                        <Button 
                                          size="sm"
                                          onClick={() => handleCorrectAnomaly(selectedFile.id, anomaly.id, editValue)}
                                        >
                                          Salvar
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="ghost"
                                          onClick={() => {
                                            setEditingAnomaly(null);
                                            setEditValue('');
                                          }}
                                        >
                                          Cancelar
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex gap-2 mt-2">
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleStartEdit(anomaly.id, anomaly.value)}
                                        >
                                          Corrigir
                                        </Button>
                                        {anomaly.suggestion && (
                                          <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => handleCorrectAnomaly(selectedFile.id, anomaly.id, anomaly.suggestion)}
                                          >
                                            Usar Sugestão
                                          </Button>
                                        )}
                                        <Button size="sm" variant="ghost">Ignorar</Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Alert>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-4">
                          <Button 
                            onClick={() => handleValidateFile(selectedFile.id)}
                            disabled={selectedFile.validationStatus === 'validado'}
                            className="flex-1"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Marcar como Validado
                          </Button>
                          <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Completo
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="preview" className="space-y-4">
                        <div className="bg-muted/50 p-4 rounded-lg overflow-auto max-h-96">
                          <pre className="text-sm">
                            {JSON.stringify(selectedFile.xmlContent, null, 2)}
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Selecione um arquivo da lista para ver os detalhes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default XmlValidation;
