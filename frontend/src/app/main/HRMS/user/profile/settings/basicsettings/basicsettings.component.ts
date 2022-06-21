import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'basicsettings',
  templateUrl: './basicsettings.component.html',
  styleUrls: ['./basicsettings.component.css']
})
export class BasicsettingsComponent implements OnInit {

  form: any;
  isBusy: any
  imageSrc: any = '../assets/img/profile/default-profile.png';
  profileImage: any;
  uid:any;
  userDetails:any

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private route: ActivatedRoute) {
    this.form = FormGroup
    this.form = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      username: [null, Validators.required],

      email: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.min(5), Validators.max(10)]],

      address: [null, Validators.required],
      address2: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      zipcode: [null, Validators.required],

      designation: [null, Validators.required],
    })
  }
  ngOnInit(){
    this.uid = this.route.snapshot.paramMap.get('uid')
    this.service.fetchUserDetails(this.uid).subscribe(response => {
      if (response.success){
        this.form.patchValue(response.user)
        this.imageSrc = this.service.BASE_URL + response.user['profile_image']
      }
    })
  }

  updateProfileImage(event: any) {
    this.profileImage = event.target.files[0]
    if (event.target.files[0]) {
      let imgReader = new FileReader();
      imgReader.onload = (e) => {
        this.imageSrc = imgReader.result
      }; imgReader.readAsDataURL(event.target.files[0])
    }
  }

  editUserDetails() {
    let formValue = this.form.getRawValue()
    let formData = new FormData();

    formData.append('uid', this.uid)
    formData.append('first_name', formValue['first_name'])
    formData.append('last_name', formValue['last_name'])
    formData.append('username', formValue['username'])
    formData.append('email', formValue['email'])
    formData.append('phone', formValue['phone'])
    formData.append('address', formValue['address'])
    formData.append('address2', formValue['address2'])
    formData.append('city', formValue['city'])
    formData.append('state', formValue['state'])
    formData.append('country', formValue['country'])
    formData.append('zipcode', formValue['zipcode'])
    formData.append('designation', formValue['designation'])

    if (this.profileImage) {
      formData.append('profile_image', this.profileImage, this.profileImage.name)
    }
    this.service.updateUser(formData).subscribe(response => {
      if (response.success){
        window.location.reload()
      }
    }, err => console.log(err)
    )
  }
}
