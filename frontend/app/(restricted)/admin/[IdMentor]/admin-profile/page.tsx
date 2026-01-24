"use client";

import React, { SetStateAction, useEffect } from "react";
import MenuMobileAdmin from "@/components/menu-mobile-admin";
import MenuDesktopAdmin from "@/components/menu-desktop-admin";
import { useParams } from "next/navigation";
import { images, profilesContent } from "@/lib/content";
import { createAdminMock, getMockMentor } from "@/lib/mock-data";

export default function AdminProfile() {
  const params = useParams();
  const adminId = parseInt(params.IdMentor as string, 10);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [adminLogado, setAdminLogado] = React.useState<string>();
  const [newEmailMentor, setNewEmailMentor] = React.useState<string>();
  const [senhaMentor, setSenhaMentor] = React.useState<string>();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getMockMentor(adminId);
        if (!data) {
          throw new Error(profilesContent.admin.fetchAdminError);
        }
        setAdminLogado(data.EmailMentor);
      } catch (err) {
        console.error(err);
      }
    };
    if (adminId !== null) {
      fetchAdminData();
    }
  }, [adminId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmailMentor?.trim()) {
      alert(profilesContent.admin.invalidEmail);
      return;
    }

    try {
      await createAdminMock({
        EmailMentor: newEmailMentor,
        SenhaMentor: senhaMentor || "",
      });
      alert(profilesContent.admin.saveAdminSuccess);

      setNewEmailMentor("");
      setSenhaMentor("");
    } catch (error) {
      console.error(error);
      alert(`${profilesContent.admin.saveAdminError}: ${error}`);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-clip ">
      <div className="">
        <header>
          <button
            type="button"
            className={`open-menu hover:text-primary/60 ${
              menuOpen ? "menu-icon hidden" : "menu-icon"
            } absolute justify-between left-0 top-0`}
            onClick={() => setMenuOpen(true)}
          >
            {" "}
            ☰{" "}
          </button>
        </header>
      </div>

      <div
        className={`${
          menuOpen ? "ml-[270px]" : ""
        } w-full h-full flex justify-center md:items-center transition-all duration-300 ease-in-out`}
      >
        <MenuDesktopAdmin
          menuOpen={menuOpen}
          setMenuOpen={(arg: SetStateAction<boolean>) => setMenuOpen(arg)}
        />

        <MenuMobileAdmin />

        <section className="max-w-[90%] md:max-w-[1300px] md:mt-0 grid grid-cols-1 md:grid-cols-2  h-150 my-5 mb-10 gap-2">
          <div className="flex flex-col gap-2 p-5 border border-gray-200 shadow-xl bg-white rounded-xl">
            <h1 className="text-3xl pt-8 text-primary mb-5 font-semibold">
              {profilesContent.admin.profileTitle}
            </h1>

            <h3 className="text-xl font-semibold text-black  w-full">
              {adminLogado}
            </h3>

            <h2 className="text-lg w-full">
              {profilesContent.admin.addAdminTitle}
            </h2>
            <p className="font-sm text-gray-600">
              {profilesContent.admin.addAdminDescription}
            </p>

            <div className=" mt-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <p>{profilesContent.admin.emailLabel}</p>
                <input
                  type="text"
                  onChange={(e) => setNewEmailMentor(e.target.value)}
                  value={newEmailMentor || ""}
                  placeholder={profilesContent.admin.emailPlaceholder}
                  className="md:w-[85%] h-full  w-full focus:outline-none block min-h-9 border rounded-md border-gray-400 px-2 mb-3 text-black placeholder-gray-400 pt-1 text-base"
                />
                <p>{profilesContent.admin.passwordLabel}</p>
                <input
                  type="password"
                  onChange={(e) => setSenhaMentor(e.target.value)}
                  value={senhaMentor || ""}
                  placeholder={profilesContent.admin.passwordPlaceholder}
                  className="md:w-[85%] h-full  w-full focus:outline-none block min-h-9 border rounded-md border-gray-400 px-2 mb-3 text-black placeholder-gray-400 pt-1 text-base "
                />
                <button
                  type="submit"
                  className="text-white bg-primary hover:bg-primary/80  self-start border border-gray-200 px-4 py-1 my-2 rounded-md  cursor-pointer font-medium transition"
                >
                  {profilesContent.admin.submit}
                </button>
              </form>
            </div>
          </div>
          <div
            className="bg-primary rounded-xl border border-gray-200 shadow-xl p-10
                flex flex-col items-center justify-center text-center gap-4 overflow-hidden min-h-[280px] md:min-h-[360px]"
          >
            <p className="text-white font-extrabold text-3xl md:text-4xl leading-tight break-words">
              {profilesContent.user.heroTitle.split("\n")[0]}
              <br />
              {profilesContent.user.heroTitle.split("\n")[1]}
            </p>

            <img
              src={images.arkanaLogo.src}
              alt={profilesContent.user.heroTitle.replace("\n", " ")}
              className="max-w-full h-auto w-[290px] md:w-[400px] object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
