window.PROMPTS = [
{
  "key": "rewrite_pro",
  "category": "writing",
  "title": "Rewrite this professionally",
  "description": "Clean, confident, not robotic.",
  "slug": "rewrite-professionally",
  "difficulty": "Beginner + Power",
  "output_type": "Rewrite",
  "tags": [
    "rewrite",
    "professional",
    "writing",
    "email"
  ],
  "beginner": "Rewrite this to sound professional, clear, and confident.\nKeep the meaning the same.\n\nText:\n[paste here]",
  "power": "<task>Rewrite the text for a professional context.</task>\n<context>Audience: coworkers or clients.</context>\n<constraints>\n- Keep original meaning\n- Make it concise\n- Remove emotional language\n- Avoid clichés\n</constraints>\n<output_format>\n1) Revised version\n2) 3 variants (short / neutral / warm)\n</output_format>\n<input>[paste here]</input>"
},
{
  "key": "shorten",
  "category": "writing",
  "title": "Shorten without sounding rude",
  "description": "Keep intent, cut fluff.",
  "slug": "shorten-without-sounding-rude",
  "difficulty": "Beginner + Power",
  "output_type": "Rewrite",
  "tags": [
    "shorten",
    "polite",
    "message",
    "rewrite"
  ],
  "beginner": "Shorten this message by 40–60% without sounding rude.\nKeep key details and intent.\n\nMessage:\n[paste here]",
  "power": "<task>Shorten the message while keeping tone polite.</task>\n<constraints>\n- Keep key details (dates/times/questions)\n- Remove filler\n- Preserve respectful tone\n</constraints>\n<output_format>\nVersion A: shortest possible\nVersion B: slightly warmer\n</output_format>\n<input>[paste here]</input>"
},
{
  "key": "firm_reply",
  "category": "writing",
  "title": "Polite but firm reply",
  "description": "Boundaries without drama.",
  "slug": "polite-but-firm-reply",
  "difficulty": "Beginner + Power",
  "output_type": "Email",
  "tags": [
    "email",
    "reply",
    "firm",
    "polite",
    "communication"
  ],
  "beginner": "Write a polite but firm reply to this message.\nBe calm, direct, and professional.\n\nMessage:\n[paste here]",
  "power": "<role>You are skilled in professional correspondence.</role>\n<task>Draft a polite but firm reply.</task>\n<constraints>\n- Calm tone\n- Avoid blame\n- Keep it short\n- Include 1 clear call-to-action\n</constraints>\n<output_format>\nSubject line + email body\n</output_format>\n<input>[paste here]</input>"
},
{
  "key": "summarize_quiz",
  "category": "study",
  "title": "Summarize + quiz me",
  "description": "Learn faster with testing.",
  "slug": "summarize-and-quiz-me",
  "difficulty": "Beginner + Power",
  "output_type": "Study",
  "tags": [
    "study",
    "quiz",
    "summary",
    "learning"
  ],
  "beginner": "Summarize this in plain language, then quiz me with 10 questions.\nInclude an answer key.\n\nText:\n[paste here]",
  "power": "<task>Summarize and assess understanding.</task>\n<output_format>\n1) Summary (150–250 words)\n2) Key points (5)\n3) Quiz (10 questions)\n4) Answers:\n</output_format>\n<input>[paste here]</input>"
},
{
  "key": "decision",
  "category": "life",
  "title": "Help me decide",
  "description": "Weighted criteria + recommendation.",
  "slug": "help-me-decide",
  "difficulty": "Beginner + Power",
  "output_type": "Decision",
  "tags": [
    "decision",
    "pros cons",
    "compare"
  ],
  "beginner": "Help me decide between Option A and Option B.\nAsk me questions if needed.\nThen recommend the best option and explain why.\n\nOption A:\n[details]\n\nOption B:\n[details]",
  "power": "<task>Help choose between two options using a decision framework.</task>\n<constraints>\n- Ask up to 5 clarifying questions if needed\n- Stay practical and realistic\n</constraints>\n<output_format>\n1) Clarifying questions (if needed)\n2) Weighted criteria table\n3) Recommendation\n4) What would change the decision\n</output_format>\n<input>\nOption A: [details]\nOption B: [details]\n</input>"
},
{
  "key": "itinerary",
  "category": "travel",
  "title": "Realistic itinerary builder",
  "description": "No overpacked days.",
  "slug": "realistic-itinerary-builder",
  "difficulty": "Beginner + Power",
  "output_type": "Plan",
  "tags": [
    "travel",
    "itinerary",
    "planning",
    "budget"
  ],
  "beginner": "Create a realistic itinerary for:\nDestination: [place]\nDays: [number]\nStyle: [slow/active]\nBudget: [budget/mid]\nInterests: [paste]\n\nAvoid overpacking days and include flexibility.",
  "power": "<task>Create a realistic travel itinerary.</task>\n<context>\nDestination: [place]\nDays: [number]\nTravel style: [slow/active]\nBudget: [budget/mid]\nMust-do: [paste]\n</context>\n<constraints>\n- Avoid overpacking days\n- Include buffer time\n- Include cost notes when relevant\n</constraints>\n<output_format>\nDay-by-day plan + alternatives + budget notes\n</output_format>"
}
];