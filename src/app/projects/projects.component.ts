import { Component, OnInit } from '@angular/core';
import { GithubService } from '../service/github.service';
import { Githubuser } from '../githubuser';
import { Githubrepo } from '../githubrepo';
import { from } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
user:Githubuser;
repo:Githubrepo;

  constructor(public githubservice:GithubService) { 
    
  }
  
  searchUser(searchTerm){
    this.githubservice.searchUsers(searchTerm).then(
      ()=>{
        this.user=this.githubservice.user;
        console.log('this.user')
      },
      (error)=>{
        console.log('this.user')
      }
    )
  

    this.githubservice.getRepos(searchTerm).then(
      (success)=>{
        this.repo=this.githubservice.repo;
        console.log(this.repo)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  ngOnInit() {
    console.log('works')

    this.searchUser("costamay");
    // this.githubservice.searchUsers('costamay').then(
    //   (success)=>{
    //     this.user=this.githubservice.user;
    //   },
    //   (error)=>{
    //     console.log(error)
    //   }
    // )

    // this.githubservice.getRepos('costamay').then(
    //   (success)=>{
    //     this.repo=this.githubservice.repo;
    //   },
    //   (error)=>{
    //     console.log(error)
    //   }
    // )
  }

}
