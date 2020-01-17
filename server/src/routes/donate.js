import Router from 'koa-router';

const router = new Router();
const currencies = [
	{name: "US Dollar", code: "USD", symbol: "$", rate: 1},
	{name: "Euro", code: "EUR", symbol: "€", rate: 0.897597},
	{name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755},
	{name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993}
];

router.post('/', async (ctx, next) => {
  const { amount, currency } = ctx.request.body;
  if(Number(amount) < 0) {
    ctx.throw(406, "Amount below zero!");
    return;

  } else if(currencies.find(it => it.code === currency) === undefined) {
    ctx.throw(406, "No such currency!");
    return;
  }

  const result = await ctx.db.collection('donations').insert({ amount, currency });
  if(result) {
    ctx.response.status = 200;
    ctx.response.type = "application/x-www-form-urlencoded";
    ctx.response.body = '{"ok": "true"}';
  }
  else {
    ctx.response.status = 500;
    ctx.response.body = result;
  }
});

export default router;
