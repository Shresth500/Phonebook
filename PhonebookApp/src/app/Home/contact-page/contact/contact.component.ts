import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService, IContact } from '../contact.service';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemsComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  loading = false;
  filteredcontactDetails!: IContact[];
  contactDetail!: IContact[];
  filterKeyName = '';
  filterKeyNumber = '';
  isEdit: number | null = null;
  dictionary = new Map<string, number>();

  ngOnInit(): void {
    this.getContacts();
    /*if (this.filteredcontactDetails === null) return;
    for (let i = 0; i < this.filteredcontactDetails.length; i++) {
      this.dictionary.set(
        JSON.stringify(this.filteredcontactDetails[i]),
        i + 1
      );
    }*/
  }

  constructor(private contact: ContactService) {}

  addNumber(form: NgForm) {
    let addContact = { ...form.value };
    console.log(addContact);
    this.contact.addContact(addContact).subscribe({
      next: (contactUpdated) => {
        this.filteredcontactDetails.push(contactUpdated);
        this.contactDetail = this.filteredcontactDetails;
      },
    });
  }
  getContacts() {
    this.contact.getContactDetails().subscribe({
      next: (contact) => {
        console.log(contact);
        this.contactDetail = contact;
        this.filteredcontactDetails = contact;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteContact(id: number | undefined) {
    if (id === undefined) return;
    this.contact.deleteContact(id).subscribe({
      next: (deletedContact) => {
        this.filteredcontactDetails = this.contactDetail.filter(
          (contacts) => contacts.id !== id
        );
        this.contactDetail = this.filteredcontactDetails;
      },
    });
  }
  editContacts(editedcontact: IContact, id: number | undefined) {
    console.log(editedcontact);
    if (id === undefined) return;
    this.contact.editContact(editedcontact, id).subscribe({
      next: (edited) => {
        console.log(edited);
        this.getContacts();
        /*let id = this.dictionary.get(JSON.stringify(editedcontact));
        if (id) {
          this.filteredcontactDetails[id] = editedcontact;
          this.contactDetail = this.filteredcontactDetails;
        }*/
      },
    });
  }
}
