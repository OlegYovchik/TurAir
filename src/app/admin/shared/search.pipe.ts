import { Pipe, PipeTransform } from "@angular/core";
import { Tour } from "src/app/interfaces/interfaces";

@Pipe({
    name: 'searchTours'
})
export class SearchPipe implements PipeTransform {
    transform(tours: Tour[], search: string):Tour[]{
        if(!search.trim()){
            return tours
        }else{
            return tours.filter(tour=>{
                return tour.hotel.toLowerCase().includes(search.toLowerCase())
            })
        }
    }
}