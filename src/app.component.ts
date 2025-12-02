
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KarenMonitorComponent } from './components/karen-monitor/karen-monitor.component';
import { PlanktonAvatarComponent } from './components/plankton-avatar/plankton-avatar.component';
import { GeminiService } from './services/gemini.service';
import { GenerateContentResponse } from '@google/genai';

interface Scene {
  id: number;
  text: string;
  planktonState?: 'sad' | 'neutral' | 'happy' | 'angry' | 'singing' | 'farting' | 'wet' | 'washed';
  karenExpression?: 'heartbeat' | 'happy' | 'crying' | 'mother-in-law' | 'error';
  showInput?: boolean;
  showSongControls?: boolean;
  showFormulaDownload?: boolean;
  showWashingMachine?: boolean;
  showMirror?: boolean;
  showPlanktonHat?: boolean;
  showSpongebob?: boolean;
  showSquidward?: boolean;
  showSandy?: boolean;
  showCitizens?: boolean;
  showCrabbyPattyFormula?: boolean;
  showCoffeeMaker?: boolean;
  nextButtonText?: string;
  dialogueSpeaker?: 'plankton' | 'karen' | 'spongebob' | 'squidward' | 'narrator' | 'mother-in-law';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, KarenMonitorComponent, PlanktonAvatarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentSceneId = signal(0);
  planktonState = signal<'sad' | 'neutral' | 'happy' | 'angry' | 'singing' | 'farting' | 'wet' | 'washed'>('neutral');
  karenExpression = signal<'heartbeat' | 'happy' | 'crying' | 'mother-in-law' | 'error'>('heartbeat');
  karenDialogue = signal<string>('Welcome home, honey!');
  planktonThoughts = signal<string>('');
  planktonSong = signal<string>('');
  loadingGemini = signal(false);
  showWashingMachine = signal(false);
  showMirror = signal(false);
  showPlanktonHat = signal(true);
  showSpongebob = signal(false);
  showSquidward = signal(false);
  showSandy = signal(false);
  showCitizens = signal(false);
  showCrabbyPattyFormula = signal(false);
  showCoffeeMaker = signal(false);
  krabbyPattyLoading = signal(0);
  showFormulaDownload = signal(false);

  scenes: Scene[] = [
    { id: 0, text: "Plankton returns home after another failed attempt to steal the Krabby Patty formula.", planktonState: 'sad', karenExpression: 'heartbeat', showPlanktonHat: true, nextButtonText: "Next" },
    { id: 1, text: "Karen greets him, noticing his foul stench of failure.", planktonState: 'farting', karenExpression: 'heartbeat', dialogueSpeaker: 'karen', nextButtonText: "Next" },
    { id: 2, text: "Karen insists he gets cleaned up before entering.", planktonState: 'sad', karenExpression: 'heartbeat', showWashingMachine: true, nextButtonText: "Wash Plankton!" },
    { id: 3, text: "Plankton is washed and dried.", planktonState: 'washed', karenExpression: 'happy', showWashingMachine: false, showMirror: true, nextButtonText: "Next" },
    { id: 4, text: "Karen reminds Plankton it's their wedding anniversary.", planktonState: 'sad', karenExpression: 'happy', dialogueSpeaker: 'karen', nextButtonText: "Next" },
    { id: 5, text: "Plankton forgot, and Karen is upset, refusing to give him his gift until he gets her one from his heart.", planktonState: 'angry', karenExpression: 'crying', dialogueSpeaker: 'karen', nextButtonText: "Next" },
    { id: 6, text: "Plankton ponders what gift to get from his heart. Spongebob appears!", planktonState: 'neutral', karenExpression: 'crying', showSpongebob: true, nextButtonText: "Talk to Spongebob" },
    { id: 7, text: "Spongebob suggests serenading Karen with a song from his heart. He helps Plankton practice.", planktonState: 'neutral', karenExpression: 'crying', showSpongebob: true, showSongControls: true, nextButtonText: "Sing to Karen!" },
    { id: 8, text: "Plankton serenades Karen with a song he co-wrote with Spongebob and Patrick.", planktonState: 'singing', karenExpression: 'happy', showSpongebob: true, showSquidward: true, showCitizens: true, nextButtonText: "Listen to the song" },
    { id: 9, text: "Karen is overjoyed! She starts to load the Krabby Patty formula as Plankton's gift.", planktonState: 'happy', karenExpression: 'crying', showCrabbyPattyFormula: true, showFormulaDownload: true, nextButtonText: "Watch Formula Download" },
    { id: 10, text: "The formula is loading, but Karen is shorting out from happiness! Spongebob has to intervene.", planktonState: 'happy', karenExpression: 'crying', nextButtonText: "Spongebob's Plan!" },
    { id: 11, text: "Spongebob unplugs Karen's 'mother-in-law' program.", planktonState: 'angry', karenExpression: 'mother-in-law', showCoffeeMaker: true, nextButtonText: "Unplug Karen!" },
    { id: 12, text: "Spongebob has saved the Krabby Patty formula!", planktonState: 'angry', karenExpression: 'error', showCoffeeMaker: true, nextButtonText: "Happy Anniversary?" },
    { id: 13, text: "Happy anniversary, you guys!", planktonState: 'angry', karenExpression: 'error', nextButtonText: "Restart" },
  ];

  constructor(private geminiService: GeminiService) {}

  ngOnInit() {
    this.updateUIForScene(this.scenes[0]);
  }

  nextScene() {
    let nextId = this.currentSceneId();
    if (nextId < this.scenes.length - 1) {
      nextId++;
    } else {
      nextId = 0; // Loop back to start
    }
    this.updateUIForScene(this.scenes[nextId]);
  }

  updateUIForScene(scene: Scene) {
    this.currentSceneId.set(scene.id);
    this.planktonState.set(scene.planktonState || 'neutral');
    this.karenExpression.set(scene.karenExpression || 'heartbeat');
    this.karenDialogue.set(scene.text);

    this.showPlanktonHat.set(scene.showPlanktonHat !== undefined ? scene.showPlanktonHat : false);
    this.showWashingMachine.set(scene.showWashingMachine || false);
    this.showMirror.set(scene.showMirror || false);
    this.showSpongebob.set(scene.showSpongebob || false);
    this.showSquidward.set(scene.showSquidward || false);
    this.showSandy.set(scene.showSandy || false);
    this.showCitizens.set(scene.showCitizens || false);
    this.showCrabbyPattyFormula.set(scene.showCrabbyPattyFormula || false);
    this.showCoffeeMaker.set(scene.showCoffeeMaker || false);
    this.showFormulaDownload.set(scene.showFormulaDownload || false);

    // Specific logic for certain scenes
    if (scene.id === 1) {
      this.karenDialogue.set("Plankton, is that you? Welcome home, honey... but what is that smell?");
    } else if (scene.id === 2) {
      this.karenDialogue.set("The aroma you speak of is the stench of failure! You're not coming in here smelling like that!");
    } else if (scene.id === 3) {
      this.planktonState.set('washed'); // Show Plankton cleaned
      this.karenDialogue.set("There you go. Now don't you feel better?");
    } else if (scene.id === 4) {
      this.karenDialogue.set("Today's a special day! We're celebrating your biggest accomplishment ever!");
    } else if (scene.id === 5) {
      this.karenDialogue.set("It's our wedding anniversary, you selfish green twit! You forgot! You're not getting this until you get me a gift from your heart.");
    } else if (scene.id === 6) {
      this.karenDialogue.set("Oh, I didn't buy Karen anything! What do I do?");
      this.planktonState.set('sad');
    } else if (scene.id === 7) {
      this.karenDialogue.set("You need to give her a present from in here... from the heart. That's where your love grows!");
      this.planktonState.set('neutral');
    } else if (scene.id === 9) {
      this.karenDialogue.set("That was so beautiful! I loved it! Now loading the Krabby Patty formula!");
      this.krabbyPattyLoading.set(0);
      this.startFormulaDownload();
    } else if (scene.id === 10) {
      this.karenDialogue.set("I'm crying... with tears of joy! What's going on?");
    } else if (scene.id === 11) {
      this.karenExpression.set('mother-in-law');
      this.karenDialogue.set("Plankton, what have you done to my daughter?! You made her cry! You know she could have been with an ATM, someone with money! But she chose you, I don't know why!");
    } else if (scene.id === 12) {
      this.karenExpression.set('error');
      this.karenDialogue.set("Happy Anniversary, you guys!");
      this.krabbyPattyLoading.set(0); // Reset loading
    }
  }

  async generatePlanktonSong() {
    this.loadingGemini.set(true);
    const prompt = `Write a short, simple, and slightly goofy love song from the perspective of Plankton to his computer wife, Karen. It should include themes of obsession, electronic love, and maybe a hint of evil plans, but keep it endearing.`;
    try {
      const response: GenerateContentResponse = await this.geminiService.generateContent(prompt);
      this.planktonSong.set(response.text);
    } catch (error) {
      console.error('Error generating song:', error);
      this.planktonSong.set('My circuits are fried, my love is deep, for you, my Karen, my secrets keep...');
    } finally {
      this.loadingGemini.set(false);
    }
  }

  startFormulaDownload() {
    const interval = setInterval(() => {
      this.krabbyPattyLoading.update(current => {
        if (current >= 100) {
          clearInterval(interval);
          if (this.currentSceneId() === 9) {
            this.karenDialogue.set("KRABBY PATTY FORMULA LOADING COMPLETED!");
            this.planktonState.set('happy');
          }
          return 100;
        }
        return current + 5;
      });
    }, 200);
  }

  // Action buttons
  onWashPlankton() {
    this.planktonState.set('wet');
    setTimeout(() => {
      this.planktonState.set('washed');
      this.nextScene(); // Move to scene 3
    }, 1000);
  }

  onSingToKaren() {
    this.planktonState.set('singing');
    this.karenExpression.set('happy');
    this.generatePlanktonSong(); // Generate the song
    this.nextScene(); // Move to scene 8
  }

  onSpongebobIntervenes() {
    this.planktonState.set('neutral');
    this.karenExpression.set('error');
    this.nextScene(); // Move to scene 11
  }

  onUnplugKaren() {
    this.karenExpression.set('error');
    this.krabbyPattyLoading.set(0); // Stop loading
    this.karenDialogue.set("ERROR!");
    this.nextScene(); // Move to scene 12
  }

  onRestart() {
    this.currentSceneId.set(0);
    this.planktonState.set('neutral');
    this.karenExpression.set('heartbeat');
    this.karenDialogue.set('Welcome home, honey!');
    this.planktonThoughts.set('');
    this.planktonSong.set('');
    this.loadingGemini.set(false);
    this.showWashingMachine.set(false);
    this.showMirror.set(false);
    this.showPlanktonHat.set(true);
    this.showSpongebob.set(false);
    this.showSquidward.set(false);
    this.showSandy.set(false);
    this.showCitizens.set(false);
    this.showCrabbyPattyFormula.set(false);
    this.showCoffeeMaker.set(false);
    this.krabbyPattyLoading.set(0);
    this.showFormulaDownload.set(false);
    this.updateUIForScene(this.scenes[0]);
  }
}
    