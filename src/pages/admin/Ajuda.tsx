import { Link } from "wouter";
import { AdminLayout } from "../../components/AdminLayout";
import { useAuth } from "../../hooks/useAdminStorage";

export default function AdminAjuda() {
  const { logout } = useAuth();

  const text = `📋 PAINEL ADMINISTRATIVO MEDPLUS

🔗 ACESSE: seu-site.com/admin
🔑 SENHA: medplus2026

COMO USAR:

1️⃣ PRODUTOS
- Lista → Novo → Preencha campos → Salvar
- Buscar por nome ou SKU
- Use "Exportar" para fazer backup

2️⃣ CATEGORIAS
- Adicionar/editar/remover

3️⃣ CONFIGURAÇÕES
- Dados da empresa, redes sociais

⚠️ IMPORTANTE:
- Dados ficam salvos no navegador
- Limpar cache = perder dados
- Faça backup regularmente

4️⃣ VER LOJA (abre em nova aba)`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Ajuda</h1>
            <p className="text-gray-400">Instruções do painel administrativo</p>
          </div>
        </div>

        <div className="glass-card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Texto para WhatsApp</h2>
          <p className="text-sm text-gray-400 mb-4">Copie e cole este texto para enviar ao cliente:</p>
          
          <pre className="bg-gray-900 p-4 rounded-xl text-sm text-gray-300 whitespace-pre-wrap font-mono">
{text}</pre>
          
          <button onClick={copyToClipboard} className="btn-primary mt-4 px-4 py-2 rounded-lg font-medium text-sm">
            Copiar Texto
          </button>
        </div>

        <div className="glass-card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Informações Importantes</h2>
          <ul className="space-y-3 text-gray-300">
            <li>• <strong>.URL:</strong> seu-site.com/admin</li>
            <li>• <strong>Senha:</strong> medplus2026</li>
            <li>• <strong>Dados:</strong> Armazenados no navegador (localStorage)</li>
            <li>• <strong>Backup:</strong> Use botão "Exportar" na página de produtos</li>
            <li>• <strong>Imagens:</strong> Máximo 5MB cada (JPG/PNG)</li>
          </ul>
        </div>

        <div className="glass-card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Campos do Produto</h2>
          <div className="grid gap-2 sm:grid-cols-2 text-sm text-gray-300">
            <div>• Nome *</div>
            <div>• Descrição *</div>
            <div>• Preço *</div>
            <div>• Imagem Principal *</div>
            <div>• 4 Imagens Secundárias</div>
            <div>• Categoria *</div>
            <div>• Estoque *</div>
            <div>• SKU *</div>
            <div>• Peso (kg) *</div>
            <div>• Dimensões (cm)</div>
            <div>• Destaque</div>
            <div>• Ativo/Inativo</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}