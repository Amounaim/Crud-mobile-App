import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage : any ;
  name : string ;

  users : any    = [] ;
  start : number = 0  ;
  limit : number = 13 ;//limit get data

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
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res); //res c'est le tableau des donnees recuperer dans login
      this.datastorage = res ;
      this.name = this.datastorage.your_name ;
    });

    this.start = 0  ;
    this.users = [] ;
    this.loadUsers();
  }

  async doRefresh(event){ //Katraja3 start l 0 o limit l max lal users
    const loader = await this.loadingCtrl.create({
      message : "Please wait .....",
    });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  loadData(event){
    this.start =this.limit ;// so b7ala kat3tini ghi akhir user tenregistra
    setTimeout(() =>{
      this.loadUsers().then(()=>{
        event.target.complete();
      })
    },500);
  }

  async loadUsers(){ //return Users with start and limit
    return new Promise(resolve =>{
      let body ={
        aksi  : 'loead_users',
        start : this.start   ,
        limit : this.limit   
      }

      this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{

        for(let datas of res.result){ //for infinity scroll lead data per limit
          this.users.push(datas);
        }

        resolve(true);

      });
    });
  }

  async delData(a){ //delete user by id
    return new Promise(resolve =>{
      let body ={
        aksi  : 'del_users',
        id    : a 
      }

      this.accsPrvds.postData(body ,'proses.php').subscribe((res :any)=>{
        if(res.success === true){
          this.presentToast("Delete successfuly");
          this.ionViewDidEnter();
        }else{
          this.presentToast("Delete error");
        }
      });
    });
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a ,
      duration : 1500 ,
      position : 'top'
    });
    toast.present();
  }



  async prosesLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message : 'Logout successfuly' ,
      duration : 1500 ,
    });
    toast.present();
  }

  openCrud(a){
    this.router.navigate(['/crud/'+a]);
  }

}
