export default function detectTheme() {
  const userTheme = window.localStorage.getItem('theme');
  const scheme = '(prefers-color-scheme: dark)';
  const windowScheme = window.matchMedia(`${scheme}`);
  const windowTheme = windowScheme.matches ? 'black' : 'white';
  if (userTheme) return userTheme;
  return windowTheme;
}
