import { Link } from "wouter";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/medplus-logo-transparente2.png";

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl glass-strong p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <img
              src={logo}
              alt="MedPlus Hospitalar"
              className="h-12 w-auto"
              width={140}
              height={48}
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Expansão Digital - E-commerce moderno para atender todo o Brasil.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Navegação</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/loja" className="hover:text-primary">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-primary">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-primary">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="hover:text-primary">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contato</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Av. Zoroastro Artiaga, QD 09 LT44 — Cruzeiro do Sul, Aparecida de Goiânia - GO,
                  74917-196
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+556235199974" className="hover:text-primary">
                  (62) 3519-9974
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:juliano@medplushospitalar.com.br" className="hover:text-primary">
                  juliano@medplushospitalar.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Atendimento</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Segunda a Sexta
              <br />
              08:00 às 18:00
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com/medplushospitalar"
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex h-10 w-10 items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=55556299981212"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center rounded-full px-4 text-xs font-semibold"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © 2026 MedPlus Hospitalar Comércio e Serviços LTDA. Todos os
            direitos reservados.
          </p>
          <p>CNPJ 34.075.280/0001-19</p>
        </div>
      </div>
    </footer>
  );
}
