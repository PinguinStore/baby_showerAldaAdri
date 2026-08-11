"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   DATOS DE LA INVITACIÓN
========================================================= */

const datos = {
  mama: "Adriana Maldonado",
  papa: "Aldair Lopez",

  fechaEvento: "2026-09-05T14:30:00",

  fechaTexto: "5 de septiembre de 2026",
  hora: "14:30",

  lugar: "Casa Cochabamba",

  direccion:
    "14 de Septiembre entre Av. Circunvalación y Cochabamba, Bolivia",

  whatsapp: "59168065549",

  mensajeWhatsApp:
    "Hola Aldair y Adriana ❤️ Confirmo mi asistencia al Baby Shower y Revelación de Género del 5 de septiembre. 💙🩷",
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);

  const [selectedGuess, setSelectedGuess] = useState<
    "nino" | "nina" | null
  >(null);

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const autoScrollRef = useRef<number | null>(null);

  const scrollTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const openScrollTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* =========================================================
     CUENTA REGRESIVA
  ========================================================= */

  useEffect(() => {
    const calcularTiempo = () => {
      const ahora = new Date().getTime();
      const evento = new Date(datos.fechaEvento).getTime();

      const diferencia = evento - ahora;

      if (diferencia <= 0) {
        setTimeLeft({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });

        return;
      }

      setTimeLeft({
        dias: Math.floor(
          diferencia / (1000 * 60 * 60 * 24)
        ),

        horas: Math.floor(
          (diferencia / (1000 * 60 * 60)) % 24
        ),

        minutos: Math.floor(
          (diferencia / (1000 * 60)) % 60
        ),

        segundos: Math.floor(
          (diferencia / 1000) % 60
        ),
      });
    };

    calcularTiempo();

    const intervalo = setInterval(
      calcularTiempo,
      1000
    );

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  /* =========================================================
     SCROLL AUTOMÁTICO
  ========================================================= */

  const detenerAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const iniciarAutoScroll = () => {
    detenerAutoScroll();

    const velocidad = 0.55;

    const scroll = () => {
      const posicionActual =
        window.innerHeight + window.scrollY;

      const alturaTotal =
        document.documentElement.scrollHeight;

      if (posicionActual >= alturaTotal - 5) {
        autoScrollRef.current = null;
        return;
      }

      window.scrollBy(0, velocidad);

      autoScrollRef.current =
        requestAnimationFrame(scroll);
    };

    autoScrollRef.current =
      requestAnimationFrame(scroll);
  };

  const pausarYReanudarScroll = () => {
    detenerAutoScroll();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    scrollTimeoutRef.current =
      setTimeout(() => {
        iniciarAutoScroll();
      }, 3000);
  };

  useEffect(() => {
    if (!opened) return;

    const interaccion = () => {
      pausarYReanudarScroll();
    };

    window.addEventListener(
      "touchstart",
      interaccion,
      { passive: true }
    );

    window.addEventListener(
      "wheel",
      interaccion,
      { passive: true }
    );

    window.addEventListener(
      "mousedown",
      interaccion,
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      interaccion,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        interaccion
      );

      window.removeEventListener(
        "wheel",
        interaccion
      );

      window.removeEventListener(
        "mousedown",
        interaccion
      );

      window.removeEventListener(
        "touchmove",
        interaccion
      );

      if (scrollTimeoutRef.current) {
        clearTimeout(
          scrollTimeoutRef.current
        );

        scrollTimeoutRef.current = null;
      }

      if (openScrollTimeoutRef.current) {
        clearTimeout(
          openScrollTimeoutRef.current
        );

        openScrollTimeoutRef.current = null;
      }

      detenerAutoScroll();
    };
  }, [opened]);

  /* =========================================================
     ABRIR INVITACIÓN
     LA MÚSICA COMIENZA AL PRESIONAR EL BOTÓN
  ========================================================= */

  const abrirInvitacion = () => {
    setOpened(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch((error) => {
          console.log(
            "No se pudo reproducir la música:",
            error
          );

          setMusicPlaying(false);
        });
    }

    if (openScrollTimeoutRef.current) {
      clearTimeout(
        openScrollTimeoutRef.current
      );
    }

    openScrollTimeoutRef.current =
      setTimeout(() => {
        iniciarAutoScroll();
      }, 1500);
  };

  /* =========================================================
     MÚSICA
  ========================================================= */

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch((error) => {
          console.log(
            "No se pudo reproducir la música:",
            error
          );
        });
    }
  };

  /* =========================================================
     CONFETI
  ========================================================= */

  const lanzarConfeti = () => {
    const colores = [
      "💙",
      "🩷",
      "💙",
      "🩷",
      "🤍",
      "💙",
      "🩷",
      "🔵",
      "🩷",
      "✨",
      "⭐",
    ];

    for (let i = 0; i < 180; i++) {
      const confeti =
        document.createElement("div");

      confeti.innerHTML =
        colores[
          Math.floor(
            Math.random() *
              colores.length
          )
        ];

      confeti.style.position = "fixed";

      confeti.style.left =
        `${Math.random() * 100}vw`;

      confeti.style.top = "-50px";

      confeti.style.fontSize =
        `${Math.random() * 15 + 12}px`;

      confeti.style.zIndex = "99999";

      confeti.style.pointerEvents =
        "none";

      const duracion =
        Math.random() * 2500 + 3000;

      const desplazamiento =
        Math.random() * 300 - 150;

      const rotacion =
        Math.random() * 1000 - 500;

      confeti.animate(
        [
          {
            transform:
              "translate3d(0,0,0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform:
              `translate3d(${desplazamiento}px,110vh,0) rotate(${rotacion}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duracion,
          easing:
            "cubic-bezier(.2,.7,.3,1)",
        }
      );

      document.body.appendChild(
        confeti
      );

      setTimeout(() => {
        confeti.remove();
      }, duracion);
    }
  };

  /* =========================================================
     APUESTA
  ========================================================= */

  const elegirApuesta = (
    opcion: "nino" | "nina"
  ) => {
    setSelectedGuess(opcion);
    setSecretOpen(true);
    lanzarConfeti();
  };

  /* =========================================================
     WHATSAPP
  ========================================================= */

  const confirmarWhatsApp = () => {
    const url =
      `https://wa.me/${datos.whatsapp}` +
      `?text=${encodeURIComponent(
        datos.mensajeWhatsApp
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================================
     MAPA
  ========================================================= */

  const mapaQuery = encodeURIComponent(
    `${datos.lugar}, ${datos.direccion}`
  );

  const mapaUrl =
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31429.121695341495!2d-66.20336928212734!3d-17.357867101781874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37562795a049f%3A0xfb64bce4be27c90a!2sAgente%20BCP%20%22ALMACEN%20MIRANDA%22!5e0!3m2!1ses-419!2sbo!4v1786417149219!5m2!1ses-419!2sbo`;

  const mapaLink =
    `https://maps.app.goo.gl/1E75g4fNLoMKuE2t8`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          AUDIO
      ===================================================== */}

      <audio
        ref={audioRef}
        src="/musica/musica1.mp3"
        loop
        preload="auto"
      />

      {/* =====================================================
          PORTADA
      ===================================================== */}

      {!opened ? (
        <main className="relative min-h-screen overflow-hidden">

          {/* FONDO */}

          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage:
                "url('/imagenes/FONDOSPIDER.jpg')",
            }}
          />

          {/* FONDO 2 */}

          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('/imagenes/FONDO2.jpg')",
            }}
          />

          {/* CAPA DE COLOR */}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/75 to-pink-100/70" />

          {/* DECORACIONES */}

          <div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-blue-300/30 blur-3xl" />

          <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-pink-300/30 blur-3xl" />

          <motion.div
            className="absolute left-4 top-8 text-5xl"
            animate={{
              y: [0, -12, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            🎈
          </motion.div>

          <motion.div
            className="absolute right-5 top-14 text-5xl"
            animate={{
              y: [0, 12, 0],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
            }}
          >
            🎈
          </motion.div>

          <div className="absolute left-5 bottom-24 text-4xl">
            🍼
          </div>

          <div className="absolute right-5 bottom-32 text-4xl">
            🧸
          </div>

          {/* CONTENIDO */}

          <div className="relative flex min-h-screen items-center justify-center px-5 py-10">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="relative w-full max-w-md overflow-hidden rounded-[40px] border border-white/80 bg-white/85 px-6 py-10 text-center shadow-[0_20px_80px_rgba(37,99,235,0.18)] backdrop-blur-md"
            >

              {/* PERSONAJES */}

              <motion.img
                src="/imagenes/SPIDERMAN.png"
                alt="Spider-Man"
                className="absolute -left-16 top-2 h-56 w-44 object-contain"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              <motion.img
                src="/imagenes/SPIDERWOMAN.png"
                alt="Spider-Woman"
                className="absolute -right-16 top-2 h-56 w-44 object-contain"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10">

                <div className="mt-4 flex justify-center gap-3 text-2xl">
                  🍼 ✨ 🧸 ✨ 🍼
                </div>

                <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-pink-100 px-4 py-2">

                  <span className="text-lg">
                    🕷️
                  </span>

                  <p className="text-[10px] font-black tracking-[0.3em] text-gray-600">
                    UNA NUEVA AVENTURA
                  </p>

                  <span className="text-lg">
                    🕷️
                  </span>

                </div>

                <h1 className="mt-8 text-5xl font-black uppercase italic leading-none text-blue-600">
                  SPIDER
                </h1>

                <h2 className="text-5xl font-black uppercase italic text-red-600">
                  BABY
                </h2>

                <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

                <p className="mt-7 text-xl font-black text-gray-800">
                  Baby Shower
                </p>

                <p className="my-2 text-pink-500">
                  &
                </p>

                <p className="text-xl font-black text-gray-800">
                  Revelación de Género
                </p>

                <p className="mx-auto mt-7 max-w-xs text-sm leading-relaxed text-gray-500">
                  Una nueva aventura está
                  por comenzar y queremos
                  compartirla contigo.

                  <br />

                  Pero hay un secreto...
                </p>

                <div className="mt-7 flex justify-center gap-2">

                  <span className="rounded-full bg-blue-500 px-4 py-2 text-xs font-black text-white shadow-md">
                    💙 ¿NIÑO?
                  </span>

                  <span className="rounded-full bg-pink-500 px-4 py-2 text-xs font-black text-white shadow-md">
                    🩷 ¿NIÑA?
                  </span>

                </div>

                <p className="mt-7 text-lg font-bold text-gray-700">

                  {datos.papa}

                  <span className="mx-2 text-red-500">
                    &
                  </span>

                  {datos.mama}

                </p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={
                    abrirInvitacion
                  }
                  className="mt-9 rounded-full bg-gradient-to-r from-blue-600 via-red-500 to-pink-500 px-10 py-4 text-sm font-black tracking-[0.12em] text-white shadow-lg"
                >
                  ABRIR INVITACIÓN
                </motion.button>

                <p className="mt-5 text-xs text-gray-400">
                  🎵 La aventura comienza al abrir
                </p>

                <div className="mt-6 flex justify-center gap-3 text-2xl">
                  🍼 🎀 🧸 🧦 👶
                </div>

              </div>

            </motion.div>

          </div>

        </main>
      ) : (

        <main className="overflow-hidden bg-white">

          {/* =====================================================
              BOTÓN DE MÚSICA
          ===================================================== */}

          <button
            onClick={toggleMusic}
            aria-label={
              musicPlaying
                ? "Pausar música"
                : "Reproducir música"
            }
            className="fixed right-5 top-5 z-[500] flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-pink-500 text-xl text-white shadow-lg"
          >
            {musicPlaying
              ? "🔊"
              : "🎵"}
          </button>

          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDOSPIDER.jpg')",
              }}
            />

            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />

            <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl" />

            <motion.div
              className="absolute left-5 top-24 text-5xl"
              animate={{
                y: [0, -15, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              🎈
            </motion.div>

            <motion.div
              className="absolute right-5 top-36 text-5xl"
              animate={{
                y: [0, 12, 0],
                rotate: [5, -5, 5],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
              }}
            >
              🎈
            </motion.div>

            <div className="absolute left-5 top-1/2 text-4xl opacity-70">
              🍼
            </div>

            <div className="absolute right-5 top-[60%] text-4xl opacity-70">
              🧸
            </div>

            <div className="absolute bottom-24 left-8 text-3xl">
              ⭐
            </div>

            <div className="absolute bottom-16 right-8 text-3xl">
              🧦
            </div>

            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

            <div className="relative z-10 flex min-h-screen items-center px-6 py-20">

              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">

                {/* TEXTO */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="order-2 text-center md:order-1 md:text-left"
                >

                  <p className="text-xs font-black tracking-[0.5em] text-blue-600">
                    SPIDER BABY
                  </p>

                  <h1 className="mt-5 text-5xl font-black uppercase italic leading-[0.9] text-gray-800 md:text-7xl">

                    Una nueva

                    <span className="block bg-gradient-to-r from-blue-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                      aventura
                    </span>

                  </h1>

                  <p className="mt-7 max-w-lg text-lg leading-relaxed text-gray-600">

                    Dos superhéroes.

                    <br />

                    Una nueva misión.

                    <br />

                    Y un pequeño secreto
                    que nadie conoce.

                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">

                    <span className="rounded-full bg-blue-500 px-5 py-2 text-xs font-black text-white shadow-md">
                      💙 BABY SHOWER
                    </span>

                    <span className="rounded-full bg-pink-500 px-5 py-2 text-xs font-black text-white shadow-md">
                      🩷 REVELACIÓN
                    </span>

                  </div>

                  <div className="mt-8 flex justify-center gap-4 text-3xl md:justify-start">
                    🍼 🧸 👶 🎀
                  </div>

                </motion.div>

                {/* PERSONAJES */}

                <div className="order-1 flex justify-center md:order-2">

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="relative flex items-end justify-center"
                  >

                    <img
                      src="/imagenes/SPIDERMAN.png"
                      alt="Spider-Man"
                      className="relative z-10 h-[390px] w-56 object-contain md:h-[500px]"
                    />

                    <img
                      src="/imagenes/SPIDERWOMAN.png"
                      alt="Spider-Woman"
                      className="-ml-12 h-[390px] w-56 object-contain md:-ml-16 md:h-[500px]"
                    />

                  </motion.div>

                </div>

              </div>

            </div>

          </section>

          {/* =====================================================
              MENSAJE
          ===================================================== */}

          <section className="relative overflow-hidden px-5 py-28">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="absolute left-5 top-12 text-4xl">
              🎈
            </div>

            <div className="absolute right-5 top-20 text-4xl">
              🍼
            </div>

            <div className="absolute bottom-10 left-8 text-3xl">
              🧸
            </div>

            <div className="absolute bottom-10 right-8 text-3xl">
              🧦
            </div>

            <div className="relative mx-auto max-w-3xl text-center">

              <p className="text-xs font-black tracking-[0.4em] text-pink-500">
                UNA MISIÓN MUY ESPECIAL
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase text-gray-800 md:text-5xl">
                ¡Tenemos una noticia!
              </h2>

              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

              <p className="mt-8 leading-relaxed text-gray-500">

                Estamos viviendo una de las
                aventuras más importantes
                de nuestras vidas.

                <br />
                <br />

                Una pequeña personita viene
                en camino y queremos compartir
                este momento tan especial contigo.

                <br />
                <br />

                Pero existe un pequeño detalle...

              </p>

              <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-4">

                <div className="rounded-3xl border border-blue-200 bg-blue-50/90 p-6 shadow-sm">

                  <div className="text-4xl">
                    💙
                  </div>

                  <p className="mt-3 font-black text-blue-600">
                    ¿NIÑO?
                  </p>

                </div>

                <div className="rounded-3xl border border-pink-200 bg-pink-50/90 p-6 shadow-sm">

                  <div className="text-4xl">
                    🩷
                  </div>

                  <p className="mt-3 font-black text-pink-600">
                    ¿NIÑA?
                  </p>

                </div>

              </div>

              <p className="mt-8 text-lg font-black text-gray-700">
                ¡Nadie lo sabe todavía! 🤫
              </p>

            </div>

          </section>

          {/* =====================================================
              APUESTA
          ===================================================== */}

          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 px-5 py-28">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="relative mx-auto max-w-5xl">

              <div className="text-center">

                <p className="text-xs font-black tracking-[0.4em] text-red-500">
                  TU MISIÓN COMO INVITADO
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase text-gray-800 md:text-5xl">
                  ¿Cuál es tu apuesta?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-gray-500">

                  Queremos que seas parte del juego.
                  Elige lo que tú crees que será
                  nuestro pequeño superhéroe.

                </p>

              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">

                {/* NIÑO */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    elegirApuesta("nino")
                  }
                  className="group rounded-[35px] border-2 border-blue-200 bg-white/95 p-8 text-left shadow-lg transition hover:border-blue-400"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                      💙
                    </div>

                    <span className="rounded-full bg-blue-500 px-4 py-2 text-xs font-black text-white">
                      YO DIGO NIÑO
                    </span>

                  </div>

                  <h3 className="mt-7 text-3xl font-black text-blue-600">
                    ¿PIENSAS QUE ES NIÑO?
                  </h3>

                </motion.button>

                {/* NIÑA */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    elegirApuesta("nina")
                  }
                  className="group rounded-[35px] border-2 border-pink-200 bg-white/95 p-8 text-left shadow-lg transition hover:border-pink-400"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                      🩷
                    </div>

                    <span className="rounded-full bg-pink-500 px-4 py-2 text-xs font-black text-white">
                      YO DIGO NIÑA
                    </span>

                  </div>

                  <h3 className="mt-7 text-3xl font-black text-pink-600">
                    ¿PIENSAS QUE ES NIÑA?
                  </h3>

                </motion.button>

              </div>

            </div>

          </section>

          {/* =====================================================
              RESULTADO DE LA APUESTA
          ===================================================== */}

          <AnimatePresence>

            {secretOpen && (

              <motion.section
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="relative overflow-hidden px-5 py-24"
              >

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "url('/imagenes/FONDO2.jpg')",
                  }}
                />

                <div className="relative mx-auto max-w-xl text-center">

                  <div className="text-6xl">
                    {selectedGuess === "nino"
                      ? "💙"
                      : "🩷"}
                  </div>

                  <h2 className="mt-6 text-3xl font-black uppercase text-gray-800">

                    {selectedGuess === "nino"
                      ? "¡Tú apuestas por NIÑO!"
                      : "¡Tú apuestas por NIÑA!"}

                  </h2>

                  <p className="mt-5 leading-relaxed text-gray-500">

                    ¡Apuesta registrada! 😄

                    <br />
                    <br />

                    Ahora solo queda esperar
                    al gran momento de la revelación.

                  </p>

                  {/* NOMBRE */}

                  <div
                    className={`mt-8 rounded-3xl p-6 ${
                      selectedGuess === "nino"
                        ? "border border-blue-200 bg-blue-50"
                        : "border border-pink-200 bg-pink-50"
                    }`}
                  >

                    <p
                      className={`text-2xl font-black ${
                        selectedGuess === "nino"
                          ? "text-blue-600"
                          : "text-pink-600"
                      }`}
                    >

                      {selectedGuess === "nino"
                        ? "ALESANDRO LOPEZ MALDONADO"
                        : "ALEXIA LOPEZ MALDONADO"}

                    </p>

                  </div>

                  {/* MENSAJE */}

                  <div className="mt-7 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-pink-50 p-6">

                    <p className="font-black text-gray-700">
                      🤫 EL VERDADERO SECRETO
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      Nadie podrá saberlo hasta
                      el día de la celebración.
                    </p>

                  </div>

                  <div className="mt-6 text-3xl">
                    🧸 👶 🎈
                  </div>

                </div>

              </motion.section>

            )}

          </AnimatePresence>

          {/* =====================================================
              FOTOS DE BEBÉS
          ===================================================== */}

          <section className="relative overflow-hidden px-5 py-28">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.30]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="absolute left-4 top-10 text-4xl">
              🧸
            </div>

            <div className="absolute right-4 top-20 text-4xl">
              🍼
            </div>

            <div className="relative mx-auto max-w-6xl">

              <div className="text-center">

                <p className="text-xs font-black tracking-[0.4em] text-blue-600">
                  ANTES DE ESTA AVENTURA
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase text-gray-800 md:text-5xl">
                  Cuando nosotros éramos pequeños
                </h2>

                <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-gray-500">

                  Antes de convertirnos en mamá
                  y papá, también fuimos pequeños
                  soñadores.

                </p>

              </div>

              <div className="mt-16 grid gap-12 md:grid-cols-2">

                {/* ADRIANA */}

                <div>

                  <h3 className="mb-6 text-center text-2xl font-black uppercase text-pink-500">
                    Spider-Woman 🩷
                  </h3>

                  <div className="grid grid-cols-2 gap-4">

                    <img
                      src="/imagenes/foto-adriana-bebe1.jpeg"
                      alt="Adriana de bebé"
                      className="h-80 w-full rounded-3xl object-cover shadow-lg"
                    />

                    <img
                      src="/imagenes/foto-adriana-bebe2.jpeg"
                      alt="Adriana de niña"
                      className="h-80 w-full rounded-3xl object-cover shadow-lg"
                    />

                  </div>

                  <p className="mt-5 text-center text-gray-400">
                    Futura mamá · Adriana
                  </p>

                </div>

                {/* ALDAIR */}

                <div>

                  <h3 className="mb-6 text-center text-2xl font-black uppercase text-blue-600">
                    Spider-Man 💙
                  </h3>

                  <div className="grid grid-cols-2 gap-4">

                    <img
                      src="/imagenes/foto-aldair-bebe1.jpeg"
                      alt="Aldair de bebé"
                      className="h-80 w-full rounded-3xl object-cover shadow-lg"
                    />

                    <img
                      src="/imagenes/foto-aldair-bebe2.jpeg"
                      alt="Aldair de niño"
                      className="h-80 w-full rounded-3xl object-cover shadow-lg"
                    />

                  </div>

                  <p className="mt-5 text-center text-gray-400">
                    Futuro papá · Aldair
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =====================================================
              NUESTRAS FOTOS
          ===================================================== */}

          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 px-5 py-28">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.30]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="relative mx-auto max-w-6xl">

              <div className="text-center">

                <p className="text-xs font-black tracking-[0.4em] text-red-500">
                  NUESTRA HISTORIA
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase text-gray-800 md:text-5xl">

                  Dos caminos,
                  <br />
                  una aventura

                </h2>

              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">

                <img
                  src="/imagenes/foto2.jpeg"
                  alt="Adriana y Aldair"
                  className="h-[450px] w-full rounded-[30px] object-cover shadow-xl"
                />

                <img
                  src="/imagenes/foto1.jpeg"
                  alt="Adriana y Aldair"
                  className="h-[450px] w-full rounded-[30px] object-cover shadow-xl"
                />

                <img
                  src="/imagenes/foto4.jpeg"
                  alt="Nuestra historia"
                  className="h-[450px] w-full rounded-[30px] object-cover shadow-xl"
                />

              </div>

            </div>

          </section>

          {/* =====================================================
              CUENTA REGRESIVA
          ===================================================== */}

          <section className="relative overflow-hidden px-5 py-24">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.40]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="absolute left-5 top-10 text-4xl">
              🎈
            </div>

            <div className="absolute right-5 top-20 text-4xl">
              🎈
            </div>

            <div className="absolute bottom-10 left-5 text-3xl">
              ⭐
            </div>

            <div className="absolute bottom-10 right-5 text-3xl">
              ⭐
            </div>

            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

            <div className="relative mx-auto max-w-5xl text-center">

              <p className="text-xs font-bold tracking-[0.4em] text-pink-500">
                CUENTA REGRESIVA
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase text-gray-800 md:text-5xl">
                ¡Cada vez falta menos!
              </h2>

              <div className="mt-12 grid grid-cols-4 gap-2 md:gap-5">

                {[
                  [
                    timeLeft.dias,
                    "DÍAS",
                  ],
                  [
                    timeLeft.horas,
                    "HORAS",
                  ],
                  [
                    timeLeft.minutos,
                    "MIN",
                  ],
                  [
                    timeLeft.segundos,
                    "SEG",
                  ],
                ].map(
                  ([valor, texto]) => (
                    <div
                      key={texto}
                      className="rounded-3xl border border-gray-100 bg-white/95 p-4 shadow-lg md:p-7"
                    >

                      <div className="text-3xl font-black text-gray-800 md:text-5xl">

                        {String(
                          valor
                        ).padStart(
                          2,
                          "0"
                        )}

                      </div>

                      <p className="mt-2 text-[9px] font-bold tracking-widest text-gray-400 md:text-xs">
                        {texto}
                      </p>

                    </div>
                  )
                )}

              </div>

              {/* FECHA */}

              <div className="relative mt-16 overflow-hidden rounded-[40px] bg-white/95 px-6 py-12 shadow-xl">

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.40]"
                  style={{
                    backgroundImage:
                      "url('/imagenes/FONDO2.jpg')",
                  }}
                />

                <div className="absolute left-5 top-5 text-3xl">
                  📅
                </div>

                <div className="absolute right-5 top-5 text-3xl">
                  🧸
                </div>

                <div className="relative z-10">

                  <p className="text-xs font-black tracking-[0.4em] text-red-500">
                    📅 RESERVA ESTA FECHA
                  </p>

                  <div className="mt-4">

                    <p className="text-5xl font-black uppercase tracking-tight text-blue-600 md:text-7xl">
                      5
                    </p>

                    <p className="mt-1 text-2xl font-black uppercase text-gray-800 md:text-3xl">
                      SEPTIEMBRE
                    </p>

                    <p className="mt-1 text-xl font-black text-pink-500">
                      2026
                    </p>

                  </div>

                  <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

                  <div className="mt-5 flex items-center justify-center gap-3">

                    <span className="text-2xl">
                      ⏰
                    </span>

                    <p className="text-lg font-black text-gray-700">
                      {datos.hora}
                    </p>

                  </div>

                  <p className="mt-3 text-sm font-medium text-gray-400">
                    ¡No olvides acompañarnos!
                  </p>

                  <div className="mt-6 text-2xl">
                    🎈 🧸 👶 🎀
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =====================================================
              MAPA / INFORMACIÓN
          ===================================================== */}

          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 px-5 py-28">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.35]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="relative mx-auto max-w-6xl">

              <div className="text-center">

                <p className="text-xs font-black tracking-[0.4em] text-red-500">
                  PREPARA TU TRAJE
                </p>

                <h2 className="mt-5 text-4xl font-black uppercase text-gray-800">
                  Nos vemos
                </h2>

                <div className="mt-5 text-3xl">
                  🎈 🧸 👶 🎈
                </div>

              </div>


              {/* MAPA CORREGIDO */}

              <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[30px] border-4 border-white bg-white shadow-2xl">

                <iframe
                  title={`Ubicación de ${datos.lugar}`}
                  src={mapaUrl}
                  width="100%"
                  height="400"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />

              </div>

              <div className="text-center">

                <a
                  href={mapaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-pink-500 px-10 py-4 text-sm font-black text-white shadow-lg transition hover:scale-105"
                >
                  📍 ABRIR EN GOOGLE MAPS
                </a>

              </div>

            </div>

          </section>

          {/* =====================================================
              CONFIRMACIÓN
          ===================================================== */}

          <section className="relative overflow-hidden px-6 py-28 text-center">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.40]"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div className="absolute left-5 top-10 text-4xl">
              🎈
            </div>

            <div className="absolute right-5 top-20 text-4xl">
              🎈
            </div>

            <div className="absolute bottom-10 left-10 text-3xl">
              🧸
            </div>

            <div className="absolute bottom-10 right-10 text-3xl">
              🧸
            </div>

            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

            <div className="relative mx-auto max-w-2xl">

              <p className="text-xs font-black tracking-[0.4em] text-blue-600">
                ÚNETE A LA MISIÓN
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase text-gray-800">
                ¿Nos acompañas?
              </h2>

              <p className="mt-6 leading-relaxed text-gray-500">

                Queremos compartir contigo
                este momento tan especial.

                <br />

                Ven preparado para descubrir
                el gran secreto. 💙🩷

              </p>

              <div className="mt-8 text-3xl">
                🧸 👶 🎈
              </div>

              <button
                type="button"
                onClick={
                  confirmarWhatsApp
                }
                className="mt-9 rounded-full bg-[#25D366] px-10 py-5 font-black text-white shadow-lg transition hover:scale-105"
              >
                💬 CONFIRMAR ASISTENCIA
              </button>

            </div>

          </section>

          {/* =====================================================
              FINAL
          ===================================================== */}

          <footer className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-pink-100 px-6 py-28 text-center">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDO2.jpg')",
              }}
            />

            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('/imagenes/FONDOSPIDER.jpg')",
              }}
            />

            <div className="absolute left-5 top-10 text-4xl">
              🎈
            </div>

            <div className="absolute right-5 top-20 text-4xl">
              🎈
            </div>

            <div className="absolute bottom-10 left-8 text-4xl">
              🧸
            </div>

            <div className="absolute bottom-10 right-8 text-4xl">
              🍼
            </div>

            <div className="relative mx-auto max-w-3xl">

              <div className="flex justify-center gap-2">

                <img
                  src="/imagenes/SPIDERMAN.png"
                  alt="Spider-Man"
                  className="h-40 w-32 object-contain"
                />

                <img
                  src="/imagenes/SPIDERWOMAN.png"
                  alt="Spider-Woman"
                  className="h-40 w-32 object-contain"
                />

              </div>

              <div className="mt-4 text-3xl">
                🧸 👶 🎀
              </div>

              <p className="mt-5 text-xs font-bold tracking-[0.4em] text-blue-600">
                SPIDER BABY
              </p>

              <h2 className="mt-6 text-4xl font-black uppercase text-gray-800">
                Nuestra nueva aventura
              </h2>

              <p className="mt-6 text-3xl font-black text-gray-800">

                {datos.papa}

                <span className="mx-2 text-red-500">
                  &
                </span>

                {datos.mama}

              </p>

              <div className="mx-auto mt-10 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-pink-500" />

              <p className="mt-8 text-lg leading-relaxed text-gray-600">

                Gracias por acompañarnos
                a descubrir juntos
                el comienzo de esta nueva historia.

              </p>

              <div className="mt-8 flex justify-center gap-4 text-3xl">
                ❤️ 💙 🩷
              </div>

              <div className="mt-8 text-3xl">
                🎈 🧸 👶 🎀
              </div>

              <p className="mt-10 text-xs tracking-[0.3em] text-gray-500">
                2026
              </p>

            </div>

          </footer>

        </main>
      )}
    </>
  );
}