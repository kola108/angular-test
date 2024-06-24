import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(seconds: number): string {
    if (!seconds) return '';

    const minutes: number = Math.floor((seconds % 3600) / 60);
    const minutesString: string = minutes.toString().padStart(2, '0');
    const secondsString: string = seconds.toString().padStart(2, '0');

    return `${minutesString}:${secondsString}`;
  }
}
