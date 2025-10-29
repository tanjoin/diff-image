export const SPLASH_SCREEN_HTML = ` 
  <div id="splash-screen">
    <h1>diff-image</h1>
  </div>
`;

export function showSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.style.display = 'flex';
  setTimeout(() => {
    splashScreen.classList.add('hidden');
  }, 2000);
}