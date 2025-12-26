import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {

  private URL = 'http://localhost:7070/emp';
 

  constructor(private httpClient: HttpClient) {}
loginUser(username: string, password: string) {

  const body = new HttpParams()
    .set('username', username)
    .set('password', password);

  return this.httpClient.post<any>(
    this.URL + '/login',
    body.toString(),   // ⭐ VERY IMPORTANT
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
}




  
  getAllEmp(): Observable<any> {
    return this.httpClient.get(this.URL+ "/all",{
      withCredentials:true
    })
  }

  
 

saveEmployee(employee: any): Observable<any> {
  return this.httpClient
    .post(
      `${this.URL}/save`,
      employee,
      { withCredentials: true }  
    )
    .pipe(take(1));
}

getEmpById(id: number) {
  return this.httpClient.get(`${this.URL}/${id}`, { withCredentials: true });
}

updateEmp(id: number, emp: any) {
  return this.httpClient.put(
    `${this.URL}/update/${id}`,
    emp,
    { withCredentials: true }
  );
}

// inside User service
deleteEmp(id: number): Observable<any> {
  return this.httpClient.delete(`${this.URL}/delete/${id}`, {
    withCredentials: true
  }).pipe(take(1));
}


}
