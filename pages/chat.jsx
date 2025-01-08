"use client";

import { ChatInterface } from "@/components/chatInterface";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const question = searchParams.get("question");

  // Verificar si la pregunta llega correctamente
  console.log("Pregunta recibida en chat.jsx:", question);

  // Manejo de pregunta vacía o nula
  if (!question || question.trim() === "") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl text-gray-600">
          No se recibió ninguna pregunta. Intenta nuevamente.
        </h1>
      </div>
    );
  }

  return <ChatInterface initialQuestion={question} />;
}
