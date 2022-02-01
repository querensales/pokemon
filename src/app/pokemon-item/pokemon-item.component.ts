import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pokemonModel } from '../shared/pokemon.model';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {

  pokemonList: pokemonModel[] = [];

  nextUrl!: string;

  previousUrl!: string;

  quantidadePorPagina: number = 5;

  quantidadeTotal: number = 0;

  constructor(private requisicao: HttpClient) { }

  ngOnInit(): void {
    let url: string = (`https://pokeapi.co/api/v2/pokemon?limit=${this.quantidadePorPagina}`);
    this.buscarPokemon(url);

  }

  buscarPokemon(urlApi: string): void {
    console.log(this.previousUrl)
    this.pokemonList = [];
    this.previousUrl = '';
    let promessaPokemon = this.requisicao.get(urlApi);
    promessaPokemon.subscribe((result: any) => {
      this.quantidadeTotal = result.count;
      this.nextUrl = result.next;
      this.previousUrl = result.previous;




      let listaPokemonApi: any[] = result.results;
      listaPokemonApi.forEach(element => {
        let pokemon = this.createPokemonModel(element);
        this.pokemonList.push(pokemon);
      });
    });
  }

  createPokemonModel(pokemonApi: any): pokemonModel {
    let pokemon = new pokemonModel();
    pokemon.nome = pokemonApi.name;


    this.requisicao.get(pokemonApi.url)
      .subscribe((detalhePokemonApi: any) => {
        pokemon.caminhoImagem = detalhePokemonApi.sprites.other.dream_world.front_default;


        let urlcaracteristica = detalhePokemonApi.moves[0].version_group_details[0].move_learn_method.url;

        this.requisicao.get(urlcaracteristica)
          .subscribe((caracteristicaApi: any) => {
            pokemon.caracteristicas = caracteristicaApi.descriptions[0].description;
          })
      })

    return pokemon;
  }


}

