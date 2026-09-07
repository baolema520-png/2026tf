let pack = "";
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "pack") pack = event.data.body || "";
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.endsWith("/notes.webarchive")) return;
  event.respondWith((async () => {
    const body = pack;
    pack = "";
    if (!body) return new Response("missing", { status: 404 });
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/x-webarchive",
        "Content-Disposition": "attachment; filename=\"notes.webarchive\"",
        "Cache-Control": "no-store"
      }
    });
  })());
});
