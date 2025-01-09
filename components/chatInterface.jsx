"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
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

      console.log("Pregunta enviada al backend:", initialQuestion);

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (!backendUrl) {
          console.error("NEXT_PUBLIC_BACKEND_URL no está configurada.");
          throw new Error("La URL del backend no está configurada.");
        }

        const response = await fetch(`${backendUrl}/api/ask`, {
          method: "POST",
          body: JSON.stringify({ query: initialQuestion }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error en la respuesta del backend:", response.statusText);
          throw new Error("Error al consultar la API.");
        }

        const data = await response.json();
        console.log("Respuesta recibida del backend:", data);

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
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo de la empresa" width={150} height={150} />
        </div>

        {/* Pregunta */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900">
          {initialQuestion}
        </h1>

        {/* Respuesta */}
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
