"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // ============================================
  // DATOS DE LA INVITACIÓN
  // ============================================

  const datos = {
    mama: "Mamá",
    papa: "Papá",

    // Cambia este nombre por el nombre del bebé si ya lo saben
    bebe: "Nuestro bebé",

    // Fecha del evento
    fechaEvento: "2026-09-15T16:00:00",

    fechaTexto: "15 de septiembre de 2026",
    hora: "16:00",
    lugar: "Salón de Eventos",
    direccion: "Oruro, Bolivia",

    // Número de WhatsApp
    whatsapp: "59170000000",

    // Mensaje de WhatsApp
    mensajeWhatsApp:
      "Hola! 💕 Confirmo mi asistencia al Baby Shower de Mamá y Papá. 👶🎀",
  };

  // ============================================
  // ESTADOS
  // ============================================

  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const [musicPlaying, setMusicPlaying] = useState(false);

  const [revealed, setRevealed] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ============================================
  // CUENTA REGRESIVA
  // ============================================

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

      const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
      );

      const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      );

      const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
      );

      const segundos = Math.floor(
        (diferencia / 1000) % 60
      );

      setTimeLeft({
        dias,
        horas,
        minutos,
        segundos,
      });
    };

    calcularTiempo();

    const intervalo = setInterval(
      calcularTiempo,
      1000
    );

    return () => clearInterval(intervalo);
  }, []);

  // ============================================
  // ABRIR INVITACIÓN
  // ============================================

  const abrirInvitacion = () => {
    setOpening(true);

    setTimeout(() => {
      setOpened(true);
    }, 1000);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1200);
  };

  // ============================================
  // MÚSICA
  // ============================================

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
        .catch(() => {
          console.log("No se pudo reproducir el audio");
        });
    }
  };

  // ============================================
  // REVELACIÓN
  // ============================================

  const revelar = () => {
    setRevealed(true);

    // Confeti sencillo
    crearConfeti();
  };

  const crearConfeti = () => {
    const cantidad = 80;

    for (let i = 0; i < cantidad; i++) {
      const confeti = document.createElement("div");

      confeti.innerHTML = Math.random() > 0.5 ? "💙" : "💗";

      confeti.style.position = "fixed";
      confeti.style.left = `${Math.random() * 100}vw`;
      confeti.style.top = "-20px";
      confeti.style.fontSize = `${
        Math.random() * 15 + 15
      }px`;
      confeti.style.zIndex = "9999";
      confeti.style.pointerEvents = "none";

      confeti.animate(
        [
          {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translateY(110vh) rotate(${
              Math.random() * 720 - 360
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 2500 + 2500,
          easing: "ease-out",
        }
      );

      document.body.appendChild(confeti);

      setTimeout(() => {
        confeti.remove();
      }, 5500);
    }
  };

  // ============================================
  // WHATSAPP
  // ============================================

  const confirmarWhatsApp = () => {
    const url = `https://wa.me/${datos.whatsapp}?text=${encodeURIComponent(
      datos.mensajeWhatsApp
    )}`;

    window.open(url, "_blank");
  };

  // ============================================
  // PORTADA
  // ============================================

  if (!opened) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#fff8fb]">
        <div className="relative flex min-h-screen items-center justify-center px-6">

          {/* Fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/imagenes/fondo-baby.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-white/55" />

          {/* Decoración */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-5 top-10 text-5xl"
          >
            🎈
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute right-5 top-20 text-5xl"
          >
            🎀
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute bottom-20 left-8 text-4xl"
          >
            🧸
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute bottom-28 right-8 text-4xl"
          >
            🍼
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative z-10 w-full max-w-md rounded-[40px] bg-white/80 px-7 py-12 text-center shadow-2xl backdrop-blur-md"
          >
            <p className="mb-4 text-sm tracking-[0.35em] text-gray-500">
              UNA SORPRESA ESTÁ POR LLEGAR
            </p>

            <h1 className="text-5xl font-light tracking-wide text-[#b8879b]">
              Baby Shower
            </h1>

            <div className="my-6 text-6xl">
              👶
            </div>

            <p className="text-lg text-gray-600">
              Acompáñanos a celebrar
            </p>

            <h2 className="mt-3 text-3xl text-[#a96f87]">
              {datos.mama} & {datos.papa}
            </h2>

            <p className="mt-5 text-gray-600">
              La llegada de nuestro bebé
              <br />
              nos llena de amor y felicidad.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={abrirInvitacion}
              className="mt-8 rounded-full bg-[#c992a9] px-9 py-4 text-sm font-medium tracking-[0.2em] text-white shadow-lg"
            >
              ABRIR INVITACIÓN
            </motion.button>
          </motion.div>
        </div>
      </main>
    );
  }

  // ============================================
  // INVITACIÓN
  // ============================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8fb] text-gray-700">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src="/musica/musica.mp3"
        loop
      />

      {/* BOTÓN MÚSICA */}

      <button
        onClick={toggleMusic}
        className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg backdrop-blur"
      >
        {musicPlaying ? "🔊" : "🎵"}
      </button>

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/imagenes/fondo-baby.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-white/55" />

        <div className="relative z-10 w-full max-w-3xl text-center">

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-sm tracking-[0.4em] text-gray-500"
          >
            ESTAMOS ESPERANDO
          </motion.p>

          <motion.h1
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
            className="mt-5 text-6xl font-light text-[#ad728c] md:text-8xl"
          >
            Un bebé
          </motion.h1>

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="my-8 text-7xl"
          >
            👶
          </motion.div>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            Hay una personita que está por llegar
            <br />
            y queremos compartir esta hermosa
            <br />
            espera contigo.
          </p>

          <div className="mt-10 text-3xl text-[#ad728c]">
            {datos.mama} & {datos.papa}
          </div>

          <p className="mt-4 text-gray-500">
            tenemos el corazón lleno de amor
          </p>

        </div>
      </section>

      {/* ========================================= */}
      {/* CUENTA REGRESIVA */}
      {/* ========================================= */}

      <section className="bg-white px-5 py-20">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm tracking-[0.3em] text-gray-400">
            FALTA MUY POQUITO
          </p>

          <h2 className="mt-3 text-4xl text-[#ad728c]">
            Cuenta regresiva
          </h2>

          <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-5">

            {[
              {
                valor: timeLeft.dias,
                texto: "DÍAS",
              },
              {
                valor: timeLeft.horas,
                texto: "HORAS",
              },
              {
                valor: timeLeft.minutos,
                texto: "MINUTOS",
              },
              {
                valor: timeLeft.segundos,
                texto: "SEGUNDOS",
              },
            ].map((item) => (
              <div
                key={item.texto}
                className="rounded-3xl bg-[#fff3f7] px-2 py-5 shadow-sm"
              >
                <div className="text-3xl font-light text-[#ad728c] sm:text-5xl">
                  {String(item.valor).padStart(2, "0")}
                </div>

                <div className="mt-2 text-[9px] tracking-wider text-gray-500 sm:text-xs">
                  {item.texto}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* REVELACIÓN */}
      {/* ========================================= */}

      <section className="relative overflow-hidden px-5 py-24">

        <div className="absolute inset-0 bg-[#fff4f8]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          <p className="text-sm tracking-[0.35em] text-gray-400">
            UNA GRAN SORPRESA
          </p>

          <h2 className="mt-4 text-5xl text-[#ad728c]">
            ¿Niño o niña?
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-gray-600">
            Hay un pequeño secreto que queremos
            descubrir junto a ustedes...
          </p>

          <AnimatePresence mode="wait">

            {!revealed ? (
              <motion.div
                key="pregunta"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="mt-12"
              >

                <div className="flex justify-center gap-8 text-7xl">
                  <motion.span
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    💙
                  </motion.span>

                  <motion.span
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.3,
                    }}
                  >
                    💗
                  </motion.span>
                </div>

                <button
                  onClick={revelar}
                  className="mt-10 rounded-full bg-[#ad728c] px-10 py-4 text-white shadow-xl transition hover:scale-105"
                >
                  ✨ DESCUBRIR LA SORPRESA ✨
                </button>

              </motion.div>
            ) : (
              <motion.div
                key="resultado"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="mt-12"
              >

                <div className="text-8xl">
                  💗
                </div>

                <h3 className="mt-6 text-5xl font-light text-[#d486a4]">
                  ¡Es una niña!
                </h3>

                <p className="mt-5 text-lg text-gray-600">
                  Una pequeña princesa
                  <br />
                  viene en camino.
                </p>

                <div className="mt-6 text-4xl">
                  🎀 👶 🎀
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </section>

      {/* ========================================= */}
      {/* DATOS DEL EVENTO */}
      {/* ========================================= */}

      <section className="bg-white px-5 py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm tracking-[0.3em] text-gray-400">
            CELEBREMOS JUNTOS
          </p>

          <h2 className="mt-4 text-5xl text-[#ad728c]">
            Baby Shower
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">

            <div className="rounded-3xl bg-[#fff4f8] p-7">
              <div className="text-4xl">📅</div>
              <h3 className="mt-4 font-medium text-[#ad728c]">
                FECHA
              </h3>
              <p className="mt-2 text-gray-600">
                {datos.fechaTexto}
              </p>
            </div>

            <div className="rounded-3xl bg-[#fff4f8] p-7">
              <div className="text-4xl">⏰</div>
              <h3 className="mt-4 font-medium text-[#ad728c]">
                HORA
              </h3>
              <p className="mt-2 text-gray-600">
                {datos.hora}
              </p>
              <p className="text-sm text-gray-400">
                horas
              </p>
            </div>

            <div className="rounded-3xl bg-[#fff4f8] p-7">
              <div className="text-4xl">📍</div>
              <h3 className="mt-4 font-medium text-[#ad728c]">
                LUGAR
              </h3>
              <p className="mt-2 text-gray-600">
                {datos.lugar}
              </p>
              <p className="text-sm text-gray-400">
                {datos.direccion}
              </p>
            </div>

          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Oruro+Bolivia"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-[#ad728c] px-9 py-4 text-sm tracking-wider text-white shadow-lg"
          >
            📍 VER UBICACIÓN
          </a>

        </div>
      </section>

      {/* ========================================= */}
      {/* MENSAJE */}
      {/* ========================================= */}

      <section className="bg-[#fff4f8] px-6 py-24 text-center">

        <div className="mx-auto max-w-2xl">

          <div className="text-5xl">
            🧸
          </div>

          <h2 className="mt-6 text-4xl text-[#ad728c]">
            Tu presencia hará
            <br />
            este día aún más especial
          </h2>

          <p className="mt-6 leading-relaxed text-gray-600">
            Nos encantaría compartir contigo
            este momento tan importante
            para nuestra familia.
          </p>

          <button
            onClick={confirmarWhatsApp}
            className="mt-10 rounded-full bg-[#25D366] px-10 py-4 font-medium text-white shadow-xl transition hover:scale-105"
          >
            💬 CONFIRMAR ASISTENCIA
          </button>

        </div>

      </section>

      {/* ========================================= */}
      {/* FINAL */}
      {/* ========================================= */}

      <footer className="bg-white px-6 py-20 text-center">

        <div className="text-4xl">
          🎀 👶 🎀
        </div>

        <p className="mt-6 text-sm tracking-[0.3em] text-gray-400">
          CON MUCHO AMOR
        </p>

        <h2 className="mt-4 text-4xl text-[#ad728c]">
          {datos.mama} & {datos.papa}
        </h2>

        <p className="mt-6 text-gray-400">
          Gracias por ser parte de nuestra historia.
        </p>

      </footer>

    </main>
  );
}