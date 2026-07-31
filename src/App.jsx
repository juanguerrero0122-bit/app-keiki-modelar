import { useState } from "react";

// TODO: Reemplazar con imágenes originales de Keiki (personajes, ilustraciones)
// TODO: Integrar con API real de Keiki para envío de respuestas
// TODO: Añadir analytics/tracking (Google Ads, Facebook Pixel) con los UTM params originales
// TODO: Implementar lógica de resultados personalizada según edad y respuestas del quiz

const COLORS = {
  primary: "#FF6B35",
  primaryLight: "#FF8C5A",
  secondary: "#4ECDC4",
  secondaryDark: "#3DBDB5",
  purple: "#A855F7",
  purpleLight: "#C084FC",
  yellow: "#FCD34D",
  yellowDark: "#F59E0B",
  green: "#34D399",
  greenDark: "#10B981",
  blue: "#60A5FA",
  blueDark: "#3B82F6",
  pink: "#F472B6",
  pinkDark: "#EC4899",
  bg: "#FFF9F5",
  bgCard: "#FFFFFF",
  text: "#1E1B4B",
  textLight: "#6B7280",
  white: "#FFFFFF",
};

const QUIZ_STEPS = [
  {
    id: 1,
    type: "age",
    emoji: "👶",
    question: "¿Cuántos años tiene tu hijo/a?",
    subtitle: "Personalizaremos el plan de aprendizaje según su edad",
    options: [
      { id: "2", label: "2 años", icon: "🍼", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "3", label: "3 años", icon: "🧸", color: COLORS.pink, colorDark: COLORS.pinkDark },
      { id: "4", label: "4 años", icon: "🎨", color: COLORS.purple, colorDark: "#9333EA" },
      { id: "5", label: "5 años", icon: "🚀", color: COLORS.green, colorDark: COLORS.greenDark },
      { id: "6", label: "6 años", icon: "⭐", color: COLORS.yellow, colorDark: COLORS.yellowDark },
      { id: "7+", label: "7+ años", icon: "🏆", color: COLORS.primary, colorDark: "#E55A25" },
    ],
  },
  {
    id: 2,
    type: "gender",
    emoji: "🌈",
    question: "¿Cuál es el género de tu hijo/a?",
    subtitle: "Adaptamos los personajes y contenido para una mejor experiencia",
    options: [
      { id: "boy", label: "Niño", icon: "👦", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "girl", label: "Niña", icon: "👧", color: COLORS.pink, colorDark: COLORS.pinkDark },
      { id: "other", label: "Prefiero no decir", icon: "🌟", color: COLORS.purple, colorDark: "#9333EA" },
    ],
  },
  {
    id: 3,
    type: "topics",
    emoji: "📚",
    question: "¿Qué le gustaría aprender?",
    subtitle: "Puedes seleccionar varios temas",
    multi: true,
    options: [
      { id: "abc", label: "Abecedario", icon: "🔤", color: COLORS.primary, colorDark: "#E55A25" },
      { id: "numbers", label: "Números", icon: "🔢", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "colors", label: "Colores", icon: "🎨", color: COLORS.pink, colorDark: COLORS.pinkDark },
      { id: "shapes", label: "Formas", icon: "⬛", color: COLORS.green, colorDark: COLORS.greenDark },
      { id: "logic", label: "Lógica", icon: "🧩", color: COLORS.purple, colorDark: "#9333EA" },
      { id: "creativity", label: "Creatividad", icon: "✏️", color: COLORS.yellow, colorDark: COLORS.yellowDark },
    ],
  },
  {
    id: 4,
    type: "time",
    emoji: "⏰",
    question: "¿Cuánto tiempo al día puede dedicar al aprendizaje?",
    subtitle: "Crearemos un plan adaptado a su disponibilidad",
    options: [
      { id: "5min", label: "5 minutos", icon: "⚡", color: COLORS.green, colorDark: COLORS.greenDark },
      { id: "10min", label: "10 minutos", icon: "🌟", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "20min", label: "20 minutos", icon: "🚀", color: COLORS.primary, colorDark: "#E55A25" },
      { id: "30min", label: "30+ minutos", icon: "🏆", color: COLORS.purple, colorDark: "#9333EA" },
    ],
  },
  {
    id: 5,
    type: "challenge",
    emoji: "🎯",
    question: "¿Cuál es el mayor reto de tu hijo/a?",
    subtitle: "Nos enfocamos en las áreas que más necesita mejorar",
    options: [
      { id: "attention", label: "Atención y concentración", icon: "🧠", color: COLORS.purple, colorDark: "#9333EA" },
      { id: "reading", label: "Lectura y escritura", icon: "📖", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "math", label: "Matemáticas básicas", icon: "➕", color: COLORS.green, colorDark: COLORS.greenDark },
      { id: "creativity", label: "Expresión creativa", icon: "🎭", color: COLORS.pink, colorDark: COLORS.pinkDark },
    ],
  },
  {
    id: 6,
    type: "parent",
    emoji: "👨‍👩‍👧",
    question: "¿Cómo describes tu rol como padre/madre?",
    subtitle: "Para ayudarte a involucrarte en el aprendizaje de la mejor manera",
    options: [
      { id: "active", label: "Muy involucrado/a", icon: "💪", color: COLORS.green, colorDark: COLORS.greenDark },
      { id: "moderate", label: "Moderadamente", icon: "😊", color: COLORS.blue, colorDark: COLORS.blueDark },
      { id: "busy", label: "Poco tiempo disponible", icon: "⏱️", color: COLORS.yellow, colorDark: COLORS.yellowDark },
      { id: "help", label: "Necesito orientación", icon: "🙋", color: COLORS.primary, colorDark: "#E55A25" },
    ],
  },
];

const TRUST_BADGES = [
  { icon: "🏅", text: "Aprobado por expertos en educación" },
  { icon: "❤️", text: "Amado por millones de niños" },
  { icon: "🔒", text: "100% seguro y sin anuncios" },
];

const TESTIMONIALS = [
  {
    name: "María G.",
    role: "Mamá de Sofía, 4 años",
    text: "¡Increíble! Mi hija aprendió los números en solo 2 semanas. Pide jugar todos los días.",
    stars: 5,
    avatar: "👩",
  },
  {
    name: "Carlos R.",
    role: "Papá de Lucas, 3 años",
    text: "Las actividades son perfectas para su edad. Ya reconoce todas las letras del abecedario.",
    stars: 5,
    avatar: "👨",
  },
  {
    name: "Ana M.",
    role: "Mamá de Valentina, 5 años",
    text: "La mejor inversión que hice para mi hija. Aprende jugando y está feliz.",
    stars: 5,
    avatar: "👩‍🦱",
  },
];

function StarRating({ count }) {
  return (
    <span style={{ fontSize: "16px", letterSpacing: "2px" }}>
      {"⭐".repeat(count)}
    </span>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "12px", color: COLORS.textLight, fontWeight: 600 }}>
          Pregunta {current} de {total}
        </span>
        <span style={{ fontSize: "12px", color: COLORS.primary, fontWeight: 700 }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#E5E7EB",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.yellow})`,
            borderRadius: "999px",
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

function OptionCard({ option, selected, multi, onClick }) {
  const isSelected = multi
    ? selected.includes(option.id)
    : selected === option.id;

  return (
    <button
      onClick={() => onClick(option.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 18px",
        borderRadius: "16px",
        border: isSelected
          ? `3px solid ${option.color}`
          : "3px solid transparent",
        background: isSelected
          ? `${option.color}15`
          : COLORS.white,
        boxShadow: isSelected
          ? `0 4px 16px ${option.color}30`
          : "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.2s ease",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        outline: "none",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: "28px",
          width: "40px",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {option.icon}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: "16px",
          fontWeight: 700,
          color: isSelected ? option.colorDark : COLORS.text,
        }}
      >
        {option.label}
      </span>
      <span
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: isSelected ? "none" : `2px solid #D1D5DB`,
          background: isSelected ? option.color : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s ease",
        }}
      >
        {isSelected && (
          <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>✓</span>
        )}
      </span>
    </button>
  );
}

function QuizStep({ step, onAnswer, currentAnswer }) {
  const [selected, setSelected] = useState(
    step.multi ? (currentAnswer || []) : (currentAnswer || null)
  );

  const handleSelect = (id) => {
    if (step.multi) {
      setSelected((prev) => {
        const arr = prev || [];
        if (arr.includes(id)) return arr.filter((x) => x !== id);
        return [...arr, id];
      });
    } else {
      setSelected(id);
      setTimeout(() => onAnswer(id), 300);
    }
  };

  const handleContinue = () => {
    if (step.multi && selected && selected.length > 0) {
      onAnswer(selected);
    }
  };

  return (
    <div
      style={{
        animation: "fadeSlideIn 0.4s ease",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "52px", marginBottom: "12px" }}>{step.emoji}</div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 900,
            color: COLORS.text,
            lineHeight: 1.3,
            marginBottom: "8px",
          }}
        >
          {step.question}
        </h2>
        <p style={{ fontSize: "14px", color: COLORS.textLight, fontWeight: 500 }}>
          {step.subtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {step.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected}
            multi={step.multi}
            onClick={handleSelect}
          />
        ))}
      </div>

      {step.multi && (
        <button
          onClick={handleContinue}
          disabled={!selected || selected.length === 0}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "16px",
            borderRadius: "999px",
            border: "none",
            background:
              selected && selected.length > 0
                ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                : "#E5E7EB",
            color: selected && selected.length > 0 ? COLORS.white : COLORS.textLight,
            fontSize: "18px",
            fontWeight: 800,
            cursor: selected && selected.length > 0 ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            fontFamily: "Nunito, sans-serif",
            boxShadow:
              selected && selected.length > 0
                ? `0 8px 24px ${COLORS.primary}40`
                : "none",
          }}
        >
          Continuar →
        </button>
      )}
    </div>
  );
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analizando respuestas...");

  useState(() => {
    const messages = [
      "Analizando respuestas...",
      "Personalizando el plan de aprendizaje...",
      "Preparando actividades especiales...",
      "¡Casi listo!",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) setMessage(messages[i]);
      setProgress((prev) => {
        const next = prev + 26;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return 100;
        }
        return next;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "24px",
        animation: "fadeSlideIn 0.4s ease",
      }}
    >
      <div style={{ fontSize: "72px", animation: "bounce 1s infinite" }}>🎓</div>
      <h2 style={{ fontSize: "22px", fontWeight: 900, color: COLORS.text, textAlign: "center" }}>
        Creando el plan perfecto<br />para tu hijo/a
      </h2>
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#E5E7EB",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.yellow})`,
            borderRadius: "999px",
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "16px", color: COLORS.textLight, fontWeight: 600 }}>
        {message}
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {["🔤 ABC", "🔢 Números", "🎨 Colores", "🧩 Lógica"].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "6px 14px",
              background: `${COLORS.primary}15`,
              color: COLORS.primary,
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ answers }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  // TODO: Implementar envío real a API de Keiki con las respuestas del quiz
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError("Por favor ingresa un email válido");
      return;
    }
    setEmailError("");
    // TODO: POST a endpoint de Keiki con { email, answers }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          textAlign: "center",
          animation: "fadeSlideIn 0.4s ease",
        }}
      >
        <div style={{ fontSize: "72px" }}>🎉</div>
        <h2 style={{ fontSize: "26px", fontWeight: 900, color: COLORS.text }}>
          ¡Tu plan está listo!
        </h2>
        <p style={{ fontSize: "16px", color: COLORS.textLight }}>
          Revisa tu email. Te enviamos los primeros pasos del plan de aprendizaje personalizado.
        </p>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.secondary})`,
            borderRadius: "20px",
            padding: "20px",
            width: "100%",
            color: COLORS.white,
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>
            ¿Listo para comenzar?
          </p>
          <p style={{ fontSize: "14px", opacity: 0.9 }}>
            Descarga Keiki y comienza el aprendizaje hoy mismo
          </p>
        </div>
        {/* TODO: Reemplazar href con enlace real a App Store / Play Store de Keiki */}
        <a
          href="#download"
          style={{
            display: "block",
            width: "100%",
            padding: "18px",
            borderRadius: "999px",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            color: COLORS.white,
            fontSize: "20px",
            fontWeight: 900,
            textDecoration: "none",
            textAlign: "center",
            boxShadow: `0 10px 30px ${COLORS.primary}40`,
          }}
        >
          📱 Descargar Keiki Gratis
        </a>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
      {/* Result Card */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          borderRadius: "24px",
          padding: "24px",
          color: COLORS.white,
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏆</div>
        <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "8px" }}>
          ¡Tu plan personalizado está listo!
        </h2>
        <p style={{ fontSize: "14px", opacity: 0.9 }}>
          Basado en tus respuestas, hemos creado un programa de aprendizaje único para tu hijo/a
        </p>
      </div>

      {/* Plan Preview */}
      <div
        style={{
          background: COLORS.white,
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 800, color: COLORS.text, marginBottom: "16px" }}>
          📋 Tu plan incluye:
        </h3>
        {[
          { icon: "🎮", text: "Juegos educativos adaptados a su edad" },
          { icon: "📈", text: "Progreso medible semana a semana" },
          { icon: "🎯", text: "Actividades de 5 a 15 minutos diarios" },
          { icon: "🏅", text: "Premios y recompensas motivadoras" },
          { icon: "📊", text: "Reportes para padres en tiempo real" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 0",
              borderBottom: i < 4 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <span style={{ fontSize: "22px" }}>{item.icon}</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.text }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {[
          { value: "2M+", label: "Niños activos" },
          { value: "4.8★", label: "Calificación" },
          { value: "85%", label: "Mejoran en 4 sem." },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: "16px",
              padding: "14px 8px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: COLORS.primary,
                marginBottom: "4px",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "11px", color: COLORS.textLight, fontWeight: 600 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Email form */}
      <div
        style={{
          background: `${COLORS.primary}08`,
          border: `2px solid ${COLORS.primary}20`,
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 800, color: COLORS.text, marginBottom: "6px" }}>
          📧 Recibe tu plan en tu email
        </h3>
        <p style={{ fontSize: "13px", color: COLORS.textLight, marginBottom: "14px" }}>
          Te enviaremos el plan completo y acceso especial gratuito
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@email.com"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: emailError ? `2px solid #EF4444` : "2px solid #E5E7EB",
              fontSize: "16px",
              fontFamily: "Nunito, sans-serif",
              outline: "none",
              marginBottom: emailError ? "6px" : "12px",
              boxSizing: "border-box",
              color: COLORS.text,
            }}
          />
          {emailError && (
            <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "12px", fontWeight: 600 }}>
              {emailError}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "999px",
              border: "none",
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              color: COLORS.white,
              fontSize: "18px",
              fontWeight: 900,
              cursor: "pointer",
              fontFamily: "Nunito, sans-serif",
              boxShadow: `0 8px 24px ${COLORS.primary}40`,
              transition: "transform 0.2s ease",
            }}
          >
            🚀 Obtener mi plan gratis
          </button>
        </form>
        <p style={{ fontSize: "11px", color: COLORS.textLight, textAlign: "center", marginTop: "10px" }}>
          🔒 Sin spam. Puedes cancelar en cualquier momento.
        </p>
      </div>

      {/* Testimonials */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        💬 Lo que dicen los padres
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "32px" }}>{t.avatar}</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: COLORS.text }}>
                  {t.name}
                </div>
                <div style={{ fontSize: "12px", color: COLORS.textLight }}>{t.role}</div>
              </div>
            </div>
            <StarRating count={t.stars} />
            <p style={{ fontSize: "14px", color: COLORS.text, marginTop: "8px", lineHeight: 1.5 }}>
              "{t.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        animation: "fadeSlideIn 0.4s ease",
      }}
    >
      {/* Hero illustration */}
      {/* TODO: Reemplazar con ilustración original de Keiki */}
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.yellow}30)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "80px",
        }}
      >
        🦁
      </div>

      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 900,
            color: COLORS.text,
            lineHeight: 1.2,
            marginBottom: "12px",
          }}
        >
          Ayuda a tu hijo/a a{" "}
          <span style={{ color: COLORS.primary }}>tener éxito</span>
        </h1>
        <p style={{ fontSize: "16px", color: COLORS.textLight, lineHeight: 1.6 }}>
          Toma un breve cuestionario y comienza el viaje educativo de tu hijo/a. ABC, matemáticas, lógica y creatividad hecho fácil.
        </p>
      </div>

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          background: COLORS.white,
          borderRadius: "20px",
          padding: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {TRUST_BADGES.map((badge, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "22px" }}>{badge.icon}</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.text }}>
              {badge.text}
            </span>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: `${COLORS.green}15`,
          padding: "10px 16px",
          borderRadius: "999px",
        }}
      >
        <span style={{ fontSize: "18px" }}>👨‍👩‍👧‍👦</span>
        <span style={{ fontSize: "14px", fontWeight: 700, color: COLORS.greenDark }}>
          +2 millones de niños aprendiendo ahora
        </span>
      </div>

      <button
        onClick={onStart}
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "999px",
          border: "none",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          color: COLORS.white,
          fontSize: "20px",
          fontWeight: 900,
          cursor: "pointer",
          fontFamily: "Nunito, sans-serif",
          boxShadow: `0 10px 30px ${COLORS.primary}40`,
          transition: "transform 0.2s ease",
          animation: "pulse 2s infinite",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        🎯 Comenzar el cuestionario
      </button>

      <p style={{ fontSize: "13px", color: COLORS.textLight, textAlign: "center" }}>
        ⏱️ Solo toma 2 minutos · Completamente gratis
      </p>

      {/* Topic pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        {["🔤 ABC", "🔢 Números", "🎨 Colores", "⬛ Formas", "🧩 Lógica", "✏️ Creatividad"].map(
          (tag) => (
            <span
              key={tag}
              style={{
                padding: "6px 14px",
                background: COLORS.white,
                border: `1px solid #E5E7EB`,
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.text,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome | quiz | loading | result
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setScreen("quiz");
    setCurrentStep(0);
  };

  const handleAnswer = (answer) => {
    const step = QUIZ_STEPS[currentStep];
    const newAnswers = { ...answers, [step.type]: answer };
    setAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setScreen("loading");
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setScreen("welcome");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleLoadingDone = () => {
    setScreen("result");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "Nunito, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 10px 30px ${COLORS.primary}40; }
          50% { box-shadow: 0 10px 40px ${COLORS.primary}70; }
        }

        button:active { transform: scale(0.97) !important; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}50; border-radius: 999px; }
      `}</style>

      {/* Header */}
      <header
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: COLORS.bg,
          zIndex: 10,
          borderBottom: screen === "quiz" ? "1px solid #F3F4F6" : "none",
        }}
      >
        {/* Logo */}
        {/* TODO: Reemplazar con logo SVG original de Keiki */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "28px" }}>🦁</span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 900,
              color: COLORS.primary,
              letterSpacing: "-0.5px",
            }}
          >
            keiki
          </span>
        </div>

        {/* Back button or step indicator */}
        {screen === "quiz" && (
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              color: COLORS.textLight,
              fontFamily: "Nunito, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 10px",
              borderRadius: "999px",
              transition: "background 0.2s",
            }}
          >
            ← Volver
          </button>
        )}
      </header>

      {/* Main content */}
      <main
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "16px 20px 40px",
          flex: 1,
        }}
      >
        {/* Progress bar for quiz */}
        {screen === "quiz" && (
          <div style={{ marginBottom: "20px" }}>
            <ProgressBar current={currentStep + 1} total={QUIZ_STEPS.length} />
          </div>
        )}

        {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}

        {screen === "quiz" && (
          <QuizStep
            key={currentStep}
            step={QUIZ_STEPS[currentStep]}
            onAnswer={handleAnswer}
            currentAnswer={answers[QUIZ_STEPS[currentStep].type]}
          />
        )}

        {screen === "loading" && <LoadingScreen onDone={handleLoadingDone} />}

        {screen === "result" && <ResultScreen answers={answers} />}
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "16px 20px",
          textAlign: "center",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <p style={{ fontSize: "12px", color: COLORS.textLight }}>
          {/* TODO: Añadir enlaces reales de Privacy Policy y Terms of Service de Keiki */}
          © 2024 Keiki · Todos los derechos reservados ·{" "}
          <a href="#privacy" style={{ color: COLORS.primary, textDecoration: "none" }}>
            Privacidad
          </a>{" "}
          ·{" "}
          <a href="#terms" style={{ color: COLORS.primary, textDecoration: "none" }}>
            Términos
          </a>
        </p>
      </footer>
    </div>
  );
}