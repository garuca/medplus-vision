import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Sparkles, Stethoscope, Wrench } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Vendas, Locação e Assistência Técnica | MedPlus" },
      {
        name: "description",
        content:
          "Conheça os serviços da MedPlus Hospitalar: vendas de equipamentos médicos, locação flexível e assistência técnica especializada com cobertura nacional.",
      },
      { property: "og:title", content: "Serviços da MedPlus Hospitalar" },
      {
        property: "og:description",
        content:
          "Vendas, locação e assistência técnica em equipamentos médicos hospitalares com tecnologia de ponta.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Stethoscope,
    title: "Vendas: Tecnologia de Ponta ao Seu Alcance.",
    text: "Oferecemos um portfólio diversificado dos mais modernos equipamentos médicos hospitalares, selecionados com rigor para garantir a máxima performance e segurança. Conte com a MedPlus para adquirir soluções que elevam o padrão do seu atendimento e otimizam seus resultados.",
    bullets: [
      "Equipamentos novos e homologados",
      "Marcas reconhecidas no setor de saúde",
      "Treinamento e implantação",
      "Garantia e suporte pós-venda",
    ],
  },
  {
    icon: Sparkles,
    title: "Locação: Flexibilidade e Economia para Sua Instituição.",
    text: "A MedPlus disponibiliza um serviço de locação de equipamentos médicos que se adapta às suas necessidades, seja para demandas pontuais, projetos específicos ou para otimizar seu capital. Tenha acesso à tecnologia de ponta sem o custo de aquisição, com a garantia de manutenção e suporte técnico.",
    bullets: [
      "Planos curtos, médios e longos",
      "Manutenção inclusa",
      "Substituição rápida em caso de falha",
      "Otimização do capital de giro",
    ],
  },
  {
    icon: Wrench,
    title: "Assistência Técnica: Suporte que Você Pode Confiar.",
    text: "Nossa equipe de engenheiros e técnicos especializados está pronta para garantir o perfeito funcionamento dos seus equipamentos. Com agilidade e precisão, oferecemos manutenção preventiva e corretiva, assegurando a longevidade dos seus investimentos e a continuidade dos seus serviços.",
    bullets: [
      "Manutenção preventiva e corretiva",
      "Engenheiros e técnicos certificados",
      "Atendimento ágil em todo o Brasil",
      "Laudos e calibração",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-16">
        <SectionTitle
          eyebrow="Serviços"
          title="Soluções Abrangentes para o Seu Sucesso na Saúde."
          description="Da aquisição ao suporte contínuo, atuamos como parceiros estratégicos da sua instituição."
        />
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`glass-strong grid items-center gap-8 p-8 md:grid-cols-5 md:p-10 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-2">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/15 text-primary md:mx-0">
                  <s.icon className="h-12 w-12" strokeWidth={1.4} />
                </div>
              </div>
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{s.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contato"
                  className="btn-primary mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Solicitar orçamento
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl glass-strong p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Não encontrou o que precisa?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Nosso portfólio é amplo. Conte para nós a sua necessidade e encontraremos a solução ideal.
          </p>
          <Link
            to="/contato"
            className="btn-primary mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </>
  );
}
