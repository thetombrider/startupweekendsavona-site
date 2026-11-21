# Brevo ticket discount

## Preview locally

Run `BREVO_PREVIEW=1 npm run dev`. Open [localhost:3000](http://localhost:3000/). Select **Compra il biglietto con il 10% di sconto** and submit a test email address. Preview mode does not send or store the address. It works only with the Next.js development server.

## Connect Brevo

1. In [Brevo → SMTP & API → API keys](https://app.brevo.com/settings/keys/api), select **Generate a new API key**. Brevo shows the key only once. See the [API key guide](https://developers.brevo.com/docs/api-key-authentication).
2. For a live local test, add `BREVO_API_KEY=…` to `.env.local`. Keep the key out of version control. Restart with `npm run dev`, without `BREVO_PREVIEW=1`.
3. Submit an address that you control. Check that the address appears in [Contacts → Lists](https://my.brevo.com/lists), in list **45**.
4. In Vercel, add `BREVO_API_KEY` to the Production environment. Add a rate limit for `POST /api/ticket-interest` before you deploy.

If Brevo rejects a valid key, check the [IP security settings](https://developers.brevo.com/docs/ip-security) and the list ID.

## API behavior

The route sends `{ email, listIds: [45], updateEnabled: true }` to [POST /v3/contacts](https://developers.brevo.com/reference/create-contact). A new contact returns `201`. An existing contact returns `204`. See [Brevo’s contact list guide](https://developers.brevo.com/docs/synchronise-contact-lists). The API key goes in the `api-key` header on the server. No SMTP credentials are required.

The form adds contacts to the list. It does not send email or reserve a ticket. Before deployment, configure the list 45 automation to send the discount code and purchase link. Test it with a new contact and with a contact that is already on the list.
