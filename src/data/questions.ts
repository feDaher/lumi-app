export interface Option {
  label: string;
  value: number;
  desc?: string;
}

export interface Question {
  field: "risk" | "phoneAccess" | "violenceHistory" | "contactedAuthorities" | "fearLevel";
  question: string;
  options: Option[];
}

export const yesNoOptions: Option[] = [
  { label: "Sim", value: 2 },
  { label: "Não", value: 0 },
];

export const riskLevels: Option[] = [
  { label: "Nenhum risco", value: 0, desc: "Situação totalmente segura, sem sinais de ameaça." },
  { label: "Muito baixo", value: 1, desc: "Pequena preocupação, mas sem sinais concretos." },
  { label: "Baixo", value: 2, desc: "Algum desconforto, porém sob controle." },
  { label: "Moderado", value: 3, desc: "Sinais de alerta começam a aparecer." },
  { label: "Alto", value: 4, desc: "Situação preocupante, risco significativo." },
  { label: "Altíssimo", value: 5, desc: "Risco iminente ou presença de perigo real." },
];

export const questions: Question[] = [
  { field: "risk", question: "1. Você sente risco imediato?", options: yesNoOptions },
  { field: "phoneAccess", question: "2. Você tem acesso ao telefone?", options: yesNoOptions },
  { field: "violenceHistory", question: "3. Houve histórico de violência?", options: yesNoOptions },
  { field: "contactedAuthorities", question: "4. Você acionou as autoridades?", options: yesNoOptions },
  { field: "fearLevel", question: "5. Qual o seu nível de medo atual?", options: riskLevels },
];
