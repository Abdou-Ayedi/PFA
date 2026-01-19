from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict

from load_2 import chat_with_qwen

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # pour le dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []

@app.post("/chat")
def chat(req: ChatRequest):
    answer = chat_with_qwen(
        user_message=req.message,
        history=req.history
    )

    return {"answer": answer}
