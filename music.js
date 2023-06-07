class Music{
    constructor(title , singer , image , mp3){
        this.title = title;
        this.singer = singer;
        this.image = image;
        this.mp3 = mp3 ; 
    }
    getName(){
        return this.title + " " + this.singer;
    }
}


const musicList =[
    new Music("Boşver","Nilüfer","1.jpeg","1.mp3"),
    new Music("Bu da Geçer mi Sevglim","Yalın","2.jpeg","2.mp3"),
    new Music("Aramızda Uçurum Var","Suat Suna","3.jpeg","3.mp3"),  
];