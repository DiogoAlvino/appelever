export const isRequired = (value: string | number | undefined | null) => {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') return value.trim() !== '';
  return false;
};


export const isEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const isCNPJ = (cnpj: string) => {
  const cleaned = cnpj.replace(/[^\d]+/g, '');
  if (cleaned.length !== 14) return false;

  if (/^(\d)\1+$/.test(cleaned)) return false;

  let tamanho = cleaned.length - 2;
  let numeros = cleaned.substring(0, tamanho);
  const digitos = cleaned.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho++;
  numeros = cleaned.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === Number(digitos.charAt(1));
};

export const isNumber = (value: string | number) => {
  const num = Number(value);
  return !isNaN(num);
};

export const isPositiveNumber = (value: string | number) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

export const isDateISO = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

export const validations = {
  isRequired,
  isEmail,
  isCNPJ,
  isNumber,
  isPositiveNumber,
  isDateISO,
};
