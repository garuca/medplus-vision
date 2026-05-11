import { Link } from "wouter";
import {
  Award,
  Heart,
  Target,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Truck,
  MapPin,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  Stethoscope,
  Building2,
  TrendingUp,
} from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

const values = [
  {
    icon: Heart,
    title: "Cuidar da Vida",
    text: "Cada produto que vendemos salva vidas. Nosso compromisso com a excelência em cada detalhe.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Shield,
    title: "Qualidade Certificada",
    text: "Todos os produtos com registro ANVISA e procedência garantida.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Target,
    title: "Inovação Contínua",
    text: "Sempre buscamos as melhores tecnologias para nossos clientes.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Users,
    title: "Parceria Real",
    text: "Relacionamentos de longo prazo com instituições de saúde.",
    color: "bg-green-100 text-green-600",
  },
];

const timeline = [
  {
    year: "2009",
    title: "Início da Trajetória",
    text: "Juliano Rodrigues e Lucas iniciam no setor de equipamentos médicos.",
  },
  {
    year: "2009",
    title: "Especialização",
    text: "Foco em suprimentos médicos para hospitais e clínicas.",
  },
  {
    year: "2019",
    title: "Fundação MedPlus",
    text: "Nasce a MedPlus Hospitalar com visão de excelência.",
  },
  {
    year: "2026",
    title: "Expansão Digital",
    text: "E-commerce moderno para atender todo o Brasil.",
  },
];

const numbers = [
  { value: "+7", label: "Anos de Experiência", icon: Clock },
  { value: "500+", label: "Clientes Atendidos", icon: Users },
  { value: "1000+", label: "Produtos Disponíveis", icon: Stethoscope },
  { value: "98%", label: "Satisfação", icon: Star },
];

const diferenciais = [
  { icon: Truck, title: "Entrega Rápida", text: "Logística eficiente para todo o Brasil" },
  { icon: Shield, title: "Produtos Certificados", text: "Registro ANVISA em todos os itens" },
  { icon: Calendar, title: "Atendimento Personalizado", text: "Suporte técnico especializado" },
  { icon: TrendingUp, title: "Melhores Preços", text: "Condições comerciais competitivas" },
];

export default function Sobre() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Quem Somos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Excelência em Suprimentos <span className="text-primary">Médicos</span>
              <br />
              para Profissionais e Instituições
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Há mais de 15 anos, fornecemos equipamentos médicos de alta qualidade para hospitais,
              clínicas e profissionais de saúde em todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {numbers.map((n) => (
              <div key={n.label} className="glass-card p-6 text-center">
                <n.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-3xl font-bold text-primary">{n.value}</p>
                <p className="text-sm text-muted-foreground">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-white/60 to-blue-500/20 p-8 md:p-12">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  A <strong>MedPlus Hospitalar</strong> nasceu da experiência acumulada desde{" "}
                  <strong>2009</strong> no setor de equipamentos médicos. Fundada em{" "}
                  <strong>2019</strong> por <strong>Juliano Rodrigues e Lucas Oliveira</strong>,
                  nossa empresa tem como missão fornecer suprimentos médicos de qualidade para
                  profissionais e instituições de saúde.
                </p>
                <p>
                  Ao longo desses anos, construímos parcerias sólidas com hospitais, clínicas,
                  consultórios e profissionais autônomos em todo o Brasil. Somos reconhecidos pela
                  excelência em atendimento, aliada com a qualidade de produtos e agilidade
                  comercial e logística.
                </p>
                <p>
                  <strong>Nosso compromisso:</strong> Fornecer produtos e serviços que contribuam
                  para a assistência médica e a vida, com qualidade e segurança. Prezando sempre em
                  atender com excelência cada detalhe que possa contribuir em cuidar e salvar vidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Nossa Trajetória</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-primary hidden md:block"></div>
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`flex items-center gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 glass-card p-4 rounded-xl">
                    <span className="text-lg font-bold text-primary">{t.year}</span>
                    <h3 className="font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.text}</p>
                  </div>
                  <div className="hidden md:flex h-4 w-4 rounded-full bg-primary ring-4 ring-white shrink-0"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-8">Nossos Valores</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card p-6 text-center hover:scale-105 transition-transform"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${v.color}`}
                >
                  <v.icon className="h-6 w-6" strokeWidth={1.2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass-strong p-8 md:p-12">
            <h2 className="text-2xl font-bold text-center mb-8">Por Que Escolher a MedPlus?</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {diferenciais.map((d) => (
                <div key={d.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{d.title}</h3>
                    <p className="text-sm text-muted-foreground">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Fale Conosco</h2>
            <p className="text-muted-foreground mb-6">
              Estamos prontos para atendê-lo e esclarecer todas as suas dúvidas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+556235199974"
                className="inline-flex items-center gap-2 text-sm hover:text-primary"
              >
                <Phone className="h-4 w-4" /> (62) 3519-9974
              </a>
              <a
                href="mailto:juliano@medplushospitalar.com.br"
                className="inline-flex items-center gap-2 text-sm hover:text-primary"
              >
                <Mail className="h-4 w-4" /> juliano@medplushospitalar.com.br
              </a>
              <span className="inline-flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" /> Goiás - Brasil
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Link
            to="/loja"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
          >
            Conhecer Nossa Loja <Award className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
