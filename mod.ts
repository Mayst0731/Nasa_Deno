// @ts-nocheck
import * as log from "https://deno.land/std/log/mod.ts";

import { Application, send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
    },
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console"],
        }
    }
});

app.use(async (ctx,next) => { 
    await next();
    log.info(`${ctx.request.method} ${ctx.request.url}`);
});

app.use(api.routes());

app.use(async (ctx) => { 
    const filePath = ctx.request.url.pathname;
    const fileWhitelist = [
        "/index.html",
        "/javascripts/script.js",
        "/stylesheets/style.css",
        "/images/favicon.png",
    ];
    if (fileWhitelist.includes(filePath)) { 
        await send(ctx, filePath, {
        root: `${Deno.cwd()}/public`
    });
    };
    
});


if (import.meta.main) { 
    log.info(`Starting server on port ${PORT}......`);
    await app.listen({
        port: PORT,
    });
} 

