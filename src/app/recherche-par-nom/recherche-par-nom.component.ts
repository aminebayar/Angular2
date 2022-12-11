import { Component, OnInit } from '@angular/core';
import { TvShow } from '../model/tvshow.model';
import { TvShowService } from '../services/tvshow.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  nomTvShow! : string;
  tvshows!: TvShow[];
  allTvShows!: TvShow[];
  searchTerm!: string;
  
  constructor(private tvshowService : TvShowService , public authService: AuthService) { }

  ngOnInit(): void {
    this.tvshowService.listeTvShow().subscribe(tvshows => {
      console.log(tvshows);
      this.tvshows = tvshows;
      });
      
  }

  rechercherTvShows(){
    this.tvshowService.rechercherParNom(this.nomTvShow).
    subscribe(tvshows => {
      console.log(tvshows);
      this.tvshows=tvshows;});
  }
  chargerTvShows(){
    this.tvshowService.listeTvShow().subscribe(tvshows => {
      console.log(tvshows);
      this.tvshows = tvshows;
      });
  }
  supprimerTvShow(p: TvShow)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.tvshowService.supprimerTvShow(p.idTvShow).subscribe(() => {
        console.log("tvshow supprimé");
        this.chargerTvShows();     
      
});
}

  onKeyUp(filterText : string){
    this.tvshows = this.allTvShows.filter(item =>
    item.nomTvShow.toLowerCase().includes(filterText));
    }
    

}
