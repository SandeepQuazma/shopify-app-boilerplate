require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

//const Cryptr = require('cryptr');


dotenv.config();
const {default: graphQLProxy} = require('@shopify/koa-shopify-graphql-proxy');
const {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(graphQLProxy({version: ApiVersion.October20}));
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'write_script_tags', 'read_script_tags'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
  //      console.log(shop);
//        console.log(accessToken);
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
      }) 
      const query = JSON.stringify(
        {
          query: `mutation {
              scriptTagCreate(input: {
                src: "https://e20eb9f4365a.ngrok.io/script-tag.js"
                displayScope: "All"
              }) {
                  scriptTag {
                      id
                  }
                  userErrors {
                      field
                      message
                  }
                }
            }`
        }
      )
  fetch(`https://${shop}/admin/api/2021-01/script_tags.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  //    "X-Shopify-Access-Token": accessToken,
    },
    body: query
  }).then(async response => {
    const data = await response.json();
    // check for error response
    try{
      if (response.ok) {
        // get error message from body or default to response status
    //    const error = (data && data.message) || response.status;
     //   return Promise.reject(error);
     console.log(`no errorr!!!`);
    }
    }
    catch(error){
      this.setState({ errorMessage: error.toString() }).bind(this);
    console.error('There was an error!', error);
    }
    
});
//  const confirmationUrl = responseJson.data.scriptTagCreate.scriptTag;
   console.log(`hi`);

        ctx.redirect('/');
      },
    }),
  );

 
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

/*JSON.stringify(`script_tag: {
  event: "onload",
  src: "https://e20eb9f4365a.ngrok.io/script-tag.js" 
}`) */