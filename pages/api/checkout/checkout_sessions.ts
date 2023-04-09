const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  // PRICE_ID='price_1LhcwyH2MvKiDghEYHEra8My'
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: "price_1LhcwyH2MvKiDghEYHEra8My", quantity: 1 }],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/user/users/purchase/result?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/user/users/purchase/?canceled=true`,
      });
      console.log(
        "🚀 ~ file: checkout_sessions.ts:14 ~ handler ~ session:",
        session
      );
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
