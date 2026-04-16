import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Stethoscope, Wrench, Sparkles, MapPin, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedPlus Hospitalar — Tecnologia e Confiança que Cuidam da Vida" },
      {
        name: "description",
        content:
          "Soluções completas em equipamentos médicos hospitalares: vendas, locação e assistência técnica especializada para o setor de saúde em todo o Brasil.",
      },
      { property: "og:title", content: "MedPlus Hospitalar — Equipamentos Médicos Hospitalares" },
      {
        property: "og:description",
        content:
          "Vendas, locação e assistência técnica em equipamentos médicos hospitalares com excelência e tecnologia de ponta.",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: Stethoscope,
    title: "Vendas",
    text: "Portfólio diversificado dos mais modernos equipamentos médicos hospitalares, selecionados com rigor para garantir performance e segurança.",
  },
  {
    icon: Sparkles,
    title: "Locação",
    text: "Flexibilidade e economia: tenha acesso à tecnologia de ponta sem o custo de aquisição, com garantia de manutenção e suporte.",
  },
  {
    icon: Wrench,
    title: "Assistência Técnica",
    text: "Equipe de engenheiros e técnicos especializados em manutenção preventiva e corretiva, com agilidade e precisão.",
  },
];

const differentials = [
  { icon: Headphones, title: "Atendimento Especializado", text: "Consultoria personalizada para identificar a melhor solução." },
  { icon: Wrench, title: "Suporte Técnico Ágil", text: "Equipe qualificada pronta para minimizar interrupções." },
  { icon: ShieldCheck, title: "Equipamentos de Ponta", text: "Acesso às tecnologias mais recentes e eficientes do mercado." },
  { icon: MapPin, title: "Abrangência Nacional", text: "Atendimento e suporte em todo o território brasileiro." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Desde 2009 no setor de saúde
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Tecnologia e Confiança que <span className="text-gradient">Cuidam da Vida.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Soluções completas em equipamentos médicos hospitalares: Vendas, Locação e Assistência
              Técnica especializada para o setor de saúde em todo o Brasil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contato"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Solicitar Orçamento <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/servicos"
                className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Nossos Serviços
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {[
                { k: "15+", v: "anos de mercado" },
                { k: "100%", v: "cobertura nacional" },
                { k: "24/7", v: "suporte técnico" },
              ].map((s) => (
                <div key={s.v} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-strong overflow-hidden p-2">
              <img
                src={heroImage}
                alt="Equipamentos médicos hospitalares de alta tecnologia"
                width={1920}
                height={1080}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden glass-card p-4 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Certificados</p>
                  <p className="text-sm font-semibold">Equipamentos homologados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Serviços"
            title="Soluções Abrangentes para o Seu Sucesso na Saúde."
            description="Da aquisição ao suporte contínuo, entregamos tecnologia de ponta com confiabilidade."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="glass-card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <Link to="/servicos" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Diferenciais"
            title="Por Que Escolher a MedPlus Hospitalar?"
            description="Compromisso com a excelência em cada etapa do atendimento."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentials.map((d) => (
              <div key={d.title} className="glass-card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <d.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl glass-strong overflow-hidden p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pronto para elevar o padrão do seu atendimento?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Converse com nossos especialistas e descubra a solução ideal em equipamentos médicos para
            sua instituição.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contato"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Solicitar Orçamento <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/5562994896602"
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
