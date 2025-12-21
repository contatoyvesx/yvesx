import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Crown, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "basico",
    name: "Essencial",
    price: 1500,
    installment: 125,
    description: "Site personalizado para apresentar sua marca com clareza.",
    highlight: false,
    badge: "",
    features: [
      "Criação de site personalizado",
      "1 página (one-page)",
      "Design moderno e responsivo",
      "Estrutura profissional de apresentação",
      "Entrega do site pronto",
    ],
  },
  {
    id: "pro",
    name: "Profissional",
    price: 3000,
    installment: 250,
    description: "Tudo o que você precisa para rodar sem preocupação técnica.",
    highlight: true,
    badge: "Mais escolhido",
    features: [
      "Tudo do Essencial",
      "Domínio personalizado (ex: suaempresa.com.br)",
      "Hospedagem inclusa",
      "Manutenções contínuas",
      "Atualizações de conteúdo básicas",
      "Suporte técnico",
    ],
  },
  {
    id: "premium",
    name: "Escala",
    price: 6600,
    installment: 550,
    description: "Estrutura completa para vender online e expandir.",
    highlight: false,
    badge: "",
    features: [
      "Tudo do Profissional",
      "Mais páginas (site completo)",
      "Sistema de pagamento integrado",
      "E-commerce (produtos ou serviços)",
      "Estrutura pronta para vendas online",
      "Expansão conforme o crescimento do negócio",
    ],
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Design autoral",
    description: "Layouts exclusivos que traduzem a identidade da sua marca.",
  },
  {
    icon: Rocket,
    title: "Performance de verdade",
    description: "Páginas rápidas, acessíveis e prontas para ranquear no Google.",
  },
  {
    icon: ShieldCheck,
    title: "Suporte próximo",
    description: "Acompanhamento estratégico do briefing à entrega final.",
  },
];

const faqs = [
  {
    question: "Posso personalizar os planos?",
    answer:
      "Sim! Podemos ajustar número de páginas, integrações e recursos conforme sua necessidade.",
  },
  {
    question: "Qual é a forma de pagamento?",
    answer:
      "Trabalhamos com Pix, cartão ou boleto, com possibilidade de parcelamento.",
  },
  {
    question: "Vocês cuidam do domínio e hospedagem?",
    answer:
      "Auxiliamos em todo o processo e indicamos as melhores opções para o seu projeto.",
  },
];

const Plans = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [couponCodes, setCouponCodes] = useState<Record<string, string>>({});
  const [appliedCoupons, setAppliedCoupons] = useState<Record<string, string>>({});
  const navLinks = [
    { name: "Início", href: "/", type: "route" as const },
    { name: "Planos", href: "#planos", type: "anchor" as const },
    { name: "Benefícios", href: "#beneficios", type: "anchor" as const },
    { name: "FAQ", href: "#faq", type: "anchor" as const },
    { name: "Contato", href: "/#contact", type: "route" as const },
  ];

  const handleChoosePlan = async (planId: string) => {
    try {
      setLoadingPlan(planId);
      const appliedCoupon = (appliedCoupons[planId] ?? "").trim().toUpperCase();
      const response = await fetch("/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, coupon: appliedCoupon }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar pagamento: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.init_point) {
        throw new Error("Link de pagamento não retornado.");
      }

      window.location.href = data.init_point;
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
      toast.error("Não foi possível iniciar o pagamento. Tente novamente em instantes.");
      setLoadingPlan(null);
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation links={navLinks} />
      <main className="pt-24">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,transparent_70%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-amber-500">
                <Crown className="h-4 w-4" />
                Planos sob medida para cada fase
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Escolha o plano ideal para acelerar suas vendas online
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Estruturas pensadas para transformar visitantes em clientes, com design premium e alta performance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="cta" size="lg" asChild>
                  <a href="#contato-planos">Quero um orçamento</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#planos">Ver planos</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="planos" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold">Planos que acompanham sua evolução</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tudo o que você precisa para ter um site bonito, estratégico e pronto para converter.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const normalizedCoupon = (couponCodes[plan.id] ?? "").trim().toUpperCase();
                const appliedCoupon = (appliedCoupons[plan.id] ?? "").trim().toUpperCase();
                const hasProDiscount = plan.id === "pro" && appliedCoupon === "XPRO20";
                const priceWithDiscount = hasProDiscount ? 1869.36 : plan.price;
                const installmentWithDiscount = hasProDiscount
                  ? 1869.36 / 12
                  : plan.installment;

                return (
                  <Card
                    key={plan.name}
                    className={`relative overflow-hidden border border-border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
                      plan.highlight
                        ? "bg-gradient-to-br from-primary/10 via-background to-background border-primary/40"
                        : "bg-card"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {plan.badge}
                      </span>
                    )}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold">{plan.name}</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                      <div className="space-y-1">
                        {hasProDiscount && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatCurrency(plan.price)}
                          </p>
                        )}
                        <div className="text-4xl font-bold">
                          {formatCurrency(priceWithDiscount)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {`12x de ${formatCurrency(installmentWithDiscount)}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {hasProDiscount ? "com cupom XPRO20" : "À vista"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`coupon-${plan.id}`}>Cupom de desconto</Label>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <Input
                            id={`coupon-${plan.id}`}
                            placeholder="Digite seu cupom"
                            value={couponCodes[plan.id] ?? ""}
                            onChange={(event) =>
                              setCouponCodes((prev) => ({
                                ...prev,
                                [plan.id]: event.target.value,
                              }))
                            }
                          />
                          {plan.id === "pro" && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="sm:h-10"
                              onClick={() =>
                                setAppliedCoupons((prev) => ({
                                  ...prev,
                                  [plan.id]: normalizedCoupon,
                                }))
                              }
                            >
                              Aplicar
                            </Button>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                            <Check className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      variant={plan.highlight ? "cta" : "outline"}
                      size="lg"
                      className="mt-8 w-full"
                      onClick={() => handleChoosePlan(plan.id)}
                      disabled={loadingPlan === plan.id}
                    >
                      {loadingPlan === plan.id ? "Redirecionando..." : `Escolher ${plan.name}`}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="beneficios" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Tudo pensado para encantar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Uma entrega completa para você focar no crescimento do seu negócio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 bg-background border-border shadow-sm">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Um processo simples e transparente</h2>
                <p className="text-muted-foreground">
                  Você acompanha cada etapa: briefing, proposta visual, desenvolvimento e publicação. Sem surpresas.
                </p>
                <div className="space-y-3">
                  {[
                    "Kickoff estratégico com definição de metas",
                    "Wireframe e layout com aprovação rápida",
                    "Desenvolvimento com revisões semanais",
                    "Entrega final com treinamento básico",
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="p-8 bg-gradient-to-br from-background via-primary/5 to-background border-primary/20">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Extras sob demanda</h3>
                  <p className="text-sm text-muted-foreground">
                    Acrescente funcionalidades avançadas conforme sua estratégia digital evolui.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    {[
                      "Automação de leads e integração com RD/HubSpot",
                      "Página de vendas com copy persuasiva",
                      "Chatbot e atendimento automatizado",
                      "Manutenção mensal com otimizações contínuas",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="#contato-planos">Quero falar sobre extras</a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
              <p className="text-muted-foreground">Transparência total antes de começar o seu projeto.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq) => (
                <Card key={faq.question} className="p-6 bg-background border-border">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contato-planos" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para lançar seu novo site?</h2>
              <p className="text-muted-foreground">
                Conte com um time que entende seu negócio e entrega resultados visíveis.
              </p>
              <Button variant="cta" size="lg" asChild>
                <a href="#planos">Agendar conversa</a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Prefere falar agora? <Link to="/#contact" className="text-primary font-medium">Ir para contato</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Plans;
