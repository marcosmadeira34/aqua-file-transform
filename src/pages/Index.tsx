import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  FileText,
  AlertTriangle,
  Clock,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  Upload,
  Cpu,
  FileCode,
  Download,
  Shield,
  Zap,
  Target,
  DollarSign,
  Users,
  BarChart3,
  Play,
  Quote,
  Sparkles,
  Calendar,
  Building2,
  ChevronRight,
  FileWarning,
  Ban,
  Timer,
  XCircle,
  Scale,
  Star,
  ArrowUpRight,
  Rocket
} from "lucide-react";

// Floating Orbs Component
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="orb orb-primary w-96 h-96 -top-48 -left-48" style={{ animationDelay: '0s' }} />
    <div className="orb orb-purple w-80 h-80 top-1/4 -right-40" style={{ animationDelay: '5s' }} />
    <div className="orb orb-cyan w-64 h-64 bottom-1/4 left-1/4" style={{ animationDelay: '10s' }} />
    <div className="orb orb-success w-72 h-72 -bottom-36 right-1/3" style={{ animationDelay: '15s' }} />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/30">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-primary transition-transform group-hover:scale-105">
                <FileCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Alivee
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {["O Problema", "Solução", "Benefícios", "Reforma 2026"].map((item, i) => (
                <a 
                  key={i}
                  href={`#${item.toLowerCase().replace(' ', '-').replace('ó', 'o')}`} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground" asChild>
                <Link to="/auth">Entrar</Link>
              </Button>
              <Button size="sm" className="shadow-primary btn-glow bg-gradient-to-r from-primary to-primary-glow hover:opacity-90" asChild>
                <Link to="/auth">
                  Teste Gratuito
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 hero-pattern overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 backdrop-blur-sm">
                <Rocket className="w-4 h-4 mr-2" />
                Preparado para a Reforma Tributária 2026
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8" style={{ animationDelay: '100ms' }}>
              Aproveite{" "}
              <span className="relative inline-block">
                <span className="text-gradient-vibrant">100%</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple to-cyan rounded-full" />
              </span>{" "}
              dos Créditos de{" "}
              <span className="text-gradient">Serviços Tomados</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed" style={{ animationDelay: '200ms' }}>
              Convertemos notas de serviços tomados em XML automático, garantindo{" "}
              <strong className="text-primary-foreground">escrituração imediata</strong>,{" "}
              <strong className="text-primary-foreground">compliance</strong> e{" "}
              <strong className="text-primary-foreground">automação fiscal total</strong>.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-14" style={{ animationDelay: '300ms' }}>
              <Button size="lg" className="text-base px-8 h-14 shadow-glow-lg bg-gradient-to-r from-primary via-primary to-purple hover:opacity-90 btn-glow" asChild>
                <Link to="/auth">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Começar Teste Gratuito
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-14 bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10 backdrop-blur-sm" asChild>
                <a href="#demo">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="animate-fade-in-up flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/60" style={{ animationDelay: '400ms' }}>
              {[
                { icon: CheckCircle2, text: "Sem cartão de crédito" },
                { icon: Zap, text: "Setup em 5 minutos" },
                { icon: Shield, text: "Suporte especializado" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                  <item.icon className="w-4 h-4 text-success" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in-up mt-20 relative max-w-5xl mx-auto" style={{ animationDelay: '500ms' }}>
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-purple/20 to-cyan/20 rounded-3xl blur-3xl opacity-60" />
            <div className="relative bg-secondary/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-highlight" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <span className="ml-4 text-xs text-white/40 font-mono">dashboard.alivee.com.br</span>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-secondary via-secondary/90 to-primary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 mesh-pattern opacity-30" />
                <div className="text-center p-8 relative">
                  <div className="flex justify-center gap-4 items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-destructive animate-pulse-slow" />
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-8 h-8 text-primary animate-bounce-subtle" />
                      <span className="text-xs text-white/40 mt-1">Automático</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
                      <FileCode className="w-8 h-8 text-success animate-float" />
                    </div>
                  </div>
                  <p className="text-white/60 text-lg">Interface do Sistema - Preview</p>
                  <p className="text-white/40 text-sm mt-2">Conversão PDF → XML em segundos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="o-problema" className="section-padding bg-muted/50 relative">
        <div className="absolute inset-0 dots-pattern opacity-50" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 border-destructive/30 bg-destructive/5">
              <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
              O Problema Atual
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Por que sua empresa está{" "}
              <span className="text-destructive">perdendo créditos</span> tributários?
            </h2>
            <p className="text-lg text-muted-foreground">
              O fluxo atual de notas de serviços tomados é ineficiente e coloca seu dinheiro em risco.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileWarning,
                title: "Notas chegam apenas em PDF",
                description: "Fornecedores enviam notas por e-mail em formato PDF, impossibilitando integração automática.",
              },
              {
                icon: Ban,
                title: "Sem captura automática",
                description: "Não existe forma de capturar NFSe de serviços tomados automaticamente via certificado digital.",
              },
              {
                icon: Users,
                title: "Escrituração manual",
                description: "Equipe fiscal precisa digitar manualmente cada nota, gerando alto custo operacional.",
              },
              {
                icon: XCircle,
                title: "Notas perdidas",
                description: "PDFs esquecidos em e-mails, notas atrasadas e documentos não escriturados geram perdas.",
              },
              {
                icon: Timer,
                title: "Processos lentos",
                description: "Fluxo manual não escala com o crescimento da empresa e gera gargalos operacionais.",
              },
              {
                icon: TrendingDown,
                title: "Perda de créditos",
                description: "Cada nota não escriturada é dinheiro perdido em créditos tributários não aproveitados.",
              }
            ].map((item, index) => (
              <Card key={index} className="group hover-lift border-destructive/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7 text-destructive" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="section-padding relative overflow-hidden">
        <FloatingOrbs />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 border-success/30 bg-success/5">
              <Zap className="w-4 h-4 mr-2 text-success" />
              Nossa Solução
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Como o{" "}
              <span className="text-gradient">Alivee</span> resolve seu problema
            </h2>
            <p className="text-lg text-muted-foreground">
              Transformamos PDFs de notas fiscais em XMLs padronizados em segundos, garantindo escrituração automática.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-5 gap-4 mb-20">
            {[
              { step: "01", icon: Upload, title: "Receba NFSe", description: "PDFs chegam por e-mail", color: "from-primary/20 to-primary/10" },
              { step: "02", icon: Cpu, title: "Leitura IA", description: "Interpreta automaticamente", color: "from-purple/20 to-purple/10" },
              { step: "03", icon: FileCode, title: "Gera XML", description: "Padrão nacional ABRASF", color: "from-cyan/20 to-cyan/10" },
              { step: "04", icon: Download, title: "Importe ERP", description: "Integração total", color: "from-success/20 to-success/10" },
              { step: "05", icon: CheckCircle2, title: "Crédito!", description: "Compliance garantido", color: "from-highlight/20 to-highlight/10" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <Card className="hover-lift h-full bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="p-6 text-center relative">
                    <div className="text-xs font-bold text-primary mb-3 font-mono">{item.step}</div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {index < 4 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature Highlight */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Automatização completa do seu fluxo fiscal
              </h3>
              <div className="space-y-4">
                {[
                  "Interpreta qualquer layout de PDF de NFSe",
                  "Extrai dados com precisão via inteligência artificial",
                  "Gera XML no padrão nacional (ABRASF)",
                  "Valida automaticamente contra regras fiscais",
                  "Integra com qualquer ERP do mercado",
                  "Elimina 100% da digitação manual"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-success/5 border border-success/10 hover:bg-success/10 transition-colors group">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-success to-success-glow flex items-center justify-center flex-shrink-0 shadow-success">
                      <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                    </div>
                    <span className="text-foreground group-hover:text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button size="lg" className="shadow-primary bg-gradient-to-r from-primary to-purple hover:opacity-90" asChild>
                  <Link to="/conversions">
                    Experimentar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-purple/15 to-success/15 rounded-3xl blur-3xl opacity-50" />
              <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted via-accent/30 to-primary/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <div className="text-center p-8 relative">
                      <div className="flex justify-center gap-6 mb-6 items-center">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center">
                            <FileText className="w-10 h-10 text-destructive animate-pulse-slow" />
                          </div>
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">PDF</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Sparkles className="w-6 h-6 text-primary mb-1 animate-bounce-subtle" />
                          <ArrowRight className="w-10 h-10 text-primary" />
                          <span className="text-xs text-muted-foreground mt-1">Automático</span>
                        </div>
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center">
                            <FileCode className="w-10 h-10 text-success animate-float" />
                          </div>
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full">XML</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-medium">Conversão automática em segundos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="section-padding bg-gradient-to-br from-secondary via-secondary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <FloatingOrbs />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/15 text-white border-white/30">
              <Target className="w-4 h-4 mr-2" />
              Benefícios
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Resultados reais para sua empresa
            </h2>
            <p className="text-xl text-white/80">
              Maximize o aproveitamento de créditos com automação inteligente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Aproveitamento máximo IBS/CBS",
                description: "Garanta 100% dos créditos de IBS e CBS sobre serviços tomados na nova reforma.",
                highlight: "100%",
                gradient: "from-success/20 to-success/10"
              },
              {
                icon: Shield,
                title: "Zero notas perdidas",
                description: "Elimine completamente o risco de notas esquecidas ou não escrituradas.",
                highlight: "0%",
                gradient: "from-primary/20 to-primary/10"
              },
              {
                icon: Clock,
                title: "Redução de 80% do tempo",
                description: "Sua equipe fiscal focada em análise estratégica, não em digitação.",
                highlight: "80%",
                gradient: "from-purple/20 to-purple/10"
              },
              {
                icon: Zap,
                title: "Automação fiscal completa",
                description: "Do recebimento à escrituração, tudo acontece automaticamente.",
                highlight: "Auto",
                gradient: "from-cyan/20 to-cyan/10"
              },
              {
                icon: BarChart3,
                title: "ROI imediato",
                description: "Retorno sobre investimento já no primeiro mês de utilização.",
                highlight: "1º mês",
                gradient: "from-highlight/20 to-highlight/10"
              },
              {
                icon: Users,
                title: "Zero digitação manual",
                description: "Elimine erros humanos e retrabalho da sua operação fiscal.",
                highlight: "Zero",
                gradient: "from-success/20 to-success/10"
              }
            ].map((benefit, index) => (
              <Card key={index} className="group bg-white/10 border-white/20 hover-lift backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${benefit.gradient} rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-125 transition-transform duration-500`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <benefit.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-3xl font-bold text-highlight">{benefit.highlight}</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-white">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reform Section */}
      <section id="reforma-2026" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 mesh-pattern opacity-50" />
        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-6 border-highlight/30 bg-highlight/5">
                <Scale className="w-4 h-4 mr-2 text-highlight" />
                Reforma Tributária 2026
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Por que a automação se tornou{" "}
                <span className="text-gradient">obrigatória</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Com a Reforma Tributária, a escrituração imediata não é mais opcional. 
                Cada dia de atraso significa créditos perdidos definitivamente.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Escrituração imediata exigida",
                    description: "A nova legislação exige registro instantâneo das notas para aproveitamento do crédito."
                  },
                  {
                    title: "Crédito só com nota escriturada",
                    description: "Quem deixar nota para trás perde o direito ao crédito de IBS/CBS."
                  },
                  {
                    title: "Carga administrativa aumenta",
                    description: "O volume de obrigações cresce, tornando processos manuais insustentáveis."
                  },
                  {
                    title: "Multas e penalidades",
                    description: "Atrasos na escrituração podem gerar multas e autuações fiscais."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-5 p-5 rounded-2xl bg-card/80 border border-border/50 hover-lift backdrop-blur-sm group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center flex-shrink-0 shadow-primary group-hover:scale-110 transition-transform">
                      <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-purple/20 to-highlight/20 rounded-3xl blur-3xl opacity-50" />
              <Card className="relative bg-gradient-to-br from-primary via-primary to-purple text-primary-foreground overflow-hidden border-0 shadow-glow-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <CardContent className="p-10 md:p-12 relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    Janeiro de 2026
                  </h3>
                  <p className="text-xl opacity-90 mb-8 leading-relaxed">
                    A Reforma Tributária entra em vigor. Sua empresa está preparada para 
                    garantir todos os créditos de serviços tomados?
                  </p>
                  <div className="flex items-center gap-3 text-sm opacity-80 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Faltam poucos meses para se adequar</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="section-padding bg-muted/50 relative">
        <div className="absolute inset-0 dots-pattern opacity-30" />
        <div className="container-tight text-center relative">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5">
            <Play className="w-4 h-4 mr-2 text-primary" />
            Demonstração
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Veja o sistema em ação
          </h2>
          <p className="text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">
            Assista como um PDF de nota fiscal é transformado em XML pronto para importação em segundos.
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-purple/20 to-cyan/20 rounded-3xl blur-3xl opacity-60" />
            <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-secondary via-secondary/95 to-primary/30 flex items-center justify-center group cursor-pointer relative">
                  <div className="absolute inset-0 grid-pattern opacity-10" />
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-glow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-primary-foreground ml-1" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Button size="lg" className="shadow-primary bg-gradient-to-r from-primary to-purple hover:opacity-90" asChild>
              <Link to="/conversions">
                Testar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative overflow-hidden">
        <FloatingOrbs />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5">
              <Star className="w-4 h-4 mr-2 text-highlight fill-highlight" />
              Prova Social
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Economizamos 80% do tempo da equipe fiscal com o sistema. A automação mudou completamente nossa operação.",
                author: "Maria Santos",
                role: "Coordenadora Fiscal",
                company: "Tech Solutions LTDA"
              },
              {
                quote: "Eliminamos erros de digitação e garantimos 100% dos créditos. O ROI foi imediato já no primeiro mês.",
                author: "Carlos Oliveira",
                role: "Diretor Financeiro",
                company: "Grupo Industrial XYZ"
              },
              {
                quote: "Com a reforma tributária chegando, o Alivee nos deu a tranquilidade de estar 100% em compliance.",
                author: "Ana Paula Costa",
                role: "Gerente Contábil",
                company: "Consultoria ABC"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover-lift bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-highlight fill-highlight" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-foreground mb-8 leading-relaxed italic text-lg">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-primary">
                        <span className="text-lg font-bold text-primary-foreground">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-purple text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <FloatingOrbs />
        
        <div className="container-tight relative text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm animate-bounce-subtle">
            <Building2 className="w-10 h-10" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
            Prepare sua empresa para a{" "}
            <span className="text-highlight drop-shadow-lg">Reforma Tributária</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Comece agora e garanta 100% de aproveitamento dos créditos de IBS/CBS sobre serviços tomados.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Button size="lg" className="text-lg px-10 h-16 bg-white text-primary hover:bg-white/90 shadow-2xl btn-glow" asChild>
              <Link to="/auth">
                <Sparkles className="w-6 h-6 mr-2" />
                Começar Teste Gratuito
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 h-16 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
              <a href="mailto:contato@alivee.com.br">
                <Users className="w-6 h-6 mr-2" />
                Solicitar Apresentação
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            {[
              { icon: Star, text: "14 dias grátis" },
              { icon: Shield, text: "Sem cartão de crédito" },
              { icon: CheckCircle2, text: "Cancele quando quiser" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-secondary text-secondary-foreground relative">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container-wide relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-primary">
                <FileCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">Alivee NFSe Automation</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm opacity-70">
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Termos de Uso</a>
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Política de Privacidade</a>
              <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Contato</a>
            </div>

            <div className="text-sm opacity-50">
              © 2024 Alivee. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
