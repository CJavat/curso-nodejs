import { Dropzone } from "dropzone";

const token = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("Content");

Dropzone.options.imagen = {
  dictDefaultMessages: "Sube tus imagenes aqui.",
  acceptedFiles: ".png, .jpg, .jpeg",
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFiles: "Borrar Archivo",
  dictMaxFilesExceeded: "El limite es 1 archivo",
  headers: {
    "CSRF-Token": token,
  },
  paramanName: "imagen",
  init: function () {
    const dropzone = this;
    const btnPublicar = document.querySelector("#publicar");

    btnPublicar.addEventListener("click", function () {
      dropzone.processQueue();
    });

    dropzone.on("queuecomplete", function () {
      if (dropzone.getActiveFiles().length == 0) {
        window.location.href = "/propiedades/mis-propiedades";
      }
    });
  },
};
