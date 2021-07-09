import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Song } from '../shared/song.model';
import { SongService } from '../shared/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styles: [
  ]
})
export class SongListComponent implements OnInit {

  @Input() song: Song;

  constructor(public service: SongService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getSongList();
  }

  populateForm(selectedRecord: Song) {
    this.service.songData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number) {
    if(confirm("Are you sure to delete this song?")) {
      this.service.deleteSong(id)
      .subscribe(
        res => {
          this.service.getSongList();
          this.toastr.error("Song deleted successfully!");
        },
        err => {console.log(err);}
      )
    }
    
  }

}
