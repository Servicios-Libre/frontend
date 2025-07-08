import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export const useProfileTour = (isWorker: boolean | null) => {
  const steps: DriveStep[] = [
    {
      element: "#profile-photo-container",
      popover: {
        title: "Tu Foto de Perfil",
        description:
          "Aquí puedes ver y cambiar tu foto. Tenerla es obligatorio para ser trabajador, ¡Una buena foto aumenta la confianza!",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#profile-name-section",
      popover: {
        title: "Tu Nombre y Estatus",
        description:
          "Este es tu nombre de usuario. Puedes editar tu nombre activando el modo de edición.",
        side: "bottom",
      },
    },
    {
      element: "#profile-completion-bar",
      popover: {
        title: "Progreso del Perfil",
        description:
          "Para poder solicitar ser trabajador, necesitas completar tu perfil al 100%.",
        side: "bottom",
      },
    },
    {
      element: "#profile-worker-request",
      popover: {
        title: "Ser Trabajador",
        description:
          "Una vez tu perfil esté completo, puedes usar este botón para solicitar convertirte en trabajador y ofrecer tus servicios.",
        side: "top",
      },
    },
  ];

  const workerSteps: DriveStep[] = []
    if (isWorker) {

    workerSteps.push(
      {
        element: "#profile-worker-button",
        popover: {
          title: "Ir a tu perfil",
          description:
            "Aquí puedes ver tu perfil como trabajador, donde podrás gestionar tus servicios y ver tus reseñas.",
          side: "bottom",
        },
      },
      {
        element: "#profile-post-service",
        popover: {
          title: "Publicar un Servicio",
          description:
            "Puedes usar este botón para publicar el servicio que ofreces. Si el servicio es válido, un administrador lo aceptará.",
          side: "top",
        },
      } as DriveStep
    );

  }

  const startProfileTour = () => {
    const driverInstance = driver({
      showProgress: true,
      animate: true,
      onDestroyed: () => {
        localStorage.setItem("profileTourCompleted", "true");
      },
      steps: isWorker ? workerSteps : steps,
    });
    driverInstance.drive();
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem("profileTourCompleted");
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        startProfileTour();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return { startProfileTour }
};
