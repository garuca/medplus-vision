import { useState } from "react";
import { Link } from "wouter";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Building2,
  User,
  Stethoscope,
  Ambulance,
  Star,
  UserCheck,
  PhoneCall,
  MailCheck,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

const contactInfo = {
  phone: "(62) 3519-9974",
  whatsapp: "556294896602",
  whatsappJuliano: "556294896602",
  email: "juliano@medplushospitalar.com.br",
  address:
    "Av. Zoroastro Artiaga, QD 09 LT44 - Cruzeiro do Sul, Aparecida de Goiânia - GO, 74917-196",
  hours: "Seg à Qui: 8h às 18h | Sex: 8h às 17h",
};

const departments = [
  {
    icon: Stethoscope,
    title: "Vendas",
    email: "juliano@medplushospitalar.com.br",
    whatsapp: "556294896602",
    desc: "Equipamentos médicos e hospitalares",
    contato: "Juliano Rodrigues",
  },
  {
    icon: Calendar,
    title: "Locação",
    email: "locacao@medhospitalar.com.br",
    whatsapp: "556294896602",
    desc: "Planos de locação de equipamentos",
    contato: "Lucas",
  },
  {
    icon: Building2,
    title: "Registro de Preço",
    email: "registro@medhospitalar.com.br",
    whatsapp: "556294896602",
    desc: "Contratos para órgãos públicos",
    contato: "Lucas",
  },
  {
    icon: MessageCircle,
    title: "Assistência Técnica",
    email: "tecnico@medhospitalar.com.br",
    whatsapp: "556294896602",
    desc: "Manutenção e suporte técnico",
    contato: "Lucas",
  },
];

const faqs = [
  {
    q: "Qual o tempo de entrega?",
    a: "Entregamos em todo Brasil. O prazo varia conforme a região e disponibilidade do produto.",
  },
  {
    q: "Vocês oferecem instalação?",
    a: "Sim, oferecemos entrega e instalação gratuitadas para equipamentos em Goiânia e região.",
  },
  {
    q: "Tem garantia?",
    a: "Todos os equipamentos possuem garantia de factory, além do suporte técnico especializado.",
  },
  { q: "Atendem via WhatsApp?", a: "Sim! Você pode falar conosco pelo WhatsApp: (62) 9998-1212" },
];

export default function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá! Gostaria de falar sobre: ${form.departamento || "Informações gerais"}`,
    );
    window.open(`https://wa.me/55${contactInfo.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Star className="h-4 w-4" /> Estamos Aqui para Você
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            Fale Conosco
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500">
              {" "}
              a Qualquer Hora
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Nossa equipe está pronta para atender você. Escolha o canal de preferência ou preencha o
            formulário abaixo.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
              className="group glass-card flex flex-col items-center gap-4 p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Ligação</h3>
                <p className="text-sm text-primary">{contactInfo.phone}</p>
              </div>
            </a>
            <a
              href={`https://api.whatsapp.com/send/?phone=55556294896602`}
              target="_blank"
              className="group glass-card flex flex-col items-center gap-4 p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20">
                <MessageCircle className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">WhatsApp</h3>
                <p className="text-sm text-green-600">Clique para conversar</p>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="group glass-card flex flex-col items-center gap-4 p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20">
                <Mail className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">E-mail</h3>
                <p className="text-sm text-primary">Mande sua mensagem</p>
              </div>
            </a>
            <a
              href="https://maps.google.com/?q=Av.+Zoroastro+Artiaga+QD+09+LT44+Aparecida+de+Goiânia+GO"
              target="_blank"
              className="group glass-card flex flex-col items-center gap-4 p-6 text-center hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Endereço</h3>
                <p className="text-sm text-primary">Ver no mapa</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <div className="glass-card p-8 lg:p-10">
              {sent ? (
                <div className="text-center py-8">
                  <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">Mensagem Enviada!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Obrigado pelo contato. Nossa equipe responderá em até 24 horas.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-secondary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Envie uma Mensagem</h3>
                      <p className="text-xs text-muted-foreground">Retornamos em até 24h</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <UserCheck className="h-4 w-4 text-primary" /> Nome completo
                        </label>
                        <div className="relative mt-1.5">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            placeholder="Seu nome completo"
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/60 backdrop-blur-sm px-10 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <PhoneCall className="h-4 w-4 text-primary" /> Telefone
                        </label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="tel"
                            required
                            placeholder="(62) 99999-9999"
                            value={form.telefone}
                            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/60 backdrop-blur-sm px-10 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        <MailCheck className="h-4 w-4 text-primary" /> E-mail
                      </label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          placeholder="seu@email.com.br"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/60 backdrop-blur-sm px-10 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        <Building2 className="h-4 w-4 text-primary" /> Departamento
                      </label>
                      <div className="relative mt-1.5">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <select
                          value={form.departamento}
                          onChange={(e) => setForm({ ...form, departamento: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/60 backdrop-blur-sm px-10 py-3.5 text-foreground appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="">Selecione...</option>
                          <option value="vendas">Vendas de Equipamentos</option>
                          <option value="locacao">Locação de Equipamentos</option>
                          <option value="registro">Registro de Preço</option>
                          <option value="tecnica">Assistência Técnica</option>
                          <option value="outros">Outros</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        <MessageSquare className="h-4 w-4 text-primary" /> Mensagem
                      </label>
                      <div className="relative mt-1.5">
                        <textarea
                          required
                          placeholder="Conte-nos sobre sua necessidade..."
                          value={form.mensagem}
                          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/60 backdrop-blur-sm px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none min-h-[120px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold shadow-lg shadow-primary/20"
                      >
                        <Send className="h-5 w-5" /> Enviar Mensagem
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="flex-1 btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold"
                      >
                        <MessageCircle className="h-5 w-5" /> WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Departments + Info */}
            <div className="space-y-6">
              {/* Departments */}
              <div className="glass-card p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-foreground">Departamentos</h3>
                <p className="mt-1 text-muted-foreground">
                  Fale diretamente com nosso time especializado.
                </p>
                <div className="mt-6 grid gap-4">
                  {departments.map((d) => {
                    const Icon = d.icon;
                    return (
                      <div
                        key={d.title}
                        className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{d.title}</h4>
                          <p className="text-sm text-muted-foreground">{d.desc}</p>
                          <p className="text-xs text-primary font-medium">{d.contato}</p>
                        </div>
                        <a
                          href={`https://wa.me/${d.whatsapp}?text=Olá! Gostaria de informações sobre ${encodeURIComponent(d.title)}`}
                          target="_blank"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hours & Location */}
              <div className="glass-card p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-foreground">Informações</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Horário de Atendimento</h4>
                      <p className="text-sm text-muted-foreground">{contactInfo.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Nossa Localização</h4>
                      <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card p-6">
                <h4 className="font-bold text-foreground">{faq.q}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="mx-auto mb-8 text-lg text-muted-foreground max-w-xl">
            Nossa equipe está pronta para tirar todas as suas dúvidas. Fale conosco agora mesmo!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/556294896602"
              target="_blank"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>
            <Link
              href="/servicos"
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
            >
              Ver nossos serviços <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
