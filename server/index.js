import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

app.use(express.json());

const getMercadoPagoClient = () => {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN não configurado.");
  }
  return new MercadoPagoConfig({ accessToken });
};

const buildItems = (payload) => {
  if (Array.isArray(payload.items) && payload.items.length > 0) {
    return payload.items;
  }

  const unitPrice = Number(payload.unit_price ?? payload.amount ?? 0);
  return [
    {
      title: payload.title ?? "Plano YvesX",
      description: payload.description ?? "Pagamento de serviço",
      quantity: Number(payload.quantity ?? 1),
      unit_price: unitPrice,
      currency_id: payload.currency_id ?? "BRL",
    },
  ];
};

app.post("/api/pagamento", async (req, res) => {
  try {
    const items = buildItems(req.body);

    if (!items[0]?.unit_price || Number.isNaN(items[0].unit_price)) {
      return res.status(400).json({ error: "Informe um valor válido para unit_price." });
    }

    const preference = new Preference(getMercadoPagoClient());
    const response = await preference.create({
      body: {
        items,
        payer: req.body.payer,
        back_urls: req.body.back_urls,
        auto_return: req.body.auto_return ?? "approved",
        external_reference: req.body.external_reference,
        notification_url: req.body.notification_url,
        statement_descriptor: req.body.statement_descriptor,
        payment_methods: {
          installments: 12,
        },
        max_installments: 12,
      },
    });

    return res.status(201).json({ init_point: response.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    return res.status(500).json({ error: "Não foi possível criar a preferência." });
  }
});

app.post("/api/webhook", (req, res) => {
  console.log("Webhook Mercado Pago recebido:", {
    query: req.query,
    body: req.body,
  });

  return res.sendStatus(200);
});

const port = Number(process.env.PORT ?? 3333);

app.listen(port, () => {
  console.log(`Servidor Mercado Pago ativo na porta ${port}`);
});
