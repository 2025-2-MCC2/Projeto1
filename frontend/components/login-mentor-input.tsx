import React from "react";
import { authContent, images } from "@/lib/content";

type Props = {
  EmailMentor: string;
  setEmailMentor: React.Dispatch<React.SetStateAction<string>>;
  SenhaMentor: string;
  setSenhaMentor: React.Dispatch<React.SetStateAction<string>>;
};

const MentorInputs: React.FC<Props> = ({
  EmailMentor,
  setEmailMentor,
  SenhaMentor,
  setSenhaMentor,
}) => {
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  return (
    <div>
      <div className="flex flex-col gap-3 items-center">
        <input
          type="text"
          placeholder={authContent.inputs.email.placeholder}
          value={EmailMentor}
          className="w-[80%] bg-[white] border border-gray-300 rounded-lg text-black placeholder-gray-700 px-3 py-1.5 text-base focus:outline-none"
          onChange={(e) => setEmailMentor(e.target.value)}
        />

        <input
          type={mostrarSenha ? "text" : "password"}
          value={SenhaMentor}
          onChange={(e) => setSenhaMentor(e.target.value)}
          className="w-[80%] bg-[white] border border-gray-300 rounded-lg text-black placeholder-gray-700 px-3 py-1.5 text-base focus:outline-none"
          placeholder={authContent.inputs.password.placeholder}
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
      </div>
    </div>
  );
};
export default MentorInputs;
