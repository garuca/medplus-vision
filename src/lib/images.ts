import logoImg from "../assets/medplus-logo.png?url";
import heroImg from "../assets/hero-medical.jpg?url";
import bannerImg from "../assets/hero-medical.jpg?url";

export const placeholderImages = {
  logo: logoImg,
  hero: heroImg,
  banner: bannerImg,
  logoCliente: "/logos-clientes-medplus.png",
  servico: "/logos-clientes-medplus2.png",
};

export const getPlaceholder = (key: keyof typeof placeholderImages) => placeholderImages[key];
