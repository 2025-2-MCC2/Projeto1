interface Team {
  NomeTime: string;
  RaUsuario: number;
  RaAluno2: number;
  RaAluno3: number;
  RaAluno4: number;
  RaAluno5: number;
  RaAluno6: number;
  RaAluno7: number;
  RaAluno8: number;
  RaAluno9: number;
  RaAluno10: number;
  IdMentor: number;
}

interface User {
  RaUsuario: number;
  NomeUsuario: string;
  TurmaUsuario: string;
}

import { commonContent } from "@/lib/content";
import { getMockUser, getMockUserTeam } from "@/lib/mock-data";

export async function fetchData(
  RaUsuario: number
): Promise<{ team: Team; user: User } | undefined> {
  try {
    const team = await getMockUserTeam(RaUsuario);
    const user = await getMockUser(RaUsuario);

    if (!team) {
      alert(`${commonContent.errors.fetchContributions}: time não encontrado`);
      return;
    }

    if (!user) {
      alert(`${commonContent.errors.fetchContributions}: usuário não encontrado`);
      return;
    }

    return { team, user };
  } catch (error) {
    console.error(error);
    alert(commonContent.errors.unexpected);
  }
}
