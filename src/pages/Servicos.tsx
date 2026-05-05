import { Link } from "wouter";
import {
  Package,
  Wrench,
  Stethoscope,
  ShieldCheck,
  Clock,
  Award,
  HeartHandshake,
  Scale,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { placeholderImages } from "../lib/images";

const services = [
  {
    id: "vendas",
    icon: Package,
    title: "Vendas de Equipamentos",
    subtitle: "Tecnologia de ponta para sua instituição",
    description:
      "Oferecemos equipamentos médicos hospitalares das melhores marcas do mercado, com certificação ANVISA e garantia completa. Cada produto é rigorosamente testado para garantir segurança e eficiência.",
    features: [
      "Equipamentos novos e seminovos",
      "Marcas internacionais reconhecidas",
      "Garantia de fábrica",
      "Suporte técnico especializado",
      "Treinamento para equipe",
      "Entrega e instalação completas",
    ],
    color: "from-blue-500 to-cyan-500",
    image: placeholderImages.servico,
  },
  {
    id: "locacao",
    icon: Clock,
    title: "Locação de Equipamentos",
    subtitle: "Flexibilidade que sua instituição precisa",
    description:
      "Elimine alto custo de investimento em equipamentos, manutenção corretiva e preventiva.",
    features: [
      "Contratos flexíveis de 12 a 60 meses",
      "Manutenção preventiva inclusa",
      "Manutenção corretiva inclusa",
      "Reposição de equipamento em até 24 horas",
      "Treinamento e suporte técnico incluso",
      "Sem burocracia para sua instituição",
    ],
    color: "from-purple-500 to-pink-500",
    image: placeholderImages.servico,
  },
  {
    id: "assistencia",
    icon: Wrench,
    title: "Assistência Técnica",
    subtitle: "Excelência em manutenção corretiva e preventiva",
    description:
      "Equipe técnica altamente qualificada para manutenção preventiva e corretiva de equipamentos médico-hospitalares. Atendemos em todo território nacional, utilizando peças homologadas pelos fabricantes.",
    features: [
      "Manutenção preventiva programada",
      "Corretiva com urgência",
      "Técnicos qualificados para atendimento em diversas áreas",
      "Peças originais garantidas",
      "Atendimento em todo Brasil",
      "Laudos técnicos e certificações",
    ],
    color: "from-orange-500 to-amber-500",
    image: placeholderImages.servico,
  },
  {
    id: "consultoria",
    icon: HeartHandshake,
    title: "Consultoria Hospitalar",
    subtitle: "Especialistas em gestão de saúde",
    description:
      "Consultoria especializada para otimização de processos, gestão de compras e implementação de boas práticas hospitalares.",
    features: [
      "Auditoria de processos",
      "Gestão de estoque e compras",
      "Capacitação de equipes",
      "Implementação de evidências",
      "Redução de custos operacionais",
      "Compliance regulatório",
    ],
    color: "from-emerald-500 to-teal-500",
    image: placeholderImages.servico,
  },
];

const diferenciais = [
  {
    icon: Award,
    title: "+7 Anos de Experiência",
    text: "Tradição e know-how no mercado hospitalar",
  },
  {
    icon: ShieldCheck,
    title: "Certificação ANVISA e CREA",
    text: "Produtos e serviços regularizados",
  },
  {
    icon: Users,
    title: "+500 Clientes Atendidos",
    text: "Hospitais, clínicas e UPAs em todo Brasil",
  },
  { icon: MapPin, title: "Atendimento Nacional", text: "Presença em todas as regiões do país" },
  {
    icon: Stethoscope,
    title: "Especialistas Dedicados",
    text: "Equipe técnica e comercial qualificada",
  },
  { icon: Scale, title: "Preços Justos", text: "Transparencia comercial sem custos ocultos" },
];

export default function Servicos() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-fade-in">
            <Star className="h-4 w-4" /> Referência em Equipamentos Médicos
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
            Soluções Completas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500">
              {" "}
              para a Saúde
            </span>
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Da aquisição ao suporte contínuo.
          </p>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="group glass-card flex items-center gap-4 p-4 hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{d.title}</h3>
                    <p className="text-sm text-muted-foreground">{d.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  className={`group relative overflow-hidden rounded-3xl glass-card p-0 ${i % 2 === 0 ? "" : "lg:text-right"}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                  <div className="relative flex flex-col lg:flex-row">
                    <div
                      className={`p-8 lg:p-10 ${i % 2 === 0 ? "lg:order-1" : "lg:order-2"} ${["locacao", "consultoria"].includes(service.id) ? "lg:text-left" : ""} lg:w-1/2`}
                    >
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} mb-6 shadow-lg shadow-primary/20`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-lg font-medium text-primary">{service.subtitle}</p>
                      <p className="mt-4 text-muted-foreground">{service.description}</p>
                      <ul className="mt-6 grid gap-3">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-sm text-foreground/85"
                          >
                            <CheckCircle2
                              className={`h-5 w-5 shrink-0 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contato"
                        className="group/btn btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
                      >
                        Solicitar orçamento
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                    <div
                      className={`relative h-56 lg:h-auto lg:w-1/2 ${i % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30`}
                      ></div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Pronto para transformar sua instituição?
          </h2>
          <p className="mx-auto mb-8 text-lg text-muted-foreground max-w-xl">
            Fale com nossos especialistas e receba um diagnóstico personalizado para as necessidades
            da sua instituição.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contato"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
            >
              <Phone className="h-5 w-5" /> Falar com especialista
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=556294896602"
              target="_blank"
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
            >
              <Mail className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
