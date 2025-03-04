"use client";

import { useState, useEffect } from "react"; 
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
          body: JSON.stringify({ query: initialQuestion, temperature: 0, stream: false }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Error al obtener respuesta");
        }

        const data = await response.json();
        setMessage({
          content: data.answer || "No se obtuvo respuesta.",
          timestamp: "Ahora",
          isAi: true,
        });
      } catch (error) {
        console.error("Error al procesar la pregunta:", error);
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
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900">
          {initialQuestion}
        </h1>
        <Card className="p-8 rounded-xl shadow-2xl border bg-white">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">
                <span className="text-green-600">✦ Respuesta</span>
              </h3>
              <p className="text-lg text-gray-900 leading-relaxed mt-4">
                {message.content}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
