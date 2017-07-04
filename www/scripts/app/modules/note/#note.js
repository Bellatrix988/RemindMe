function Note(id, title, text, setDate,createDate) {
    this.id = id;       //id
    this.title = title; //заголовок
    this.text = text;   //содержимое
    this.setDate = new Date(setDate); //дата, до которой нужно выполнить дело
    this.createDate = new Date(createDate);
}