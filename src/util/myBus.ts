/* eslint-disable @typescript-eslint/no-explicit-any */
interface MyBusType {
  on(eventName: string, callback: () => void): void;
  emit<T>(eventName: string, data: T): void;
  // off(eventName: string): void; 
}
class MyBus implements MyBusType {
  private eventNameList: string[] = [];
  private eventList: any[] = [];
  on(eventName: string,callback:any){
    const index=this.eventNameList.indexOf(eventName);
    if(index>-1){
      callback()
      return this.eventList[index]();
    }
  }
  emit<T>(eventName: string,data:T) {
    if(!this.eventNameList.includes(eventName)){
      this.eventNameList.push(eventName);
      this.eventList.push(()=>{
        return data as T;
      })
    }
  }
}



const bus = new MyBus();

export default bus;