import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/models/in/UserForm';
import { UserDetails } from 'src/app/models/out/UserDetails';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public readonly MOOD_BEER: number = 1;
  public readonly MOOD_PARTY: number = 2;
  public readonly MOOD_CHILL: number = 3;

  user : UserDetails | undefined;

  form : UserForm | undefined;

  userForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    addressNumber: new FormControl('', [Validators.required]),
    addressName: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    mood: new FormControl('', [Validators.required]),
  });

  constructor(
    private tokenService : TokenStorageService,
    private userService : UserService,
    private fb: FormBuilder
  ) { 
    

    
  }

  ngOnInit(): void {
    //console.log(this.user)
    // get UserDetails
    this.userService.getUserByEmail(this.tokenService.getUserEmail())
    .subscribe( data => {
      // INIT FORM
      this.userForm = this.fb.group({
        email: new FormControl(data.email, [Validators.required]),
        name: new FormControl(data.name, [Validators.required]),
        firstname: new FormControl(data.firstname, [Validators.required]),
        birthdate: new FormControl(data.birthdate, [Validators.required]),
        addressNumber: new FormControl(data.address.housenumber, [Validators.required]),
        addressName: new FormControl(data.address.street, [Validators.required]),
        postalCode: new FormControl(data.address.postcode, [Validators.required]),
        city: new FormControl(data.address.city, [Validators.required]),
        phone: new FormControl(data.phone, [Validators.required]),
        category: new FormControl(data.category, [Validators.required]),
      });
    })
  }

  updateProfile() {

    //console.log(this.userForm.value)
    this.userService.updateUser(1, this.userForm.value).subscribe(response => {
      console.log(response)
    })
    //this.userService.updateMood(1, this.userForm.value.mood)
  }

}
