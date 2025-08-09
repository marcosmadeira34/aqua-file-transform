import { useState } from "react";
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Settings,
  Key,
  Globe,
  RefreshCw,
  Eye,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers: Record<string, string>;
  isActive: boolean;
}

interface ApiResponse {
  id: string;
  endpointId: string;
  fileName: string;
  status: 'enviando' | 'sucesso' | 'erro' | 'timeout';
  requestBody: any;
  responseBody: any;
  statusCode?: number;
  duration?: number;
  timestamp: string;
  errorMessage?: string;
}

const mockEndpoints: ApiEndpoint[] = [
  {
    id: '1',
    name: 'API Contabilidade',
    url: 'https://api.contabilidade.com/v1/notas-fiscais',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer xxx-api-key-xxx',
      'Content-Type': 'application/json'
    },
    isActive: true
  },
  {
    id: '2',
    name: 'API Backup',
    url: 'https://backup.sistema.com/v2/documents',
    method: 'POST',
    headers: {
      'X-API-Key': 'backup-api-key',
      'Content-Type': 'application/json'
    },
    isActive: false
  }
];

const mockResponses: ApiResponse[] = [
  {
    id: '1',
    endpointId: '1',
    fileName: 'nota_fiscal_001.xml',
    status: 'sucesso',
    requestBody: { notaFiscal: { numero: '000001' } },
    responseBody: { id: 'nf_123', status: 'processada' },
    statusCode: 200,
    duration: 1250,
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    endpointId: '1',
    fileName: 'nota_fiscal_002.xml',
    status: 'erro',
    requestBody: { notaFiscal: { numero: '000002' } },
    responseBody: { error: 'Dados inválidos' },
    statusCode: 400,
    duration: 800,
    timestamp: '2024-01-15T10:32:00Z',
    errorMessage: 'Erro de validação no campo CNPJ'
  }
];

const ApiIntegration = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(mockEndpoints);
  const [responses, setResponses] = useState<ApiResponse[]>(mockResponses);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(endpoints[0]);
  const [testPayload, setTestPayload] = useState('{\n  "notaFiscal": {\n    "numero": "000001",\n    "serie": "1"\n  }\n}');
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sucesso':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'enviando':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'erro':
      case 'timeout':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sucesso':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Sucesso</Badge>;
      case 'enviando':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Enviando</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      case 'timeout':
        return <Badge variant="destructive">Timeout</Badge>;
      default:
        return null;
    }
  };

  const handleTestEndpoint = async () => {
    if (!selectedEndpoint) return;
    
    setIsTesting(true);
    
    // Simular teste de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newResponse: ApiResponse = {
      id: Date.now().toString(),
      endpointId: selectedEndpoint.id,
      fileName: 'teste_manual.json',
      status: Math.random() > 0.3 ? 'sucesso' : 'erro',
      requestBody: JSON.parse(testPayload),
      responseBody: Math.random() > 0.3 ? 
        { id: 'test_' + Date.now(), status: 'processado' } : 
        { error: 'Erro simulado de teste' },
      statusCode: Math.random() > 0.3 ? 200 : 400,
      duration: Math.floor(Math.random() * 3000) + 500,
      timestamp: new Date().toISOString(),
      errorMessage: Math.random() > 0.3 ? undefined : 'Erro simulado durante o teste'
    };
    
    setResponses(prev => [newResponse, ...prev]);
    setIsTesting(false);
    
    toast({
      title: newResponse.status === 'sucesso' ? "Teste realizado com sucesso" : "Teste falhou",
      description: `Endpoint testado em ${newResponse.duration}ms`
    });
  };

  const handleSaveEndpoint = () => {
    if (!selectedEndpoint) return;
    
    setEndpoints(prev => 
      prev.map(ep => 
        ep.id === selectedEndpoint.id ? selectedEndpoint : ep
      )
    );
    
    toast({
      title: "Endpoint salvo",
      description: "Configurações do endpoint foram atualizadas."
    });
  };

  const formatDuration = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  const successCount = responses.filter(r => r.status === 'sucesso').length;
  const errorCount = responses.filter(r => r.status === 'erro' || r.status === 'timeout').length;
  const avgDuration = responses.length > 0 ? 
    Math.round(responses.reduce((acc, r) => acc + (r.duration || 0), 0) / responses.length) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Integração com APIs
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure e monitore o envio de XMLs para APIs externas
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Relatório de Integrações
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Envios</p>
                <p className="text-2xl font-bold">{responses.length}</p>
              </div>
              <Send className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sucessos</p>
                <p className="text-2xl font-bold text-success">{successCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Erros</p>
                <p className="text-2xl font-bold text-destructive">{errorCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold">{formatDuration(avgDuration)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoint Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuração de Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="config" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="config">Configuração</TabsTrigger>
                <TabsTrigger value="test">Teste</TabsTrigger>
              </TabsList>
              
              <TabsContent value="config" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="endpoint-select">Endpoint Ativo</Label>
                    <select 
                      id="endpoint-select"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={selectedEndpoint?.id || ''}
                      onChange={(e) => {
                        const endpoint = endpoints.find(ep => ep.id === e.target.value);
                        setSelectedEndpoint(endpoint || null);
                      }}
                    >
                      {endpoints.map(endpoint => (
                        <option key={endpoint.id} value={endpoint.id}>
                          {endpoint.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedEndpoint && (
                    <>
                      <div>
                        <Label htmlFor="endpoint-name">Nome</Label>
                        <Input
                          id="endpoint-name"
                          value={selectedEndpoint.name}
                          onChange={(e) => setSelectedEndpoint({
                            ...selectedEndpoint,
                            name: e.target.value
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endpoint-url">URL</Label>
                        <Input
                          id="endpoint-url"
                          value={selectedEndpoint.url}
                          onChange={(e) => setSelectedEndpoint({
                            ...selectedEndpoint,
                            url: e.target.value
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endpoint-headers">Headers (JSON)</Label>
                        <Textarea
                          id="endpoint-headers"
                          value={JSON.stringify(selectedEndpoint.headers, null, 2)}
                          onChange={(e) => {
                            try {
                              const headers = JSON.parse(e.target.value);
                              setSelectedEndpoint({
                                ...selectedEndpoint,
                                headers
                              });
                            } catch {}
                          }}
                          rows={4}
                        />
                      </div>
                      
                      <Button onClick={handleSaveEndpoint} className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Salvar Configurações
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="test" className="space-y-4">
                <div>
                  <Label htmlFor="test-payload">Payload de Teste (JSON)</Label>
                  <Textarea
                    id="test-payload"
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                
                <Button 
                  onClick={handleTestEndpoint}
                  disabled={!selectedEndpoint || isTesting}
                  className="w-full"
                >
                  {isTesting ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Testar Endpoint
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Response History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Histórico de Respostas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {responses.length === 0 ? (
                <div className="text-center py-8">
                  <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma requisição realizada ainda
                  </p>
                </div>
              ) : (
                responses.map((response) => (
                  <div key={response.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(response.status)}
                        <span className="font-medium text-sm">{response.fileName}</span>
                      </div>
                      {getStatusBadge(response.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {response.statusCode && (
                        <span>Status: {response.statusCode}</span>
                      )}
                      {response.duration && (
                        <span>Duração: {formatDuration(response.duration)}</span>
                      )}
                      <span>{new Date(response.timestamp).toLocaleString('pt-BR')}</span>
                    </div>
                    
                    {response.errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {response.errorMessage}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Ver Request
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Ver Response
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiIntegration;