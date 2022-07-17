import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any;
  constructor(private _cate:CategoryService) { }

  ngOnInit(): void {
  this._cate.categories().subscribe(
    (data:any)=>{
      this.categories=data;
      console.log(data);
    },
    (error)=>{
      Swal.fire('Error!!','Not Loading category.....','error');
    }
  );
  }

}
