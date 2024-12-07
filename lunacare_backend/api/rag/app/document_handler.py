from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from typing import List, Tuple

class DocumentHandler:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.embeddings = HuggingFaceEmbeddings(model_name=model_name)
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        
    def load_and_process_pdf(self, pdf_path: str) -> Tuple[FAISS, List[str]]:
        """Load PDF and create FAISS index"""
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()
        texts = self.text_splitter.split_documents(documents)
        
        # Create FAISS index
        vectorstore = FAISS.from_documents(texts, self.embeddings)
        return vectorstore, [doc.page_content for doc in texts]