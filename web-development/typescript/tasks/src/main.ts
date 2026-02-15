const btn = document.querySelector<HTMLButtonElement>('.test-btn'); // Because querySelector is a common Element generic type, it'll have all the common Element methods, you can specify what type of generic Element you want to use

// or you could do this instead of generic
const btn2 = document.querySelector('.btest-btn') as HTMLButtonElement;

btn?.addEventListener // Needs ? because it will only work if it exists, so make sure it does or else it won't run

btn2.disabled = true;