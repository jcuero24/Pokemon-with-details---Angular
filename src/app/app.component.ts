import { Component, signal } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemonNameOrId = '';
  pokemonData: any = null;
  sound: HTMLAudioElement | null = null;
  spriteIndex = signal(0); // Signal para alternar sprites
  loading = signal(false); // Signal para mostrar carga
  error = signal(false); // Signal para manejar el error

  availablePokemon = [
    { id: 1, name: 'Bulbasaur' }, { id: 2, name: 'Ivysaur' }, { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' }, { id: 5, name: 'Charmeleon' }, { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' }, { id: 8, name: 'Wartortle' }, { id: 9, name: 'Blastoise' },
    { id: 10, name: 'Caterpie' }, { id: 11, name: 'Metapod' }, { id: 12, name: 'Butterfree' },
    { id: 13, name: 'Weedle' }, { id: 14, name: 'Kakuna' }, { id: 15, name: 'Beedrill' },
    { id: 16, name: 'Pidgey' }, { id: 17, name: 'Pidgeotto' }, { id: 18, name: 'Pidgeot' },
    { id: 19, name: 'Rattata' }, { id: 20, name: 'Raticate' }, { id: 21, name: 'Spearow' },
    { id: 22, name: 'Fearow' }, { id: 23, name: 'Ekans' }, { id: 24, name: 'Arbok' },
    { id: 25, name: 'Pikachu' }, { id: 26, name: 'Raichu' }, { id: 27, name: 'Sandshrew' },
    { id: 28, name: 'Sandslash' }, { id: 29, name: 'Nidoran♀' }, { id: 30, name: 'Nidorina' },
    { id: 31, name: 'Nidoqueen' }, { id: 32, name: 'Nidoran♂' }, { id: 33, name: 'Nidorino' },
    { id: 34, name: 'Nidoking' }, { id: 35, name: 'Clefairy' }, { id: 36, name: 'Clefable' },
    { id: 37, name: 'Vulpix' }, { id: 38, name: 'Ninetales' }, { id: 39, name: 'Jigglypuff' },
    { id: 40, name: 'Wigglytuff' }, { id: 41, name: 'Zubat' }, { id: 42, name: 'Golbat' },
    { id: 43, name: 'Oddish' }, { id: 44, name: 'Gloom' }, { id: 45, name: 'Vileplume' },
    { id: 46, name: 'Paras' }, { id: 47, name: 'Parasect' }, { id: 48, name: 'Venonat' },
    { id: 49, name: 'Venomoth' }, { id: 50, name: 'Diglett' }
  ];

  constructor(private httpClient: HttpClient) {}

  // Función para verificar si una habilidad es la última en la lista
  isLastAbility(index: number): boolean {
    return this.pokemonData && index === this.pokemonData.abilities.length - 1;
  }

  // Función para buscar un Pokémon usando Axios
  async searchPokemon() {
    this.loading.set(true);
    this.error.set(false); // Restablecer error

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonNameOrId.toLowerCase()}`);
      this.pokemonData = response.data;
      this.playSound();
      this.startAnimation();
    } catch (error) {
      console.error('Error al buscar el Pokémon:', error);
      this.pokemonData = null;
      this.error.set(true); // Activar señal de error
    } finally {
      this.loading.set(false);
    }
  }

  // Función para reproducir el sonido de un Pokémon
  playSound() {
    if (this.pokemonData) {
      const audioSrc = `https://pokeapi.co/media/sounds/${this.pokemonData.name}.mp3`; // Cambia según la URL real del sonido
      this.sound = new Audio(audioSrc);
      this.sound.play();
    }
  }

  // Función para alternar los sprites
  startAnimation() {
    setInterval(() => {
      this.spriteIndex.set((this.spriteIndex() + 1) % 2); // Alternar entre 0 y 1
    }, 500); // Cambiar cada 500ms
  }
}
