import { useState } from "react";
import { Link } from "wouter";
import {
  FileText,
  Shield,
  Clock,
  CheckCircle,
  Building2,
  Users,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  BadgeCheck,
  ScrollText,
  Handshake,
  PlusCircle,
  ChevronDown,
  CircleCheck,
  ShoppingCart,
  FileCheck,
} from "lucide-react";

const etapas = [
  {
    num: 1,
    title: "Solicitação",
    text: "Orgão solicita adesão via formulário ou WhatsApp",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: 2,
    title: "Análise",
    text: "Verificação da documentação e elegibilidade",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
  },
  {
    num: 3,
    title: "Aprovação",
    text: "Liberação para compras na ata registrada",
    icon: CircleCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    num: 4,
    title: "Compra",
    text: "Solicitação de fornecimento com preço fechado",
    icon: ShoppingCart,
    color: "from-orange-500 to-amber-500",
  },
];

const documentos = [
  "CNPJ atualizado",
  "Certidão negativa de débitos federais",
  "Certidão negativa de débitos estaduais",
  "Certidão negativa de débitos municipais",
  "Certidão de regularidade com o FGTS",
  "Ata de registro de preçovigente (quando aplicável)",
];

const beneficios = [
  {
    icon: Shield,
    title: "Preços Fixos",
    text: "Contratos com valores preestabelecidos, sem variações",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Agilidade",
    text: "Licitações mais rápidas com atasvigentes",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "Legalidade",
    text: "Processo 100% dentro da lei de compras públicas",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Building2,
    title: "Transparência",
    text: "Todos os valores e condições disponíveis",
    color: "from-orange-500 to-amber-500",
  },
];

export default function RegistroPreco() {
  const [form, setForm] = useState({
    orgao: "",
    cnpj: "",
    cidade: "",
    responsavel: "",
    telefone: "",
    email: "",
    modalidade: "",
  });
  const [step, setStep] = useState(0);

  const handleSubmit = () => {
    const msg = `*Nova Solicitação - Adesão de Ata*\n\n*Orgão:* ${form.orgao}\n*CNPJ:* ${form.cnpj}\n*Cidade:* ${form.cidade}\n*Responsável:* ${form.responsavel}\n*Telefone:* ${form.telefone}\n*E-mail:* ${form.email}\n*Modalidade:* ${form.modalidade}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=55556299981212?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
              <BadgeCheck className="h-4 w-4" /> Para Órgãos Públicos
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Adesão à Ata de
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500">
                Registro de Preço
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Garanta produtos médicos de qualidade para sua instituição com preços fixos e processo
              100% transparente. Simples, rápido e dentro da lei.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
              >
                Quero Adquirir <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="https://api.whatsapp.com/send/?phone=556294896602"
                target="_blank"
                className="btn-glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
              >
                <Phone className="h-5 w-5" /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "50+", label: "Órgãos Atendidos" },
              { value: "R$ 5M+", label: "Em Contratos" },
              { value: "100%", label: "Dentro da Lei" },
            ].map((n) => (
              <div key={n.label} className="text-center p-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">{n.value}</p>
                <p className="text-sm text-muted-foreground">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <ScrollText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">O que é Ata de Registro de Preço?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A Ata de Registro de Preço (ARP) é um documento que registra os preços e condições de
              fornecimento de produtos/serviços para futuras contratações pela administração
              pública. Órgãos públicos podem aderir a atas já registradas por outros órgãos ou
              fornecedores, garantindo{" "}
              <strong>preços fixos, agilidade no processo e economia</strong> para os cofres
              públicos.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-8">Benefícios para o Órgão Público</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b, i) => (
              <div
                key={b.title}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/60 to-white/30 p-6 hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                ></div>
                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.color}`}
                  >
                    <b.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo - Mobile First */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Como Funciona</h2>
          <div className="space-y-4">
            {etapas.map((e, i) => {
              const Icon = e.icon;
              return (
                <div key={e.num} className="relative glass-card p-5 flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${e.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground">ETAPA {e.num}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{e.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{e.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentação */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Documentação Necessária</h2>
            <div className="space-y-3">
              {documentos.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              *Documentação complementar pode ser solicitada conforme modalidade.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="formulario" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-white/60 to-blue-500/20 p-8 md:p-10">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Solicitação de Adesão</h2>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
                  <Handshake className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome do Órgão *</label>
                  <input
                    required
                    type="text"
                    value={form.orgao}
                    onChange={(e) => setForm({ ...form, orgao: e.target.value })}
                    className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                    placeholder="Prefeitura de ..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">CNPJ *</label>
                    <input
                      required
                      type="text"
                      value={form.cnpj}
                      onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                      className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cidade/Estado *</label>
                    <input
                      required
                      type="text"
                      value={form.cidade}
                      onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                      className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                      placeholder="Cidade - UF"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Pessoa Responsável *</label>
                  <input
                    required
                    type="text"
                    value={form.responsavel}
                    onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                    className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Telefone *</label>
                    <input
                      required
                      type="tel"
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                      className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                      placeholder="(62) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                      placeholder="seu@email.gov.br"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Modalidade de Interesse</label>
                  <select
                    value={form.modalidade}
                    onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                    className="glass-input mt-1 w-full rounded-xl px-4 py-3"
                  >
                    <option value="">Selecione...</option>
                    <option value="Pregão Eletrônico">Pregão Eletrônico</option>
                    <option value="SRP - Sistema de Registro de Preços">
                      SRP - Sistema de Registro de Preços
                    </option>
                    <option value="Concorrência">Concorrência</option>
                    <option value="Inexigibilidade">Inexigibilidade</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold"
                >
                  <FileText className="h-5 w-5" /> Enviar Solicitação
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  ou solicite via WhatsApp:{" "}
                  <a
                    href="https://api.whatsapp.com/send/?phone=5562994896602"
                    target="_blank"
                    className="text-primary font-medium"
                  >
                    (62) 99489-6602
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground mb-6">
            Nossa equipe está pronta para esclarecer todas as suas dúvidas sobre o processo de
            adesão.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=5562994896602"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-base font-bold text-white hover:scale-105 transition-transform"
          >
            <Phone className="h-5 w-5" /> Falar no WhatsApp: (62) 99489-6602
          </a>
        </div>
      </section>
    </>
  );
}
