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
  Scale
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <FileCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Alivee
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#problema" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                O Problema
              </a>
              <a href="#solucao" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Solução
              </a>
              <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Benefícios
              </a>
              <a href="#reforma" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Reforma 2026
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/auth">Entrar</Link>
              </Button>
              <Button size="sm" className="shadow-primary" asChild>
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 hero-pattern overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Preparado para a Reforma Tributária 2026
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" style={{ animationDelay: '100ms' }}>
              Aproveite{" "}
              <span className="text-primary bg-primary/10 px-2 rounded-lg">100%</span>{" "}
              dos Créditos de{" "}
              <span className="relative">
                Serviços Tomados
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-success rounded-full" />
              </span>
              {" "}na Reforma Tributária
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10" style={{ animationDelay: '200ms' }}>
              Convertemos notas de serviços tomados em XML automático, garantindo{" "}
              <strong className="text-foreground">escrituração imediata</strong>,{" "}
              <strong className="text-foreground">compliance</strong> e{" "}
              <strong className="text-foreground">automação fiscal total</strong>.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '300ms' }}>
              <Button size="lg" className="text-base px-8 shadow-primary hover:shadow-glow transition-shadow" asChild>
                <Link to="/auth">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Teste Gratuito
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-card/50 backdrop-blur-sm hover:bg-card" asChild>
                <a href="#demo">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="animate-fade-in-up flex flex-wrap justify-center gap-6 text-sm text-muted-foreground" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Setup em 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in-up mt-16 relative max-w-5xl mx-auto" style={{ animationDelay: '500ms' }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-success/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-highlight" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-2 text-xs text-muted-foreground">dashboard.alivee.com.br</span>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-muted to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <FileCode className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                  <p className="text-muted-foreground">Interface do Sistema - Imagem de Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-destructive" />
              O Problema Atual
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                color: "text-destructive"
              },
              {
                icon: Ban,
                title: "Sem captura automática",
                description: "Não existe forma de capturar NFSe de serviços tomados automaticamente via certificado digital.",
                color: "text-destructive"
              },
              {
                icon: Users,
                title: "Escrituração manual",
                description: "Equipe fiscal precisa digitar manualmente cada nota, gerando alto custo operacional.",
                color: "text-destructive"
              },
              {
                icon: XCircle,
                title: "Notas perdidas",
                description: "PDFs esquecidos em e-mails, notas atrasadas e documentos não escriturados geram perdas.",
                color: "text-destructive"
              },
              {
                icon: Timer,
                title: "Processos lentos",
                description: "Fluxo manual não escala com o crescimento da empresa e gera gargalos operacionais.",
                color: "text-destructive"
              },
              {
                icon: TrendingDown,
                title: "Perda de créditos",
                description: "Cada nota não escriturada é dinheiro perdido em créditos tributários não aproveitados.",
                color: "text-destructive"
              }
            ].map((item, index) => (
              <Card key={index} className="hover-lift border-destructive/10 bg-card">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 border-success/30 bg-success/5">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-success" />
              Nossa Solução
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como o{" "}
              <span className="text-primary">Alivee</span> resolve seu problema
            </h2>
            <p className="text-lg text-muted-foreground">
              Transformamos PDFs de notas fiscais em XMLs padronizados em segundos, garantindo escrituração automática.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-5 gap-4 mb-16">
            {[
              { step: "01", icon: Upload, title: "Receba NFSe", description: "PDFs chegam por e-mail" },
              { step: "02", icon: Cpu, title: "Leitura Automática", description: "IA interpreta os dados" },
              { step: "03", icon: FileCode, title: "Gera XML", description: "Padrão nacional ABRASF" },
              { step: "04", icon: Download, title: "Importe no ERP", description: "Integração total" },
              { step: "05", icon: CheckCircle2, title: "Crédito Garantido", description: "Compliance em dia" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <Card className="hover-lift h-full bg-gradient-to-b from-card to-accent/5 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-xs font-bold text-primary mb-3">{item.step}</div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature Highlight */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
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
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button className="shadow-primary" asChild>
                  <Link to="/conversions">
                    Experimentar Agora
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-success/10 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-accent/30 to-primary/5 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="flex justify-center gap-4 mb-4">
                        <FileText className="w-12 h-12 text-muted-foreground animate-pulse-slow" />
                        <ArrowRight className="w-8 h-8 text-primary self-center" />
                        <FileCode className="w-12 h-12 text-success animate-float" />
                      </div>
                      <p className="text-muted-foreground">PDF → XML Automático</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Benefícios
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Resultados reais para sua empresa
            </h2>
            <p className="text-lg opacity-80">
              Maximize o aproveitamento de créditos com automação inteligente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Aproveitamento máximo IBS/CBS",
                description: "Garanta 100% dos créditos de IBS e CBS sobre serviços tomados na nova reforma.",
                highlight: "100%"
              },
              {
                icon: Shield,
                title: "Zero notas perdidas",
                description: "Elimine completamente o risco de notas esquecidas ou não escrituradas.",
                highlight: "0%"
              },
              {
                icon: Clock,
                title: "Redução de 80% do tempo",
                description: "Sua equipe fiscal focada em análise estratégica, não em digitação.",
                highlight: "80%"
              },
              {
                icon: Zap,
                title: "Automação fiscal completa",
                description: "Do recebimento à escrituração, tudo acontece automaticamente.",
                highlight: "Auto"
              },
              {
                icon: BarChart3,
                title: "ROI imediato",
                description: "Retorno sobre investimento já no primeiro mês de utilização.",
                highlight: "1º mês"
              },
              {
                icon: Users,
                title: "Zero digitação manual",
                description: "Elimine erros humanos e retrabalho da sua operação fiscal.",
                highlight: "Zero"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-primary-foreground/5 border-primary-foreground/10 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-primary">{benefit.highlight}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm opacity-70">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reform Section */}
      <section id="reforma" className="section-padding dots-pattern">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-highlight/30 bg-highlight/5">
                <Scale className="w-3.5 h-3.5 mr-1.5 text-highlight" />
                Reforma Tributária 2026
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Por que a automação se tornou{" "}
                <span className="text-primary">obrigatória</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Com a Reforma Tributária, a escrituração imediata não é mais opcional. 
                Cada dia de atraso significa créditos perdidos definitivamente.
              </p>

              <div className="space-y-6">
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
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover-lift">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <Calendar className="w-12 h-12 mb-6 opacity-80" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Janeiro de 2026
                    </h3>
                    <p className="text-lg opacity-90 mb-6">
                      A Reforma Tributária entra em vigor. Sua empresa está preparada para 
                      garantir todos os créditos de serviços tomados?
                    </p>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Clock className="w-4 h-4" />
                      <span>Faltam poucos meses para se adequar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="section-padding bg-muted/30">
        <div className="container-tight text-center">
          <Badge variant="outline" className="mb-4">
            <Play className="w-3.5 h-3.5 mr-1.5 text-primary" />
            Demonstração
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja o sistema em ação
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Assista como um PDF de nota fiscal é transformado em XML pronto para importação em segundos.
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-success/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
            <Card className="relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-secondary flex items-center justify-center group cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button size="lg" className="shadow-primary" asChild>
              <Link to="/conversions">
                Testar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              <Quote className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Prova Social
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container-tight relative text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prepare sua empresa para a{" "}
            <span className="text-highlight">Reforma Tributária</span>
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Comece agora e garanta 100% de aproveitamento dos créditos de IBS/CBS sobre serviços tomados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="text-base px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/auth">
                <Sparkles className="w-5 h-5 mr-2" />
                Começar Teste Gratuito
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="mailto:contato@alivee.com.br">
                <Users className="w-5 h-5 mr-2" />
                Solicitar Apresentação
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary text-secondary-foreground">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FileCode className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">Alivee NFSe Automation</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
              <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidade</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Contato</a>
            </div>

            <div className="text-sm opacity-60">
              © 2024 Alivee. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;