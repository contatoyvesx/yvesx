const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Sobre a YvesX</h2>
          
          <div className="h-1 w-20 bg-primary mx-auto" />
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Somos especialistas em transformar ideias em sites profissionais que geram resultados. 
            Com foco em design moderno, performance e experiência do usuário, ajudamos empresas a 
            construírem uma presença digital forte e eficiente.
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Cada projeto é desenvolvido com atenção aos detalhes, garantindo que seu site seja 
            rápido, responsivo e otimizado para converter visitantes em clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
