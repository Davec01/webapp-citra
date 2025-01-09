"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";  // Importar el componente de imagen de Next.js

export function ChatInterface({ initialQuestion }) {
  const [message, setMessage] = useState({
    content: "Esperando tu pregunta...",
    timestamp: "Ahora",
    isAi: true,
  });

  useEffect(() => {
    const fetchAnswer = async () => {
      if (!initialQuestion) return;

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          body: JSON.stringify({ query: initialQuestion }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setMessage({
          content: data.answer || "No se obtuvo respuesta.",
          timestamp: "Ahora",
          isAi: true,
        });
      } catch (error) {
        setMessage({
          content: "Hubo un error al procesar tu pregunta. Intenta nuevamente.",
          timestamp: "Ahora",
          isAi: true,
        });
      }
    };

    fetchAnswer();
  }, [initialQuestion]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto w-full p-6 space-y-6">
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo de la empresa" width={150} height={150} />
        </div>
        <h1 className="text-4xl font-semibold text-center">
          {initialQuestion}
        </h1>

        <Card className="p-8 rounded-xl shadow-2xl border bg-white">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">
                <span className="text-green-600">✦ Respuesta</span>
              </h3>
              <p className="text-lg leading-relaxed mt-4">{message.content}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
