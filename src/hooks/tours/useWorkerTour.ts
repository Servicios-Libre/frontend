// import { WorkerService } from "@/types";
import { driver, DriveStep } from "driver.js";
import { useEffect } from "react";
import "driver.js/dist/driver.css";
import "@/styles/driver-custom-styles.css";

export const useWorkerTour = (hasServices: boolean, isOwner: boolean) => {
  const steps: DriveStep[] = [
    {
      element: "#worker-header",
      popover: {
        title: "Tus datos",
        description:
          "Aquí los usuarios pueden ver tus datos, tu nombre, email, descripción, ubicación, teléfono, ¡Hasta incluso tus redes sociales! (si las has configurado)",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#worker-rate",
      popover: {
        title: "Tu valoración",
        description:
          "Aquí los usuarios pueden ver tu valoración promedio basada en las reseñas que has recibido. ¡Esfuérzate por mantener una buena reputación!",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#worker-service-list",
      popover: {
        title: "Tus servicios",
        description:
          "Aquí los usuarios podrán ver todos los servicios que ofreces (si fueron aceptados por un administrador).",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#create-new-service",
      popover: {
        title: "Crear un nuevo servicio",
        description:
          "Esto lo ves solo si eres tú quien está viendo tu perfil. Aquí puedes crear un nuevo servicio que ofreces.",
        side: "bottom",
        align: "start",
      },
    },
  ];
  if (hasServices) {
    steps.push(
      {
        element: "#edit-service-button",
        popover: {
          title: "Editar servicio",
          description:
            "Puedes editar los servicios que has publicado. Asegúrate de que la información esté actualizada y sea precisa. ¡Deberás agregar una imagen si quieres que sea aprobado!",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#delete-service-button",
        popover: {
          title: "Eliminar servicio",
          description:
            "Puedes eliminar un servicio que ya no ofreces. Esta acción es permanente, así que asegúrate de que realmente quieres eliminarlo.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#service-status",
        popover: {
          title: "Estado del servicio",
          description:
            "Aquí puedes ver el estado del servicio. Si es 'pendiente', significa que un administrador aún no lo ha revisado. Si es 'rechazado' es que tu servicio no cumplió con los requisitos. Si es 'aceptado', ¡ya está disponible para los usuarios!",
          side: "top",
          align: "start",
        },
      }
    );
  }
  steps.push({
    element: "#worker-reviews",
    popover: {
      title: "Tus reseñas",
      description:
        "Aquí los usuarios pueden ver las reseñas que has recibido por parte de tus clientes. ¡Recuerda que una buena atención al cliente puede mejorar tu reputación!",
      side: "top",
      align: "start",
    },
  });

  const startWorkerTour = () => {
    const driverInstace = driver({
      doneBtnText: "Finalizar",
      nextBtnText: "Siguiente",
      prevBtnText: "Anterior",
      progressText: "{{current}} de {{total}}",
      popoverClass: "driver-popover-custom",
      showProgress: true,
      smoothScroll: true,
      allowClose: true,
      animate: true,
      onPopoverRender: (popover) => {
        const title = popover.title;
        if (title) {
          title.style.background =
            "linear-gradient(135deg, #4285f4 0%, #3367d6 100%)";
        }
      },
      onDestroyed: () => {
        localStorage.setItem("workerTourCompleted", "true");
      },
      steps,
    });
    driverInstace.drive();
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem("workerTourCompleted");
    if (!tourCompleted && isOwner) {
      const timer = setTimeout(() => {
        startWorkerTour();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner]);

  return { startWorkerTour };
};
