import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pokemonModel } from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {

  pokemonList: pokemonModel[] = [];

  constructor(private requisicao: HttpClient) { }

  ngOnInit(): void {
    this.buscarPokemon();
  }

  buscarPokemon(): void {
    let promessaPokemon = this.requisicao.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    promessaPokemon.subscribe((result: any) => {
      let listaPokemonApi: any[] = result.results;
      listaPokemonApi.forEach(element => {
        let pokemon = new pokemonModel();
        pokemon.nome = element.name;

        this.pokemonList.push(pokemon);
      });
    });
  }


}

