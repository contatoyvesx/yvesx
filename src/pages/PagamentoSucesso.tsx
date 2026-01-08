import { Link } from "react-router-dom";
import { CheckCircle2, CreditCard, Mail, PhoneCall } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PagamentoSucesso = () => {
  const navLinks = [
    { name: "Início", href: "/", type: "route" as const },
    { name: "Planos", href: "/planos", type: "route" as const },
    { name: "Contato", href: "/#contact", type: "route" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation links={navLinks} />
      <main className="pt-24">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,transparent_70%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-amber-500">
                <CheckCircle2 className="h-4 w-4" />
                Pagamento confirmado
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Obrigado! Seu pagamento foi aprovado.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Já estamos preparando os próximos passos do seu projeto. Em instantes você receberá um
                e-mail com os detalhes da contratação.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/planos">Ver outros planos</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">Voltar ao início</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-border/60 bg-muted/40 p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-semibold">Comprovante</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enviamos o recibo para o e-mail cadastrado. Se precisar de outro formato, é só nos avisar.
                </p>
              </Card>
              <Card className="border-border/60 bg-muted/40 p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Próximos passos</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe entrará em contato para alinhar briefing, prazos e entregas iniciais.
                </p>
              </Card>
              <Card className="border-border/60 bg-muted/40 p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <PhoneCall className="h-5 w-5" />
                  <span className="font-semibold">Suporte direto</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Precisa falar agora? Nosso time está disponível via WhatsApp para agilizar qualquer ajuste.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default PagamentoSucesso;
