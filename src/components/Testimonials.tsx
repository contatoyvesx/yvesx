import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO, TechStart",
    content: "A YvesX transformou nossa presença digital. O site ficou incrível e nossas conversões aumentaram 150%!",
  },
  {
    name: "Ana Santos",
    role: "Diretora de Marketing, InovaCorp",
    content: "Profissionalismo e qualidade excepcionais. Entregaram exatamente o que prometeram, no prazo combinado.",
  },
  {
    name: "Roberto Lima",
    role: "Fundador, CreativeHub",
    content: "Melhor investimento que fizemos. O site não é só bonito, ele realmente vende. Recomendo muito!",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Depoimentos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre nosso trabalho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col space-y-4">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
