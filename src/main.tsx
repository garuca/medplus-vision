import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Router, Route, Switch, useLocation } from "wouter";
import "./styles.css";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Produtos from "./pages/Produtos";
import Contato from "./pages/Contato";
import Loja from "./pages/Loja";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import MinhaConta from "./pages/MinhaConta";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Categoria from "./pages/Categoria";
import RegistroPreco from "./pages/RegistroPreco";
import NotFound from "./pages/NotFound";
import AdminIndex from "./pages/admin/Index";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProdutos from "./pages/admin/Produtos";
import AdminNovoProduto from "./pages/admin/NovoProduto";
import AdminCategorias from "./pages/admin/Categorias";
import AdminPedidos from "./pages/admin/Pedidos";
import AdminConfig from "./pages/admin/Config";
import AdminAjuda from "./pages/admin/Ajuda";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin" component={AdminIndex} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/produtos" component={AdminProdutos} />
      <Route path="/admin/produtos/novo" component={AdminNovoProduto} />
      <Route path="/admin/produtos/:id" component={AdminNovoProduto} />
      <Route path="/admin/categorias" component={AdminCategorias} />
      <Route path="/admin/pedidos" component={AdminPedidos} />
      <Route path="/admin/config" component={AdminConfig} />
      <Route path="/admin/ajuda" component={AdminAjuda} />
    </Switch>
  );
}

function MainRoutes() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/loja" component={Loja} />
      <Route path="/loja/categoria/:slug" component={Categoria} />
      <Route path="/produto/:id" component={Produto} />
      <Route path="/carrinho" component={Carrinho} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/minha-conta" component={MinhaConta} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/registro-de-preco" component={RegistroPreco} />
      <Route path="/servicos" component={Servicos} />
      <Route path="/produtos" component={Produtos} />
      <Route path="/contato" component={Contato} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location, setLocation] = useLocation();
  const isAdmin = location.includes("/admin");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      window.history.replaceState(null, "", redirect);
      setLocation(redirect);
    }
  }, [setLocation]);

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return <MainRoutes />;
}

function App() {
  const [location] = useLocation();
  const isAdmin = location.includes("/admin");

  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          {!isAdmin && <Header />}
          <main className="flex-1">
            <AppContent />
          </main>
          {!isAdmin && <Footer />}
          {!isAdmin && <WhatsAppFab />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router base="/">
      <App />
    </Router>
  </StrictMode>,
);
