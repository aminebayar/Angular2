import { Injectable } from '@angular/core';
import { Genre } from '../model/genre.model';
import { TvShow } from '../model/tvshow.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  apiURL: string = 'http://localhost:8989/tvshows/api';
  apiURLGenre: string = 'http://localhost:8989/tvshows/genre';

  tvshows : TvShow[]; //un tableau de tvshows
  //genres : Genre[];
 

  constructor(private http : HttpClient) { 
    
    /* this.genres = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ]; */
    this.tvshows = [{idTvShow : 1, nomTvShow : "PC Asus", saisonTvShow : 3000.600, dateCreation : new Date("01/14/2011"),
                      genre : {idGenre : 1, nomGenre  : "PC",descriptionGenre:"vdvgffdf"} },
                     {idTvShow : 2, nomTvShow : "Imprimante Epson", saisonTvShow : 450, dateCreation : new Date("12/17/2010"),
                    genre :  {idGenre  : 2, nomGenre  : "Imprimante",descriptionGenre:"vdfggdf"}},
                     {idTvShow : 3, nomTvShow :"Tablette Samsung", saisonTvShow : 900.123, dateCreation : new Date("02/20/2020"), 
                     genre : {idGenre : 1, nomGenre  : "PC",descriptionGenre:"vdfdf"}}
                    ];
    
  }

  listeTvShow(): Observable<TvShow[]>{
    return this.http.get<TvShow[]>(this.apiURL);
    }

    ajouterTvShow( tvshow: TvShow):Observable<TvShow>{
      return this.http.post<TvShow>(this.apiURL, tvshow, httpOptions);
      }

      supprimerTvShow(id : number) {
        const url = `${this.apiURL}/${id}`;
        return this.http.delete(url, httpOptions);
        }
        supprimerGenre(id : number) {
          const url = `${this.apiURLGenre}/${id}`;
          return this.http.delete(url, httpOptions);
          }

        
        consulterTvShow(id: number): Observable<TvShow> {
          const url = `${this.apiURL}/${id}`;
          return this.http.get<TvShow>(url);
          }

          trierTvShows(){
            this.tvshows = this.tvshows.sort((n1,n2) => {
              if (n1.idTvShow > n2.idTvShow) {
                  return 1;
              }
             if (n1.idTvShow < n2.idTvShow) {
                  return -1;
              }
            return 0;
          });
          }
      

          updateTvShow(tvshow :TvShow) : Observable<TvShow>
            {
                return this.http.put<TvShow>(this.apiURL, tvshow, httpOptions);
            }

         
         
       listeGenres():Observable<GenreWrapper>{
            return this.http.get<GenreWrapper>(this.apiURLGenre);
            }     

  rechercherParGenre(idGenre: number): Observable<TvShow[]> {
    const url = `${this.apiURL}/tvshowsgenre/${idGenre}`;
    return this.http.get<TvShow[]>(url);
  } 

  rechercherParNom(nom: string):Observable< TvShow[]> {
    const url = `${this.apiURL}/tvshowsByName/${nom}`;
    return this.http.get<TvShow[]>(url);
    }

    ajouterGenre( genre: Genre):Observable<Genre>{
      return this.http.post<Genre>(this.apiURLGenre, genre, httpOptions);
      }
      

 
}
