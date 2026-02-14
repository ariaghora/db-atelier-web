interface Env {
	APP_DOWNLOAD_COUNTS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
	const url = new URL(request.url);
	const fileUrl = url.searchParams.get("url");

	if (!fileUrl || !fileUrl.startsWith("https://cdn.dbatelier.app/releases/")) {
		return new Response("Invalid URL", { status: 400 });
	}

	const platform = url.searchParams.get("platform") || "macos";
	const key = `app:${platform}`;
	const current = parseInt((await env.APP_DOWNLOAD_COUNTS.get(key)) || "0");
	await env.APP_DOWNLOAD_COUNTS.put(key, String(current + 1));

	return Response.redirect(fileUrl, 302);
};
