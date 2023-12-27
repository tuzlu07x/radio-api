import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Type } from "src/Enums/SpotifyEnum";

@Injectable()
export class SpotifyService {
    constructor(private readonly httpService: HttpService) { }

    public me(): Observable<AxiosResponse<any>> {
        const url = 'https://api.spotify.com/v1/me';
        const response = this.httpService.get(url, {
            headers: {
                Authorization: `Bearer BQCz7ttViV0wmJIGtGLgIBdtuBb10SB6_IlaMsM27VAJMczCp3eFaU1GIM03P66Q7qTJqz_UQBxCluCQIfUHzbooOWTMkcN7MRJ0KWROR08UAApCvMs`
            }
        }).pipe(map((response: any) => response.data));
        console.log(response);
        return response
    }

    token(): Observable<string> {
        const url = 'https://accounts.spotify.com/api/token';

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
        data.append('client_id', process.env.SPOTIFY_CLIENT_ID);
        data.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        return this.httpService.post(url, data.toString(), config).pipe(
            map((response: any) => response.data),
        );
    }

    search(bearerToken: string, search: string, type?: Type | string, limit?: number, offset?: number): Observable<any> {
        const url = `https://api.spotify.com/v1/search`;

        const contain = {
            params: {
                q: search,
                type: type ?? 'artist,album',
                limit: 1,
                offset: 0
            },
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                Accept: 'application/json'
            },
        };

        return this.httpService.get(url, contain).pipe(
            catchError((error) => {
                console.error('Error response:', error.response);
                throw error;
            }),
            map((response: any) => response.data),
        );
    }


}