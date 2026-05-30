export const WHATSAPP_NUMBER = "56982752313";
export const EMAIL = "serviciosmedicosmb@gmail.com";

export const waLink = (msg: string = "Hola, necesito información sobre sus servicios a domicilio.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
