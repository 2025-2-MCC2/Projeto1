import {
  Users,
  Calendar,
  UserCheck,
  DollarSign,
} from "lucide-react";

export type MockUser = {
  RaUsuario: number;
  NomeUsuario: string;
  TurmaUsuario: string;
  EmailUsuario: string;
  TelefoneUsuario: string;
  SenhaUsuario: string;
};

export type MockMentor = {
  IdMentor: number;
  EmailMentor: string;
  SenhaMentor: string;
  isAdmin?: boolean;
};

export type MockTeam = {
  IdTime: number;
  NomeTime: string;
  RaUsuario: number;
  RaAluno2: number;
  RaAluno3: number;
  RaAluno4: number;
  RaAluno5: number;
  RaAluno6: number;
  RaAluno7: number;
  RaAluno8: number;
  RaAluno9?: number | null;
  RaAluno10?: number | null;
  IdMentor?: number | null;
  RaAlunos?: number[];
};

export type MockComprovante = {
  IdComprovante: number;
  Imagem: string;
};

export type MockAlimento = {
  NomeAlimento: string;
  Pontuacao?: number;
  Quantidade?: number;
};

export type MockContribution = {
  IdContribuicao?: number;
  IdContribuicaoFinanceira?: number;
  IdContribuicaoAlimenticia?: number;
  IdTime?: number;
  IdMentor?: number;
  RaUsuario: number;
  NomeTime?: string;
  TipoDoacao: "Financeira" | "Alimenticia";
  Quantidade: number;
  Meta?: number;
  Gastos?: number;
  Fonte: string;
  DataContribuicao: string;
  NomeAlimento?: string;
  PontuacaoAlimento?: number;
  PesoUnidade?: number;
  comprovante?: MockComprovante;
  alimentos?: MockAlimento[];
  contribuicoes_alimento?: { alimento: { NomeAlimento: string }; Quantidade: number }[];
  Itens?: { NomeAlimento: string; Quantidade: number }[];
  RaAluno2?: number;
  RaAluno3?: number;
  RaAluno4?: number;
  RaAluno5?: number;
  RaAluno6?: number;
  RaAluno7?: number;
  RaAluno8?: number;
  RaAluno9?: number | null;
  RaAluno10?: number | null;
};

const mockUsers: MockUser[] = [
  {
    RaUsuario: 20231234,
    NomeUsuario: "Ana Clara Souza",
    TurmaUsuario: "1MA",
    EmailUsuario: "ana.souza@colegio.br",
    TelefoneUsuario: "(11) 91234-5678",
    SenhaUsuario: "ana123",
  },
  {
    RaUsuario: 20231102,
    NomeUsuario: "Bruno Henrique Lima",
    TurmaUsuario: "1MB",
    EmailUsuario: "bruno.lima@colegio.br",
    TelefoneUsuario: "(11) 99876-4321",
    SenhaUsuario: "bruno123",
  },
  {
    RaUsuario: 20231077,
    NomeUsuario: "Camila Rodrigues",
    TurmaUsuario: "1MC",
    EmailUsuario: "camila.rodrigues@colegio.br",
    TelefoneUsuario: "(11) 98765-1023",
    SenhaUsuario: "camila123",
  },
  {
    RaUsuario: 20231288,
    NomeUsuario: "Diego Fernandes",
    TurmaUsuario: "1NA",
    EmailUsuario: "diego.fernandes@colegio.br",
    TelefoneUsuario: "(11) 93456-7788",
    SenhaUsuario: "diego123",
  },
];

const mockMentors: MockMentor[] = [
  {
    IdMentor: 1,
    EmailMentor: "luciana.monteiro@liderancas.org",
    SenhaMentor: "mentor123",
  },
  {
    IdMentor: 2,
    EmailMentor: "rafael.santos@liderancas.org",
    SenhaMentor: "mentor123",
  },
  {
    IdMentor: 3,
    EmailMentor: "admin@arkana.org",
    SenhaMentor: "admin123",
    isAdmin: true,
  },
];

const mockTeams: MockTeam[] = [
  {
    IdTime: 11,
    NomeTime: "Time Ipê Amarelo",
    RaUsuario: 20231234,
    RaAluno2: 20231290,
    RaAluno3: 20231315,
    RaAluno4: 20231155,
    RaAluno5: 20231401,
    RaAluno6: 20231402,
    RaAluno7: 20231403,
    RaAluno8: 20231404,
    RaAluno9: 20231405,
    RaAluno10: null,
    IdMentor: 1,
  },
  {
    IdTime: 12,
    NomeTime: "Time Jatobá",
    RaUsuario: 20231102,
    RaAluno2: 20231177,
    RaAluno3: 20231188,
    RaAluno4: 20231209,
    RaAluno5: 20231210,
    RaAluno6: 20231211,
    RaAluno7: 20231212,
    RaAluno8: 20231213,
    RaAluno9: null,
    RaAluno10: null,
    IdMentor: 2,
  },
  {
    IdTime: 13,
    NomeTime: "Time Girassol",
    RaUsuario: 20231077,
    RaAluno2: 20231091,
    RaAluno3: 20231100,
    RaAluno4: 20231101,
    RaAluno5: 20231120,
    RaAluno6: 20231121,
    RaAluno7: 20231122,
    RaAluno8: 20231123,
    RaAluno9: 20231124,
    RaAluno10: 20231125,
    IdMentor: 1,
  },
  {
    IdTime: 14,
    NomeTime: "Time Jequitibá",
    RaUsuario: 20231288,
    RaAluno2: 20231289,
    RaAluno3: 20231291,
    RaAluno4: 20231292,
    RaAluno5: 20231293,
    RaAluno6: 20231294,
    RaAluno7: 20231295,
    RaAluno8: 20231296,
    RaAluno9: 20231297,
    RaAluno10: 20231298,
    IdMentor: 2,
  },
];

const receiptUrls = [
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523287562758-66c7fc7a3534?q=80&w=1200&auto=format&fit=crop",
];

const mockContributionsBase: MockContribution[] = [
  {
    IdContribuicaoFinanceira: 5001,
    RaUsuario: 20231234,
    TipoDoacao: "Financeira",
    Quantidade: 1250,
    Meta: 2000,
    Gastos: 180,
    Fonte: "Feira Solidária da Turma 1MA",
    DataContribuicao: "2025-09-12",
    comprovante: { IdComprovante: 9001, Imagem: receiptUrls[0] },
  },
  {
    IdContribuicaoAlimenticia: 6001,
    RaUsuario: 20231234,
    TipoDoacao: "Alimenticia",
    Quantidade: 45,
    PesoUnidade: 5,
    Meta: 60,
    Gastos: 0,
    Fonte: "Campanha Arrecadação de Alimentos",
    DataContribuicao: "2025-09-18",
    NomeAlimento: "Arroz Polido",
    PontuacaoAlimento: 4,
    alimentos: [{ NomeAlimento: "Arroz Polido", Pontuacao: 4, Quantidade: 45 }],
  },
  {
    IdContribuicaoFinanceira: 5002,
    RaUsuario: 20231102,
    TipoDoacao: "Financeira",
    Quantidade: 780,
    Meta: 1000,
    Gastos: 120,
    Fonte: "Rifa Beneficente Time Jatobá",
    DataContribuicao: "2025-09-05",
    comprovante: { IdComprovante: 9002, Imagem: receiptUrls[1] },
  },
  {
    IdContribuicaoAlimenticia: 6002,
    RaUsuario: 20231102,
    TipoDoacao: "Alimenticia",
    Quantidade: 30,
    PesoUnidade: 2,
    Meta: 40,
    Gastos: 0,
    Fonte: "Doações de Mercado Local",
    DataContribuicao: "2025-09-09",
    NomeAlimento: "Feijão Preto",
    PontuacaoAlimento: 5.5,
    alimentos: [{ NomeAlimento: "Feijão Preto", Pontuacao: 5.5, Quantidade: 30 }],
  },
  {
    IdContribuicaoAlimenticia: 6003,
    RaUsuario: 20231077,
    TipoDoacao: "Alimenticia",
    Quantidade: 20,
    PesoUnidade: 1,
    Meta: 50,
    Gastos: 0,
    Fonte: "Mutirão da Comunidade",
    DataContribuicao: "2025-08-28",
    NomeAlimento: "Macarrão",
    PontuacaoAlimento: 2.5,
    alimentos: [{ NomeAlimento: "Macarrão", Pontuacao: 2.5, Quantidade: 20 }],
  },
  {
    IdContribuicaoFinanceira: 5003,
    RaUsuario: 20231077,
    TipoDoacao: "Financeira",
    Quantidade: 1450,
    Meta: 1500,
    Gastos: 210,
    Fonte: "Festival Cultural do Time Girassol",
    DataContribuicao: "2025-09-20",
    comprovante: { IdComprovante: 9003, Imagem: receiptUrls[2] },
  },
  {
    IdContribuicaoFinanceira: 5004,
    RaUsuario: 20231288,
    TipoDoacao: "Financeira",
    Quantidade: 560,
    Meta: 900,
    Gastos: 90,
    Fonte: "Bazar Solidário Jequitibá",
    DataContribuicao: "2025-09-02",
  },
  {
    IdContribuicaoAlimenticia: 6004,
    RaUsuario: 20231288,
    TipoDoacao: "Alimenticia",
    Quantidade: 18,
    PesoUnidade: 1,
    Meta: 30,
    Gastos: 0,
    Fonte: "Paróquia São Miguel",
    DataContribuicao: "2025-09-06",
    NomeAlimento: "Leite em Pó",
    PontuacaoAlimento: 15,
    alimentos: [{ NomeAlimento: "Leite em Pó", Pontuacao: 15, Quantidade: 18 }],
  },
  {
    IdContribuicaoAlimenticia: 6005,
    RaUsuario: 20231234,
    TipoDoacao: "Alimenticia",
    Quantidade: 12,
    PesoUnidade: 1,
    Meta: 20,
    Gastos: 0,
    Fonte: "Doação de Pais e Responsáveis",
    DataContribuicao: "2025-10-01",
    NomeAlimento: "Açúcar Refinado",
    PontuacaoAlimento: 4,
    alimentos: [{ NomeAlimento: "Açúcar Refinado", Pontuacao: 4, Quantidade: 12 }],
  },
  {
    IdContribuicaoFinanceira: 5005,
    RaUsuario: 20231102,
    TipoDoacao: "Financeira",
    Quantidade: 320,
    Meta: 500,
    Gastos: 50,
    Fonte: "Camisetas Personalizadas",
    DataContribuicao: "2025-10-04",
    comprovante: { IdComprovante: 9004, Imagem: receiptUrls[3] },
  },
];

let contributionsStore: MockContribution[] = mockContributionsBase.map((c, i) => ({
  ...c,
  IdContribuicao: c.IdContribuicao ?? 7000 + i,
}));

let nextContributionId = 8000;
let nextReceiptId = 9500;

const withTeamInfo = (c: MockContribution): MockContribution => {
  const team = mockTeams.find((t) => t.RaUsuario === c.RaUsuario);
  if (!team) return c;
  return {
    ...c,
    NomeTime: team.NomeTime,
    IdTime: team.IdTime,
    IdMentor: team.IdMentor ?? undefined,
    RaAluno2: team.RaAluno2,
    RaAluno3: team.RaAluno3,
    RaAluno4: team.RaAluno4,
    RaAluno5: team.RaAluno5,
    RaAluno6: team.RaAluno6,
    RaAluno7: team.RaAluno7,
    RaAluno8: team.RaAluno8,
    RaAluno9: team.RaAluno9 ?? null,
    RaAluno10: team.RaAluno10 ?? null,
  };
};

export async function getMockContributions(): Promise<MockContribution[]> {
  return contributionsStore.map(withTeamInfo);
}

export async function getMockContributionsByRa(
  RaUsuario: number
): Promise<MockContribution[]> {
  return contributionsStore
    .filter((c) => c.RaUsuario === RaUsuario)
    .map(withTeamInfo);
}

export async function getMockUser(
  RaUsuario: number
): Promise<MockUser | undefined> {
  return mockUsers.find((u) => u.RaUsuario === RaUsuario);
}

export async function getMockUserTeam(
  RaUsuario: number
): Promise<MockTeam | undefined> {
  const team = mockTeams.find((t) => t.RaUsuario === RaUsuario);
  if (!team) return undefined;
  const raList = [
    team.RaUsuario,
    team.RaAluno2,
    team.RaAluno3,
    team.RaAluno4,
    team.RaAluno5,
    team.RaAluno6,
    team.RaAluno7,
    team.RaAluno8,
    team.RaAluno9,
    team.RaAluno10,
  ].filter((ra): ra is number => typeof ra === "number" && Number.isFinite(ra));

  return { ...team, RaAlunos: raList };
}

export async function getMockMentor(
  IdMentor: number
): Promise<MockMentor | undefined> {
  return mockMentors.find((m) => m.IdMentor === IdMentor);
}

export async function getMockMentorTeam(
  IdMentor: number
): Promise<{ IdTime: number; NomeTime: string; RaUsuario: number | null }[]> {
  return mockTeams
    .filter((t) => t.IdMentor === IdMentor)
    .map((t) => ({
      IdTime: t.IdTime,
      NomeTime: t.NomeTime,
      RaUsuario: t.RaUsuario ?? null,
    }));
}

export async function loginUserMock(
  RaUsuario: number,
  SenhaUsuario: string
): Promise<MockUser | undefined> {
  return mockUsers.find(
    (u) => u.RaUsuario === RaUsuario && u.SenhaUsuario === SenhaUsuario
  );
}

export async function loginMentorMock(
  EmailMentor: string,
  SenhaMentor: string
): Promise<MockMentor | undefined> {
  return mockMentors.find(
    (m) => m.EmailMentor === EmailMentor && m.SenhaMentor === SenhaMentor
  );
}

export async function loginAdminMock(
  EmailMentor: string,
  SenhaMentor: string
): Promise<MockMentor | undefined> {
  return mockMentors.find(
    (m) =>
      m.EmailMentor === EmailMentor &&
      m.SenhaMentor === SenhaMentor &&
      m.isAdmin
  );
}

export async function registerUserMock(user: {
  RaUsuario: number;
  NomeUsuario: string;
  EmailUsuario: string;
  SenhaUsuario: string;
  TelefoneUsuario: string;
  TurmaUsuario: string;
}): Promise<MockUser> {
  const existing = mockUsers.find((u) => u.RaUsuario === user.RaUsuario);
  if (existing) return existing;
  const newUser: MockUser = { ...user };
  mockUsers.push(newUser);
  return newUser;
}

export async function createTeamMock(team: {
  NomeTime: string;
  RaUsuario: number;
  RaAluno2?: number;
  RaAluno3?: number;
  RaAluno4?: number;
  RaAluno5?: number;
  RaAluno6?: number;
  RaAluno7?: number;
  RaAluno8?: number;
  RaAluno9?: number | null;
  RaAluno10?: number | null;
}): Promise<MockTeam> {
  const newTeam: MockTeam = {
    IdTime: 20 + mockTeams.length,
    NomeTime: team.NomeTime,
    RaUsuario: team.RaUsuario,
    RaAluno2: team.RaAluno2 ?? 0,
    RaAluno3: team.RaAluno3 ?? 0,
    RaAluno4: team.RaAluno4 ?? 0,
    RaAluno5: team.RaAluno5 ?? 0,
    RaAluno6: team.RaAluno6 ?? 0,
    RaAluno7: team.RaAluno7 ?? 0,
    RaAluno8: team.RaAluno8 ?? 0,
    RaAluno9: team.RaAluno9 ?? null,
    RaAluno10: team.RaAluno10 ?? null,
    IdMentor: null,
  };
  mockTeams.push(newTeam);
  return newTeam;
}

export async function createMentorMock(payload: {
  EmailMentor: string;
  RaUsuario: number;
}): Promise<MockMentor> {
  let mentor = mockMentors.find((m) => m.EmailMentor === payload.EmailMentor);
  if (!mentor) {
    mentor = {
      IdMentor: mockMentors.length + 1,
      EmailMentor: payload.EmailMentor,
      SenhaMentor: "mentor123",
    };
    mockMentors.push(mentor);
  }
  const team = mockTeams.find((t) => t.RaUsuario === payload.RaUsuario);
  if (team) team.IdMentor = mentor.IdMentor;
  return mentor;
}

export async function createAdminMock(payload: {
  EmailMentor: string;
  SenhaMentor: string;
}): Promise<MockMentor> {
  const existing = mockMentors.find((m) => m.EmailMentor === payload.EmailMentor);
  if (existing) return existing;
  const admin: MockMentor = {
    IdMentor: mockMentors.length + 1,
    EmailMentor: payload.EmailMentor,
    SenhaMentor: payload.SenhaMentor,
    isAdmin: true,
  };
  mockMentors.push(admin);
  return admin;
}

export async function createContributionMock(payload: {
  RaUsuario: number;
  TipoDoacao: "Financeira" | "Alimenticia";
  Quantidade: number;
  Meta?: number;
  Gastos?: number;
  Fonte: string;
  PesoUnidade?: number;
  IdAlimento?: number;
}): Promise<{ data: { IdContribuicaoFinanceira?: number; IdContribuicaoAlimenticia?: number } } > {
  const now = new Date();
  const IdContribuicao = nextContributionId++;
  const base: MockContribution = {
    IdContribuicao,
    RaUsuario: payload.RaUsuario,
    TipoDoacao: payload.TipoDoacao,
    Quantidade: payload.Quantidade,
    Meta: payload.Meta ?? 0,
    Gastos: payload.Gastos ?? 0,
    Fonte: payload.Fonte,
    DataContribuicao: now.toISOString().slice(0, 10),
  };

  let result: { IdContribuicaoFinanceira?: number; IdContribuicaoAlimenticia?: number } = {};

  if (payload.TipoDoacao === "Financeira") {
    const idFinanceira = IdContribuicao + 1000;
    base.IdContribuicaoFinanceira = idFinanceira;
    result = { IdContribuicaoFinanceira: idFinanceira };
  } else {
    const idAlimenticia = IdContribuicao + 2000;
    base.IdContribuicaoAlimenticia = idAlimenticia;
    base.PesoUnidade = payload.PesoUnidade ?? 1;
    if (payload.IdAlimento) {
      base.alimentos = [
        {
          NomeAlimento: alimentoLabel(payload.IdAlimento),
          Pontuacao: alimentoPontuacao(payload.IdAlimento),
          Quantidade: payload.Quantidade,
        },
      ];
      base.NomeAlimento = alimentoLabel(payload.IdAlimento);
      base.PontuacaoAlimento = alimentoPontuacao(payload.IdAlimento);
    }
    result = { IdContribuicaoAlimenticia: idAlimenticia };
  }

  contributionsStore = [base, ...contributionsStore];
  return { data: result };
}

export async function uploadComprovanteMock(payload: {
  TipoDoacao: "Financeira" | "Alimenticia";
  IdContribuicao: number;
  url?: string;
}): Promise<MockComprovante | undefined> {
  const entry = contributionsStore.find((c) => {
    if (payload.TipoDoacao === "Financeira") {
      return c.IdContribuicaoFinanceira === payload.IdContribuicao;
    }
    return c.IdContribuicaoAlimenticia === payload.IdContribuicao;
  });
  if (!entry) return undefined;
  const comprovante: MockComprovante = {
    IdComprovante: nextReceiptId++,
    Imagem:
      payload.url ||
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
  };
  entry.comprovante = comprovante;
  return comprovante;
}

export async function deleteContributionMock(payload: {
  TipoDoacao: string;
  IdContribuicao: number;
}): Promise<{ ok: boolean }> {
  contributionsStore = contributionsStore.filter((c) => {
    if (payload.TipoDoacao === "Financeira") {
      return c.IdContribuicaoFinanceira !== payload.IdContribuicao;
    }
    return c.IdContribuicaoAlimenticia !== payload.IdContribuicao;
  });
  return { ok: true };
}

function alimentoLabel(id: number): string {
  switch (id) {
    case 1:
      return "Arroz Polido";
    case 2:
      return "Feijão Preto";
    case 3:
      return "Leite em Pó";
    case 4:
      return "Óleo de Soja";
    case 5:
      return "Açúcar Refinado";
    case 6:
      return "Fubá";
    case 7:
      return "Macarrão";
    default:
      return "Outros";
  }
}

function alimentoPontuacao(id: number): number {
  switch (id) {
    case 1:
      return 4;
    case 2:
      return 5.5;
    case 3:
      return 15;
    case 4:
      return 7;
    case 5:
      return 4;
    case 6:
      return 2.5;
    case 7:
      return 2.5;
    default:
      return 0;
  }
}

export const overallMetrics = [
  { icon: Users, label: "Pessoas Atendidas", value: "+7800", color: "text-blue-600" }, // (arrecadações / 15) / 3
  { icon: UserCheck, label: "Participantes", value: "+1600", color: "text-purple-600" },
  { icon: Calendar, label: "Alimentos", value: "28190kg", color: "text-green-600" },
  { icon: DollarSign, label: "Cestas Básicas", value: "5851", color: "text-orange-600" },
];