"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // ============================================================
  // DATOS DE LA INVITACIÓN
  // ============================================================

  const datos = {
    mama: "Adriana Maldonado",
    papa: "Aldair Lopez",

    fechaEvento: "2026-09-05T14:30:00",

    fechaTexto: "5 de septiembre de 2026",
    hora: "14:30",

    lugar: "Casa Cochabamba",

    direccion:
      "14 de Septiembre entre Av. Circunvalación y Cochabamba, Bolivia",

    whatsapp: "59169580486",

    mensajeWhatsApp:
      "Hola Adriana y Aldair 🕷️🕸️ Confirmo mi asistencia a su Baby Shower y Revelación de Género del 5 de septiembre. 👶💙🩷",
  };

  // ============================================================
  // ESTADOS
  // ============================================================

  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ============================================================
  // CUENTA REGRESIVA
  // ============================================================

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

  // ============================================================
  // MÚSICA
  // ============================================================

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
          console.log(
            "El navegador bloqueó la reproducción."
          );
        });
    }
  };

  // ============================================================
  // CONFETI AZUL + ROSADO
  // ============================================================

  const lanzarConfeti = () => {
    const colores = [
      "💙",
      "🩷",
      "💙",
      "🩷",
      "💙",
      "🩷",
    ];

    for (let i = 0; i < 150; i++) {
      const confeti =
        document.createElement("div");

      confeti.innerHTML =
        colores[
          Math.floor(
            Math.random() *
              colores.length
          )
        ];

      confeti.style.position =
        "fixed";

      confeti.style.left =
        `${Math.random() * 100}vw`;

      confeti.style.top =
        "-40px";

      confeti.style.fontSize =
        `${Math.random() * 18 + 12}px`;

      confeti.style.zIndex =
        "99999";

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
            opacity: 0.9,
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

  // ============================================================
  // ABRIR SECRETO
  // ============================================================

  const abrirSecreto = () => {
    setSecretOpen(true);
    lanzarConfeti();
  };

  // ============================================================
  // WHATSAPP
  // ============================================================

  const confirmarWhatsApp = () => {
    const url =
      `https://wa.me/${datos.whatsapp}` +
      `?text=${encodeURIComponent(
        datos.mensajeWhatsApp
      )}`;

    window.open(
      url,
      "_blank"
    );
  };

  // ============================================================
  // PORTADA
  // ============================================================

  if (!opened) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#080808]">

        {/* FONDO */}

        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/imagenes/fondo-spider.jpg')",
          }}
        />

        {/* OSCURECER FONDO */}

        <div className="fixed inset-0 bg-black/70" />

        {/* TELARAÑAS */}

        <div className="pointer-events-none fixed left-0 top-0 text-[130px] opacity-30">
          🕸️
        </div>

        <div className="pointer-events-none fixed right-0 top-0 rotate-90 text-[130px] opacity-30">
          🕸️
        </div>

        <div className="pointer-events-none fixed bottom-0 left-0 -rotate-90 text-[130px] opacity-30">
          🕸️
        </div>

        <div className="pointer-events-none fixed bottom-0 right-0 rotate-180 text-[130px] opacity-30">
          🕸️
        </div>

        {/* CONTENIDO */}

        <div className="relative flex min-h-screen items-center justify-center px-5 py-10">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-[40px] border border-white/20 bg-black/75 px-7 py-12 text-center shadow-2xl backdrop-blur-md"
          >

            {/* TELARAÑA SUPERIOR */}

            <div className="absolute left-1/2 top-0 -translate-x-1/2 text-7xl opacity-20">
              🕸️
            </div>

            <p className="relative mt-3 text-xs font-bold tracking-[0.45em] text-white/70">
              🕷️ UNA NUEVA AVENTURA 🕷️
            </p>

            <h1 className="mt-7 text-5xl font-black uppercase tracking-wide text-white">
              Spider
            </h1>

            <h2 className="text-6xl font-black uppercase tracking-wide text-[#e31b23]">
              Baby
            </h2>

            <div className="my-7 text-7xl">
              🕷️
            </div>

            <p className="text-2xl font-bold text-white">
              Baby Shower
            </p>

            <p className="my-3 text-lg font-bold text-white/50">
              &
            </p>

            <p className="text-2xl font-bold text-white">
              Revelación de Género
            </p>

            <div className="mx-auto mt-7 h-1 w-24 bg-[#e31b23]" />

            <p className="mt-7 leading-relaxed text-white/70">
              Una pequeña arañita está
              <br />
              por llegar a nuestras vidas...
            </p>

            <p className="mt-6 text-xl font-semibold text-white">
              {datos.mama}

              <span className="mx-2 text-[#e31b23]">
                &
              </span>

              {datos.papa}
            </p>

            <motion.button
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() =>
                setOpened(true)
              }
              className="mt-9 rounded-full bg-[#e31b23] px-10 py-4 text-sm font-bold tracking-[0.18em] text-white shadow-[0_0_30px_rgba(227,27,35,0.45)]"
            >
              🕷️ ABRIR INVITACIÓN
            </motion.button>

          </motion.div>

        </div>

      </main>
    );
  }

  // ============================================================
  // INVITACIÓN COMPLETA
  // ============================================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f7] text-[#171717]">

      {/* ====================================================== */}
      {/* AUDIO */}
      {/* ====================================================== */}

      <audio
        ref={audioRef}
        src="/musica/musica.mp3"
        loop
      />

      {/* ====================================================== */}
      {/* BOTÓN MÚSICA */}
      {/* ====================================================== */}

      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        onClick={toggleMusic}
        className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#e31b23] bg-black text-xl text-white shadow-xl"
      >
        {musicPlaying
          ? "🔊"
          : "🎵"}
      </motion.button>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

        {/* TELARAÑAS */}

        <div className="absolute left-[-40px] top-[-30px] text-[150px] opacity-30">
          🕸️
        </div>

        <div className="absolute right-[-40px] top-[-30px] rotate-90 text-[150px] opacity-30">
          🕸️
        </div>

        <div className="absolute bottom-[-40px] left-[-40px] -rotate-90 text-[150px] opacity-30">
          🕸️
        </div>

        <div className="absolute bottom-[-40px] right-[-40px] rotate-180 text-[150px] opacity-30">
          🕸️
        </div>

        {/* ARAÑAS */}

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute left-5 top-1/3 text-5xl"
        >
          🕷️
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute right-5 top-1/2 text-5xl"
        >
          🕷️
        </motion.div>

        {/* CONTENIDO */}

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-xs font-bold tracking-[0.5em] text-white/60"
          >
            UNA NUEVA AVENTURA ESTÁ POR COMENZAR
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
            className="mt-7 text-6xl font-black uppercase tracking-wider text-white md:text-8xl"
          >
            Spider

            <span className="block text-[#e31b23]">
              Baby
            </span>
          </motion.h1>

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="my-8 text-8xl"
          >
            🕷️
          </motion.div>

          <p className="text-xl font-semibold text-white">
            {datos.mama}

            <span className="mx-2 text-[#e31b23]">
              &
            </span>

            {datos.papa}
          </p>

          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-white/70">
            Estamos esperando la llegada
            de nuestro pequeño superhéroe
            o superheroína...
          </p>

          <div className="mt-7 flex justify-center gap-5 text-4xl">
            <span>💙</span>
            <span>❓</span>
            <span>🩷</span>
          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* MENSAJE */}
      {/* ====================================================== */}

      <section className="relative bg-white px-6 py-24">

        <div className="absolute left-3 top-3 text-5xl opacity-10">
          🕸️
        </div>

        <div className="absolute right-3 top-3 text-5xl opacity-10">
          🕸️
        </div>

        <div className="relative mx-auto max-w-2xl text-center">

          <div className="text-5xl">
            🕷️
          </div>

          <p className="mt-6 text-xs font-bold tracking-[0.4em] text-[#e31b23]">
            UNA MISIÓN MUY ESPECIAL
          </p>

          <h2 className="mt-5 text-4xl font-black uppercase text-[#171717]">
            El comienzo de nuestra aventura
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 bg-[#e31b23]" />

          <p className="mt-7 leading-relaxed text-gray-600">
            La vida nos ha regalado una
            misión maravillosa.

            <br />
            <br />

            Una pequeña personita está
            creciendo y queremos celebrar
            su llegada junto a las personas
            que más queremos.

            <br />
            <br />

            💙 ¿Será un pequeño superhéroe?

            <br />

            🩷 ¿Será una pequeña superheroína?

            <br />
            <br />

            La respuesta...
            <strong>
              nadie la sabe todavía.
            </strong>
          </p>

        </div>

      </section>

      {/* ====================================================== */}
      {/* ADRIANA Y ALDAIR DE BEBÉS */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-[#f7f7f7] px-5 py-28">

        {/* TELARAÑAS */}

        <div className="pointer-events-none absolute left-[-30px] top-[-20px] text-[130px] opacity-[0.08]">
          🕸️
        </div>

        <div className="pointer-events-none absolute right-[-30px] top-[-20px] rotate-90 text-[130px] opacity-[0.08]">
          🕸️
        </div>

        <div className="pointer-events-none absolute bottom-[-30px] left-[-30px] -rotate-90 text-[130px] opacity-[0.08]">
          🕸️
        </div>

        <div className="pointer-events-none absolute bottom-[-30px] right-[-30px] rotate-180 text-[130px] opacity-[0.08]">
          🕸️
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* TÍTULO */}

          <div className="text-center">

            <div className="text-5xl">
              🕷️
            </div>

            <p className="mt-6 text-xs font-black tracking-[0.4em] text-[#e31b23]">
              ANTES DE ESTA AVENTURA
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase text-[#171717] md:text-5xl">
              Érase una vez...
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 bg-[#e31b23]" />

            <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-gray-600">
              Antes de convertirnos en mamá
              y papá, nosotros también fuimos
              pequeños.

              <br />
              <br />

              Y quién sabe...
              quizá nuestro pequeño
              superhéroe se parezca un
              poquito a alguno de nosotros.
              🥹
            </p>

          </div>

          {/* ================================================= */}
          {/* ADRIANA */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mt-16"
          >

            <div className="mb-7 text-center">

              <div className="inline-flex items-center gap-3">

                <span className="text-3xl">
                  🩷
                </span>

                <h3 className="text-3xl font-black uppercase text-[#171717]">
                  Adriana de bebé
                </h3>

                <span className="text-3xl">
                  🕷️
                </span>

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Nuestra futura mamá también
                fue una pequeña superheroína.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[30px] border-4 border-white bg-white p-2 shadow-xl"
              >

                <img
                  src="/imagenes/foto-adriana-bebe1.jpg"
                  alt="Adriana de bebé"
                  className="h-[420px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[24px] bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-16">

                  <p className="text-sm font-bold text-white">
                    Pequeña Adriana 🩷
                  </p>

                </div>

              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[30px] border-4 border-white bg-white p-2 shadow-xl"
              >

                <img
                  src="/imagenes/foto-adriana-bebe2.jpg"
                  alt="Adriana cuando era bebé"
                  className="h-[420px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[24px] bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-16">

                  <p className="text-sm font-bold text-white">
                    Una pequeña superheroína 🕷️
                  </p>

                </div>

              </motion.div>

            </div>

          </motion.div>

          {/* ================================================= */}
          {/* CONEXIÓN */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="my-20 text-center"
          >

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e31b23] text-4xl shadow-xl">
              🕷️
            </div>

            <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-relaxed text-[#171717]">
              Dos historias que algún día
              tenían que encontrarse...
            </p>

            <div className="mt-5 flex justify-center gap-3 text-3xl">
              <span>🩷</span>
              <span>❤️</span>
              <span>💙</span>
            </div>

          </motion.div>

          {/* ================================================= */}
          {/* ALDAIR */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="mb-7 text-center">

              <div className="inline-flex items-center gap-3">

                <span className="text-3xl">
                  🕷️
                </span>

                <h3 className="text-3xl font-black uppercase text-[#171717]">
                  Aldair de bebé
                </h3>

                <span className="text-3xl">
                  💙
                </span>

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Y nuestro futuro papá también
                tuvo su propia aventura.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[30px] border-4 border-white bg-white p-2 shadow-xl"
              >

                <img
                  src="/imagenes/foto-aldair-bebe1.jpg"
                  alt="Aldair de bebé"
                  className="h-[420px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[24px] bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-16">

                  <p className="text-sm font-bold text-white">
                    Pequeño Aldair 💙
                  </p>

                </div>

              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[30px] border-4 border-white bg-white p-2 shadow-xl"
              >

                <img
                  src="/imagenes/foto-aldair-bebe2.jpg"
                  alt="Aldair cuando era bebé"
                  className="h-[420px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[24px] bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-16">

                  <p className="text-sm font-bold text-white">
                    Un pequeño superhéroe 🕷️
                  </p>

                </div>

              </motion.div>

            </div>

          </motion.div>

          {/* ================================================= */}
          {/* FRASE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mt-20 text-center"
          >

            <div className="mx-auto max-w-2xl rounded-[35px] bg-black px-7 py-10 shadow-2xl">

              <div className="text-4xl">
                🕸️
              </div>

              <p className="mt-6 text-xl font-bold leading-relaxed text-white">
                Y ahora...
              </p>

              <p className="mt-3 text-2xl font-black uppercase text-[#e31b23]">
                Una nueva aventura comienza
              </p>

              <div className="mt-7 flex justify-center gap-4 text-4xl">
                <span>🩷</span>
                <span>🕷️</span>
                <span>💙</span>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FOTOS ACTUALES */}
      {/* ====================================================== */}

      <section className="bg-[#111114] px-5 py-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-bold tracking-[0.4em] text-[#e31b23]">
            NUESTRA HISTORIA
          </p>

          <h2 className="mt-5 text-4xl font-black uppercase text-white">
            Preparándonos para nuestra nueva misión
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/60">
            Cada momento nos acerca más
            a conocer a nuestro pequeño
            superhéroe o superheroína.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            {/* FOTO 1 */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="overflow-hidden rounded-[30px] border-4 border-white/10 shadow-2xl sm:row-span-2"
            >

              <img
                src="/imagenes/foto1.jpg"
                alt="Adriana y Aldair"
                className="h-full min-h-[450px] w-full object-cover transition duration-700 hover:scale-105"
              />

            </motion.div>

            {/* FOTO 2 */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="overflow-hidden rounded-[30px] border-4 border-white/10 shadow-2xl"
            >

              <img
                src="/imagenes/foto2.jpg"
                alt="Nuestra historia"
                className="h-64 w-full object-cover transition duration-700 hover:scale-105"
              />

            </motion.div>

            {/* FOTO 3 */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
              }}
              className="overflow-hidden rounded-[30px] border-4 border-white/10 shadow-2xl"
            >

              <img
                src="/imagenes/foto3.jpg"
                alt="Esperando a nuestro bebé"
                className="h-64 w-full object-cover transition duration-700 hover:scale-105"
              />

            </motion.div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* CUENTA REGRESIVA */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-[#e31b23] px-5 py-24">

        <div className="pointer-events-none absolute inset-0 flex items-center justify-around text-8xl opacity-10">
          🕸️ 🕸️ 🕸️
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold tracking-[0.4em] text-white/70">
            CUENTA REGRESIVA
          </p>

          <h2 className="mt-5 text-5xl font-black uppercase text-white">
            La misión comienza en
          </h2>

          <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-5">

            {[
              [timeLeft.dias, "DÍAS"],
              [timeLeft.horas, "HORAS"],
              [timeLeft.minutos, "MIN"],
              [timeLeft.segundos, "SEG"],
            ].map(
              ([valor, texto]) => (
                <div
                  key={texto}
                  className="rounded-3xl bg-black/90 p-4 shadow-xl"
                >

                  <div className="text-3xl font-black text-white sm:text-5xl">
                    {String(
                      valor
                    ).padStart(2, "0")}
                  </div>

                  <div className="mt-2 text-[9px] font-bold tracking-wider text-white/50 sm:text-xs">
                    {texto}
                  </div>

                </div>
              )
            )}

          </div>

          <div className="mt-8 font-bold text-white">
            {datos.fechaTexto}

            <span className="mx-2">
              •
            </span>

            {datos.hora}
          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* REVELACIÓN DE GÉNERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-white px-5 py-28">

        {/* TELARAÑAS */}

        <div className="absolute left-0 top-0 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="absolute right-0 top-0 rotate-90 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="absolute bottom-0 left-0 -rotate-90 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="absolute bottom-0 right-0 rotate-180 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          <p className="text-xs font-bold tracking-[0.4em] text-[#e31b23]">
            🕷️ TOP SECRET 🕷️
          </p>

          <h2 className="mt-5 text-5xl font-black uppercase text-[#171717]">
            ¿Niño o niña?
          </h2>

          <p className="mx-auto mt-7 max-w-lg leading-relaxed text-gray-600">
            Ni Spider-Man ni Spider-Woman
            conocen todavía la respuesta.

            <br />
            <br />

            ¿Quieres intentar descubrir
            el secreto?
          </p>

          <AnimatePresence mode="wait">

            {!secretOpen ? (

              <motion.div
                key="cerrado"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="mt-14"
              >

                {/* CAJA */}

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="mx-auto flex h-60 w-80 items-center justify-center rounded-[35px] border-4 border-[#171717] bg-[#e31b23] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                >

                  <div>

                    <div className="text-8xl">
                      🕷️
                    </div>

                    <p className="mt-4 text-sm font-black tracking-[0.4em] text-white">
                      TOP SECRET
                    </p>

                  </div>

                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={
                    abrirSecreto
                  }
                  className="mt-10 rounded-full bg-black px-10 py-5 text-sm font-black tracking-[0.15em] text-white shadow-xl"
                >
                  🕷️ DESCUBRIR EL SECRETO
                </motion.button>

              </motion.div>

            ) : (

              <motion.div
                key="abierto"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="mx-auto mt-14 max-w-md rounded-[35px] border-4 border-[#171717] bg-[#f7f7f7] px-7 py-10 shadow-2xl"
              >

                <div className="text-7xl">
                  🕷️
                </div>

                <h3 className="mt-6 text-3xl font-black uppercase text-[#e31b23]">
                  ¡El misterio continúa!
                </h3>

                <p className="mt-5 leading-relaxed text-gray-600">
                  El secreto está protegido.

                  <br />
                  <br />

                  La página no contiene
                  la respuesta.
                </p>

                <div className="mt-8 flex justify-center gap-5 text-5xl">
                  <span>💙</span>
                  <span>❓</span>
                  <span>🩷</span>
                </div>

                <p className="mt-8 font-bold text-[#171717]">
                  🕸️ Lo descubriremos juntos
                  <br />
                  el gran día.
                </p>

                <div className="mt-8 text-3xl">
                  🕷️ 🕸️ 🕷️
                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </section>

      {/* ====================================================== */}
      {/* INFORMACIÓN DEL EVENTO */}
      {/* ====================================================== */}

      <section className="bg-[#111114] px-5 py-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-bold tracking-[0.4em] text-[#e31b23]">
            PREPARA TU TRAJE DE SUPERHÉROE
          </p>

          <h2 className="mt-5 text-5xl font-black uppercase text-white">
            La gran misión
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">

            {/* FECHA */}

            <div className="rounded-[30px] bg-white p-8 shadow-xl">

              <div className="text-5xl">
                📅
              </div>

              <h3 className="mt-5 font-black tracking-[0.2em]">
                FECHA
              </h3>

              <p className="mt-4 text-gray-600">
                {datos.fechaTexto}
              </p>

            </div>

            {/* HORA */}

            <div className="rounded-[30px] bg-white p-8 shadow-xl">

              <div className="text-5xl">
                ⏰
              </div>

              <h3 className="mt-5 font-black tracking-[0.2em]">
                HORA
              </h3>

              <p className="mt-4 text-gray-600">
                {datos.hora}
              </p>

            </div>

            {/* LUGAR */}

            <div className="rounded-[30px] bg-white p-8 shadow-xl">

              <div className="text-5xl">
                📍
              </div>

              <h3 className="mt-5 font-black tracking-[0.2em]">
                LUGAR
              </h3>

              <p className="mt-4 text-gray-600">
                {datos.lugar}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                {datos.direccion}
              </p>

            </div>

          </div>

          {/* ================================================== */}
          {/* MAPA */}
          {/* ================================================== */}

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[30px] border-4 border-white shadow-2xl">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.02295767246576!2d-66.19505169608291!3d-17.346049058160695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37562795a049f%3A0xfb64bce4be27c90a!2sAgente%20BCP%20%22ALMACEN%20MIRANDA%22!5e0!3m2!1ses-419!2sbo!4v1786247069079!5m2!1ses-419!2sbo"
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

          <a
            href="https://www.google.com/maps/search/?api=1&query=Agente%20BCP%20ALMACEN%20MIRANDA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-[#e31b23] px-10 py-4 text-sm font-black tracking-wider text-white shadow-xl transition hover:scale-105"
          >
            📍 ABRIR EN GOOGLE MAPS
          </a>

        </div>

      </section>

      {/* ====================================================== */}
      {/* CONFIRMACIÓN */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden bg-white px-6 py-28 text-center">

        <div className="absolute left-0 top-0 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="absolute right-0 bottom-0 rotate-180 text-[130px] opacity-10">
          🕸️
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">

          <div className="text-6xl">
            🕷️
          </div>

          <p className="mt-7 text-xs font-bold tracking-[0.4em] text-[#e31b23]">
            NECESITAMOS TU AYUDA
          </p>

          <h2 className="mt-5 text-4xl font-black uppercase">
            ¿Te unes a nuestra misión?
          </h2>

          <p className="mt-7 leading-relaxed text-gray-600">
            Confirma tu asistencia y
            acompáñanos a descubrir juntos
            el gran secreto.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={
              confirmarWhatsApp
            }
            className="mt-10 rounded-full bg-[#25D366] px-10 py-5 font-black text-white shadow-xl"
          >
            💬 CONFIRMAR ASISTENCIA
          </motion.button>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FINAL */}
      {/* ====================================================== */}

      <footer className="relative overflow-hidden bg-black px-6 py-24 text-center">

        <div className="absolute left-0 top-0 text-[120px] opacity-10">
          🕸️
        </div>

        <div className="absolute right-0 bottom-0 rotate-180 text-[120px] opacity-10">
          🕸️
        </div>

        <div className="relative z-10">

          <div className="text-6xl">
            🕷️
          </div>

          <p className="mt-7 text-xs font-bold tracking-[0.4em] text-white/40">
            NUESTRA MAYOR AVENTURA
          </p>

          <h2 className="mt-5 text-3xl font-black text-white">
            {datos.mama}

            <span className="mx-2 text-[#e31b23]">
              &
            </span>

            {datos.papa}
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/40">
            Gracias por acompañarnos
            en esta nueva aventura.
          </p>

          <div className="mt-8 flex justify-center gap-4 text-3xl">
            <span>💙</span>
            <span>🕷️</span>
            <span>🩷</span>
          </div>

          <div className="mt-8 text-xl text-[#e31b23]">
            🕸️ 🕷️ 🕸️
          </div>

          <p className="mt-8 text-xs tracking-[0.3em] text-white/30">
            SPIDER BABY • 2026
          </p>

        </div>

      </footer>

    </main>
  );
}