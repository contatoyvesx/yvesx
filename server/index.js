import express from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const app = express();

app.use(express.json());

const plans = {
  basico: {
    title: "Plano Básico",
    description: "Site essencial para começar a vender online.",
    unit_price: 1490,
  },
  pro: {
    title: "Plano Pro",
    description: "Mais conversão com layout estratégico e integrações.",
    unit_price: 2490,
  },
  premium: {
    title: "Plano Premium",
    description: "Experiência premium com foco total em performance.",
    unit_price: 3990,
  },
};

const getMercadoPagoClient = () => {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN não configurado.");
  }
  return new MercadoPagoConfig({ accessToken });
};

const getBaseUrl = () => {
  const baseUrl = process.env.APP_BASE_URL;
  if (!baseUrl) {
    throw new Error("APP_BASE_URL não configurado.");
  }
  return baseUrl.replace(/\/$/, "");
};

app.post("/api/pagamento", async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({ error: "Plano inválido." });
    }

    const preference = new Preference(getMercadoPagoClient());
    const baseUrl = getBaseUrl();

    const response = await preference.create({
      body: {
        items: [
          {
            title: selectedPlan.title,
            description: selectedPlan.description,
            quantity: 1,
            unit_price: selectedPlan.unit_price,
            currency_id: "BRL",
          },
        ],
        external_reference: plan,
        back_urls: {
          success: `${baseUrl}/pagamento/sucesso`,
          failure: `${baseUrl}/pagamento/falha`,
          pending: `${baseUrl}/pagamento/pendente`,
        },
        notification_url: `${baseUrl}/api/webhook`,
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

app.post("/api/webhook", async (req, res) => {
  try {
    const { topic, type, id, data } = req.query;
    const bodyData = req.body?.data;
    const paymentId = id ?? data?.id ?? bodyData?.id ?? req.body?.id;
    const eventType = type ?? topic ?? req.body?.type;

    if (eventType !== "payment" || !paymentId) {
      return res.sendStatus(200);
    }

    const paymentClient = new Payment(getMercadoPagoClient());
    const payment = await paymentClient.get({ id: String(paymentId) });
    const plan = payment.external_reference ?? "desconhecido";

    console.log("Pagamento atualizado:", {
      id: payment.id,
      status: payment.status,
      plan,
      status_detail: payment.status_detail,
      amount: payment.transaction_amount,
      payer_email: payment.payer?.email,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao processar webhook Mercado Pago:", error);
    return res.sendStatus(200);
  }
});

const port = Number(process.env.PORT ?? 3333);

app.listen(port, () => {
  console.log(`Servidor Mercado Pago ativo na porta ${port}`);
});
