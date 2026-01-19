from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from Prompt import build_system_prompt, build_full_prompt, format_history, build_task_prompt

model_size = "1.5B"  
model_names = {
    "7B": "Qwen/Qwen2.5-7B-Instruct",
    "14B": "Qwen/Qwen2.5-14B-Instruct",
    "72B": "Qwen/Qwen2.5-72B-Instruct",
    "1.5B": "Qwen/Qwen2.5-1.5B-Instruct",
}
model_name = model_names.get(model_size, model_names["1.5B"])

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)
system_prompt = build_system_prompt(
    role="tuteur en education",
    language="Français",
    style="clair, pédagogique et bienveillant",
    response_format="Réponse structurée en sections"
)


def chat_with_qwen(user_message, history):

    # Build prompt de tâche
    task_prompt = build_task_prompt("Répondre à une question éducative")
    #task_prompt = build_task_prompt("expliquer un concept" ,  details="niveau lycée")

    # Format history
    history_text = format_history(history)

    # Build full prompt
    #print("DEBUG history:", history)
    full_prompt = build_full_prompt(system_prompt, task_prompt, history_text, user_message,include_plan=True)

    messages = [
        {"role": "system", "content": full_prompt},
        *history,
        {"role": "user", "content": user_message}
    ]

    # convert messages into Qwen chat format
    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    inputs = tokenizer(text, return_tensors="pt").to(model.device)

    output_ids = model.generate(
        **inputs,
        max_new_tokens=256
    )

    response = tokenizer.decode(
        output_ids[0][inputs["input_ids"].shape[1]:],
        skip_special_tokens=True
    )

    return response

history = []

print("Tutorbot is ready! Type 'exit' to quit.")

while True:
    user = input("You: ")
    if user.lower() == "exit":
        break

    answer = chat_with_qwen(user, history)
    print("\nTutor:", answer, "\n")

    history.append({"role": "user", "content": user})
    history.append({"role": "assistant", "content": answer})
