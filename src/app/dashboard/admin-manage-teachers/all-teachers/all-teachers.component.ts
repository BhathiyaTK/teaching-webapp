import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClassesService } from 'src/app/services/classes/classes.service';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  uId:number;
  Teachers:any = [];
  currentTeacher: boolean = false;
  successAlert:boolean = false;
  errorAlert:boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  teachersList:boolean = false;
  delVal:string = 'show';
  typedFilterText:string = '';
  filteredResultCount:number = 0;
  allTeachers:any = [];

  constructor(public auth: AuthService, private cs: ClassesService, private uss: UserServicesService) { }

  ngOnInit(): void {
    this.uId = this.auth.currentUser.userId;
    this.getAllTeachers();
  }

  getAllTeachers(){
    this.spinner = true;
    this.teachersList = false;
    this.uss.getTeachers().subscribe(data => {
      if (data !== null) {
        this.spinner = false;
        this.teachersList = true;
        this.Teachers = data.filter(o => o.teacherId !== this.uId).sort((a,b) => a.teacherId > b.teacherId ? -1 : 1);
        this.allTeachers = data.filter(o => o.teacherId !== this.uId).sort((a,b) => a.teacherId > b.teacherId ? -1 : 1);
      }else{
        this.emptyMsg = true;
        this.teachersList = false;
      }
    });
  }

  filterTeacher(event) {
    this.typedFilterText = event.target.value;
    if (event.target.value) {
      const teacherName = (event.target.value as string).replace(/\s/g, "").toLowerCase();
      if (this.allTeachers !== '') {
        this.Teachers = this.allTeachers.filter(o => (o.fName.toLowerCase() === teacherName) || (o.lName.toLowerCase() === teacherName));
        if (this.Teachers.length !== 0) {
          this.filteredResultCount = this.Teachers.length;
          this.emptyMsg = false;
          this.teachersList = true;
        } else {
          this.filteredResultCount = 0;
          this.emptyMsg = true;
          this.teachersList = false;
        }
      } else {
        this.emptyMsg = true;
        this.teachersList = false;
      }
    } else {
      this.emptyMsg = false;
      this.teachersList = true;
      this.getAllTeachers();
    }
  }

  clearFilters() {
    this.filteredResultCount = 0;
    this.typedFilterText = '';
    this.emptyMsg = false;
    this.getAllTeachers();
  }

  deleteSelectedTeacher(tId, cId){
    console.log(cId, tId);
    var confirmation = confirm("Are you sure to delete this teacher? Once deleted, teacher and his/her classes also will be deleted. Those data can not be recovered.");
    if (confirmation) {
      this.viewDeleteProgress(tId, cId);
      this.uss.deleteTeacher(tId).subscribe((res) => {
        this.successAlert = true;
        this.delVal = null;
        this.successText = "Teacher deleted successfully.";
        this.getAllTeachers();
      }, (err) => {
        this.errorAlert = true;
        this.errorText = "Process failed. Something went wrong.";
      })
    }
  }

  viewDeleteProgress(t_id, c_id) {
    let delChildId = c_id.getAttribute('data-delete-child-id');
    if (delChildId == t_id) {
      this.delVal = this.delVal + delChildId;
    } else {
      this.delVal = null;
    }
  }

  closeAlert(){ 
    this.successAlert = false ;
    this.errorAlert = false;
  }

  dataRefresh(){
    this.clearFilters();
    this.getAllTeachers();
  }

}
