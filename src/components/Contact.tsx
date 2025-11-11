import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp message
    const whatsappMessage = `Olá! Gostaria de fazer um orçamento.%0A%0ANome: ${formData.name}%0AEmail: ${formData.email}%0AWhatsApp: ${formData.whatsapp}%0AMensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
    
    // Reset form
    setFormData({ name: "", email: "", whatsapp: "", message: "" });
  };

  const handleWhatsAppDirect = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de fazer um orçamento.", "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Entre em Contato</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pronto para começar seu projeto? Fale conosco agora mesmo
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 border-border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <Input
                  required
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  required
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <Input
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensagem</label>
                <Textarea
                  required
                  placeholder="Conte-nos sobre seu projeto..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-5 w-5" />
                Enviar mensagem
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-8 border-border bg-card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">
                    Fale conosco diretamente pelo WhatsApp
                  </p>
                  <Button variant="outline" onClick={handleWhatsAppDirect} className="w-full">
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    contato@yvesx.com.br
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-primary/20 bg-primary/5 border-2">
              <h3 className="font-semibold mb-2 text-lg">Resposta Rápida</h3>
              <p className="text-muted-foreground">
                Respondemos todas as mensagens em até 24 horas. 
                Para atendimento mais rápido, use nosso WhatsApp.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
