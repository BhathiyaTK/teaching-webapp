import { Component, HostListener, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';
import { CustomFiletypeValidationService } from 'src/app/services/validations/custom-filetype-validation.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  uploadedFile:File;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.uploadedFile = file;
  }

  constructor(
    private fb: FormBuilder, 
    private cs: ClassesService,
    private uss: UserServicesService,
    private cftv: CustomFiletypeValidationService
    ) { }

  Teachers:any = [];
  successMsg: boolean = false;
  errorMsg: boolean = false;
  note:any = '';

  name:string;
  teacher:number;
  fee:string;
  date:string;
  time:string;
  notes:string;
  image:string;
  adminApprovalState:string = 'Approved';
  imageName:string;
  previewLoader:boolean = false;
  previewSrc:string;
  previewError:boolean = false;

  addClassForm = this.fb.group({
    name: ['', [Validators.required]],
    teacher: ['', [Validators.required]],
    fee: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    notes: ['', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(100)
    ]],
    image: ['', [
      Validators.required, 
      this.cftv.requiredFileTypes('jpg')
    ]]
  });

  ngOnInit(): void {
    this.allTeachers();
  }

  get class_add(){
    return this.addClassForm.controls;
  }

  allTeachers(){
    this.uss.getTeachers().subscribe(data => {
      this.Teachers = data;
    });
  }

  addNewClass(){
    if (this.addClassForm.valid) {
      var val = {
        name: this.addClassForm.get('name').value,
        notes: this.addClassForm.get('notes').value,
        hDate: this.addClassForm.get('date').value,
        htime: this.addClassForm.get('time').value,
        classFee: this.addClassForm.get('fee').value,
        imagePath: this.addClassForm.get('image').value,
        approvalState: this.adminApprovalState,
        teacherModel:{
          teacherId: this.addClassForm.get('teacher').value
        }
      }
      this.cs.addClass(val).subscribe((res) => {
        this.successMsg = true;
        this.addClassForm.reset();
        this.note = '';
      },(err) => {
        this.errorMsg = true;
        console.log(err);
      });
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
