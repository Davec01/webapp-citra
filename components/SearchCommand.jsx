"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export function SearchCommand() {
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("Docs");
  const router = useRouter();

  const handleSubmit = () => {
    if (question.trim()) {
      const path = `/chat?question=${encodeURIComponent(question)}&option=${encodeURIComponent(option)}`;
      router.push(path);
    } else {
      alert("Por favor, ingresa una pregunta válida.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full mx-auto space-y-6 p-6">
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo de la empresa" width={150} height={150} />
        </div>
        <h1 className="text-5xl font-extrabold text-center text-gray-800">
          ¿Qué quieres saber?
        </h1>

        <Card className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200">
          <div className="flex flex-col gap-6">
            <Input
              placeholder="Pregunta lo que sea..."
              className="border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg h-16 rounded-lg shadow-sm p-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <div className="flex justify-between items-center">
              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="h-12 px-4 rounded-lg bg-black text-white text-lg cursor-pointer"
              >
                <option value="Docs"> ✦ Docs</option>
                <option value="Big Data"> ✦ Big Data</option>
              </select>
              <Button
                className="h-12 px-8 rounded-lg bg-black hover:bg-gray-800 text-white transition-all"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
