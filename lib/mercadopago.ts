import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_KEY!,
});

export const preference = new Preference(mp);
export const payment = new Payment(mp);
