import { useState } from "react";
import BookForm from "./components/bookForm";
import type { IFormDataBook } from "./type";
import { addBook } from "../../api/book";
import { useNavigate } from "react-router";
import { message } from "antd";
function AddBook() {
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState<IFormDataBook>({
    bookIntro: "",
    bookPic: "",
    bookTitle: "",
    downloadLink: "",
    requirePoints: 0,
    typeId: "",
  });
  const handleSubmit = async (info: IFormDataBook) => {
    info.typeId = bookInfo.typeId;
    info.bookPic = bookInfo.bookPic;
    try {
      await addBook(info);
      navigate("/book/bookList");
      message.success("添加成功");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BookForm
      addOrEdit="add"
      bookInfo={bookInfo}
      setBookInfo={setBookInfo}
      handleSubmit={handleSubmit}></BookForm>
  );
}
export default AddBook;
