from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.chatbot import LunaCareBot
import uvicorn

app = FastAPI()
bot = LunaCareBot(use_nvidia=True)  # Set to False for OpenAI

# Initialize with PDF data
bot.initialize_vectorstore("data/Features.pdf")

class Query(BaseModel):
    text: str
    emotion: Optional[str] = None

@app.post("/chat")
async def chat_endpoint(query: Query):
    try:
        response = bot.generate_response(query.text)
        return {"response": response, "emotion": query.emotion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)