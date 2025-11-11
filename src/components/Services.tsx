import { Card } from "@/components/ui/card";
import { Globe, Layout, Settings, Palette, Smartphone, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Criação de sites",
    description: "Sites completos desenvolvidos do zero, com design único e funcionalidades personalizadas para seu negócio.",
  },
  {
    icon: Layout,
    title: "Sites institucionais",
    description: "Apresente sua empresa de forma profissional com um site elegante e informativo.",
  },
  {
    icon: Zap,
    title: "Landing pages",
    description: "Páginas de conversão otimizadas para capturar leads e aumentar suas vendas.",
  },
  {
    icon: Settings,
    title: "Ajustes e melhorias",
    description: "Otimizamos e melhoramos sites existentes, corrigindo problemas e adicionando funcionalidades.",
  },
  {
    icon: Palette,
    title: "Design personalizado",
    description: "Criamos identidades visuais únicas que representam a essência da sua marca.",
  },
  {
    icon: Smartphone,
    title: "Otimização mobile",
    description: "Garantimos que seu site funcione perfeitamente em todos os dispositivos.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Nossos Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para levar seu negócio ao próximo nível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-border bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-start space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
