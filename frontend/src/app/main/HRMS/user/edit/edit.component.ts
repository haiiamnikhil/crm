import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: any;
  isBusy: any
  imageSrc: any = '../assets/img/profile/default-profile.png';
  profileImage: any;
  uid:any
  userDesignations:any

  constructor(private service: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.isBusy = Boolean
    this.form = FormGroup
  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid')
    this.service.getUserRoles().subscribe(response => {
      if (response.success){
        this.userDesignations = response.role
      }
    })
    this.service.fetchUserDetails(this.uid).subscribe(response => {
      if (response.success) {
        this.form.patchValue(response.user)
        this.imageSrc = this.service.BASE_URL + response.user['profile_image']
      }
    }, err => console.log(err))


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
        this.router.navigate(['/user/list-user'])
      }
    }, err => console.log(err)
    )
  }

}
