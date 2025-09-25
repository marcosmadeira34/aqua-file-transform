import { useState, useEffect } from "react";
import MetricsCard from "@/components/MetricsCard";
import FileUpload from "@/components/FileUpload";
import ConversionInterface from "@/components/ConversionInterface";
import SupportTicket from "@/components/SupportTicket";
import TicketManagement from "@/components/TicketManagement";
import ROICalculator from "@/components/ROICalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dashboardHero from "@/assets/dashboard-hero.jpg";
import featuresMockup from "@/assets/features-mockup.jpg";
import { 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Zap,
  Shield,
  Star,
  Users,
  Download,
  Play,
  ArrowRight,
  Award,
  Globe,
  Lock,
  Sparkles,
  ChevronRight,
  Mail,
  MessageSquare,
  X
} from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
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
    <div className="min-h-full bg-background">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Economize até 50% em tempo de processamento com nossa tecnologia avançada 🎉</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-background/95 backdrop-blur border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" title="PDF Patrimonium" aria-label="Back to home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">PDF Patrimonium</span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</a>
              <a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Ajuda</a>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.location.href = "/auth"}>
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/98 to-muted/30 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              <span className="block text-foreground">Sistema PDF para</span>
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Conversão Avançada
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-3xl mx-auto leading-relaxed mb-6">
              Capacitando pequenas equipes a alcançar grandes resultados nos negócios.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Uma infraestrutura completa de processamento de documentos para a próxima geração de empresas eficientes.
            </p>
            <p className="text-lg font-medium text-foreground/80 mb-10">
              <strong>Construído para o futuro do trabalho.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="text-lg px-8 py-6 bg-foreground text-background hover:bg-foreground/90 shadow-lg">
                Começar Grátis 🍦
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-border hover:bg-muted/50"
                onClick={() => window.location.href = "/auth"}
              >
                Falar Conosco →
              </Button>
            </div>

            {/* Product Screenshot */}
            <div className="relative mx-auto max-w-5xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-gradient-to-br from-muted/50 to-background">
                <img 
                  src={dashboardHero}
                  alt="Dashboard do Sistema PDF Patrimonium"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Badge variant="secondary" className="px-4 py-2 bg-muted/50 border border-border/50">
                <Award className="w-4 h-4 mr-2" />
                Melhor Ferramenta 2024
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-muted/50 border border-border/50">
                <Star className="w-4 h-4 mr-2" />
                4.9★ Avaliação dos Usuários
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O futuro do trabalho precisa de novas ferramentas documentais
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Pequenas equipes estão conquistando o que costumava exigir mais de 150 pessoas.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos construindo a infraestrutura documental para impulsionar essa revolução.
            </p>
          </div>

          {/* Animated Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "Validação XML Global", "Comparação de Arquivos", "Proteção contra Fraudes", 
              "Tutoriais em Vídeo", "API Bem Documentada", "Fácil de Integrar"
            ].map((feature, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 text-sm bg-background/50 border-border hover:bg-muted/50 transition-colors"
              >
                {feature}
              </Badge>
            ))}
          </div>

          {/* Code/Features Mockup */}
          <div className="relative mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50">
              <img 
                src={featuresMockup}
                alt="Interface de recursos avançados"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6">
        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos que Fazem a Diferença
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra por que nossa plataforma é a escolha número 1 para conversão de documentos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Conversão Instantânea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Converta seus documentos em segundos com nossa tecnologia de processamento em nuvem de última geração.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Criptografia de ponta a ponta e exclusão automática garantem que seus documentos estejam sempre protegidos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Múltiplos Formatos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suporte a mais de 15 formatos diferentes, incluindo Word, Excel, PowerPoint, imagens e muito mais.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 bg-muted/30 -mx-6 px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experimente Agora Mesmo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Faça upload de um PDF e veja a magia acontecer em tempo real
            </p>
          </div>

          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="shadow-xl border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Faça o upload do seu PDF
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Selecione ou arraste seu arquivo PDF para começar a conversão
                  </p>
                  <FileUpload 
                    onQueueComplete={(queue) => {
                      console.log('Fila de conversão criada:', queue.name);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Conversion */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="shadow-xl border-border/50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Configure a conversão
                    </h3>
                    <p className="text-muted-foreground">
                      Escolha o formato desejado para: <span className="font-medium text-foreground">{uploadedFile?.name}</span>
                    </p>
                  </div>
                  <ConversionInterface 
                    onConversionComplete={() => {
                      setConversionComplete(true);
                      setCurrentStep(3);
                    }}
                  />
                  <div className="mt-6 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setCurrentStep(1)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ← Voltar para upload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Download */}
          {currentStep === 3 && conversionComplete && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="shadow-xl border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Conversão concluída!
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Seu arquivo foi convertido com sucesso. Faça o download abaixo.
                  </p>
                  <div className="space-y-4">
                    <Button size="lg" className="w-full">
                      <Download className="w-5 h-5 mr-2" />
                      Download do arquivo convertido
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        setCurrentStep(1);
                        setUploadedFile(null);
                        setConversionComplete(false);
                      }}
                    >
                      Converter novo arquivo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Mais de 50.000 profissionais confiam em nossa plataforma
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Incrível! Economizo horas todos os dias. A qualidade da conversão é perfeita e o processo é super intuitivo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Maria Silva</div>
                    <div className="text-sm text-muted-foreground">Advogada</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Nossa empresa aumentou a produtividade em 40%. A plataforma é essencial para nosso fluxo de trabalho."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">Carlos Santos</div>
                    <div className="text-sm text-muted-foreground">Diretor de TI</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Segurança e velocidade em um só lugar. Não consigo mais trabalhar sem essa ferramenta incrível."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Ana Costa</div>
                    <div className="text-sm text-muted-foreground">Contadora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-20 bg-muted/30 -mx-6 px-6">
          <ROICalculator />
        </section>

        {/* Metrics Dashboard */}
        <section className="py-20 bg-muted/30 -mx-6 px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Métricas em Tempo Real
            </h2>
            <p className="text-xl text-muted-foreground">
              Acompanhe o poder da nossa plataforma em números
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="PDFs Processados"
              value={metrics.pdfsLoaded.toLocaleString()}
              subtitle="Total de arquivos"
              trend="up"
              trendValue="+12% esta semana"
              icon={<FileText className="w-6 h-6" />}
              delay={0}
            />
            <MetricsCard
              title="Conversões Concluídas"
              value={metrics.processed.toLocaleString()}
              subtitle="Com sucesso"
              trend="up"
              trendValue="+8% esta semana"
              icon={<CheckCircle className="w-6 h-6" />}
              delay={100}
            />
            <MetricsCard
              title="Taxa de Sucesso"
              value={`${metrics.successRate.toFixed(1)}%`}
              subtitle="Precisão garantida"
              trend="up"
              trendValue="+2.1% esta semana"
              icon={<TrendingUp className="w-6 h-6" />}
              delay={200}
            />
            <MetricsCard
              title="Tempo Economizado"
              value={`${metrics.timeSaved.toFixed(1)}h`}
              subtitle="Hoje pelos usuários"
              trend="up"
              trendValue="+15% esta semana"
              icon={<Clock className="w-6 h-6" />}
              delay={300}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-border/50">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para transformar seu fluxo de trabalho?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já economizam horas todos os dias
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Começar Gratuitamente
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  14 dias grátis
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Sem compromisso
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Suporte 24/7
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Fique por dentro das novidades
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Receba dicas exclusivas, atualizações de recursos e ofertas especiais diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="lg">
              <Mail className="w-5 h-5 mr-2" />
              Inscrever
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">PDF Patrimonium</h4>
              <p className="text-muted-foreground text-sm">
                A plataforma mais avançada para conversão de documentos do Brasil.
              </p>
              <div className="flex items-center gap-4">
                <SupportTicket />
                <TicketManagement />
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Produto</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Empresa</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Suporte</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 PDF Patrimonium. Todos os direitos reservados. Transformando documentos com inteligência.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
