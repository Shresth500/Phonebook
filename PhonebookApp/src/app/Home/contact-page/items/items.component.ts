import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContact } from '../contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  @Input() filteredcontactDetail!: IContact;
  @Output()
  delete = new EventEmitter();
  @Output() edit = new EventEmitter<IContact>();
  isEdit = false;
  loading = false;

  editContacts() {
    this.isEdit = true;
  }
  addNumber(form: NgForm) {
    this.filteredcontactDetail = { ...form.value };
    console.log(this.filteredcontactDetail);
    this.edit.emit(this.filteredcontactDetail);
    this.isEdit = false;
  }
  deleteContact() {
    this.delete.emit();
  }
}
