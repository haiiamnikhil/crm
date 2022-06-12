import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: any;
  isBusy: any
  imageSrc: any = '../assets/img/profile/default-profile.png';
  profileImage: any;
  pk:any;

  constructor(private service: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.isBusy = Boolean
    this.form = FormGroup
  }

  ngOnInit() {
    let user = this.route.snapshot.paramMap.get('uid')
    this.service.fetchUserDetails(user).subscribe(response => {
      if (response.success) {
        this.form.patchValue(response.user)
        this.pk = response.user['pk']
        this.imageSrc = this.service.BASE_URL + response.user['profile_image']
      }
    }, err => console.log(err))

    this.form = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],

      email: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      phone: [{value:'',disabled:true}, [Validators.required, Validators.min(5), Validators.max(10)]],

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

    formData.append('pk', this.pk)
    formData.append('last_name', formValue['last_name'])
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
    } else {
      formData.append('profile_image', 'None')
    }
    this.service.updateUser(formData).subscribe(response => console.log(response), err => console.log(err)
    )
  }

}
