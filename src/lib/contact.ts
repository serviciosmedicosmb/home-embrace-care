export const WHATSAPP_NUMBER = "56965824407";
export const EMAIL = "serviciosmedicosmb@gmail.com";

export const waLink = (msg: string = "Hola, necesito información sobre atención médica a domicilio.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
