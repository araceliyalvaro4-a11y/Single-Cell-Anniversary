
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-karen-monitor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full max-w-sm aspect-video bg-gray-900 rounded-lg shadow-lg overflow-hidden border-4 border-blue-700">
      <div class="absolute inset-0 flex items-center justify-center p-2 text-green-400 font-mono text-2xl md:text-3xl lg:text-4xl animate-pulse">
        @if (loading()) {
          <span class="text-yellow-400">Loading AI...</span>
        } @else if (expression() === 'heartbeat') {
          <div class="relative w-full h-full flex items-center justify-center">
            <svg class="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              <polyline fill="none" stroke="#22c55e" stroke-width="2" points="0,25 10,25 15,15 20,35 25,25 30,25 35,25 40,15 45,35 50,25 55,25 60,25 65,15 70,35 75,25 80,25 85,25 90,15 95,35 100,25"></polyline>
            </svg>
          </div>
        } @else if (expression() === 'happy') {
          <div class="text-center">
            <span class="text-green-500 text-6xl">😊</span>
            <div class="text-green-400 text-xl md:text-2xl mt-2">Loading...</div>
          </div>
        } @else if (expression() === 'crying') {
          <div class="text-center">
            <span class="text-blue-400 text-6xl">😭</span>
            <div class="text-blue-300 text-xl md:text-2xl mt-2">LOADING</div>
          </div>
        } @else if (expression() === 'mother-in-law') {
          <div class="text-center">
            <span class="text-red-500 text-6xl">😠</span>
            <div class="text-red-400 text-xl md:text-2xl mt-2">EMERGENCY MOTHER IN LAW PROGRAM</div>
          </div>
        } @else if (expression() === 'error') {
          <div class="text-center">
            <span class="text-red-500 text-6xl">ERROR!</span>
            <div class="text-red-400 text-xl md:text-2xl mt-2">SYSTEM FAILURE</div>
          </div>
        } @else {
          <div class="relative w-full h-full flex items-center justify-center">
            <svg class="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              <polyline fill="none" stroke="#22c55e" stroke-width="2" points="0,25 10,25 15,15 20,35 25,25 30,25 35,25 40,15 45,35 50,25 55,25 60,25 65,15 70,35 75,25 80,25 85,25 90,15 95,35 100,25"></polyline>
            </svg>
          </div>
        }
      </div>
      <!-- Progress bar for Krabby Patty Formula -->
      @if (showCrabbyPattyFormula() && krabbyPattyLoading() < 100) {
        <div class="absolute bottom-0 left-0 right-0 h-4 bg-gray-700">
          <div class="h-full bg-lime-500 transition-all duration-200 ease-linear" [style.width.%]="krabbyPattyLoading()"></div>
          <div class="absolute inset-0 text-center text-xs font-bold text-white">{{ krabbyPattyLoading() }}% Loaded</div>
        </div>
      } @else if (showCrabbyPattyFormula() && krabbyPattyLoading() === 100) {
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Crabby_Patty.png/220px-Crabby_Patty.png" alt="Krabby Patty" class="w-24 h-24 mb-2 animate-bounce-slow">
          <div class="text-green-400 font-bold text-xl md:text-2xl">KRABBY PATTY FORMULA</div>
          <div class="text-green-300 font-bold text-lg md:text-xl">LOADING COMPLETED</div>
        </div>
      }
    </div>
    <p class="text-lg text-center mt-4 p-2 bg-yellow-100 rounded-lg shadow-inner border border-yellow-300 w-full">{{ dialogue() }}</p>

    <!-- Contextual elements -->
    @if (showWashingMachine()) {
      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
        <div class="w-24 h-24 bg-white rounded-full border-4 border-gray-600 flex items-center justify-center text-xl text-gray-700">🧼</div>
      </div>
    }
    @if (showMirror()) {
      <div class="absolute -bottom-10 right-8 w-32 h-40 bg-gray-600 rounded-xl shadow-lg border-4 border-gray-800 flex items-center justify-center">
        <div class="w-full h-full bg-blue-200 rounded-lg opacity-70"></div>
        <img src="https://picsum.photos/60/70" alt="Reflection" class="absolute w-20 h-20 rounded-full">
      </div>
    }
    @if (showCoffeeMaker()) {
      <div class="absolute -bottom-10 right-8 w-32 h-40 bg-gray-700 rounded-xl shadow-lg p-2 flex flex-col items-center">
        <div class="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-3xl mb-1">☕</div>
        <div class="w-20 h-16 bg-gray-800 rounded-b-lg overflow-hidden relative">
          <div class="absolute bottom-0 w-full bg-orange-600" [style.height.px]="40"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">COFFEE</div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .animate-pulse-slow {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-bounce-slow {
      animation: bounce 1s infinite alternate;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
    @keyframes bounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }
  `],
})
export class KarenMonitorComponent {
  expression = input<'heartbeat' | 'happy' | 'crying' | 'mother-in-law' | 'error'>('heartbeat');
  dialogue = input<string>('');
  loading = input<boolean>(false);
  showWashingMachine = input<boolean>(false);
  showMirror = input<boolean>(false);
  showCrabbyPattyFormula = input<boolean>(false);
  krabbyPattyLoading = input<number>(0);
  showCoffeeMaker = input<boolean>(false);
}
    