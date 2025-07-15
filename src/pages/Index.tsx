import { useState, useEffect } from "react";
import MetricsCard from "@/components/MetricsCard";
import FileUpload from "@/components/FileUpload";
import ConversionInterface from "@/components/ConversionInterface";
import { 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Zap,
  Shield
} from "lucide-react";

const Index = () => {
  const [metrics, setMetrics] = useState({
    pdfsLoaded: 1247,
    processed: 1189,
    successRate: 95.3,
    timeSaved: 42.5
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        pdfsLoaded: prev.pdfsLoaded + Math.floor(Math.random() * 3),
        processed: prev.processed + Math.floor(Math.random() * 2),
        successRate: Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 0.1),
        timeSaved: prev.timeSaved + Math.random() * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">PDF Converter Pro</h1>
                <p className="text-sm text-muted-foreground">Sistema de Conversão Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Seguro & Rápido</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold gradient-hero bg-clip-text text-transparent">
              Converta seus PDFs com
              <span className="block">Inteligência e Velocidade</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma avançada transforma documentos PDF em múltiplos formatos 
              com precisão excepcional e eficiência incomparável.
            </p>
          </div>
        </section>

        {/* Metrics Dashboard */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6 animate-fade-in">
            Métricas em Tempo Real
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="PDFs Carregados"
              value={metrics.pdfsLoaded.toLocaleString()}
              subtitle="Total de arquivos"
              trend="up"
              trendValue="+12% esta semana"
              icon={<FileText className="w-6 h-6" />}
              delay={0}
            />
            <MetricsCard
              title="Processados"
              value={metrics.processed.toLocaleString()}
              subtitle="Conversões concluídas"
              trend="up"
              trendValue="+8% esta semana"
              icon={<CheckCircle className="w-6 h-6" />}
              delay={100}
            />
            <MetricsCard
              title="Taxa de Sucesso"
              value={`${metrics.successRate.toFixed(1)}%`}
              subtitle="Conversões bem-sucedidas"
              trend="up"
              trendValue="+2.1% esta semana"
              icon={<TrendingUp className="w-6 h-6" />}
              delay={200}
            />
            <MetricsCard
              title="Tempo Economizado"
              value={`${metrics.timeSaved.toFixed(1)}h`}
              subtitle="Horas poupadas hoje"
              trend="up"
              trendValue="+15% esta semana"
              icon={<Clock className="w-6 h-6" />}
              delay={300}
            />
          </div>
        </section>

        {/* Main Interface - Tabs */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border/50 shadow-lg animate-fade-in">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Processamento de Documentos PDF
              </h3>
              
              {/* Tab Navigation */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-muted/30 rounded-lg p-1 space-x-1">
                  <button 
                    className="px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground shadow-sm"
                  >
                    1. Upload
                  </button>
                  <button 
                    className="px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground"
                  >
                    2. Conversão
                  </button>
                  <button 
                    className="px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground"
                  >
                    3. Download
                  </button>
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-8">
                {/* Step 1: Upload */}
                <div className="animate-fade-in">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      Faça o upload do seu documento PDF
                    </h4>
                    <p className="text-muted-foreground">
                      Selecione ou arraste seu arquivo PDF para começar o processo
                    </p>
                  </div>
                  <FileUpload />
                </div>

                {/* Step 2: Conversion */}
                <div className="border-t border-border/50 pt-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      Configure a conversão
                    </h4>
                    <p className="text-muted-foreground">
                      Escolha o formato desejado e inicie a conversão
                    </p>
                  </div>
                  <ConversionInterface />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="mt-16 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Por que escolher nossa plataforma?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg gradient-primary flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">Ultra Rápido</h4>
                <p className="text-muted-foreground text-sm">
                  Conversões em segundos com nossa tecnologia avançada
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg gradient-secondary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">100% Seguro</h4>
                <p className="text-muted-foreground text-sm">
                  Seus documentos são protegidos com criptografia de ponta
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg gradient-primary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">Alta Precisão</h4>
                <p className="text-muted-foreground text-sm">
                  Qualidade garantida em todas as conversões
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 PDF Converter Pro. Transformando documentos com inteligência.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
