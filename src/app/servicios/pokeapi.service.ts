import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {

  urlApi = 'https://pokeapi.co/api/v2/pokemon/'
  constructor(private http: HttpClient) { }

  obtenerListadoPokemones(){
    return this.http.get(this.urlApi)
  }

  obtenerUnPokemon(url: string){
    return this.http.get(url);
  }

  nextPage(nextPageUrl: string){
    return this.http.get(nextPageUrl);
  }

  prevPage(prevPage: string){
    return this.http.get(prevPage)
  }


}
