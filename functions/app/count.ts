interface Env {
	APP_DOWNLOAD_COUNTS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
	let total = 0;
	for (const platform of ["macos", "windows", "linux"]) {
		const val = await env.APP_DOWNLOAD_COUNTS.get(`app:${platform}`);
		total += parseInt(val || "0");
	}

	return new Response(JSON.stringify({ count: total }), {
		headers: { "Content-Type": "application/json" },
	});
};
