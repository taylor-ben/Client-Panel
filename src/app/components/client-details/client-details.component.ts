import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './../../models/Clients';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client;
  id: string;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe(client => {
      if (client) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  onUpdatebalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm(`Are you sure you what to delete ${this.client.firstName} ${this.client.lastName}?`)) {
      this.flashMessage.show(`Client ${this.client.firstName} ${this.client.lastName} removed`, {
        cssClass: 'alert-success', timeout: 4000
      });
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }

}
