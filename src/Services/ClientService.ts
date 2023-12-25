import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class ClientService {
    constructor(private readonly httpService: HttpService) { }

    get(baseUrl: string): Observable<AxiosResponse<any>> {
        return this.httpService.get(baseUrl);
    }
}