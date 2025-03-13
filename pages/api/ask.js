export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        query: req.body.query, 
        temperature: 0.0, 
        stream: false, 
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("http://35.223.72.198:5347/ask", requestOptions);
      const text = await response.text(); 
  
      console.log("🔹 Respuesta de la API externa:", text);
  
     
      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        console.warn("⚠️ La API devolvió texto en lugar de JSON");
        result = { answer: text }; 
      }
  
      return res.status(200).json(result);
    } catch (error) {
      console.error("❌ Error en la API:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  