import { useState } from "react";
import { Settings, Save, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, AlertCircle, CheckCircle } from "lucide-react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminStorage } from "../../hooks/useAdminStorage";

export default function AdminConfig() {
  const { config, saveConfig, loading } = useAdminStorage();
  const [form, setForm] = useState(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    saveConfig(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Configurações</h1>
            <p className="text-gray-400">Gerencie as configurações do site</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
            <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>

        {saved && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>Configurações salvas com sucesso!</span>
          </div>
        )}

        {/* Empresa */}
        <div className="glass-card-dark p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Dados da Empresa</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Nome da Empresa</label>
              <input
                type="text"
                value={form.empresa.nome}
                onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, nome: e.target.value } })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    value={form.empresa.telefone}
                    onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, telefone: e.target.value } })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">WhatsApp</label>
                <input
                  type="text"
                  value={form.empresa.whatsapp}
                  onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, whatsapp: e.target.value } })}
                  placeholder="556299981212"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={form.empresa.email}
                  onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, email: e.target.value } })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">CNPJ</label>
              <input
                type="text"
                value={form.empresa.cnpj}
                onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, cnpj: e.target.value } })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Endereço</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <textarea
                  value={form.empresa.endereco}
                  onChange={(e) => setForm({ ...form, empresa: { ...form.empresa, endereco: e.target.value } })}
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="glass-card-dark p-6">
          <div className="flex items-center gap-2 mb-4">
            <Instagram className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Redes Sociais</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Instagram</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={form.redesSociais.instagram || ""}
                  onChange={(e) => setForm({ ...form, redesSociais: { ...form.redesSociais, instagram: e.target.value } })}
                  placeholder="@usuario"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Facebook</label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={form.redesSociais.facebook || ""}
                  onChange={(e) => setForm({ ...form, redesSociais: { ...form.redesSociais, facebook: e.target.value } })}
                  placeholder="facebook.com/usuario"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">LinkedIn</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={form.redesSociais.linkedin || ""}
                  onChange={(e) => setForm({ ...form, redesSociais: { ...form.redesSociais, linkedin: e.target.value } })}
                  placeholder="linkedin.com/in/usuario"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="glass-card-dark p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">E-mail para notificações</label>
              <input
                type="email"
                value={form.envios.emailNotificacoes}
                onChange={(e) => setForm({ ...form, envios: { ...form.envios, emailNotificacoes: e.target.value } })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div>
                <p className="font-medium text-white">Notificar novos pedidos</p>
                <p className="text-xs text-gray-400">Enviar e-mail quando receber novo pedido</p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, envios: { ...form.envios, notifyNewOrder: !form.envios.notifyNewOrder } })}
                className={`w-12 h-6 rounded-full transition-colors ${form.envios.notifyNewOrder ? "bg-green-500" : "bg-gray-700"}`}
              >
                <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${form.envios.notifyNewOrder ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}