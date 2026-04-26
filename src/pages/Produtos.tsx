import { Link } from "wouter";
import { Bed, HeartPulse, Stethoscope, Syringe } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

const categories = [
  { icon: HeartPulse, title: "Equipamentos Médicos", items: ["Monitores", "Desfibriladores", "Bombas de infusão"] },
  { icon: Bed, title: "Móveis Hospitalares", items: ["Camas clínicas", "Macas", "Poltronas"] },
  { icon: Stethoscope, title: "Instrumentos", items: ["Bisturis", "Pinças", "Kits cirúrgicos"] },
  { icon: Syringe, title: "Consumíveis", items: ["Luvas", "Sondas", "Cateteres"] },
];

export default function Produtos() {
  return (
    <>
      <section className="px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-16">
        <SectionTitle eyebrow="Produtos" title="Catálogo Completo." description="Tudo para sua instituição." />
      </section>
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(c => (
            <div key={c.title} className="glass-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{c.title}</h3>
              <ul className="mt-3 space-y-1">
                {c.items.map(item => <li key={item} className="text-sm text-muted-foreground">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl glass-strong p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground">Não encontrou o que precisa?</h2>
          <Link href="/contato" className="btn-primary mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold">Falar especialista</Link>
        </div>
      </section>
    </>
  );
}