import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController,NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_address : string ="" ;
  password : string ="" ;

  disabledButton : boolean ;

  constructor(
    private router: Router ,
    private toastCtrl : ToastController ,
    private loadingCtrl : LoadingController,
    private alertCtrl: AlertController ,
    private accsPrvds:AccessProviders ,
    private storage : Storage ,
    private navCtrl:NavController
    ) { }


  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton =false ;
  }


  async tryLogin(){
    if(this.email_address ==""){
      this.presentToast("Email is required");
    }else if(this.password ==""){
      this.presentToast("Password is required");
    }else{
      this.disabledButton = true ;
      const loader = await this.loadingCtrl.create({
        message : "Please wait .....",
      });
      loader.present();

      return new Promise(resolve =>{
        let body ={
          aksi : 'proses_login',
          email_address : this.email_address ,
          password : this.password
        }

        this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{
          if(res.success === true){
            loader.dismiss();
            this.disabledButton = false ;
            this.presentToast('Login successfuly');
            this.storage.set('storage_xxx',res.result);//create storage session (enregistrer donc les donnes sur storage res)
            this.navCtrl.navigateRoot(['/home']);
          }else{
            loader.dismiss();
            this.disabledButton = false ;
            this.presentToast(res.msg);
          }
        } , (err)=>{
          loader.dismiss();
          this.disabledButton = false ;
          this.presentToast("TimeOut");
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




  openRegister(){
    this.router.navigate(['/registr']);
  }

  openIntro(){
    this.navCtrl.navigateRoot(['/intro']);
  }

}
