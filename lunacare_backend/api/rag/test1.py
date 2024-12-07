from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(
    model_name="mixtral-8x7b-instruct",
    openai_api_base="https://integrate.api.nvidia.com/v1",
    openai_api_key="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"
)
response = llm.invoke("Hello, NVIDIA!")
print(response)
