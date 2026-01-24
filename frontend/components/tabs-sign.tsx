"use client";

import React from "react";
import DropdownTurmas from "./dropdown-turmas";
import { authContent, images } from "@/lib/content";
import { registerUserMock } from "@/lib/mock-data";

interface Props {
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setRaUsuario: React.Dispatch<React.SetStateAction<number>>;
}

export default function SigninTabs({ setIsLogged, setRaUsuario }: Props) {
  const [raAlunoMentor, setRaAlunoMentor] = React.useState("");
  const [telefoneAlunoMentor, setTelefoneAlunoMentor] = React.useState("");
  const [nomeAlunoMentor, setNomeAlunoMentor] = React.useState("");
  const [turma, setTurma] = React.useState("");
  const [emailAlunoMentor, setEmailAlunoMentor] = React.useState("");
  const [senhaAlunoMentor, setSenhaAlunoMentor] = React.useState("");
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await registerUserMock({
        RaUsuario: Number(raAlunoMentor),
        NomeUsuario: nomeAlunoMentor,
        EmailUsuario: emailAlunoMentor,
        SenhaUsuario: senhaAlunoMentor,
        TelefoneUsuario: telefoneAlunoMentor,
        TurmaUsuario: turma,
      });

      setRaUsuario(Number(raAlunoMentor)); 
      setIsLogged(true); 
    } catch (error) {
      console.error(authContent.errors.registerUser, error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert(authContent.errors.connection);
      } else {
        alert(`${authContent.errors.registerUser}: ${error}`);
      }
    }
  };
  return (
    <div className="mb-1 mt-1 mr-4 ml-4">
      <form onSubmit={handleSubmit}>
        <div className="text-base">
          {authContent.signup.labels.fullName}
          <input
            id="nome"
            name="nome"
            type="text"
            value={nomeAlunoMentor}
            onChange={(e) => setNomeAlunoMentor(e.target.value)}
            placeholder={authContent.signup.placeholders.fullName}
            className="block w-full bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
          />
        </div>

        <div className="text-base">
          {authContent.signup.labels.email}
          <input
            id="email"
            name="email"
            type="email"
            value={emailAlunoMentor}
            onChange={(e) => setEmailAlunoMentor(e.target.value)}
            placeholder={authContent.signup.placeholders.email}
            className="block w-full bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
          />
        </div>

        <div className="text-base">
          {authContent.signup.labels.ra}
          <input
            id="ra"
            name="ra"
            type="text"
            value={raAlunoMentor}
            onChange={(e) => setRaAlunoMentor(e.target.value)}
            placeholder={authContent.signup.placeholders.ra}
            className="block w-full bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
          />
        </div>

        <div className="text-base">
          <div className="flex flex-col space-y-2">
            {authContent.signup.labels.classGroup}
            <DropdownTurmas turma={turma} setTurma={setTurma} />
            {authContent.signup.labels.phone}
            <input
              id="telefone"
              name="telefone"
              type="string"
              value={telefoneAlunoMentor}
              onChange={(e) => setTelefoneAlunoMentor(e.target.value)}
              placeholder={authContent.signup.placeholders.phone}
              className="block w-full bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
            />
          </div>

          <p className="mb-0">{authContent.signup.labels.createPassword}</p>
          <div className="text-base flex">
            <input
              id="senha"
              name="senha"
              type={mostrarSenha ? "text" : "password"}
              value={senhaAlunoMentor}
              onChange={(e) => setSenhaAlunoMentor(e.target.value)}
              placeholder={authContent.signup.placeholders.password}
              className="block w-[75%] mr-2 bg-[white] border border-[#b4b4b4] rounded-lg text-black placeholder-gray-400 px-3 py-2 text-base focus:outline-none"
            />
            <button
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="hidden rounded-lg"
            >
              {mostrarSenha ? (
                <img
                  src={images.auth.eyeClosed.src}
                  alt={authContent.inputs.passwordToggleAlt.hide}
                />
              ) : (
                <img
                  src={images.auth.eyeOpen.src}
                  alt={authContent.inputs.passwordToggleAlt.show}
                />
              )}
            </button>
            <button
              type="submit"
              className="border-transparent bg-secondary hover:text-white! text-white text-base py-2 px-6 w-[90px] md:w-28 flex justify-content items-center hover:bg-secondary/80 rounded-lg"
            >
              {authContent.signup.nextButton}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
