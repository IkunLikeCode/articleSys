import { useLocation } from "react-router";
import BookForm from "./components/bookForm";
import { getBookById, updateBook } from "../../api/book";
import { useEffect, useState } from "react";
import { IFormDataBook } from "./type";
function EditBook() {
  const {
    state: { id },
  } = useLocation();
  const [bookInfo, setBookInfo] = useState<IFormDataBook>({
    bookIntro: "",
    bookPic: "",
    bookTitle: "",
    downloadLink: "",
    requirePoints: 0,
    typeId: "",
  });
  // 提交表单
  const handleSubmit = async (info: IFormDataBook) => {
    info.typeId = bookInfo.typeId;
    info.bookPic = bookInfo.bookPic;
    info.requirePoints = Number(bookInfo.requirePoints);
    await updateBook(id, info);
    window.history.back();
  };
  useEffect(() => {
    getBookById<{
      code: number;
      data: IFormDataBook;
      msg: string;
    }>(id).then((res) => {
      setBookInfo(res.data);
    });
  }, []);
  return (
    <div className="editBook_container">
      <BookForm
        handleSubmit={handleSubmit}
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
        addOrEdit="edit"></BookForm>
    </div>
  );
}
export default EditBook;
