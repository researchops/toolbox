/// <reference types="@sveltejs/kit" />
/// <reference types="mdsvex/globals" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	interface Session {
		filters: any[]
	}
	// interface Stuff {}
}
