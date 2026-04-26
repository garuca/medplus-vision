import { Link } from "wouter";
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight } from "lucide-react";

export default function MinhaConta() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Meus Dados</h3>
                <p className="text-sm text-muted-foreground">Editar informações pessoais</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Meus Pedidos</h3>
                <p className="text-sm text-muted-foreground">Acompanhar pedidos anteriores</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="glass-card p-6 cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Endereços</h3>
                <p className="text-sm text-muted-foreground">Gerenciar endereços de entrega</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="glass-card p-6 cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Formas de Pagamento</h3>
                <p className="text-sm text-muted-foreground">Cartões e pix salvos</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="glass-card p-6 cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Configurações</h3>
                <p className="text-sm text-muted-foreground">Alterar senha e preferências</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <Link to="/" className="glass-card p-6 cursor-pointer hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-600">Sair</h3>
                <p className="text-sm text-muted-foreground">Encerrar sessão</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}