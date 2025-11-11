import logoMark from "@/assets/logo-mark.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img src={logoMark} alt="YvesX" className="h-8 w-auto" />
            <p className="text-primary-foreground/80">
              Transformando ideias em sites profissionais que geram resultados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {["Início", "Sobre", "Serviços", "Portfólio", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>WhatsApp: (11) 94700-6358</li>
              <li>Email: contato.yvesx@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {currentYear} YvesX. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
