import React from "react";
import { authContent, images } from "@/lib/content";

type Props = {
  RaUsuario: string;
  setRaUsuario: React.Dispatch<React.SetStateAction<string>>;
  SenhaUsuario: string;
  setSenhaUsuario: React.Dispatch<React.SetStateAction<string>>;
};

const CustomInputs: React.FC<Props> = ({
  RaUsuario,
  setRaUsuario,
  SenhaUsuario,
  setSenhaUsuario,
}) => {
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  return (
    <div>
      <div className="flex flex-col gap-3 items-center">
        <input
          type="text"
          placeholder={authContent.inputs.user.placeholder}
          value={RaUsuario}
          className="w-[80%] bg-[white] border border-gray-300 rounded-lg text-black placeholder-gray-700 px-3 py-1.5 text-base focus:outline-none"
          onChange={(e) => setRaUsuario(e.target.value)}
        />

        <input
          type={mostrarSenha ? "text" : "password"}
          value={SenhaUsuario}
          onChange={(e) => setSenhaUsuario(e.target.value)}
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

export default CustomInputs;
