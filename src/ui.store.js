import { writable } from "svelte/store";

export const state = writable('idle');
export const participant_count = writable(null);
export const mode = writable('filtered');