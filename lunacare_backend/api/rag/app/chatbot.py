from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableSequence
from langchain_community.chat_models import ChatOpenAI
from api.rag.app.document_handler import DocumentHandler
import os
from dotenv import load_dotenv

load_dotenv()

class LunaCareBot:
    def __init__(self, use_nvidia: bool = True):
        """Initialize the bot with NVIDIA or OpenAI LLM."""
        self.use_nvidia = use_nvidia
        self.doc_handler = DocumentHandler()
        self.vectorstore = None
        self.setup_llm()
        
    def setup_llm(self):
        """Set up the language model (LLM) based on user choice."""
        if self.use_nvidia:
            # NVIDIA API setup
            self.llm = ChatOpenAI(
                model_name="mixtral-8x7b-instruct",
                openai_api_base="https://integrate.api.nvidia.com/v1",
                openai_api_key=os.getenv("NVIDIA_API_KEY")
            )
        else:
            # OpenAI setup
            self.llm = ChatOpenAI(
                model_name="gpt-4",
                openai_api_key=os.getenv("OPENAI_API_KEY")
            )
            
    def initialize_vectorstore(self, pdf_path: str):
        """Initialize the vector store with content from a PDF."""
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF not found at {pdf_path}")
        
        self.vectorstore, self.documents = self.doc_handler.load_and_process_pdf(pdf_path)
        
    def generate_response(self, query: str) -> str:
        """Generate a response using RAG (Retrieve-then-Answer Generation)."""
        if not self.vectorstore:
            raise ValueError("Vector store not initialized. Call initialize_vectorstore first.")
        
        # Retrieve relevant documents
        relevant_docs = self.vectorstore.similarity_search(query, k=3)
        context = "\n".join([doc.page_content for doc in relevant_docs])
        
        # Create prompt template
        template = """
        As LunaCare AI, a compassionate postpartum wellness assistant, use the following context to help the user:
        
        Context: {context}
        
        User Question: {query}
        
        Provide a caring, empathetic response that addresses the user's needs while incorporating relevant information from the context.
        """
        prompt = PromptTemplate(template=template, input_variables=["context", "query"])
        
        # Create a RunnableSequence
        sequence = prompt | self.llm
        
        # Generate response using the sequence
        response = sequence.invoke({"context": context, "query": query})
        return response
    