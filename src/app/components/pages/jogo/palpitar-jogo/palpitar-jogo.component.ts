import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";


@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {

  selecoes!: Selecao[];
  selecaoAId!: number;
  selecaoBId!: number; 
  selecaoA?: Selecao;
  selecaoB?: Selecao;
  placarA?: number;
  placarB?: number;
  palpite1?: number;
  palpite2?: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar")
    //Executar a requisição
    .subscribe({
      next: (selecoes) => {
        this.selecoes = selecoes;
      }
    });
  }
  cadastrar(): void {

    
    let jogo : Jogo = {
      selecaoAId : this.selecaoAId,
      placar: this.placarA,
      placarB: this.placarB,
      selecaoBId : this.selecaoBId,
      
    };
    console.log(jogo);

    this.http.post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo)
    .subscribe({
      //Caso a requisição for bem sucedida cai no next
      next: (jogo) => {
        this.router.navigate(["pages/jogo/listar"]);
      },

    });
  }
}
