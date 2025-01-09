export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { query } = req.body;

  
  if (!query) {
    return res.status(400).json({ message: "La pregunta es obligatoria." });
  }

  try {
    console.log("Consulta recibida en API:", query);

    const response = await fetch("http://35.223.72.198:8081/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    // Manejo de errores HTTP de la API externa
    if (!response.ok) {
      throw new Error(`Error en API externa: ${response.status}`);
    }

    // Leer la respuesta como texto (streaming)
    const completeAnswer = await response.text();
    console.log("Respuesta completa del servidor:", completeAnswer);

    // Procesar línea por línea la respuesta JSON
    const lines = completeAnswer.split("\n");
    let finalAnswer = "";

    for (const line of lines) {
      try {
        if (line.trim()) {
          const parsed = JSON.parse(line); 
          finalAnswer += parsed.result.chunk || "";
        }
      } catch (error) {
        console.warn("Error al parsear línea JSON:", error, line);
      }
    }

    return res.status(200).json({ answer: finalAnswer || "No se obtuvo respuesta." });

  } catch (error) {
    console.error("Error en el servidor:", error);

    // Respuesta genérica de error interno
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}
