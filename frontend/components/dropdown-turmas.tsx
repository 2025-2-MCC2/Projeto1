"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SetStateAction } from "react";
import { authContent } from "@/lib/content";

interface Properties {
  turma: string;
  setTurma: React.Dispatch<SetStateAction<string>>;
}
const DropdownTurmas = ({ turma, setTurma }: Properties) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="border border-[#b4b4b4] hover:bg-primary/40 text-black hover:text-black!"
        asChild
      >
        <Button variant="outline">
          {turma || authContent.signup.turmaPlaceholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-[#b4b4b4]">
        <DropdownMenuRadioGroup value={turma} onValueChange={setTurma}>
          {authContent.signup.turmas.map((turmaOption) => (
            <DropdownMenuRadioItem
              key={turmaOption}
              value={turmaOption}
            >
              {turmaOption}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTurmas;
