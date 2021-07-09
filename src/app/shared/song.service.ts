import { Injectable } from '@angular/core';
import { Song } from './song.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44301/api/Songs';
  songData: Song = new Song();
  list: Song[];
 
  postSong() {
    return this.http.post(this.baseURL, this.songData);
  }

  updateSong() {
    return this.http.put(`${this.baseURL}/${this.songData.id}`, this.songData);
  }

  //use async/await -> try
  getSongList() {
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as Song[]);
  }

  deleteSong(id:number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
