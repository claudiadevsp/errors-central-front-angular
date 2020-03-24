﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Error, User } from '@app/_models';
import { ErrorService, AuthenticationService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    searchForm: FormGroup;
    currentUser: User;
    currentUserSubscription: Subscription;
    errors: Error[] = [];
    page: number = 1;
    pageSize: number = 10;
    key: String = 'level';
    reverse: Boolean = false;   
    

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private errorService: ErrorService

    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
          environment: ['', Validators.required ],
          level: ['', Validators.required ],
          event: ['', Validators.required ],
          details: ['', Validators.required ]

      });      
      this.loadAllErrors('', '', '', '');
    }
    
    onSubmit() {      
      this.loadAllErrors(
           this.searchForm.get('environment').value, 
           this.searchForm.get('level').value,  
           this.searchForm.get('event').value,
           this.searchForm.get('details').value
      );
    }
    
    private loadAllErrors(env: string, level: string, event: string, details: string) {
        this.errorService.findAll(env, level, event, details).pipe(first()).subscribe(errors => {
            this.errors = errors;
            console.log(this.errors); 
        });
    }

    toFile(id: number) {
      swal.fire({
        title: 'Tem certeza que deseja arquivar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SIM',
        cancelButtonText: 'NÃO'
      }).then((result) => {
        if (result.value) {
            this.errorService.foFile(id).pipe(first()).subscribe(() => {
            this.loadAllErrors('', '', '', '');
          });
          swal.fire(
            'Arquivado',
            'com sucesso!',
            'success'
            );
        }
      });
    }
    dataSort(key) {
      this.key = key;
      this.reverse = !this.reverse;
    }

    ngOnDestroy() {
      this.currentUserSubscription.unsubscribe();
  }
}
