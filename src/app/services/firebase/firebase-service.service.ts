import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, throwError, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  constructor(
    private firestore: AngularFirestore,
    private http : HttpClient
    ) {}

    private sendGridApiUrl = 'https://smtp.sendgrid.net';
  private sendGridApiKey = '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';

  writeToCollection(data: any, collectionName: string): Promise<any> {
    return this.firestore.collection(collectionName).add(data);
  }

  // Read data from Firestore collection
  readFromCollection(collectionName: string) {
    // return this.firestore.collection(collectionName).valueChanges();
    return this.firestore.collection(collectionName).doc('corporate_attendance').valueChanges();

  }

  
  async sendMessage(organizationId: string, eventId: string, phoneNumber: string, message: string): Promise<string | Error> {
    try {
      const documentReference = this.firestore.collection('organisations').doc(organizationId).ref;

      return await this.firestore.firestore.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(documentReference);

        if (!snapshot.exists) {
          throw new Error("Document does not exist!");
        }

        const events = snapshot.get('events') as Array<any>;

        for (let event of events) {
          if (event.id === eventId) {
            const users = event.users as Array<any>;

            const userIndex = users.findIndex(user => user.phoneNumber === phoneNumber);
            if (userIndex !== -1) {
              users[userIndex] = { ...users[userIndex], message: message }; // Update the user's status
            } else {
              throw new Error("User not found in the event.");
            }

            event.users = users; // Update the users list in the event
            break;
          }
        }

        transaction.update(documentReference, { events });
        return "Successfully updated user";
      });
    } catch (e) {
      console.error('Error updating user status:', e);
      throw e; // Rethrow or handle as needed
    }
  }

async UpdateInvite(organizationId: string, eventId: string, phoneNumber: string, confirmAttendance: boolean): Promise<string | Error> {
  try {
    const documentReference = this.firestore.collection('organisations').doc(organizationId).ref;

    return await this.firestore.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(documentReference);

      if (!snapshot.exists) {
        throw new Error("Document does not exist!");
      }

      const events = snapshot.get('events') as Array<any>;

      for (let event of events) {
        if (event.id === eventId) {
          const users = event.users as Array<any>;

          const userIndex = users.findIndex(user => user.phoneNumber === phoneNumber);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], confirmAttendance: confirmAttendance }; // Update the user's status
          } else {
            throw new Error("User not found in the event.");
          }

          event.users = users; // Update the users list in the event
          break;
        }
      }

      transaction.update(documentReference, { events });
      return "Successfully updated user";
    });
  } catch (e) {
    console.error('Error updating user status:', e);
    throw e; // Rethrow or handle as needed
    }
  }

async addRaffleTicket(organizationId: string, eventId: string, phoneNumber: string, ticketNumber: number): Promise<string | Error> {
  try {
    const documentReference = this.firestore.collection('organisations').doc(organizationId).ref;

    return await this.firestore.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(documentReference);

      if (!snapshot.exists) {
        throw new Error("Document does not exist!");
      }

      const events = snapshot.get('events') as Array<any>;

      for (let event of events) {
        if (event.id === eventId) {
          const users = event.users as Array<any>;

          

          const userIndex = users.findIndex(user => user.phoneNumber === phoneNumber);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ticketNumber: ticketNumber }; // Update the user's status
          } else {
            throw new Error("User not found in the event.");
          }

          const numberExist = users.some(item => item.ticketNumber == ticketNumber)
          if(!numberExist) {
            throw new Error('Number has already been picked, pick another one')
          }
          event.users = users; // Update the users list in the event
          break;
        }
      }

      transaction.update(documentReference, { events });
      return "Successfully updated user";
    });
  } catch (e) {
    console.error('Error updating user status:', e);
    throw e; // Rethrow or handle as needed
    }
  }

async SetTableAndSeatNo(organizationId: string, eventId: string, phoneNumber: string, tableNo: string, seatNo : string): Promise<string | Error> {
  try {
    const documentReference = this.firestore.collection('organisations').doc(organizationId).ref;

    return await this.firestore.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(documentReference);

      if (!snapshot.exists) {
        throw new Error("Document does not exist!");
      }

      const events = snapshot.get('events') as Array<any>;

      for (let event of events) {
        if (event.id === eventId) {
          const users = event.users as Array<any>;

          const userIndex = users.findIndex(user => user.phoneNumber === phoneNumber);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], tableNo: tableNo, seatNo : seatNo }; // Update the user's status
          } else {
            throw new Error("User not found in the event.");
          }

          event.users = users; // Update the users list in the event
          break;
        }
      }

      transaction.update(documentReference, { events });
      return "Successfully updated user";
    });
  } catch (e) {
    console.error('Error updating user status:', e);
    throw e; // Rethrow or handle as needed
    }
  }


addUser(organizationId: string, eventId: string, participant : any): Promise<any> {
  console.log("Hi world")
  const documentReference = this.firestore.collection('organisations').doc(organizationId);

  return this.firestore.firestore.runTransaction(async (transaction) => {
    try {
      const snapshot = await transaction.get(documentReference.ref);
      if (!snapshot.exists) {
        throw new Error("Document does not exist!");
      }
      const events = snapshot.get('events') as Array<any>;
      for (let event of events) {
        if (event.id === eventId) {
          const users = event.users || [];
          const userExists = users.some((user: any) =>
            user.phoneNumber === participant.phoneNumber 
          );
          const emailExist = users.some((user: any)=>
            user.emailAddress === participant.emailAddress
          )
          if (userExists || emailExist) {
            throw new Error("User with this phone number or email already exists in the event.");
            // return throwError('User with this phone number already exists in the event.')
          }
          users.push({...participant});
          event.users = users;
          break;
        }
      }
      transaction.update(documentReference.ref, { events });
      // this.sendUserQrImage(participant);
      return participant;
    } catch (error) {
      // console.error('Error adding user:', error);
      // return throwError(error);
      throw error
    }
  });
}

sendSMS(number : string, message : string) {
  const name = "Tope Dare"
  return this.http.post(`https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=lVCq25LeZd4ls8p9fZ6bfQTLqYOENkJfMwCboeoDEIQV3XCSyaS3WvVuohHV&from=${name}&to=${number}&body=${message}`, {})
}

sendEmail(payload : any) : Observable<any> {
  return this.http.post('https://www.website.appstore.com.ng/SendEmail', payload)
}
  // private generateRandomCode(): string {
  //   // Implement your random code generation logic here
  //   return ''; // Placeholder for random code
  // }

  // private sendUserQrImage(participant: AddParticipantsFormData): void {
  //   // Implement your logic to send user QR image here
  // }

  matchSearch(array:any, value: string, columns: string[]): boolean {
    const lowerCaseQuery = value.toLowerCase();
    for (const column of columns) {
      if (array?.[column]?.toLowerCase().includes(lowerCaseQuery)) {
        return true;
      }
    }
    return false;
  }

  matchColumnSearch(item : any, column : string, value : string): boolean {
    const lowerCaseQuery = value.toLowerCase();
    return(
      item[column]?.toLowerCase().includes(lowerCaseQuery)
    )
  }

  sendSittingNotification(payload : any) {
    return this.http.post('https://www.website.appstore.com.ng/sitting-notification', payload)
  }

  sendRaffleDrawMail(payload : any) {
    return this.http.post('http://3.72.242.121:4007/Messaging/SendEmail', payload)
  }
}



