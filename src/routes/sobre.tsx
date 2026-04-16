import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Target, Users } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — MedPlus Hospitalar" },
      {
        name: "description",
        content:
          "Fundada em 2019 por Juliano e Lucas Oliveira, a MedPlus Hospitalar é referência nacional em equipamentos médicos, com expertise no setor desde 2009.",
      },
      { property: "og:title", content: "Sobre a MedPlus Hospitalar" },
      {
        property: "og:description",
        content:
          "Inovação e experiência a serviço da saúde — referência nacional em equipamentos médicos hospitalares.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Cuidar da vida", text: "Tudo o que fazemos é para que profissionais possam focar no paciente." },
  { icon: Award, title: "Excelência", text: "Compromisso inabalável com qualidade, segurança e performance." },
  { icon: Target, title: "Inovação", text: "Tecnologia de ponta e soluções que elevam o padrão do atendimento." },
  { icon: Users, title: "Parceria", text: "Relações de longo prazo construídas sobre confiança e suporte real." },
];

function AboutPage() {
  return (
    <>
      <section className="px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Sobre Nós
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            MedPlus Hospitalar: <span className="text-gradient">Inovação e Experiência</span> a Serviço da Saúde.
          </h1>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl glass-strong p-8 md:p-12">
          <p className="text-lg leading-relaxed text-foreground/90">
            Fundada em <strong>2019</strong> por <strong>Juliano e Lucas Oliveira</strong>, a MedPlus
            Hospitalar nasceu da paixão e da vasta experiência de seus fundadores, que atuam no
            mercado de equipamentos médicos desde <strong>2009</strong>. Com uma trajetória sólida e
            um compromisso inabalável com a excelência, a MedPlus se estabeleceu como referência
            nacional, oferecendo soluções inovadoras e confiáveis que impulsionam a qualidade do
            atendimento em hospitais, clínicas e laboratórios por todo o Brasil.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Nossa missão é clara: fornecer <span className="font-semibold text-primary">tecnologia
            de ponta</span> e <span className="font-semibold text-primary">suporte especializado</span>{" "}
            para que profissionais da saúde possam focar no que realmente importa — cuidar da vida.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "2009", v: "Início no mercado" },
              { k: "2019", v: "Fundação da MedPlus" },
              { k: "Brasil", v: "Atendimento nacional" },
            ].map((s) => (
              <div key={s.v} className="glass-card p-5 text-center">
                <div className="text-2xl font-bold text-gradient">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Nossos valores"
            title="O que nos move todos os dias"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <v.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl glass-strong p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Vamos conversar sobre sua necessidade?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Nossa equipe está pronta para entender o seu cenário e propor a melhor solução.
          </p>
          <Link
            to="/contato"
            className="btn-primary mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
          >
            Fale com um especialista
          </Link>
        </div>
      </section>
    </>
  );
}
