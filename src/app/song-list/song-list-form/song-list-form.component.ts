import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/shared/song.service';
import { NgForm } from '@angular/forms';
import { Song } from 'src/app/shared/song.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-song-list-form',
  templateUrl: './song-list-form.component.html',
  styles: [
  ]
})
export class SongListFormComponent implements OnInit {

  constructor(public service: SongService, public serviceCateg: CategoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serviceCateg.getCategories();
  }

  onSubmit(form: NgForm) {
    if(this.service.songData.id == 0) {
      this.insertSong(form);
    }else {
      this.updateSong(form);
    }
  }

  insertSong(form: NgForm) {
    this.service.postSong().subscribe(
      res => {
        this.resetForm(form);
        this.service.getSongList();
        this.toastr.success('Song created successfully!'); 
      },
      err => { console.log(err); }
    );
  }

  updateSong(form: NgForm) {
    this.service.updateSong().subscribe(
      res => {
        this.resetForm(form);
        this.service.getSongList();
        this.toastr.info('Song updated successfully!'); 
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.songData = new Song();
  }

}
