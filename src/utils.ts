export function parseNumber(texto: string): number {
  return Number(texto.trim().replace(',', '.'));
}

export function isNumberValid(n: number): boolean {
  return Number.isFinite(n);
}

export function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toString();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function maskCPF(cpf: string): string {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

export function isValidCEP(value: string): boolean {
  const cep = sanitizeCEP(value);
  return /^\d{8}$/.test(cep);
}

export function truncateName (name: string | null | undefined, limit: number = 20): string {
  if(!name) return "";
  if(name.length <= limit) return name;
  return name.substring(0, limit) + "...";
}

export function sanitizeCEP(value: string): string {
  return value.replace(/\D/g, "").slice(0, 8);
}

export function formatCEP(value: string | null | undefined): string {
  if(!value) return '';
  const digits = sanitizeCEP(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
