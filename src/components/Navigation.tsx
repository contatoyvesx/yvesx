import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-mark.svg";

type NavLink = {
  name: string;
  href: string;
  type: "anchor" | "route";
};

type NavigationProps = {
  links?: NavLink[];
};

const Navigation = ({ links }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultLinks: NavLink[] = [
    { name: "Início", href: "#home", type: "anchor" },
    { name: "Sobre", href: "#about", type: "anchor" },
    { name: "Serviços", href: "#services", type: "anchor" },
    { name: "Portfólio", href: "#portfolio", type: "anchor" },
    { name: "Depoimentos", href: "#testimonials", type: "anchor" },
    { name: "Contato", href: "#contact", type: "anchor" },
    { name: "Planos", href: "/planos", type: "route" },
  ];

  const navLinks = links ?? defaultLinks;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={(event) => {
              const element = document.querySelector("#home");
              if (element) {
                event.preventDefault();
                scrollToSection("#home");
              }
            }}
          >
            <img src={logoMark} alt="YvesX" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in rounded-lg border border-border bg-background/95 shadow-lg">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="block py-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ),
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
