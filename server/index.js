import express from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

/* ======================
   PLANOS (BACKEND)
====================== */
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

/* ======================
   HELPERS
====================== */
function getMercadoPagoClient() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN não configurado");
  }
  return new MercadoPagoConfig({ accessToken });
}

function getBaseUrl(req) {
  // fallback automático se APP_BASE_URL não existir
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL.replace(/\/$/, "");
  }

  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  return `${protocol}://${host}`;
}

/* ======================
   CRIAR PAGAMENTO
====================== */
app.post("/api/pagamento", async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({ error: "Plano inválido" });
    }

    const preference = new Preference(getMercadoPagoClient());
    const baseUrl = getBaseUrl(req);

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

    return res.status(201).json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

/* ======================
   WEBHOOK
====================== */
app.post("/api/webhook", async (req, res) => {
  try {
    const paymentId =
      req.query.id ??
      req.query["data.id"] ??
      req.body?.data?.id ??
      req.body?.id;

    if (!paymentId) {
      return res.sendStatus(200);
    }

    const paymentClient = new Payment(getMercadoPagoClient());
    const payment = await paymentClient.get({ id: String(paymentId) });

    console.log("Webhook Mercado Pago:", {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      plan: payment.external_reference,
      amount: payment.transaction_amount,
      payer: payment.payer?.email,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.sendStatus(200);
  }
});

/* ======================
   HEALTH CHECK (OPCIONAL)
====================== */
app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

/* ======================
   START SERVER
====================== */
const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log("Servidor Mercado Pago ativo na porta", PORT);
});
