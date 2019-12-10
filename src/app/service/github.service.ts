import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Githubuser } from '../githubuser';
import { Githubrepo } from '../githubrepo';
import { promise } from 'protractor';
import { resolve} from 'dns';
import { reject } from 'q';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
user:Githubuser;
repo:Githubrepo;
  constructor(public http:HttpClient) {
    this.user = new Githubuser('', '', '', '', '', 0, 0, new Date, 0, '', '');
    this.repo = new Githubrepo('','','','')
   }

   searchUsers(searchTerm:string){
     interface ApiResponse{
       avatar_url:string;
       login:string;
       company:string;
       location:string;
       name: string;
       followers:number;
       following:number;
       created_at:Date;
       public_repos:number;
       html_url:string;
       email:string;
     }
     let searchPoint = 'https://api.github.com/users/' + searchTerm + '?access_token=' + environment.GITAPIKEY;
     
     let promise = new Promise((reject, resolve) =>{
      this.http.get<ApiResponse>(searchPoint).toPromise().then((results)=>{
      this.user = results;
       
      resolve();
      },
      (error) =>{
        reject();
      }
      );
     });
     return promise;

  }

  getRepos(searchTerm){
    interface ApiResponse{
      name:string;
      description:string;
      html_url:string;
      update_at:string;
    }
    let searchPoint = 'https://api.github.com/users/' + searchTerm + '/repos?access_token=' + environment.GITAPIKEY;

    let promise = new Promise((resolve, reject) =>{

      this.http.get<ApiResponse>(searchPoint).toPromise().then(
        (repoResults) =>{
          this.repo = repoResults;
        },
        (error) =>{
          reject();
        }
      );
    });
    return promise;
  }
}
