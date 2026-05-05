import { useState } from "react";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export function useCep() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarCep = async (cep: string): Promise<ViaCepResponse | null> => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        setLoading(false);
        return null;
      }

      setLoading(false);
      return {
        cep: data.cep,
        logradouro: data.logradouro || "",
        complemento: data.complemento || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      };
    } catch (err) {
      setError("Erro ao buscar CEP");
      setLoading(false);
      return null;
    }
  };

  return { buscarCep, loading, error };
}

export function formatarCep(value: string): string {
  const cep = value.replace(/\D/g, "");
  if (cep.length <= 5) return cep;
  if (cep.length <= 8) return `${cep.slice(0, 5)}-${cep.slice(5)}`;
  return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
}

export function formatarTelefone(value: string): string {
  const tel = value.replace(/\D/g, "");
  if (tel.length <= 2) return tel;
  if (tel.length <= 3) return `(${tel.slice(0, 2)}) ${tel.slice(2)}`;
  if (tel.length <= 7) return `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`;
  if (tel.length <= 11) return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`;
  return `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7, 11)}`;
}

export function formatarCpf(value: string): string {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

export function formatarCnpj(value: string): string {
  const cnpj = value.replace(/\D/g, "");
  if (cnpj.length <= 2) return cnpj;
  if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
  if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
  if (cnpj.length <= 12)
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
}

export function validarCpf(cpf: string): boolean {
  const cpfNumeros = cpf.replace(/\D/g, "");

  if (cpfNumeros.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpfNumeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfNumeros[i]) * (10 - i);
  }
  let digito1 = soma % 11;
  digito1 = digito1 < 2 ? 0 : 11 - digito1;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfNumeros[i]) * (11 - i);
  }
  let digito2 = soma % 11;
  digito2 = digito2 < 2 ? 0 : 11 - digito2;

  return cpfNumeros[9] === String(digito1) && cpfNumeros[10] === String(digito2);
}

export function validarCnpj(cnpj: string): boolean {
  const cnpjNumeros = cnpj.replace(/\D/g, "");

  if (cnpjNumeros.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpjNumeros)) return false;

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjNumeros[i]) * pesos1[i];
  }
  let digito1 = soma % 11;
  digito1 = digito1 < 2 ? 0 : 11 - digito1;

  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjNumeros[i]) * pesos2[i];
  }
  let digito2 = soma % 11;
  digito2 = digito2 < 2 ? 0 : 11 - digito2;

  return cnpjNumeros[12] === String(digito1) && cnpjNumeros[13] === String(digito2);
}
