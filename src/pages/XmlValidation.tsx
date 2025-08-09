import { useState } from "react";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  Eye,
  X,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface XmlData {
  id: string;
  fileName: string;
  queueName: string;
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

const mockXmlData: XmlData[] = [
  {
    id: '1',
    fileName: 'nota_fiscal_001.xml',
    queueName: 'Fila Empresa X',
    xmlContent: {
      notaFiscal: {
        numero: '000001',
        serie: '1',
        dataEmissao: '2024-01-15',
        valorTotal: 'R$ 1.500,00',
        destinatario: {
          cnpj: '12.345.678/0001-90',
          razaoSocial: 'Cliente Teste LTDA'
        }
      }
    },
    validationStatus: 'pendente',
    anomalies: [
      {
        id: '1',
        type: 'warning',
        field: 'valorTotal',
        message: 'Formato de moeda inconsistente',
        suggestion: 'Use formato numérico: 1500.00',
        value: 'R$ 1.500,00'
      },
      {
        id: '2',
        type: 'error',
        field: 'destinatario.cnpj',
        message: 'CNPJ inválido',
        suggestion: 'Verificar dígitos verificadores',
        value: '12.345.678/0001-90'
      }
    ],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    fileName: 'nota_fiscal_002.xml',
    queueName: 'Fila Empresa Y',
    xmlContent: {
      notaFiscal: {
        numero: '000002',
        serie: '1',
        dataEmissao: '2024-01-15',
        valorTotal: 2500.00,
        destinatario: {
          cnpj: '98.765.432/0001-10',
          razaoSocial: 'Outro Cliente LTDA'
        }
      }
    },
    validationStatus: 'validado',
    anomalies: [],
    createdAt: '2024-01-15T11:00:00Z'
  }
];

const XmlValidation = () => {
  const [xmlFiles, setXmlFiles] = useState<XmlData[]>(mockXmlData);
  const [selectedFile, setSelectedFile] = useState<XmlData | null>(null);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validado':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Validado</Badge>;
      case 'pendente':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      case 'corrigido':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Corrigido</Badge>;
      default:
        return null;
    }
  };

  const getAnomalySeverityIcon = (type: string) => {
    return type === 'error' ? 
      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
      <AlertTriangle className="w-4 h-4 text-warning" />;
  };

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
    
    // Simular envio para API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Enviado com sucesso",
      description: `${validatedFiles.length} arquivo(s) enviado(s) para a API.`
    });
    setSending(false);
  };

  const validatedFilesCount = xmlFiles.filter(f => f.validationStatus === 'validado' || f.validationStatus === 'corrigido').length;
  const pendingFilesCount = xmlFiles.filter(f => f.validationStatus === 'pendente').length;
  const errorFilesCount = xmlFiles.filter(f => f.validationStatus === 'erro').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Validação de XMLs
          </h1>
          <p className="text-muted-foreground mt-1">
            Valide e corrija anomalias nos XMLs antes do envio para a API
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button 
            onClick={handleSendToApi}
            disabled={validatedFilesCount === 0 || sending}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            {sending ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Enviar para API ({validatedFilesCount})
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Arquivos</p>
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
                <p className="text-2xl font-bold text-destructive">{errorFilesCount}</p>
              </div>
              <X className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
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
                      <p className="text-sm text-muted-foreground">{file.queueName}</p>
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
                            {getAnomalySeverityIcon(anomaly.type)}
                            <div className="flex-1">
                              <p className="font-medium">{anomaly.field}</p>
                              <p className="text-sm">{anomaly.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Valor atual: {JSON.stringify(anomaly.value)}
                              </p>
                              {anomaly.suggestion && (
                                <p className="text-xs text-blue-600 mt-1">
                                  Sugestão: {anomaly.suggestion}
                                </p>
                              )}
                              <div className="flex gap-2 mt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCorrectAnomaly(selectedFile.id, anomaly.id, anomaly.suggestion || 'corrigido')}
                                >
                                  Corrigir
                                </Button>
                                <Button size="sm" variant="ghost">Ignorar</Button>
                              </div>
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
    </div>
  );
};

export default XmlValidation;