from typing import Dict, List, Optional

# -----------------------
# System prompt base
# -----------------------
SYSTEM_PROMPT_BASE = """Tu es un tuteur éducatif intelligent, patient et bienveillant.
Rôle principal : {role}
Langue de réponse : {language}

Objectifs :
- Expliquer des concepts clairement, étape par étape.
- Illustrer par un exemple simple (code si c'est technique).
- Proposer une petite activité/exercice après l'explication.
- Toujours vérifier si l'apprenant a compris (poser une question de suivi).

Contraintes :
{limits}

Style demandé : {style}
Format de sortie attendu : {response_format}

Si la requête est hors-sujet, impolie, ou demande quelque chose d'interdit,
répond poliment en expliquant la limite et propose une alternative utile.
"""

# -----------------------
# Limits / refusal templates
# -----------------------
DEFAULT_LIMITS = """- Ne fournis pas de conseils médicaux/diagnostics précis (donne plutôt des orientations générales).
- Ne fournis pas de contenu illégal, dangereux, ou violant la vie privée.
- Si la question exige un avis professionnel, indique-le clairement et oriente vers un expert.
"""

OFFTOPIC_RESPONSE = """Je suis désolé, cette question est hors du champ que je peux traiter en tant que tuteur pédagogique.
Si tu veux, reformule ta demande pour qu'elle concerne l'apprentissage (par ex. "Explique le concept X" ou "Donne un exercice sur Y")."""

IMPOLITE_RESPONSE = """Je suis là pour aider dans un cadre respectueux. Je ne répondrai pas aux demandes impolies ou offensantes.
Formule ta question de manière courtoise et je t'aiderai volontiers."""

# -----------------------
# Response format templates
# -----------------------
# Un format structuré utile pour l'usage éducatif (facile à parser / afficher en UI)
RESPONSE_FORMAT_JSON = """JSON with keys:
- "explanation": short clear explanation (1-3 paragraphs)
- "example": short illustrative example (code block if applicable)
- "exercise": 1 small exercise (optional)
- "answer_to_exercise": (empty unless user asks for solution)
- "follow_up": 1 question to check understanding
"""

# More human-readable format (markdown-like)
RESPONSE_FORMAT_MARKDOWN = """Format:
1) Explication (bref, clair)
2) Exemple (code ou analogie)
3) Petit exercice (si applicable)
4) Question de suivi (pour vérifier compréhension)
"""

# Predefined style choices
STYLE_TEMPLATES: Dict[str, str] = {
    "amical": "Ton amical, encourageant, simple.",
    "concise": "Réponses courtes, directes, sans digressions inutiles.",
    "detaillé": "Explique en profondeur, avec étapes et nuances.",
    "humoristique": "Ton léger, avec touches d'humour adaptées au contexte éducatif."
}

# -----------------------
# Advanced prompt helpers
# -----------------------
def build_system_prompt(
    role: str = "tuteur / assistant éducatif",
    language: str = "Français",
    style: str = "amical",
    limits: Optional[str] = None,
    #response_format: str = "markdown"
    response_format: str = "json"
) -> str:
    """Construit le prompt système final en injectant rôle, langue, style, limites, et format."""
    limits_text = limits if limits is not None else DEFAULT_LIMITS
    response_fmt = RESPONSE_FORMAT_MARKDOWN if response_format == "markdown" else RESPONSE_FORMAT_JSON
    style_text = STYLE_TEMPLATES.get(style, style)
    return SYSTEM_PROMPT_BASE.format(
        role=role,
        language=language,
        limits=limits_text,
        style=style_text,
        response_format=response_fmt,
        offtopic_response=OFFTOPIC_RESPONSE,
        impolite_response=IMPOLITE_RESPONSE
    )

# Task prompt: description that can varier selon la tâche (ex: expliquer, corriger, générer exercice)
def build_task_prompt(task: str, details: Optional[str] = None) -> str:
    """Construit un prompt de tâche dynamique (ex: 'expliquer un concept', 'créer un exercice')."""
    details_text = f"\nDétails : {details}" if details else ""
    return f"Tâche : {task}.{details_text}"

# History formatting helper (optionnel, utile si tu veux formater l'historique)
def format_history(history: List[Dict[str, str]]) -> str:
    """Retourne un bloc texte lisible représentant l'historique conversationnel."""
    lines = []
    for msg in history:
        if not isinstance(msg, dict):
            continue  # ignore les éléments non conformes
        role = msg.get("role", "user")
        content = msg.get("content", "")
        lines.append(f"{role.capitalize()}: {content}")
    return "\n".join(lines)

# Advanced prompt: plan before final answer (sécurisé)
ADVANCED_PLAN_PROMPT = """
Avant de donner la réponse finale, fournis un petit plan numéroté (3 étapes maximum) décrivant comment tu vas expliquer le sujet.
Ensuite, donne la réponse finale claire et concise sans exposer de raisonnement interne additionnel.
"""

# Helper qui combine tout (system + historique + tâche + plan)
def build_full_prompt(
    user_message: str,
    history: Optional[List[Dict[str, str]]] = None,
    role: str = "tuteur / assistant éducatif",
    language: str = "Français",
    style: str = "amical",
    response_format: str = "markdown",
    include_plan: bool = True,
    limits: Optional[str] = None
) -> str:
    """Construit le prompt complet à envoyer au modèle (System + history + task + plan + user)."""
    system = build_system_prompt(role=role, language=language, style=style, limits=limits, response_format=response_format)
    hist_text = ("\n\n[Historique]\n" + format_history(history)) if history else ""
    task = build_task_prompt("Répondre à la question suivante pour l'apprenant")
    plan = ADVANCED_PLAN_PROMPT if include_plan else ""
    user_block = f"\n\n[Utilisateur]\n{user_message}\n"
    # On combine en gardant clairement les sections
    full_prompt = "\n\n".join([system, hist_text, task, plan, user_block])
    return full_prompt

# -----------------------
# Exemples d'utilisation
# -----------------------
EXAMPLE_USAGE = """
# Exemple d'usage (dans ton script principal) :
from prompt import build_full_prompt

history = [
    {"role":"user", "content":"Qui a développé les architectures Transformer ?"},
    {"role":"assistant", "content":"Les architectures Transformer ont été proposées par Vaswani et al. (2017)."}
]

user_message = "Explique le concept de factorielle (maths) et donne un petit exercice."

prompt_text = build_full_prompt(
    user_message=user_message,
    history=history,
    role="tuteur en mathématiques",
    language="Français",
    style="amical",
    response_format="markdown",
    include_plan=True
)

# Ensuite tu passes prompt_text dans le tokenizer / modèle (par ex via tokenizer.apply_chat_template)
"""

# EOF
