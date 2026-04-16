import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — MedPlus Hospitalar" },
      {
        name: "description",
        content:
          "Fale com a MedPlus Hospitalar. Telefone (62) 3519-9974, WhatsApp (62) 99489-6602, e-mail e endereço em Aparecida de Goiânia - GO.",
      },
      { property: "og:title", content: "Fale com a MedPlus Hospitalar" },
      {
        property: "og:description",
        content:
          "Estamos prontos para atender você. Solicite orçamento ou tire dúvidas sobre vendas, locação e assistência técnica.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "");
    const email = String(data.get("email") || "");
    const telefone = String(data.get("telefone") || "");
    const assunto = String(data.get("assunto") || "");
    const mensagem = String(data.get("mensagem") || "");

    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\n${mensagem}`,
    );
    const subject = encodeURIComponent(assunto || "Contato pelo site MedPlus");
    window.location.href = `mailto:juliano@medplushospitalar.com.br?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-16">
        <SectionTitle
          eyebrow="Contato"
          title="Fale Conosco: Estamos Prontos para Atender Você."
          description="Entre em contato com a MedPlus Hospitalar e descubra como podemos impulsionar a excelência do seu trabalho. Nossa equipe está à disposição para oferecer as melhores soluções em equipamentos médicos."
        />
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
          {/* Info */}
          <aside className="lg:col-span-2">
            <div className="glass-strong p-8">
              <h2 className="text-xl font-semibold text-foreground">Informações de contato</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Endereço</p>
                    <p className="text-muted-foreground">
                      Av. Zoroastro Artiaga, QD 09 LT44 — Cruzeiro do Sul,<br />
                      Aparecida de Goiânia - GO, 74917-196
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Telefone</p>
                    <a href="tel:+556235199974" className="text-muted-foreground hover:text-primary">
                      (62) 3519-9974
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/5562994896602"
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      (62) 99489-6602
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">E-mail</p>
                    <a
                      href="mailto:juliano@medplushospitalar.com.br"
                      className="break-all text-muted-foreground hover:text-primary"
                    >
                      juliano@medplushospitalar.com.br
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Horário de funcionamento</p>
                    <p className="text-muted-foreground">Segunda a Sexta, das 08:00 às 18:00</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Instagram className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">Instagram</p>
                    <a
                      href="https://instagram.com/medplushospitalar"
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      @medplushospitalar
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-strong p-8 md:p-10">
              <h2 className="text-xl font-semibold text-foreground">Envie sua mensagem</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Responderemos o mais breve possível.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="text-sm font-medium text-foreground">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="glass-input mt-1.5 w-full rounded-xl px-4 py-3 text-sm"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="glass-input mt-1.5 w-full rounded-xl px-4 py-3 text-sm"
                    placeholder="voce@empresa.com.br"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="text-sm font-medium text-foreground">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    className="glass-input mt-1.5 w-full rounded-xl px-4 py-3 text-sm"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="assunto" className="text-sm font-medium text-foreground">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="glass-input mt-1.5 w-full rounded-xl px-4 py-3 text-sm"
                    defaultValue=""
                  >
                    <option value="" disabled>Selecione o assunto</option>
                    <option>Vendas de equipamentos</option>
                    <option>Locação de equipamentos</option>
                    <option>Assistência técnica</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="text-sm font-medium text-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    className="glass-input mt-1.5 w-full rounded-xl px-4 py-3 text-sm"
                    placeholder="Conte-nos como podemos ajudar..."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Ao enviar, você concorda em ser contatado pela equipe MedPlus.
                </p>
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                >
                  <Send className="h-4 w-4" /> Enviar mensagem
                </button>
              </div>

              {sent && (
                <p className="mt-4 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary">
                  Abrimos seu cliente de e-mail para concluir o envio. Caso prefira, fale conosco no
                  WhatsApp.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl glass-strong overflow-hidden p-2">
          <iframe
            title="Localização MedPlus Hospitalar"
            src="https://www.google.com/maps?q=Av.+Zoroastro+Artiaga,+QD+09+LT44+-+Cruzeiro+do+Sul,+Aparecida+de+Goi%C3%A2nia+-+GO,+74917-196&output=embed"
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>
      </section>
    </>
  );
}
