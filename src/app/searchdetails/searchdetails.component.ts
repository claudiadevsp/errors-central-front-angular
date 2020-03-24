import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ErrorService, AuthenticationService } from '@app/_services';
import { Subscription } from 'rxjs';
import { Error, User } from '@app/_models';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
})
export class SearchdetailsComponent implements OnInit , OnDestroy {

  errors: Error[] = [];
  searchForm: FormGroup;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(
      private route: ActivatedRoute, 
      private errorService: ErrorService, 
      private authenticationService: AuthenticationService ) 
      { 
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
      }

  ngOnInit() {
      this.route.params.subscribe( params => {        
        if (params['id']) {
          this.detailsLog(params['id']);  
        }
      });
  }

  detailsLog(id: number){
    this.errorService.detailsError(id).pipe(first()).subscribe(errors => {
      this.errors = errors;       
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
}

}
