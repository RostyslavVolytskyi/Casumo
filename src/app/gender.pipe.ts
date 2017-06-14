import { Pipe, PipeTransform } from '@angular/core';
import { Book } 			   from './app.component';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(items: Book[], gender?: string): Book[] {
  	if(gender && gender !== 'Boy/Girl'){
    	return items.filter(item => item.authorGender === gender);
  	}
  	return items;
  }
  
}
