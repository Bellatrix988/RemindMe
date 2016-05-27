<<<<<<< HEAD
function Note(id, title, text, setDate,createDate) {
=======
function Note(id, title, text, setDate) {
>>>>>>> 87fd9b878f1de319ede1ec65b6a5a95cb28da81e
    this.id = id;       //id
    this.title = title; //заголовок
    this.text = text;   //содержимое
    this.setDate = new Date(setDate); //дата, до которой нужно выполнить дело
<<<<<<< HEAD
    this.createDate = new Date(createDate);
=======
>>>>>>> 87fd9b878f1de319ede1ec65b6a5a95cb28da81e
}