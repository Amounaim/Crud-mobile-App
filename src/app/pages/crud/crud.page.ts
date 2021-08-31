import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  id             : number     ; 
  your_name      : string ="" ;
  gender         : string ="" ;
  date_birth     : string ="" ;
  email_address  : string ="" ;
  password       : string ="" ;
  confirm_pass   : string ="" ;
  
  disabledButton : boolean    ;


  constructor(
    private router      : Router             ,
    private toastCtrl   : ToastController    ,
    private loadingCtrl : LoadingController  ,
    private alertCtrl   : AlertController    ,
    private accsPrvds   : AccessProviders    ,
    private actRoute    : ActivatedRoute     ,
    ) { }

  ngOnInit() {
    //Retourner l'id from l'url
    this.actRoute.params.subscribe((data:any)=>{
      console.log(data);
      this.id = data.id ;

      if(this.id !=0){
        this.loadUser();
      }
    })
  }

  ionViewDidEnter(){
    this.disabledButton =false ;
  }

  loadUser(){ //F Update ital3o lik
    return new Promise(resolve =>{
      let body ={
        aksi          : 'load_single_data',
        id            : this.id           ,               
      }

      this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{
        this.your_name     = res.result.your_name ;
        this.gender        = res.result.gender ;
        this.date_birth    = res.result.date_birth ;
        this.email_address = res.result.email_address ;

      }); 
    });  
  }



  async crudAction(a){
    if(this.your_name ==""){
      this.presentToast("Yourname is required");
    }else if(this.gender ==""){
      this.presentToast("Gender is required");
    }else if(this.date_birth ==""){
      this.presentToast("Date of birthday is required");
    }else if(this.email_address ==""){
      this.presentToast("Email is required");
    }else if(this.password =="" && a=="create"){
      this.presentToast("Password is required");
    }else{
      this.disabledButton = true ;
      const loader = await this.loadingCtrl.create({
        message : "Please wait .....",
      });
      loader.present();

      return new Promise(resolve =>{
        var dateFormat = this.date_birth .split('T')[0]; 
        let body ={
          aksi          : 'proses_crud'      ,
          id            : this.id            ,
          your_name     : this.your_name     ,
          gender        : this.gender        ,
          date_birth    : dateFormat         ,
          email_address : this.email_address ,
          password      : this.password      ,
          action        : a                  
        }

        this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{
          if(res.success === true){
            loader.dismiss();
            this.disabledButton = false ;
            this.presentToast(a+res.msg);
            this.router.navigate(['/home']);
          }else{
            loader.dismiss();
            this.disabledButton = false ;
            this.presentAlert(res.msg,a);
          }
        } , (err)=>{
          loader.dismiss();
          this.disabledButton = false ;
          this.presentAlert("TimeOut",a);
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

  async presentAlert(a,b){
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
            this.crudAction(b);
          }
        }
      ]
    });

    await alert.present();
  }

}

