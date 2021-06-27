import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  path = "register"

  constructor(private backendService: BackendService, private headersService: HeadersService) { }

  onRegister(details){
    console.log("details",details);
    return this.backendService.post(this.path, details);
  }

  onLogin(details){
    return this.backendService.post(this.path + '/login/', details);
  }

  getAllUsers(){
    return this.backendService.get(this.path + '/getall');
  }
}
