import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokeapiService } from '../../servicios/pokeapi.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule, CommonModule],
  providers: [PokeapiService],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  ListaPokemones: any;
  pokemonesCompletos: any[] = [];

  constructor(private pokeApi: PokeapiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.pokeApi.obtenerListadoPokemones().subscribe({
      next: (data: any) => {
        this.ListaPokemones = data;
        this.ListaPokemones.results.forEach((element: any) => {
          this.pokeApi.obtenerUnPokemon(element.url).subscribe({
            next: (pokemonData: any) => {
              this.pokemonesCompletos.push(pokemonData);
            },
            error: (err: any) => console.log(err)
          });
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  openDialog(pokemon: any): void {
    this.dialog.open(PokemonDialogComponent, {
      data: { pokemon },
      width: '300px'
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

