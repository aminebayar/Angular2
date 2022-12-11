import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { TvShow } from '../model/tvshow.model';
import { TvShowsComponent } from '../tvshows/tvshows.component';
import { TvShowService } from '../services/tvshow.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: [
  ]
})
export class RechercheParGenreComponent implements OnInit {
  IdGenre! : number;
  genres! : Genre[];
  tvshows! : TvShow[];


  constructor(private tvshowService : TvShowService, public authService: AuthService) { }

  ngOnInit(): void {
    this.tvshowService.listeGenres().
      subscribe(genres => {this.genres = genres._embedded.genres;
      console.log(genres);
    });

  }

  onChange() {
    this.tvshowService.rechercherParGenre(this.IdGenre).
      subscribe(tvshows =>{this.tvshows=tvshows});

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

}
