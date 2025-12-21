import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ========= MIDDLEWARE ========= */
app.use(express.json());

/* ========= FRONTEND (VITE BUILD) ========= */
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

/* ========= PLANOS ========= */
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

/* ========= HELPERS ========= */
function mpClient() {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) throw new Error("MERCADO_PAGO_ACCESS_TOKEN ausente");
  return new MercadoPagoConfig({ accessToken: token });
}

function baseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${req.headers.host}`;
}

/* ========= API ========= */
app.post("/api/pagamento", async (req, res) => {
  try {
    const plan = plans[req.body.plan];
    if (!plan) return res.status(400).json({ error: "Plano inválido" });

    const pref = new Preference(mpClient());
    const url = baseUrl(req);

    const r = await pref.create({
      body: {
        items: [{
          title: plan.title,
          description: plan.description,
          quantity: 1,
          unit_price: plan.unit_price,
          currency_id: "BRL",
        }],
        external_reference: req.body.plan,
        back_urls: {
          success: `${url}/pagamento/sucesso`,
          failure: `${url}/pagamento/falha`,
          pending: `${url}/pagamento/pendente`,
        },
        notification_url: `${url}/api/webhook`,
        payment_methods: { installments: 12 },
        max_installments: 12,
      },
    });

    res.json({ init_point: r.init_point });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

app.post("/api/webhook", async (req, res) => {
  try {
    const id = req.body?.data?.id || req.query.id;
    if (!id) return res.sendStatus(200);

    const payment = await new Payment(mpClient()).get({ id });
    console.log("Webhook:", payment.status, payment.external_reference);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(200);
  }
});

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

/* ========= SPA FALLBACK ========= */
app.get("*", (_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* ========= START ========= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor ativo na porta", PORT);
});
