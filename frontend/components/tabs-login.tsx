"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomInputs from "./login-user-inputs";
import MentorInputs from "./login-mentor-input";
import { useRouter } from "next/navigation";
import { authContent } from "@/lib/content";
import { loginAdminMock, loginMentorMock, loginUserMock } from "@/lib/mock-data";

export default function TabsLogin() {
  const router = useRouter();
  const [IdMentor, setIdMentor] = React.useState<number>();
  const [IdTime] = React.useState("");
  const [EmailMentor, setEmailMentor] = React.useState("");
  const [SenhaMentor, setSenhaMentor] = React.useState("");
  const [RaUsuario, setRaUsuario] = React.useState(
    authContent.defaults.studentMentorRa
  );
  const [SenhaUsuario, setSenhaUsuario] = React.useState(
    authContent.defaults.studentMentorPassword
  );

  // Login Student
  const handleSubmitAluno = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUserMock(parseInt(RaUsuario), SenhaUsuario);
      if (!user) {
        alert(`${authContent.errors.errorPrefix} ${authContent.errors.loginUser}`);
        return;
      }
      router.push(`/user/${RaUsuario}/new-contribution`);
    } catch (error) {
      alert(authContent.errors.loginUser);
    }
  };

  // Login Mentor
  const handleSubmitMentor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const mentor = await loginMentorMock(EmailMentor, SenhaMentor);
      if (!mentor) {
        alert(`${authContent.errors.errorPrefix} ${authContent.errors.loginMentor}`);
        return;
      }
      setIdMentor(mentor.IdMentor);
      router.push(`/mentor/${mentor.IdMentor}/mentor-history`);
    } catch (error) {
      console.error(authContent.errors.loginMentor, error);
    }
  };

  //login admin
  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const admin = await loginAdminMock(EmailMentor, SenhaMentor);
      if (!admin) {
        alert(`${authContent.errors.errorPrefix} ${authContent.errors.loginMentor}`);
        return;
      }
      setIdMentor(admin.IdMentor);
      router.push(`/admin/${admin.IdMentor}/admin-history`);
    } catch (error) {
      console.error("Erro ao logar admin:", error);
    }
  };

  return (
    <Tabs defaultValue="Aluno" className="md:w-[700px] h-full mb-1">
      <TabsList className="flex gap-1">
        <TabsTrigger value="Aluno" className="hover:cursor-pointer">
          {authContent.tabs.labels.studentMentor}
        </TabsTrigger>
        <TabsTrigger value="Mentor" className="hover:cursor-pointer">
          {authContent.tabs.labels.mentor}
        </TabsTrigger>
        <TabsTrigger value="Admin">{authContent.tabs.labels.admin}</TabsTrigger>
      </TabsList>

      <TabsContent value="Aluno">
        <section className="border border-gray-300 h-full rounded-lg mb-2 flex flex-col items-center justify-center md:w-[365px] px-6 py-8">
          <h2 className="text-secondary text-center font-bold text-xl md:text-xl my-4">
            {authContent.tabs.headers.studentMentor}
          </h2>
          <p className="text-sm text-center text-gray-600 mb-2">
            {authContent.tabs.studentMentorHint}
          </p>
          <form
            onSubmit={handleSubmitAluno}
            className="flex flex-col gap-4 w-full"
          >
            <CustomInputs
              RaUsuario={RaUsuario!}
              setRaUsuario={setRaUsuario}
              SenhaUsuario={SenhaUsuario}
              setSenhaUsuario={setSenhaUsuario}
            />
            <button
              type="submit"
              className="border-transparent bg-secondary hover:text-white! text-white text-base py-2 px-6 w-[90px] md:w-28 self-center hover:bg-secondary/80 rounded-lg"
            >
              {authContent.tabs.submit}
            </button>
          </form>
        </section>
      </TabsContent>

      <TabsContent value="Mentor">
        <section className="border border-gray-300 h-full rounded-lg mb-2 flex flex-col items-center justify-center md:w-[365px] px-6 py-8">
          <h2 className="text-secondary text-center font-bold text-xl md:text-xl my-4">
            {authContent.tabs.headers.mentor}
          </h2>
          <form
            onSubmit={handleSubmitMentor}
            className="flex flex-col gap-4 w-full"
          >
            <MentorInputs
              EmailMentor={EmailMentor}
              setEmailMentor={setEmailMentor}
              SenhaMentor={SenhaMentor}
              setSenhaMentor={setSenhaMentor}
            />
            <button
              type="submit"
              className="border-transparent bg-secondary hover:text-white! text-white text-base py-2 px-6 w-[90px] md:w-28 self-center hover:bg-secondary/80 rounded-lg"
            >
              {authContent.tabs.submit}
            </button>
          </form>
        </section>
      </TabsContent>
      <TabsContent value="Admin">
        <section className="border border-gray-300 h-full rounded-lg mb-2 flex flex-col items-center justify-center md:w-[365px] px-6 py-8">
          <h2 className="text-secondary text-center font-bold text-xl md:text-xl my-4">
            {authContent.tabs.headers.admin}
          </h2>
          <form
            onSubmit={handleSubmitAdmin}
            className="flex flex-col gap-4 w-full"
          >
            <MentorInputs
              EmailMentor={EmailMentor}
              setEmailMentor={setEmailMentor}
              SenhaMentor={SenhaMentor}
              setSenhaMentor={setSenhaMentor}
            />
            <button
              type="submit"
              className="border-transparent bg-secondary hover:text-white! text-white text-base py-2 px-6 w-[90px] md:w-28 self-center hover:bg-secondary/80 rounded-lg"
            >
              {authContent.tabs.submit}
            </button>
          </form>
        </section>
      </TabsContent>
    </Tabs>
  );
}
