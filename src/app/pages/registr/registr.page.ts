import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';


@Component({
  selector: 'app-registr',
  templateUrl: './registr.page.html',
  styleUrls: ['./registr.page.scss'],
})
export class RegistrPage implements OnInit {

  your_name : string ="" ;
  gender : string ="" ;
  date_birth : string ="" ;
  email_address : string ="" ;
  password : string ="" ;
  confirm_pass : string ="" ;
  
  disabledButton : boolean ;


  constructor(private router: Router ,private toastCtrl : ToastController ,
    private loadingCtrl : LoadingController,private alertCtrl: AlertController ,
    private accsPrvds:AccessProviders) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton =false ;
  }

  async tryRegister(){
    if(this.your_name ==""){
      this.presentToast("Yourname is required");
    }else if(this.gender ==""){
      this.presentToast("Gender is required");
    }else if(this.date_birth ==""){
      this.presentToast("Date of birthday is required");
    }else if(this.email_address ==""){
      this.presentToast("Email is required");
    }else if(this.password ==""){
      this.presentToast("Password is required");
    }else if(this.password !=this.confirm_pass){
      this.presentToast("Password are not the same!");
    }else{
      this.disabledButton = true ;
      const loader = await this.loadingCtrl.create({
        message : "Please wait .....",
      });
      loader.present();

      return new Promise(resolve =>{
        var dateFormat = this.date_birth .split('T')[0]; 
        let body ={
          aksi : 'proses_register',
          your_name : this.your_name ,
          gender : this.gender ,
          date_birth : dateFormat ,
          email_address : this.email_address ,
          password : this.password
        }

        this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{
          if(res.success === true){
            loader.dismiss();
            this.disabledButton = false ;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loader.dismiss();
            this.disabledButton = false ;
            this.presentToast(res.msg);
          }
        } , (err)=>{
          loader.dismiss();
          this.disabledButton = false ;
          this.presentAlert("TimeOut");
        } );

      });

    }
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a ,
      duration : 1500 ,
      position : 'top'
    });
    toast.present();
  }

  async presentAlert(a){
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss : false , 
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //Action
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

}
