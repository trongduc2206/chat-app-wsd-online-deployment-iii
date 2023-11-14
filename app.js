import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as chatService from "./services/chatService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const handleFormData = async (request) => {
  const formData = await request.formData();
  await chatService.addMessage(formData.get("sender"), formData.get("message"))
};

const handleRequest = async (request) => {
  if(request.method === "POST") {
    await handleFormData(request);
    return redirectTo(request.url);
  }
  data.messages = await chatService.getMessages();
  return new Response(await renderFile("index.eta", data), responseDetails);
};

serve(handleRequest, { port: 7777 });
