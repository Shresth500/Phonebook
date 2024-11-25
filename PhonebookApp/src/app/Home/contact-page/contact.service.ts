import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

export interface IContact {
  id?: number;
  name: string;
  number: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService implements OnInit {
  apiUrl = `http://localhost:4000/contacts`;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  getContactDetails(id: number | null = null) {
    if (id !== null) {
      return this.http.get<IContact[]>(`${this.apiUrl}/?id=${id}`);
    }
    return this.http.get<IContact[]>(`${this.apiUrl}`);
  }

  addContact(contact: Omit<IContact, 'id'>) {
    return this.http.post<Omit<IContact, 'id'>>(`${this.apiUrl}`, contact, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  deleteContact(id: number) {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`);
  }

  editContact(contact: Omit<IContact, 'id'>, id: number) {
    return this.http.put<IContact>(`${this.apiUrl}/${id}`, contact, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
