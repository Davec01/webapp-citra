"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

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
        console.log("Enviando pregunta al API:", initialQuestion);
        const response = await fetch("/api/ask", {
          method: "POST",
          body: JSON.stringify({ query: initialQuestion }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setMessage({
          content: data.answer || "No se obtuvo respuesta.",
          timestamp: "Ahora",
          isAi: true,
        });
      } catch (error) {
        console.error("Error al obtener la respuesta:", error);
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
    <div className="max-w-3xl mx-auto w-full pt-10">
      <h1 className="text-4xl font-semibold mb-8">{initialQuestion}</h1>

      <div className="space-y-6">
        <Card className="p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">
                <span className="text-green-600">✦ Respuesta</span>
              </h3>
              <p className="text-lg leading-relaxed mt-2">{message.content}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
