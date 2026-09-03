import express, { response } from "express";

const app = express();
const PORT = 2222;
app.get("/api/health", (request, response) => {
  response.json({ message: `API HEALTHY RUNNING ON ${PORT}` });
});

app.post("/todo", (request, response) => {
  response.json({ message: `YOURE CALLING POST ${PORT}` });
});

app.delete("/todo", (request, response) => {
  response.json({ message: `YOURE CALLING DELETE ${PORT}` });
});
app.put("/todo", (request, response) => {
  response.json({ message: `YOURE CALLING put ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`server is running on , port ${PORT}`);
});
