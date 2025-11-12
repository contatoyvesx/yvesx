import { useEffect } from "react";

import { Card } from "@/components/ui/card";

const portfolioItems = [
  {
    title: "E-commerce Moderno",
    category: "Loja Virtual",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Site Institucional",
    category: "Corporativo",
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=600&fit=crop",
  },
  {
    title: "Landing Page",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
  },
  {
    title: "Blog Profissional",
    category: "Conteúdo",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
  },
  {
    title: "Portfólio Criativo",
    category: "Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  },
  {
    title: "App Web",
    category: "Aplicação",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  },
];

const Portfolio = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouchDevice) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-portfolio-card]");

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.dataset.active = "true";
          } else {
            target.dataset.active = "false";
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Portfólio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden cursor-pointer border-border bg-card hover:shadow-xl transition-all duration-300 animate-scale-in data-[active=true]:shadow-xl"
              data-portfolio-card
              data-active="false"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 grayscale group-hover:scale-110 group-hover:grayscale-0 group-data-[active=true]:scale-110 group-data-[active=true]:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300 flex items-end p-6 group-hover:opacity-100 group-data-[active=true]:opacity-100">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
