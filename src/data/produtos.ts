import produto1 from "../assets/produto1.webp";
import produto2 from "../assets/produto2.webp";
import produto3 from "../assets/produto3.webp";
import produto4 from "../assets/produto4.webp";
import produto5 from "../assets/produto5.webp";
import produto6 from "../assets/produto6.webp";
import produto7 from "../assets/produto7.webp";
import produto8 from "../assets/produto8.webp";
import produto9 from "../assets/produto9.webp";
import produto10 from "../assets/produto10.webp";

export const products = [
  {
    id: "1",
    nome: "Máscara Laríngea de PVC - Todos os Tamanhos",
    descricao: "A Máscara Laríngea de PVC possui alta qualidade e é indicada para controlar as vias aéreas durante emergências ou procedimentos cirúrgicos com ventilação espontânea ou controlada.",
    preco: 22.0,
    precoPromocional: 21.56,
    imagem: produto1,
    categoria: "urgencia-emergencia",
    marca: "MedPlus",
    sku: "MLP001",
    estoque: 100,
    especificacoes: {
      "Material": "PVC de alta qualidade",
      "Tamanhos": "1, 1.5, 2, 2.5, 3, 4, 5",
      "Características": "Formato elíptico com punho de vedação flexível",
      "Conector": "Universal transparente de 15mm",
      "Válvula": "Código de cores para rápida identificação",
      "Látex": "Isento de látex",
      "Uso": "Uso único",
      "Validade": "5 anos"
    }
  },
  {
    id: "2",
    nome: "Tubo Sonda Endotraqueal com Balão - Cuff - Todos Tamanhos",
    descricao: "Tubo endotraqueal de alta qualidade e confiabilidade para intubação precisa e segura. Projetado para garantir desempenho excepcional e segurança inigualável.",
    preco: 10.0,
    precoPromocional: 4.0,
    imagem: produto2,
    categoria: "urgencia-emergencia",
    marca: "MedPlus",
    sku: "TSE001",
    estoque: 200,
    especificacoes: {
      "Material": "PVC termoplástico de alta qualidade",
      "Marcador de RX": "Sim",
      "Olho de Murphy": "Sim",
      "Graduação": "Sim",
      "Marcadores de Profundidade": "Sim",
      "Tamanho Marcado": "Sim",
      "Conector": "Ø 15mm",
      "Cuff": "Incluso",
      "Tamanhos": "2.0 a 9.0mm"
    }
  },
  {
    id: "3",
    nome: "Máscara Facial de Anestesia com Coxim Inflável",
    descricao: "Máscara facial com almofada macia para proporcionar conforto e eficiência durante procedimentos respiratórios. Fabricada em PVC de alta qualidade.",
    preco: 9.5,
    precoPromocional: 9.31,
    imagem: produto3,
    categoria: "cardiorespiratorio",
    marca: "MedPlus",
    sku: "MFA001",
    estoque: 150,
    especificacoes: {
      "Material": "PVC de alta qualidade",
      "Almofada": "Macia e hermética",
      "Anéis de retenção": "22mm (removíveis)",
      "Tamanhos": "Neonatos, bebês, crianças e adultos",
      "Características": "Ajuste perfeito e confortável",
      "Uso": "Uso único"
    }
  },
  {
    id: "4",
    nome: "Filtro HMEF Adulto 48H",
    descricao: "Dispositivo médico essencial para condicionamento de gases medicinais à fisiologia pulmonar. Atua como trocador de calor e umidade.",
    preco: 7.0,
    precoPromocional: 6.86,
    imagem: produto4,
    categoria: "cardiorespiratorio",
    marca: "MedPlus",
    sku: "HMEF001",
    estoque: 300,
    especificacoes: {
      "Membrana": "Higroscópica + Hidrofóbica",
      "Conectores": "22M/15F - 22F/15M",
      "Entrada": "Policarbonato para CO2",
      "Esterilização": "Óxido de etileno",
      "Uso": "Descartável",
      "Função": "Barreira microbiológica",
      "Validade": "48 horas de uso"
    }
  },
  {
    id: "5",
    nome: "Cateter Nasal de Oxigênio tipo Óculos",
    descricao: "Cateter tipo óculos adulto para administração de oxigênio de baixo fluxo. Fabricado em PVC macio, atóxico e transparente.",
    preco: 3.0,
    precoPromocional: 2.94,
    imagem: produto5,
    categoria: "cardiorespiratorio",
    marca: "MedPlus",
    sku: "CNO001",
    estoque: 500,
    especificacoes: {
      "Tipo": "Cateter nasal tipo óculos",
      "Público": "Adulto",
      "Comprimento": "1,4 metros",
      "Material": "PVC macio, atóxico e transparente",
      "Conexão": "Padrão para oxigênio medicinal",
      "Aplicação": "Hospitalar, ambulatorial e domiciliar",
      "Uso": "Uso único"
    }
  },
  {
    id: "6",
    nome: "Cânula Orofaríngea Guedel para Via Aérea",
    descricao: "Cânula de Guedel fabricada em polietileno, disponível em diversos tamanhos para manutenção da via aérea.",
    preco: 3.4,
    precoPromocional: 3.33,
    imagem: produto6,
    categoria: "cardiorespiratorio",
    marca: "MedPlus",
    sku: "COG001",
    estoque: 400,
    especificacoes: {
      "Material": "Polietileno",
      "Tamanhos": "Neonato a adulto grande porte",
      "Uso": "Uso único",
      "Esterilização": "Óxido de Etileno",
      "Composição": "Polipropileno",
      "Fabricação": "Bloco único"
    }
  },
  {
    id: "7",
    nome: "Máscara de Oxigênio de Alta Concentração com Reservatório",
    descricao: "Máscara para fornecer altas concentrações de oxigênio. Equipada com bolsa de reservatório de 1 litro para oferta contínua.",
    preco: 12.0,
    precoPromocional: 11.76,
    imagem: produto7,
    categoria: "cardiorespiratorio",
    marca: "MedPlus",
    sku: "MOAC001",
    estoque: 180,
    especificacoes: {
      "Bolsa reservatório": "1 Litro",
      "Modelos": "Adulto e pediátrico",
      "Tubo de O2": "2,10 metros",
      "Presilha": "Ajustável",
      "Material": "Livre de látex",
      "Acabamento": "Transparente e macio",
      "Registro ANVISA": "10150479085"
    }
  },
  {
    id: "8",
    nome: "Reanimador Manual em PVC - Adulto, Pediátrico e Neonatal",
    descricao: "Dispositivo portátil para ventilação com pressão positiva. Autoinflável, parte essencial do kit de reanimação.",
    preco: 73.0,
    precoPromocional: 71.54,
    imagem: produto8,
    categoria: "urgencia-emergencia",
    marca: "MedPlus",
    sku: "RMB001",
    estoque: 80,
    especificacoes: {
      "Matéria Prima": "PVC + Policarbonato",
      "Válvula Paciente": "Policarbonato",
      "Válvula Pop Off": "Policarbonato + Silicone",
      "Bolsa Reservatório": "EVA + Polipropileno",
      "Tubo de O2": "PVC",
      "Estéril": "Não",
      "Validade": "05 Anos",
      "Tamanhos": "Adulto, Pediátrico e Neonatal"
    }
  },
  {
    id: "9",
    nome: "Cabo de Bisturi Cirúrgico em Aço Inox",
    descricao: "Cabo de bisturi em aço inox para uso profissional. Design funcional proporciona praticidade e controle.",
    preco: 9.0,
    precoPromocional: 8.82,
    imagem: produto9,
    categoria: "instrumentais-cirurgicos",
    marca: "MedPlus",
    sku: "CBB001",
    estoque: 120,
    especificacoes: {
      "Tipo": "Cabo para bisturi",
      "Material": "Aço inox",
      "Acabamento": "Polido",
      "Compatibilidade": "Lâminas padrão",
      "Uso": "Profissional",
      "Reutilizável": "Sim",
      "Registro ANVISA": "10150479142"
    }
  },
  {
    id: "10",
    nome: "Manta Térmica Aluminizada para Resgate",
    descricao: "Acessório de proteção e conforto em situações de emergência. Desenvolvida em polietileno aluminizado com excelente isolamento térmico.",
    preco: 10.3,
    precoPromocional: 10.09,
    imagem: produto10,
    categoria: "urgencia-emergencia",
    marca: "MedPlus",
    sku: "MTR001",
    estoque: 250,
    especificacoes: {
      "Material": "Polietileno aluminizado",
      "Função": "Manter aquecimento corporal",
      "Isolamento": "Térmico de baixo peso",
      "Resistência": "À prova d'água e vento",
      "Resistente": "Ao atrito com o solo",
      "Medidas": "2,10 x 1,40m",
      "Uso": "Emergência e resgate"
    }
  },
];