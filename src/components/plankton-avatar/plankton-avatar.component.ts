
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plankton-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-48 h-48 flex items-center justify-center">
      <!-- Plankton Base -->
      <img
        src="https://vignette.wikia.nocookie.net/spongebob/images/c/c9/Plankton_happy_2.png/revision/latest/scale-to-width-down/350?cb=20150901004117"
        alt="Plankton Base"
        class="absolute w-24 h-auto transition-all duration-300"
        [class]="getPlanktonImageClass()"
      >

      <!-- Plankton's Hat -->
      @if (showHat()) {
        <img
          src="https://static.wikia.nocookie.net/spongebob/images/b/b5/Fliying_Dutchman.png/revision/latest/scale-to-width-down/250?cb=20191228160002"
          alt="Plankton's Hat"
          class="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-auto rotate-12 transition-all duration-300"
        >
      }

      <!-- Spongebob and friends -->
      @if (showSpongebob()) {
        <img
          src="https://static.wikia.nocookie.net/spongebob/images/1/18/Spongebob_squarepants.png/revision/latest/scale-to-width-down/350?cb=20200810231908"
          alt="Spongebob"
          class="absolute -bottom-4 right-1/4 w-28 h-auto"
        >
      }
      @if (showSquidward()) {
        <img
          src="https://static.wikia.nocookie.net/spongebob/images/4/4b/Squidward_Tentacles.png/revision/latest/scale-to-width-down/350?cb=20210204122137"
          alt="Squidward"
          class="absolute -bottom-4 -left-1/4 w-32 h-auto"
        >
      }
      @if (showSandy()) {
        <img
          src="https://static.wikia.nocookie.net/spongebob/images/9/9c/Sandy_Cheeks.png/revision/latest/scale-to-width-down/350?cb=20180425232924"
          alt="Sandy"
          class="absolute -top-4 -right-1/4 w-28 h-auto"
        >
      }
      @if (showCitizens()) {
        <div class="absolute bottom-0 flex gap-2">
          <img src="https://picsum.photos/40/40" alt="Citizen 1" class="w-10 h-10 rounded-full">
          <img src="https://picsum.photos/35/35" alt="Citizen 2" class="w-9 h-9 rounded-full">
        </div>
      }
    </div>
  `,
  styles: [`
    img {
      object-fit: contain;
    }
    .plankton-sad {
      transform: translateY(10px) rotate(-5deg);
      filter: grayscale(100%) brightness(70%);
    }
    .plankton-neutral {
      transform: translateY(0) rotate(0deg);
      filter: grayscale(0%) brightness(100%);
    }
    .plankton-happy {
      transform: translateY(-5px) rotate(5deg);
      filter: brightness(120%);
    }
    .plankton-angry {
      transform: translateY(5px) rotate(-10deg);
      filter: hue-rotate(90deg) saturate(150%);
    }
    .plankton-singing {
      animation: bobbing 1s infinite alternate;
    }
    .plankton-farting {
      animation: shake 0.5s infinite alternate;
      filter: hue-rotate(50deg) brightness(80%);
    }
    .plankton-wet {
      filter: blur(1px) brightness(80%) grayscale(50%);
    }
    .plankton-washed {
      filter: brightness(150%) saturate(120%);
      transform: scale(1.1);
    }
    @keyframes bobbing {
      0% { transform: translateY(0); }
      100% { transform: translateY(-5px); }
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `],
})
export class PlanktonAvatarComponent {
  state = input<'sad' | 'neutral' | 'happy' | 'angry' | 'singing' | 'farting' | 'wet' | 'washed'>('neutral');
  showHat = input<boolean>(false);
  showSpongebob = input<boolean>(false);
  showSquidward = input<boolean>(false);
  showSandy = input<boolean>(false);
  showCitizens = input<boolean>(false);

  getPlanktonImageClass() {
    return `plankton-${this.state()}`;
  }
}
    