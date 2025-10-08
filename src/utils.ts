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