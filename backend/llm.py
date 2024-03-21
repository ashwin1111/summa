import os
from dotenv import load_dotenv

from llama_index.llms.gradient import GradientBaseModelLLM
from llama_index.embeddings.gradient import GradientEmbedding
from llama_index.core import ServiceContext
from llama_index.core import set_global_service_context
from llama_index.core import VectorStoreIndex, Document
import requests
from io import BytesIO
import PyPDF2

class LLM:
    def __init__(self, logger) -> None:
        load_dotenv()
        self.logger = logger
        self.model  = os.getenv("MODEL")
        self.max_tokens = 400
        self.gradient_access_token = os.getenv("GRADIENT_ACCESS_TOKEN")
        self.gradient_workspace_id = os.getenv("GRADIENT_WORKSPACE_ID")
        self.chunk_size = 256
        # self.index = None
        
    def get_model(self):
        self.logger.info(f"Creating model")
        llm = GradientBaseModelLLM(
            base_model_slug= "llama2-7b-chat",
            max_tokens= 400
        )
        self.logger.info(f"Model created")
        return llm
        
    def get_embeddings(self):
        self.logger.info(f"Creating embeddings")
        embed_model = GradientEmbedding(
            gradient_access_token = self.gradient_access_token,
            gradient_workspace_id = self.gradient_workspace_id,
            gradient_model_slug="bge-large"
        )
        self.logger.info(f"Embeddings created")
        return embed_model
    
    
    def get_service_context(self):
        self.logger.info(f"Creating service context")
        service_context = ServiceContext.from_defaults(
            llm = self.get_model(),
            embed_model = self.get_embeddings(),
            chunk_size=self.chunk_size
        ) 
        self.logger.info(f"Created service context")
        set_global_service_context(service_context)  
        
        return service_context
    
    
    def load_document(self, document: str):
                
        try:
            response = requests.get(document)
            self.logger.info(f"Response: {response.status_code}")
                
            # self.logger.info(f"Response: {response.status_code}")
            if response.status_code == 200:
                self.logger.info(f"Loading document: {document}")
                with BytesIO(response.content) as pdf_stream:  # Treat like a file in memory
                    pdf_reader = PyPDF2.PdfReader(pdf_stream)
                    text_content = ""
                    for page in pdf_reader.pages:
                        text_content += page.extract_text()
                self.logger.info(f'Gathered text')  

                text_list = [text_content]
                documents = [Document(text=t) for t in text_list]
                
                self.logger.info(f"Creating index")
                servicecontext = self.get_service_context()
                self.logger.info(f"Service context: {servicecontext}")
                index = VectorStoreIndex.from_documents(documents, service_context = servicecontext)  

                self.logger.info(f"Index created")          
                return index
        
        except Exception as e:
            self.logger.error(f"Error loading document: {e}")
            return None
    
        
    def generate_response(self, document, prompt:str):
        try:
            self.logger.info(f"Generating response for document: {document}")
            index = self.load_document(document)           
            query_engine = index.as_query_engine() 
            response = query_engine.query(prompt) 
            
            return response
            
        except Exception as e:
            self.logger.error(f"Error generating response: {e}")
            return None