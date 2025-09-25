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

// Componente para gerar estrelas animadas
const SpaceBackground = () => {
  const [stars, setStars] = useState<Array<{id: number, size: string, top: string, left: string, delay: string}>>([]);
  const [meteors, setMeteors] = useState<Array<{id: number, top: string, left: string, delay: string}>>([]);

  useEffect(() => {
    // Gerar estrelas
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      size: Math.random() > 0.8 ? 'star-large' : Math.random() > 0.6 ? 'star-medium' : 'star-small',
      top: `${Math.random() * 200}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`
    }));
    
    // Gerar meteoros
    const newMeteors = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${-10 + Math.random() * 30}%`,
      delay: `${Math.random() * 10 + i * 3}s`
    }));

    setStars(newStars);
    setMeteors(newMeteors);
  }, []);

  return (
    <div className="stars-container">
      {/* Estrelas piscantes */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* Meteoros */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
          }}
        />
      ))}
      
      {/* Nebulosas */}
      <div 
        className="nebula" 
        style={{ 
          width: '500px', 
          height: '500px', 
          top: '10%', 
          right: '5%',
          animationDelay: '0s'
        }} 
      />
      <div 
        className="nebula" 
        style={{ 
          width: '350px', 
          height: '350px', 
          bottom: '20%', 
          left: '10%',
          animationDelay: '7s'
        }} 
      />
      <div 
        className="nebula" 
        style={{ 
          width: '400px', 
          height: '400px', 
          top: '60%', 
          right: '40%',
          animationDelay: '14s'
        }} 
      />
    </div>
  );
};

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
    <div className="min-h-screen space-bg text-white relative">
      <SpaceBackground />

      {/* Top Banner Espacial */}
      <div className="relative z-10 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-white/90">
              🚀 Economize até 50% em tempo de processamento com nossa tecnologia avançada
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Bar Espacial */}
      <nav className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" title="PDF Patrimonium" aria-label="Back to home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">PDF Patrimonium</span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-white/70 hover:text-white transition-colors">Recursos</a>
              <a href="#pricing" className="text-white/70 hover:text-white transition-colors">Preços</a>
              <a href="#docs" className="text-white/70 hover:text-white transition-colors">Documentação</a>
              <a href="/help" className="text-white/70 hover:text-white transition-colors">Ajuda</a>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10" onClick={() => window.location.href = "/auth"}>
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section Espacial */}
      <section className="relative z-10 min-h-[90vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 animate-fade-in">
              <span className="block text-white">Sistema PDF para</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float">
                Conversão Avançada
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mt-6 max-w-3xl mx-auto leading-relaxed mb-6 animate-slide-up">
              Capacitando pequenas equipes a alcançar grandes resultados nos negócios.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 animate-slide-up">
              Uma infraestrutura completa de processamento de documentos para a próxima geração de empresas eficientes.
            </p>
            <p className="text-lg font-medium text-white/90 mb-10 animate-slide-up">
              <strong>🌌 Construído para o futuro do trabalho.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-cyan-500/25">
                Começar Grátis 🚀
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                onClick={() => window.location.href = "/auth"}
              >
                Falar Conosco →
              </Button>
            </div>

            {/* Product Screenshot Espacial */}
            <div className="relative mx-auto max-w-5xl animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
                <img 
                  src={dashboardHero}
                  alt="Dashboard do Sistema PDF Patrimonium"
                  className="w-full h-auto"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              </div>
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-md opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full blur-md opacity-60 animate-pulse"></div>
            </div>

            {/* Achievement Badges Espaciais */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-in">
              <Badge variant="secondary" className="px-4 py-2 bg-white/10 border border-white/20 text-white backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                Melhor Ferramenta 2024
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-white/10 border border-white/20 text-white backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                4.9★ Avaliação dos Usuários
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Espacial */}
      <section className="relative z-10 py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              O futuro do trabalho precisa de 
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                novas ferramentas documentais
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Pequenas equipes estão conquistando o que costumava exigir mais de 150 pessoas.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Estamos construindo a infraestrutura documental para impulsionar essa revolução.
            </p>
          </div>

          {/* Animated Feature Tags Espaciais */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
            {[
              "🔬 Validação XML Global", "📊 Comparação de Arquivos", "🛡️ Proteção contra Fraudes", 
              "🎥 Tutoriais em Vídeo", "📚 API Bem Documentada", "⚡ Fácil de Integrar"
            ].map((feature, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                {feature}
              </Badge>
            ))}
          </div>

          {/* Code/Features Mockup Espacial */}
          <div className="relative mx-auto max-w-4xl animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/20 border border-white/10">
              <img 
                src={featuresMockup}
                alt="Interface de recursos avançados"
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 container mx-auto px-6">
        {/* Features Section Espacial */}
        <section className="py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Recursos que Fazem a 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Diferença
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Descubra por que nossa plataforma é a escolha número 1 para conversão de documentos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative group hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">⚡ Conversão Instantânea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Converta seus documentos em segundos com nossa tecnologia de processamento em nuvem de última geração.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">🛡️ Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Criptografia de ponta a ponta e exclusão automática garantem que seus documentos estejam sempre protegidos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="relative group hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">🌐 Múltiplos Formatos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Suporte a mais de 15 formatos diferentes, incluindo Word, Excel, PowerPoint, imagens e muito mais.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Demo Section Espacial */}
        <section className="py-20 bg-black/20 backdrop-blur-sm -mx-6 px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              🚀 Experimente Agora Mesmo
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Faça upload de um PDF e veja a magia acontecer em tempo real
            </p>
          </div>

          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card className="shadow-xl shadow-purple-500/20 bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    🌌 Faça o upload do seu PDF
                  </h3>
                  <p className="text-white/70 mb-8">
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
              <Card className="shadow-xl shadow-cyan-500/20 bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      ⚡ Configure a conversão
                    </h3>
                    <p className="text-white/70">
                      Escolha o formato desejado para: <span className="font-medium text-white">{uploadedFile?.name}</span>
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
                      className="text-white/70 hover:text-white hover:bg-white/10"
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
              <Card className="shadow-xl shadow-green-500/20 bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    ✅ Conversão concluída!
                  </h3>
                  <p className="text-white/70 mb-8">
                    Seu arquivo foi convertido com sucesso. Faça o download abaixo.
                  </p>
                  <div className="space-y-4">
                    <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                      <Download className="w-5 h-5 mr-2" />
                      Download do arquivo convertido
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white/30 text-white hover:bg-white/10"
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

        {/* Testimonials Espaciais */}
        <section className="py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              💫 O que nossos clientes dizem
            </h2>
            <p className="text-xl text-white/80">
              Mais de 50.000 profissionais confiam em nossa plataforma
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 mb-4">
                  "Incrível! Economizo horas todos os dias. A qualidade da conversão é perfeita e o processo é super intuitivo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Maria Silva</div>
                    <div className="text-sm text-white/60">Advogada</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 mb-4">
                  "Nossa empresa aumentou a produtividade em 40%. A plataforma é essencial para nosso fluxo de trabalho."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Carlos Santos</div>
                    <div className="text-sm text-white/60">Diretor de TI</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 mb-4">
                  "Segurança e velocidade em um só lugar. Não consigo mais trabalhar sem essa ferramenta incrível."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                    <Lock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Ana Costa</div>
                    <div className="text-sm text-white/60">Contadora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Calculator Section Espacial */}
        <section className="py-20 bg-black/20 backdrop-blur-sm -mx-6 px-6">
          <ROICalculator />
        </section>

        {/* Metrics Dashboard Espacial */}
        <section className="py-20 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-sm -mx-6 px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              📊 Métricas em Tempo Real
            </h2>
            <p className="text-xl text-white/80">
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

        {/* CTA Section Espacial */}
        <section className="py-20">
          <Card className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-md border-white/10 shadow-xl shadow-purple-500/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                🚀 Pronto para transformar seu fluxo de trabalho?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já economizam horas todos os dias
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
                  Começar Gratuitamente
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  14 dias grátis
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Sem compromisso
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Suporte 24/7
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* Newsletter Section Espacial */}
      <section className="relative z-10 py-16 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">
            📡 Fique por dentro das novidades
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Receba dicas exclusivas, atualizações de recursos e ofertas especiais diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm"
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
              <Mail className="w-5 h-5 mr-2" />
              Inscrever
            </Button>
          </div>
          <p className="text-xs text-white/50 mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* Footer Espacial */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">🌌 PDF Patrimonium</h4>
              <p className="text-white/70 text-sm">
                A plataforma mais avançada para conversão de documentos do Brasil.
              </p>
              <div className="flex items-center gap-4">
                <SupportTicket />
                <TicketManagement />
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold text-white">Produto</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold text-white">Empresa</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold text-white">Suporte</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 PDF Patrimonium. Todos os direitos reservados. 🚀 Transformando documentos com inteligência.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
