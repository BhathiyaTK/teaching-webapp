import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/users/user-services.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  
  Students:any = [];

  pagesCount:number;
  totalElements:number;
  currentPageNumber:number;
  initialPageNumber:any = 0;
  successAlert: boolean = false;
  errorAlert: boolean = false;
  successText:string = '';
  errorText:string = '';
  emptyMsg:boolean = false;
  spinner:boolean = false;
  studentsList:boolean = false;
  delVal:string = 'show';
  typedFilterText:string = '';
  filteredResultCount:number = 0;
  allStudents:any = [];

  constructor(private uss: UserServicesService) { }

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

  ngOnInit(): void {
    this.getAllStudents(this.initialPageNumber);
  }

  getAllStudents(pageNo){
    this.spinner = true;
    this.studentsList = false;
    this.uss.getStudents(pageNo).subscribe(data => {
      if (data.content.length !== 0) {
        this.spinner = false;
        this.studentsList = true;
      }else{
        this.spinner = false;
        this.emptyMsg = true;
        this.studentsList = false;
      }
      this.Students = data.content;
      this.allStudents = data.content;
      this.pagesCount = data.totalPages;
      this.totalElements = data.totalElements;
      this.currentPageNumber = data.pageable.pageNumber;
    })
  }

  filterBySearch(event, pageNo) {
    this.typedFilterText = "name '"+event.target.value;
    if (event.target.value) {
      const studentName = (event.target.value as string).replace(/\s/g, "").toLowerCase();
      if (this.allStudents !== null) {
        this.Students = this.allStudents.filter(o => (o.fName.toLowerCase() === studentName) || (o.lName.toLowerCase() === studentName));
        if (this.Students.length !== 0) {
          this.filteredResultCount = this.Students.length;
          this.emptyMsg = false;
          this.studentsList = true;
        } else {
          this.emptyMsg = true;
          this.studentsList = false;
        }
      } else {
        this.emptyMsg = true;
        this.studentsList = false;
      }
    } else {
      this.typedFilterText = "";
      this.emptyMsg = false;
      this.studentsList = true;
      this.getAllStudents(pageNo);
    }
  }

  filterByGrade(event, pageNo) {
    this.typedFilterText = "grade '"+event.target.value;
    const selectedGrade = event.target.value;
    if (event.target.value) {
      if (this.allStudents !== null) {
        this.Students = this.allStudents.filter(o => o.grade === selectedGrade);
        if (this.Students.length !== 0) {
          this.filteredResultCount = this.Students.length;
          this.emptyMsg = false;
          this.studentsList = true;
        } else {
          this.emptyMsg = true;
          this.studentsList = false;
        }
      } else {
        this.emptyMsg = true;
        this.studentsList = false;
      }
    } else {
      this.typedFilterText = "";
      this.emptyMsg = false;
      this.studentsList = true;
      this.getAllStudents(pageNo);
    }
  }

  filterByMedium(event, pageNo) {
    this.typedFilterText = "medium '"+event.target.value;
    const selectedMedium = event.target.value;
    if (event.target.value) {
      if (this.allStudents !== null) {
        this.Students = this.allStudents.filter(o => o.medium === selectedMedium);
        if (this.Students.length !== 0) {
          this.filteredResultCount = this.Students.length;
          this.emptyMsg = false;
          this.studentsList = true;
        } else {
          this.emptyMsg = true;
          this.studentsList = false;
        }
      } else {
        this.emptyMsg = true;
        this.studentsList = false;
      }
    } else {
      this.typedFilterText = "";
      this.emptyMsg = false;
      this.studentsList = true;
      this.getAllStudents(pageNo);
    }
  }

  clearFilters(pageNo) {
    this.filteredResultCount = 0;
    this.typedFilterText = '';
    this.emptyMsg = false;
    this.getAllStudents(pageNo);
  }

  deleteSelectedStudent(stdId, cId, pageNo){
    var confirmation = confirm("Are you sure to delete this student? Once deleted, student data can not be recovered.");
    if (confirmation) {
      this.viewDeleteProgress(stdId, cId);
      this.uss.deleteStudent(stdId).subscribe((res) => {
        this.successAlert = true;
        this.delVal = null;
        this.successText = "Student deleted successfully.";
        this.getAllStudents(pageNo);
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

  pageNumberClick(event){
    this.getAllStudents(event-1);
  }

  dataRefresh(pageNo){
    this.clearFilters(pageNo);
    this.getAllStudents(pageNo);
  }

  closeAlert(){
    this.successAlert = false ;
    this.errorAlert = false;
  }

}
