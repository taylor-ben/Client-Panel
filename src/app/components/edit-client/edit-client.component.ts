import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './../../models/Clients';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  id: string;
  disableBalanceOnEdit = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  onSubmit({value: editedClient, valid}: {value: Client, valid: boolean}) {
    editedClient.id = this.id;
    this.clientService.updateClient(editedClient);
    this.flashMessage.show('Client Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/client/' + this.id]);
  }

}
