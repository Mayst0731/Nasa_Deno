import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import * as planets from "./models/planets.ts";

const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = `
    {___       {_
    {_ {_      {_
    {_   {_    {_
    {_     {_  {_
    {_       {_ _
    {_         {_ 
    Mission control api`
});

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAllPlanets();
});

export default router;