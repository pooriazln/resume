import { writable, derived } from 'svelte/store';
import { translations, type Language } from './translations';

// Create a writable store for the current language
export const currentLang = writable<Language>('fa');

// Derived store that returns the translations for the current language
export const t = derived(currentLang, ($lang) => translations[$lang]);

// Derived store for direction
export const dir = derived(currentLang, ($lang) => $lang === 'fa' ? 'rtl' : 'ltr');

// Function to toggle language
export function toggleLanguage() {
	currentLang.update(lang => lang === 'fa' ? 'en' : 'fa');
}

export { translations, type Language };
