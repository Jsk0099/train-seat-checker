import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-train-seat-availability',
  templateUrl: './train-seat-availability.component.html',
  styleUrls: ['./train-seat-availability.component.scss']
})
export class TrainSeatAvailabilityComponent {

  coachLink = 'https://trainchart.in/api/train/html/22959/2025-06-08/';
  seatLink = 'https://trainchart.in/api/train/html/22959/2025-06-08/D6:2S/';
  date = new Date();
  trainNumber:string = '';
  route = '';
  coachList = [];
  seatList = {};
  trainSearchXhr:any = false;

  constructor(private http:HttpClient) {}


  ngOnInit(){

  }

  oldSearchText = '';
  trainList = [];
  searchTrain(){
    if(this.trainNumber.length < 3 || this.trainList.findIndex(e => e.t.includes(this.trainNumber)) > -1 || this.oldSearchText == this.trainNumber){
      return;
    }
    this.oldSearchText = this.trainNumber;
    const isString = isNaN(Number(this.trainNumber)); 
    let q = '';
    let url = 'https://trainchart.in/api/train/search/';
    if(isString){
      url = url+'0/?q='+this.trainNumber;
    } else {
      url = url + this.trainNumber + '/';
    }
    this.trainSearchXhr && this.trainSearchXhr?.unsubscribe();
    this.trainSearchXhr = this.http.get(url).subscribe((res:[])=>{
      // console.log(res);
      this.trainList = res;
    })
  }

  async fetchData(){
    console.log('Start');
    this.trainSearchXhr = true;
    await this.fetchCoachData();
    console.log(this.coachList);
    this.coachList.forEach((e, i) => {
      this.fetchSeatData(e, i == (this.coachList.length-1));
    });
    console.log('End');
  }

async fetchCoachData() {
  console.log(this.date);
  if(!this.trainNumber || !this.date){
    return;
  }

  const response = await fetch(`https://trainchart.in/api/train/html/${this.trainNumber}/${this.date}/`);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let text = '';
  const that = this; // ✅ Fix: capture context manually

  async function read() {
    const { done, value } = await reader.read();
    if (value) {
      text += decoder.decode(value, { stream: true });
    }

    if (done) {
      console.log('Stream finished reading');

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const listItems = doc.querySelectorAll('li');

      const results: string[] = [];
      listItems.forEach((li: any) => {
        const seatText = li.dataset;
        if (seatText?.seat && seatText.seat !== 'UR' && seatText.seat !== 'SLRD') {
          results.push(`${seatText.seat}:${seatText.cls}`);
        }
      });

      that.coachList = results;  // ✅ use `that` instead of `this`
      console.log('Results set on component:', that.coachList);
      return;
    }

    // Keep reading
    await read();
  }

  await read();  // 🔁 Start reading
}

async fetchSeatData(coach, isLast) {
  const response = await fetch(`https://trainchart.in/api/train/html/${this.trainNumber}/${this.date}/${coach}/`);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let text = '';
  const that = this; // ✅ Fix: capture context manually
  let searchTerms = that.route.replace(/\s+/g, '').toLowerCase().split(',');

  async function read() {
    const { done, value } = await reader.read();
    if (value) {
      text += decoder.decode(value, { stream: true });
    }

    if (done) {
      console.log('Stream finished reading');

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const listItems = doc.querySelectorAll('li');

      const results = [];
      listItems.forEach(li => {
        // Get the seat number (inside <span>), remove spaces
        const seatText = li.querySelector('span')?.textContent.trim().replace(/\s/g, '');
        // Get the paragraph content (routes)
        const routesText = li.querySelector('p')?.innerHTML || '';
        // Extract "Free" routes by splitting with <br> and filtering
        const freeRoutes = routesText
          .split('<br>')
          .filter(route => 
            // route.toLowerCase().includes('-Free') && route.includes(that.route) 
             searchTerms.every(item => route.toLowerCase().includes(item))
          )
          .map(route => route.trim());
          if(freeRoutes.length){
            results.push({
              seatNumber: seatText,       // e.g., '1W'
              freeRoutes: freeRoutes      // array of routes with 'Free'
            });
          }
      });

      console.log('Seats: ', results);
      that.seatList[coach] = results;  // ✅ use `that` instead of `this`
      if(isLast){
        that.trainSearchXhr = false;
      }
      return;
    }

    // Keep reading
    await read();
  }

  await read();  // 🔁 Start reading
}

}
