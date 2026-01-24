export const authContent = {
  loginPage: {
    prompt: "É aluno e não tem cadastro?",
    cta: "Cadastre-se",
    description:
      "Registre-se com seus dados institucionais para utilizar os recursos do site.",
    logoAlt: "logo lideranças empáticas",
  },
  tabs: {
    labels: {
      studentMentor: "Aluno-Mentor",
      mentor: "Mentor",
      admin: "Admin",
    },
    headers: {
      studentMentor: "Login de Alunos-Mentores",
      mentor: "Login Mentores",
      admin: "Login Administradores",
    },
    studentMentorHint:
      "Use essas credenciais padrão para explorar o app",
    submit: "Entrar",
  },
  defaults: {
    studentMentorRa: "20231234",
    studentMentorPassword: "ana123",
  },
  inputs: {
    user: {
      placeholder: "Usuário",
    },
    email: {
      placeholder: "Email",
    },
    password: {
      placeholder: "Senha",
    },
    passwordToggleAlt: {
      show: "Mostrar senha",
      hide: "Ocultar senha",
    },
  },
  signup: {
    header: "Cadastro de\nAlunos-mentores",
    labels: {
      fullName: "Nome completo",
      email: "Email Institucional",
      ra: "R.A do Aluno-mentor",
      classGroup: "Selecione sua turma",
      phone: "Número de Celular",
      createPassword: "Crie uma senha",
    },
    placeholders: {
      fullName: "Insira seu nome completo",
      email: "Insira o email institucional",
      ra: "Insira seu R.A",
      phone: "Insira seu Número",
      password: "Insira a senha",
    },
    nextButton: "Próxima",
    turmas: ["1MA", "1MB", "1MC", "1NA", "1NB", "1NC"],
    turmaPlaceholder: "Selecionar Turma",
  },
  errors: {
    missingBackend:
      "Erro de configuração. Entre em contato com o suporte.",
    unknown: "Erro desconhecido",
    errorPrefix: "Erro:",
    loginUser: "Erro ao logar usuário",
    loginMentor: "Erro ao logar mentor",
    registerUser: "Erro ao cadastrar usuário",
    registerTeam: "Erro ao cadastrar time",
    connection:
      "Erro de conexão. Verifique se o backend está rodando e se a URL está correta.",
  },
};
