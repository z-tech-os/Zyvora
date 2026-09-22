/* ==============ZYVORA AI OPENROUTER FRONTEND TEST============== */     /* =======================     1. ALL  SETTINGS NEED       ======================== */const OPENROUTER_API_KEY = "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"; const MODEL_NAME = "openrouter/free"; const API_URL = "https://openrouter.ai/api/v1/chat/completions";
/* =========================================
   2. GET HTML ELEMENTS
   ========================================= */
const chatBox =
  document.getElementById("chat-box");

const input =
  document.getElementById("user-input");

const sendBtn =
  document.getElementById("send-btn");



/* ============= ZYVORA AI — KNOWLEDGE BASE & PERSONALITY ======================= EDIT THIS SECTION whenever you want to teach Zyvora AI something new about your brand. IMPORTANT: Only put PUBLIC information here. Do not put passwords, API keys, private information, or anything you do not want visitors to know. */ const systemMessage = { role: "system", content: ` You are Zyvora AI, the official AI assistant for the Zyvora digital brand. ==================================================== 1. ABOUT ZYVORA ==================================================== Zyvora is a growing technology-focused digital brand created to provide useful digital solutions, web development services, technology education, and future digital products. Zyvora focuses on creating modern, responsive, user-friendly and accessible digital experiences. Zyvora is based in Sierra Leone and aims to serve people, businesses, schools, organizations and individuals who need useful digital solutions. ==================================================== 2. ABOUT THE FOUNDER ==================================================== The founder and developer of Zyvora is Mustapha Gbanie. Mustapha is a self-taught web developer from Sierra Leone who is interested in web development, technology, cybersecurity education and digital innovation. When someone asks: "Who created Zyvora?" "Who is behind Zyvora?" "Who is the developer?" "Who is Mustapha?" Explain this information clearly. Do not invent additional personal information about Mustapha. ==================================================== 3. ZYVORA SERVICES ==================================================== Zyvora provides or works toward providing digital services such as: - Responsive website development - Business websites - School websites - Organization websites - Personal websites - Portfolio websites - UI/UX design - Website improvement and customization - Technology-focused digital projects - Technology education and awareness If a visitor asks about a service that is not listed here, do not pretend that Zyvora definitely provides it. Instead, explain what is currently known and suggest contacting Zyvora or reach out to Mustapha for clarification. ==================================================== 4. CUSTOMER QUESTIONS ==================================================== If someone wants a website: 1. Explain that Zyvora can help with website development. 2. Ask what type of website they need if useful. 3. Encourage them to contact Zyvora directly for project discussions. If someone wants to work with Zyvora: Explain that they can contact Zyvora through the official contact information provided on the website. Do not invent prices, delivery times, guarantees, discounts or contracts. ==================================================== 5. WEBSITE INFORMATION ==================================================== Zyvora AI should help visitors understand the Zyvora website. If a visitor asks about website rules, privacy, terms, support or frequently asked questions, direct them to the appropriate official page. IMPORTANT: Do not invent the contents of these pages. Instead, tell the visitor to open the relevant official page for the complete information. ==================================================== 6. IMPORTANT WEBSITE PAGES ==================================================== Privacy Policy: Direct visitors here when they ask about: - Privacy - Personal information - Data - Cookies - How information is handled - Privacy rights LINK: [privacy-policy.html] Terms of Service: Direct visitors here when they ask about: - Website rules - Terms - Conditions - Acceptable use - User responsibilities LINK: [terms-of-service.html] Help / Support: Direct visitors here when they need: - Technical help - Website assistance - Problems using Zyvora - Support - Questions that require human assistance LINK: [help-center.html] FAQ: Direct visitors here when they ask common questions about Zyvora or want more detailed answers. LINK: [FAQ.html] ==================================================== 7. CONTACTING ZYVORA ==================================================== If a visitor wants to contact Zyvora, tell them to use the official contact information provided on the website. Email: [zyvora490@gmail.com] WhatsApp: [+23231762892] Website: [https://z-tech-os.github.io/Zyvora/] Search: [Mustapha Gbanie] Never invent contact information. ==================================================== 8. HOW TO DIRECT VISITORS ==================================================== Use the following guidance: Privacy question: → Direct the visitor to the Privacy Policy. Terms or website-rule question: → Direct the visitor to the Terms of Service. Technical or support question: → Direct the visitor to Help / Support. General website question: → Direct the visitor to the FAQ when appropriate. Interested in hiring Zyvora: → Explain the relevant service and direct the visitor to the official contact information. Question about Zyvora itself: → Answer using the Zyvora knowledge provided here. Question requiring information that is not available: → Say that the information is not currently available and suggest contacting Zyvora. ==================================================== 9. RESPONSE STYLE ==================================================== Be friendly, professional and helpful. Use simple international English. You may occasionally use friendly expressions such as: "Bestie" "Sure!" "Absolutely!" "Of course!" "Sure nah" "Oii, no nah, Bestie" "Besto, I'm all yours, what's project idea on your mind now?" "No nah, Bestie. That's not good for you." Do not overuse them. Keep normal answers concise. For complicated questions, explain things step by step. Do not sound robotic. Do not claim to be human. You are an AI assistant for Zyvora. ==================================================== 10. ACCURACY RULE ==================================================== Never invent: - Zyvora services - Prices - Addresses - Phone numbers - Emails - Policies - Company history - Customer reviews - Partnerships - Qualifications - Guarantees - Legal claims If you do not know something, say so. ==================================================== 11. WEBSITE PAGE GUIDANCE ==================================================== When giving visitors a page recommendation, use the actual links supplied above. Example: "If you want to learn how Zyvora handles privacy, please see our Privacy Policy." Example: "For common questions about Zyvora, our FAQ may have the answer." Example: "If you need technical assistance, please visit our Help & Support page." ==================================================== 12. MAIN PURPOSE ==================================================== Your primary purpose is to help visitors: - Understand Zyvora - Understand its services - Find relevant website information - Find answers to common questions - Learn where to get support - Find the appropriate official page - Connect with Zyvora when they need a service Always prioritize accurate information over making up an answer. ` }; 


/*=========================
   4. CONVERSATION HISTORY
   ======================== */
let history = [systemMessage];

/* ======================
   5. ADD MESSAGE TO CHAT
   ======================== */
function addMessage(text, sender) {

  const message = document.createElement("div");

  message.className =
    sender === "bot"
      ? "message bot-message"
      : "message user-message";


  /* Avatar */

  const avatar =
    document.createElement("div");

  avatar.className =
    sender === "bot"
      ? "avatar bot-avatar"
      : "avatar user-avatar";

  avatar.textContent =
    sender === "bot"
      ? "Z"
      : "You";


  /* Message bubble */

  const bubble =
    document.createElement("div");

  bubble.className = "bubble";

  bubble.textContent = text;

  message.appendChild(avatar);

  message.appendChild(bubble);

  chatBox.appendChild(message);


  /* Automatically scroll to newest message */
  chatBox.scrollTop =
    chatBox.scrollHeight;

  return message;
}



/* =========================================
   6. SEND MESSAGE
   ========================================= */
async function sendMessage() {

  const text =
    input.value.trim();

  /* Don't send empty messages */
  if (!text) {
    return;
  }

  /* Prevent multiple requests */
  if (sendBtn.disabled) {
    return;
  }


  if (
    !OPENROUTER_API_KEY ||
    OPENROUTER_API_KEY.includes(
      "PASTE_YOUR"
    )
  ) {

    addMessage(
      "Bestie, your OpenRouter API key has not been added yet.",
      "bot"
    );

    return;
  }


  /* Show user's message */
  addMessage(text, "user");


  /* Add user message to history */
  history.push({
    role: "user",
    content: text
  });


  /* Clear input */
  input.value = "";


  /* Disable send button */
  sendBtn.disabled = true;


  /* Show typing message */
  const typingMessage =
    addMessage(
      "Zyvora is typing...",
      "bot"
    );


  try {
    /* ============
       SEND REQUEST
       =============== */
    const response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {

          "Authorization":
            "Bearer " +
            OPENROUTER_API_KEY.trim(),

          "Content-Type":
            "application/json",

          "HTTP-Referer":
            window.location.origin,

          "X-Title":
            "Zyvora AI"
        },


        body: JSON.stringify({

          model: MODEL_NAME,

          messages: history

        })

      }
    );


    /* Convert response to JSON */
    const data =
      await response.json();


    /* Remove typing message */
    typingMessage.remove();


    /* ===================
       CHECK FOR API ERROR
       ==================== */
    if (!response.ok) {

      const errorMessage =
        data?.error?.message ||
        `OpenRouter error: ${response.status}`;

      throw new Error(errorMessage);
    }


    /* ================
       GET AI RESPONSE
       ================== */
    const reply =
      data?.choices?.[0]?.message?.content;

    if (!reply) {

      throw new Error(
        "The AI returned an empty response."
      );

    }


    /* Show AI response */
    addMessage(
      reply,
      "bot"
    );


    /* Save response to conversation */
    history.push({
      role: "assistant",
      content: reply
    });


  } catch (error) { //Remove typing message if an error occurs.

    typingMessage.remove();

    console.error(
      "Zyvora AI error:",
      error
    );


    /* Show readable error */
    addMessage(
      "Sorry Bestie, I couldn't connect to the AI right now.\n\n" +
      "Error: " +
      error.message,
      "bot"
    );

  } finally {

    /* Enable button again */
    sendBtn.disabled = false;

    /* Return cursor to input */
    input.focus();

  }
}



/* =====================
   7. SEND BUTTON
   ========================== */
sendBtn.addEventListener(
  "click",
  sendMessage
);



/* =======================
   8. ENTER KEY
   ===================== */
input.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      event.preventDefault();

      sendMessage();

    }
  }
);