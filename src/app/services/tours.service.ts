import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tour } from "../interfaces/interfaces";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})

export class ToursService{
  constructor(public http: HttpClient){
  }
  create(tour: Tour):Observable<Tour>{
    return this.http.post(`${environment.FbDbUrl}/tours.json`, tour)
    .pipe(map((response: any) => {
      return {
        ...tour,
        id: response.name,
        date: new Date(tour.date)
      }
    }))
  }
  getAll(): Observable<Tour[]>{
    return this.http.get(`${environment.FbDbUrl}/tours.json`)
      .pipe(map((response: {[key: string]:any})=>{
        return Object
          .keys(response)
          .map(key=>({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }
  getById(id: string): Observable<Tour>{
    return this.http.get<Tour>(`${environment.FbDbUrl}/tours/${id}.json`)
      .pipe(map((tour: Tour)=>{
        return {
          ...tour,
          id,
          date: new Date(tour.date)
          }
        })
      )
  }
  remove(id: any):Observable<void>{
    return this.http.delete<void>(`${environment.FbDbUrl}/tours/${id}.json`)
  }
  update(tour: Tour): Observable<Tour>{
    return this.http.patch<Tour>(`${environment.FbDbUrl}/tours/${tour.id}.json`, tour)
  }
}