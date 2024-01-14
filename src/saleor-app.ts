import { SaleorApp } from "@saleor/app-sdk/saleor-app";
import { APL, FileAPL, UpstashAPL, EnvAPL } from "@saleor/app-sdk/APL";

/**
 * By default auth data are stored in the `.auth-data.json` (FileAPL).
 * For multi-tenant applications and deployments please use UpstashAPL.
 *
 * To read more about storing auth data, read the
 * [APL documentation](https://github.com/saleor/saleor-app-sdk/blob/main/docs/apl.md)
 */
export let apl: APL;
switch (process.env.APL) {
  case "upstash":
    // Require `UPSTASH_URL` and `UPSTASH_TOKEN` environment variables
    apl = new UpstashAPL();
    break;
  case "env":
    apl = new EnvAPL({
          env: {
            /**
             * Map your env variables here. You don't have these values yet
             */
            token: process.env.SALEOR_APP_TOKEN,
            appId: process.env.SALEOR_APP_ID,
            saleorApiUrl: process.env.SALEOR_API_URL,
          },
          /**
           * Set it to "true" - check your app logs during app registration. APL will print the values you need
           */
          printAuthDataOnRegister: true,
        });
    break;
  default:
    apl = new FileAPL();
}

export const saleorApp = new SaleorApp({
  apl,
});
