import { Component,ChangeDetectorRef, ElementRef, OnInit,ViewChild  } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {MatStepper} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 el: ElementRef;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  ProfileFor: any = ['Myself', 'Daughter', 'Son', 'Brother', 'Sister','Relative','Friend'];  
Religion: any =["Hindu","Muslim-Shia","Muslim-Sunni","Christian","Sikh","Jain-Digambar","Jain-Others","Budhist","Inter-Religion"];
maritalStatusArray:any =["Single","Married"];


selectedFiles: FileList;
currentFileUpload: File;
progress: { percentage: number } = { percentage: 0 };
  constructor(private uploadService: UploadFileService,private authService: AuthService,public fb: FormBuilder,private route:Router,  private cd: ChangeDetectorRef) { }
 

  ngOnInit() {
  
    this.reactiveForm()
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
   /* Reactive form */
   reactiveForm() {
    this.myForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      gender: ['Male'],
      file:[''],
      dob: ['',[Validators.required]],      
      profilefor: ['',[Validators.required]],
      religion:['',[Validators.required]],
      maritalstatus:['',[Validators.required]]
    
    })
  }

  /* Date */
    date(e) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.myForm.get('dob').setValue(convertDate, {
        onlyself: true
      })
    }
  
    public errorHandling = (control: string, error: string) => {
      return this.myForm.controls[control].hasError(error);
    }

  submitForm() {
    if(!this.myForm.valid)
    {
      return false;
    }
    this.authService.register(this.myForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.route.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
   
  }
  /* image Upload */
  
  /*########################## File Upload ########################*/

  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
   
    
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
  
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.myForm.patchValue({
          file: reader.result
         }); 
      
        this.editFile = false;
        this.removeUpload = true;
      }
      console.log(this.myForm)
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
  
  }
}
