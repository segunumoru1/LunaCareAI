from chatbot import LunaCareBot

if __name__ == "__main__":
    bot = LunaCareBot(use_nvidia=False)  # Set to True for NVIDIA
    bot.initialize_vectorstore("../data/Features.pdf")
    user_query = "What are some tips for postpartum wellness?"
    response = bot.generate_response(user_query)
    print(response.content)

