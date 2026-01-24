import arkanaLogo from "@/assets/Arkana.png";
import eyeClosed from "@/assets/EyeClosed.png";
import eyeOpen from "@/assets/EyeOpen.png";
import placeholderComprovante from "@/assets/placeholderComprovante.jpg";
import heroBackground from "@/assets/texture.png";

import uploadStatic from "@/assets/icons/upload-static.png";
import uploadGif from "@/assets/icons/upload-anim.gif";

import homeDefault from "@/assets/icons/home.png";
import homeActive from "@/assets/icons/home-active.png";
import homePressed from "@/assets/icons/home-pressed.png";
import addDefault from "@/assets/icons/add.png";
import addActive from "@/assets/icons/add-active.png";
import addPressed from "@/assets/icons/add-pressed.png";
import historyDefault from "@/assets/icons/history.png";
import historyActive from "@/assets/icons/history-active.png";
import historyPressed from "@/assets/icons/history-pressed.png";

export const images = {
  heroBackground,
  arkanaLogo,
  placeholderComprovante,
  upload: {
    static: uploadStatic,
    animated: uploadGif,
  },
  auth: {
    eyeClosed,
    eyeOpen,
  },
  menu: {
    home: {
      default: homeDefault,
      active: homeActive,
      pressed: homePressed,
    },
    add: {
      default: addDefault,
      active: addActive,
      pressed: addPressed,
    },
    history: {
      default: historyDefault,
      active: historyActive,
      pressed: historyPressed,
    },
  },
  external: {
    backIcon: "https://img.icons8.com/glyph-neue/64/circled-left-2.png",
    liderancasLogo:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=180,fit=crop,q=95/dOq4lP0kVLiEl8Z3/lideranaas-empaticas-logo-AoPWG9oBrrt3QGv0.png",
  },
};
