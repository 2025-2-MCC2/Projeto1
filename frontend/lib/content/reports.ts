export const reportsContent = {
  publicReports: {
    editionFilterTitle: "Filtrar por edição",
    noData: "Nenhum dado disponível",
  },
  charts: {
    overview: {
      title: "Histórico de Arrecadações",
      totals: "Arrecadações Totais: R$0,00 | 00kg",
      desktopLabel: "Desktop",
    },
    biggestContributions: {
      description: "Gráfico de contribuições financeiras e alimentares",
      title: "Período de maiores contribuições",
      groupedByDay:
        "Agrupado por dia, considerando doações financeiras e alimentares",
      loading: "Carregando...",
      errorPrefix: "Erro:",
      empty: "Nenhum dado disponível",
      legend: {
        financial: "Financeiras",
        food: "Alimentícias",
      },
    },
    foodDonations: {
      title: "Doações Alimentícias",
      description: "Alimentos mais doados durante o período dessa edição",
      loading: "Carregando dados...",
      retry: "Tentar novamente",
      noDataTitle: "Nenhum alimento doado ainda",
      noDataDescription:
        "As doações aparecerão aqui quando forem registradas",
      tooltip: {
        donations: "Doações:",
        quantity: "Quantidade:",
      },
      config: {
        totalQuantity: "Quantidade Total",
        donations: "Doações",
      },
    },
    financialTimeline: {
      description: "Gráfico de arrecadações financeiras ao longo do tempo",
      title: "Arrecadação financeira",
      loading: "Carregando...",
      errorPrefix: "Erro:",
      emptyTitle: "Nenhum dado disponível",
      emptyDescription: "Sem arrecadações registradas",
      subtitle:
        "Período de arrecadações financeiras durante o semestre",
      footer: "Agosto 2025 - Atualmente",
      legend: "Financeira",
    },
    teamsRanking: {
      title: "Ranking de Times",
      loading: "Carregando...",
      errorPrefix: "Erro:",
      empty: "Nenhum time encontrado",
      subtitlePrefix: "Top",
      subtitleSuffix: "times com mais contribuições na edição atual",
      footer:
        "Mostrando os times com maior número de contribuições cadastradas",
      legend: "Contribuições",
    },
  },
};
