import logoImg from "../assets/medplus-logo.png?url";
import bannerImg from "../assets/Vendas de Equipamentos-Dj03NzmQ.jpg?url";

export const placeholderImages = {
  logo: logoImg,
  hero: bannerImg,
  banner: bannerImg,
  logoCliente: "/logos-clientes-medplus.png",
  servico: "/logos-clientes-medplus2.png",
};

export const getPlaceholder = (key: keyof typeof placeholderImages) => placeholderImages[key];
