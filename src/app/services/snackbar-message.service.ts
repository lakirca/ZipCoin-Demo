// import {Injectable} from '@angular/core';
// import {SnackbarService} from 'ngx-snackbar';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SnackbarMessageService {
//
//   constructor(private snackbarService: SnackbarService) {
//   }
//
//   public error(msg) {
//     const _this = this;
//     this.snackbarService.add({
//       msg: '<strong>ERROR:</strong>' + msg,
//       timeout: 5000,
//       action: {
//         text: 'Undo',
//         onClick: (snack) => {
//           console.log('dismissed: ' + snack.id);
//
//           _this.remove(snack.id);
//         },
//       },
//       onAdd: (snack) => {
//         console.log('added: ' + snack.id);
//       },
//       onRemove: (snack) => {
//         console.log('removed: ' + snack.id);
//       }
//     });
//   }
//
//   public warning(msg) {
//     const _this = this;
//     this.snackbarService.add({
//       msg: '<strong>WARNING:</strong>' + msg,
//       timeout: 5000,
//       action: {
//         text: 'Undo',
//         onClick: (snack) => {
//           console.log('dismissed: ' + snack.id);
//
//           _this.remove(snack.id);
//         },
//       },
//       onAdd: (snack) => {
//         console.log('added: ' + snack.id);
//       },
//       onRemove: (snack) => {
//         console.log('removed: ' + snack.id);
//       }
//     });
//   }
//
//   public message(msg) {
//     const _this = this;
//     this.snackbarService.add({
//       msg: '<strong>MESSAGE:</strong>' + msg,
//       timeout: 5000,
//       action: {
//         text: 'Undo',
//         onClick: (snack) => {
//           console.log('dismissed: ' + snack.id);
//
//           _this.remove(snack.id);
//         },
//       },
//       onAdd: (snack) => {
//         console.log('added: ' + snack.id);
//       },
//       onRemove: (snack) => {
//         console.log('removed: ' + snack.id);
//       }
//     });
//   }
//
//   public clear() {
//     this.snackbarService.clear();
//   }
//
//   public remove(id) {
//     this.snackbarService.remove(id);
//   }
// }
