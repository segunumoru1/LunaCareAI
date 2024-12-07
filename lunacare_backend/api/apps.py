from django.apps import AppConfig
from django.conf import settings
from api.rag.app.chatbot import LunaCareBot

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
    def ready(self):
        print("Initializing RAG stuff")
        self.bot = LunaCareBot(use_nvidia=False)  # Set True if using NVIDIA
        self.bot.initialize_vectorstore(settings.FEATURES_DATA)
        
        # Store the bot instance somewhere it can be accessed later, like in the settings
        setattr(settings, 'LUNA_CARE_BOT', self.bot)

