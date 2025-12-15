# 📋 Projeto Alivee NFSe Automation

## 📌 Visão Geral

Sistema de automação fiscal que lê PDFs de notas fiscais de serviços tomados (NFSe), converte automaticamente para XML no padrão nacional e permite importação em ERPs/sistemas fiscais. Especialmente posicionado para atender requisitos da Reforma Tributária 2026.

---

## 🎯 Problema que Resolve

### Situação Atual das Empresas:
- Não existe captura automática de NFSe de serviços tomados via certificado digital
- Fornecedores enviam notas em PDF por e-mail
- Escrituração manual gera alto custo operacional
- Notas perdidas ou atrasadas significam créditos não aproveitados
- Processos manuais não escalam

### Com a Reforma Tributária 2026:
- Escrituração imediata se torna obrigatória
- Crédito só pode ser aproveitado com nota escriturada
- Atrasos significam perda definitiva de créditos

---

## ⚙️ Funcionalidades Principais

### 1. Conversão PDF → XML
- Upload de PDFs de NFSe
- Interpretação automática via IA
- Geração de XML no padrão nacional ABRASF
- Validação contra regras fiscais

### 2. Sistema de Filas
- Criação de filas nomeadas (ex: empresa X, Y, Z)
- Upload em lote para filas específicas
- Conversão em lote
- Rastreamento transparente do processamento

### 3. Validação XML
- Revisão manual de anomalias
- Campos editáveis para correção
- Envio em lotes para API
- Interface amigável (status: enviado/não enviado)

### 4. Dashboard de Métricas
- PDFs Carregados
- PDFs Processados
- Taxa de Sucesso
- Minutos Economizados

### 5. Calculadora de ROI
- Input: quantidade de PDFs mensais
- Input: custo médio do colaborador
- Output: tempo economizado, custo efetivado, ROI

### 6. Sistema de Tickets
- Abertura de tickets via popup
- Campos: assunto, descrição, anexos
- Notificações com badge contador
- Área administrativa para gestão
- Email automático ao abrir ticket

---

## 🗂️ Estrutura de Páginas

### Públicas
| Rota | Descrição |
|------|-----------|
| `/` | Homepage institucional |
| `/auth` | Login e Cadastro |

### Autenticadas (após login)
| Rota | Descrição |
|------|-----------|
| `/conversions` | Conversão PDF → XML |
| `/xml-validation` | Validação e correção de XMLs |
| `/file-comparison` | Comparação de arquivos |
| `/api-integration` | Status de envio para API |
| `/tickets` | Gestão de tickets de suporte |
| `/analytics` | Análise e relatórios |
| `/settings` | Configurações do sistema |
| `/profile` | Perfil do usuário |
| `/help` | Central de ajuda |

---

## 🏠 Homepage - Seções

### 1. Header
- Logo Alivee
- Navegação: O Problema, Solução, Benefícios, Reforma 2026
- Botões: Entrar, Teste Gratuito

### 2. Hero Section
- Badge: "Preparado para a Reforma Tributária 2026"
- Título principal com destaque em cores
- Subtítulo explicativo
- CTAs: Teste Gratuito, Ver Demonstração
- Indicadores de confiança
- Preview visual do sistema

### 3. Seção do Problema
- 6 cards explicando os problemas atuais
- Ícones visuais
- Destaque em vermelho para urgência

### 4. Seção da Solução
- Fluxo em 5 etapas: Receba → Leitura → XML → ERP → Crédito
- Lista de funcionalidades
- Visual do processo PDF → XML

### 5. Seção de Benefícios
- 6 cards com métricas destacadas
- Ícones representativos
- Background diferenciado (azul escuro)

### 6. Seção Reforma 2026
- Contexto da reforma
- 4 pontos críticos
- Card destacado com data "Janeiro 2026"

### 7. Seção de Demonstração
- Área para vídeo/animação
- Botão play central
- CTA para testar

### 8. Seção de Depoimentos
- 3 cards de testimonials
- Foto, nome, cargo, empresa
- Citações em destaque

### 9. CTA Final
- Fundo gradiente azul
- Título forte
- Duplo CTA: Teste Gratuito, Solicitar Apresentação
- Garantias (14 dias grátis, sem cartão, cancele quando quiser)

### 10. Footer
- Logo
- Links: Termos, Privacidade, Contato
- Copyright

---

## 🎨 Design System

### Paleta de Cores
```css
/* Cores Principais */
--primary: Azul institucional (#2563eb)
--primary-glow: Azul claro glow
--primary-dark: Azul escuro

/* Cores de Status */
--success: Verde compliance (#10b981)
--destructive: Vermelho alerta (#ef4444)
--highlight: Amarelo destaque (#eab308)

/* Cores Neutras */
--background: Cinza claro
--foreground: Cinza escuro
--muted: Cinza médio
--card: Branco

/* Cores Secundárias */
--secondary: Azul marinho (confiança)
--accent: Azul clarinho
```

### Tipografia
- **Display**: Plus Jakarta Sans (títulos)
- **Sans**: Inter (corpo)

### Animações
- fade-in-up: Entrada suave de baixo
- float: Flutuação contínua
- pulse-slow: Pulsação lenta
- shimmer: Brilho deslizante
- hover-lift: Elevação no hover
- hover-scale: Escala no hover

### Efeitos
- glass: Background blur
- shadow-glow: Sombra luminosa
- gradient-primary: Gradiente azul
- gradient-hero: Gradiente hero escuro

---

## 🔧 Stack Tecnológica

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI

### Backend (externo)
- Django (integração independente)
- Supabase (tickets, auth)

### Bibliotecas
- React Router DOM (navegação)
- React Query (estado servidor)
- Lucide React (ícones)
- Recharts (gráficos)
- React Hook Form (formulários)
- Zod (validação)
- Sonner (toasts)

---

## 📁 Estrutura de Arquivos

```
src/
├── assets/           # Imagens e recursos
├── components/       # Componentes reutilizáveis
│   ├── ui/          # Shadcn components
│   └── ...          # Componentes específicos
├── hooks/           # Custom hooks
├── integrations/    # Supabase config
├── lib/             # Utilitários
├── pages/           # Páginas da aplicação
├── App.tsx          # Rotas principais
├── index.css        # Design system CSS
└── main.tsx         # Entry point
```

---

## 📝 Notas de Desenvolvimento

### UX Principles
1. Minimizar scroll - renderização progressiva
2. Etapas condicionais (aparecem após conclusão da anterior)
3. Feedback visual claro
4. Animações suaves e profissionais
5. Design responsivo

### Segurança
- Autenticação via Supabase
- RLS policies no banco
- Secrets protegidas

### Performance
- Lazy loading de componentes
- Imagens otimizadas
- Animações com GPU

---

## 🚀 Próximos Passos

1. [ ] Integração completa com backend Django
2. [ ] Sistema de autenticação robusto
3. [ ] Upload real de PDFs com processamento
4. [ ] Geração de XML funcional
5. [ ] Integração com ERPs
6. [ ] Dashboard com dados reais
7. [ ] Sistema de notificações push
8. [ ] Área administrativa

---

*Última atualização: Dezembro 2024*
