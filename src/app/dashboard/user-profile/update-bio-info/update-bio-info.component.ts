import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-update-bio-info',
  templateUrl: './update-bio-info.component.html',
  styleUrls: ['./update-bio-info.component.css']
})
export class UpdateBioInfoComponent implements OnInit {

  gradeList = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' },
    { value: '5', name: '5' },
    { value: '6', name: '6' },
    { value: '7', name: '7' },
    { value: '8', name: '8' },
    { value: '9', name: '9' },
    { value: '10', name: '10' },
    { value: '11', name: '11' },
    { value: '12', name: '12' },
    { value: '13', name: '13' }
  ]

  isStudent: boolean = false;
  isTeacher: boolean = false;

  successAlert:boolean = false;
  errorAlert:boolean = false;
  errorText:string = '';
  pendingAlert:boolean = false;
  intro = '';

  c_month: any;
  uId:number = this.auth.currentUser.userId;

  fName:string;
  lName:string;
  address:string;
  city:string;
  t_mobile:string;
  s_mobile:string;
  g_mobile:string;
  eduQual:string;
  medium:string;
  t_grade:string;
  s_grade:string;
  teacherIntro:string;
  role:string = '';

  email:string;

  constructor(public auth: AuthService, public us: UserServicesService, private fb: FormBuilder) { }

  userDataUpdateForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    t_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    s_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    g_mobile: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]],
    eduQual: ['', [Validators.required]],
    medium: ['', [Validators.required]],
    t_grade: ['', [Validators.required]],
    s_grade: ['', [Validators.required]],
    teacherIntro: ['', [
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(255)
    ]]
  });

  ngOnInit(): void {
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
    }else {
      this.isStudent = true;
    }
    this.getCurrentMonth();
    if (this.auth.currentUser.Role == 'teacher') {
      this.isTeacher = true;
      this.getTeacher(this.uId, this.getCurrentMonth);
    }else {
      this.isStudent = true;
      this.getStudent(this.uId, this.getCurrentMonth());
    }
  }

  get user_data_update(){
    return this.userDataUpdateForm.controls;
  }

  getCurrentMonth(){
    let month = new Date().getMonth();
    switch (month) {
      case 0:
        this.c_month = 'January';
        break;
      case 1:
        this.c_month = 'February';
        break;
      case 2:
        this.c_month = 'March';
        break;
      case 3:
        this.c_month = 'April';
        break;
      case 4:
        this.c_month = 'May';
        break;
      case 5:
        this.c_month = 'June';
        break;
      case 6:
        this.c_month = 'July';
        break;
      case 7:
        this.c_month = 'August';
        break;
      case 8:
        this.c_month = 'September';
        break;
      case 9:
        this.c_month = 'October';
        break;
      case 10:
        this.c_month = 'November';
        break;
      case 11:
        this.c_month = 'December';
        break;
      default:
        break;
    }
    return this.c_month;
  }

  getTeacher(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleTeacher(uId, currentMonth).subscribe(data => {
      this.fName = data.teacherEntity.fName;
      this.lName = data.teacherEntity.lName;
      this.address = data.teacherEntity.address;
      this.city = data.teacherEntity.city;
      this.t_mobile = data.teacherEntity.telephone;
      this.t_grade = "10 - 11";
      this.medium = "Sinhala";
      this.eduQual = data.teacherEntity.eduQual;
      this.intro = data.teacherEntity.teacherIntro;
    }, err => {
      console.log(err);
    })
  }

  getStudent(uId, currentMonth){
    currentMonth = this.c_month;
    this.us.getSingleStudent(uId, currentMonth).subscribe(data => {
      this.fName = data.studentEntity.fName;
      this.lName = data.studentEntity.lName;
      this.address = data.studentEntity.address;
      this.city = data.studentEntity.city;
      this.s_grade = "10";
      this.medium = "Sinhala";
      this.s_mobile = data.studentEntity.telephone;
      this.g_mobile = data.studentEntity.garTelephone;
    }, err => {
      console.log(err);
    })
  }

  closeAlert(){ this.successAlert = false }

}
