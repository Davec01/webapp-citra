"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function SearchCommand() {
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("Docs");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToHomeScreen = () => {
    setMenuOpen(false);
    const tg = window.Telegram?.WebApp;
    if (tg?.addToHomeScreen) {
      tg.addToHomeScreen();
    }
  };

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
      {/* Barra superior con menú tres puntos */}
      <div className="fixed top-0 right-0 p-3 z-50" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-700"
          aria-label="Menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-3 top-14 bg-white border border-gray-200 rounded-xl shadow-lg w-52 overflow-hidden">
            <button
              onClick={handleAddToHomeScreen}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Agregar a inicio
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl w-full mx-auto p-8 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo de la empresa" width={150} height={150} />
        </div>

        {/* Encabezado */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900">
          ¿Qué quieres saber?
        </h1>

        {/* Card con Input y botones */}
        <Card className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200">
          <div className="flex flex-col gap-6">
            <Input
              placeholder="Pregunta lo que sea..."
              className="border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg h-14 rounded-lg shadow-sm p-4 text-gray-900"
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
                <option value="Docs"> ✦ Clectif AI</option>
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