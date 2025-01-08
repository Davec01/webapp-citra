"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchCommand() {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (question.trim()) {
      const path = `/chat?question=${encodeURIComponent(question)}`;
      router.push(path);  // Navegación normal
      // window.location.href = path;  // Si router.push falla, usa esta línea como alternativa
    } else {
      alert("Por favor, ingresa una pregunta válida.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          ¿Qué quieres saber?
        </h1>

        <Card className="p-4 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Pregunta lo que sea..."
              className="border-0 focus-visible:ring-0 text-lg h-20"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <div className="flex justify-end">
              <Button className="h-10" onClick={handleSubmit}>
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
