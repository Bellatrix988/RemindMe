function Note(id, title, text, setDate,createDate) {
    this.id = id;       //id
    this.title = title; //���������
    this.text = text;   //����������
    this.setDate = new Date(setDate); //����, �� ������� ����� ��������� ����
    this.createDate = new Date(createDate);
}