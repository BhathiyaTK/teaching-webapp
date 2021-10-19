import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomFiletypeValidationService } from 'src/app/services/validations/custom-filetype-validation.service';

@Component({
  selector: 'app-tchr-add-class',
  templateUrl: './tchr-add-class.component.html',
  styleUrls: ['./tchr-add-class.component.css']
})
export class TchrAddClassComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private fb: FormBuilder, 
    private cs: ClassesService,
    private uss: UserServicesService,
    private cftv: CustomFiletypeValidationService
  ) { }

  successMsg: boolean = false;
  errorMsg: boolean = false;
  note:any = '';
  name:string;
  fee:string;
  date:string;
  time:string;
  notes:string;
  image:string;
  adminApprovalState:string = 'Pending';
  imageName:string;
  previewLoader:boolean = false;
  previewSrc:string;
  previewError:boolean = false;

  tchrAddClassForm = this.fb.group({
    name: ['', [Validators.required]],
    fee: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    notes: ['', [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(100)
    ]],
    image: ['', [
      Validators.required, 
      this.cftv.requiredFileTypes('jpg')
    ]]
  });

  ngOnInit(): void {
  }

  get tchr_class_add(){
    return this.tchrAddClassForm.controls;
  }

  tchrAddNewClass() {
    if (this.tchrAddClassForm.valid) {
      var val = {
        name: this.tchrAddClassForm.get('name').value,
        notes: this.tchrAddClassForm.get('notes').value,
        hDate: this.tchrAddClassForm.get('date').value,
        htime: this.tchrAddClassForm.get('time').value,
        classFee: this.tchrAddClassForm.get('fee').value,
        imagePath: this.tchrAddClassForm.get('image').value,
        approvalState: this.adminApprovalState,
        teacherModel:{
          teacherId: this.auth.currentUser.userId
        }
      }
      console.log(val);
      // this.cs.addClass(val).subscribe((res) => {
      //   this.successMsg = true;
      //   this.tchrAddClassForm.reset();
      //   this.note = '';
      // },(err) => {
      //   this.errorMsg = true;
      //   console.log(err);
      // });
    } else {
      return null;
    }
  }

  onImageChange(event) {
    this.previewLoader = true;
    setTimeout(() => {
      const reader = new FileReader();
      if (event.target.files) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewSrc = reader.result as string;
        };
        this.previewLoader = false;
      } else {
        this.previewError = true;
        this.previewLoader = false;
      }
    }, 1000);
  }

  formReset() {
    this.previewSrc = '';
    this.previewLoader = false;
    this.previewError = false;
  }

}
